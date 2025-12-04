
import { GoogleGenAI, Type, GenerateContentResponse, Content, Modality } from "@google/genai";
import { Grant, GrantSummary, VideoScene, PlantingSite, SuitableTree, EconomicBenefitAnalysis, Coords, GroundedResult, GroundedSource, SiteAnalysis, RescueCampaign, AnimalProfile } from "../types";

// FIX: Per coding guidelines, the API key must be obtained from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface ChatResponse {
    responseText: string;
    followUpPrompts: string[];
}

// Re-export type for compatibility
export type GrantResult = GroundedResult;

const parseJsonResponse = <T>(jsonStr: string, context: string): T => {
    try {
        let cleanJsonStr = jsonStr.trim();
        if (cleanJsonStr.startsWith('```json')) {
            cleanJsonStr = cleanJsonStr.substring(7, cleanJsonStr.length - 3).trim();
        } else if (cleanJsonStr.startsWith('```')) {
             cleanJsonStr = cleanJsonStr.substring(3, cleanJsonStr.length - 3).trim();
        }
        return JSON.parse(cleanJsonStr);
    } catch (e) {
        console.error(`Failed to parse JSON for ${context}:`, jsonStr);
        throw new Error(`The AI returned an invalid JSON format for the ${context}.`);
    }
};

export const getChatResponseWithFollowups = async (
    systemInstruction: string,
    history: Content[],
    latestMessage: string
): Promise<ChatResponse> => {
    const contents: Content[] = [
        ...history,
        { role: 'user', parts: [{ text: latestMessage }] }
    ];

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    responseText: { type: Type.STRING, description: "Your direct, helpful response to the user's question about animals/shelters." },
                    followUpPrompts: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "3 short, relevant, and engaging follow-up questions or actions the user might want to take next (e.g., 'How to adopt?', 'Volunteer info')."
                    }
                },
                required: ["responseText", "followUpPrompts"]
            }
        }
    });

    return parseJsonResponse(response.text, 'chatbot response');
};


export const generateReport = async (topic: string, description: string, reportType: string): Promise<GroundedResult> => {
    const prompt = `
        Generate a comprehensive report for an Animal Shelter/Rescue organization.
        Report Type: "${reportType}".
        Topic: ${topic}
        Description: ${description}

        The report should be well-structured, detailed, and formatted in Markdown.
        Use Google Search to find up-to-date and relevant information for the report, including current animal welfare trends, shelter best practices, veterinary protocols, or funding sources as applicable.
        Include sections appropriate for the report type (e.g., for a Shelter Plan: Capacity Planning, Medical Protocols, Budget, Staffing).
        List all web sources used.
    `;

    // Use ai.models.generateContent
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    const sources = groundingChunks.map(chunk => chunk.web).filter(s => s).map(s => ({ web: s })) as GroundedSource[];
    
    return {
        text: response.text,
        sources: sources,
    };
};

export const findGrants = async (prompt: string): Promise<GrantResult> => {
    // The new GrantFinder sends a full prompt including keywords and document text.
    // We just pass it through to the model with Google Search.
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    const sources = groundingChunks.map(chunk => chunk.web).filter(s => s).map(s => ({ web: s })) as GroundedSource[];
    
    return {
        text: response.text,
        sources: sources,
    };
};

export const findGrantsWithGrounding = async (keywords: string): Promise<GroundedResult> => {
    const prompt = `Find the latest Animal Welfare, Shelter, and Veterinary grants related to these keywords: "${keywords}". Provide a summary of the top 3-5 grants, including their name, funding body, and a direct link to the application page. Also list all web sources used.`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    const sources = groundingChunks.map(chunk => chunk.web).filter(s => s).map(s => ({ web: s })) as GroundedSource[];
    
    return {
        text: response.text,
        sources: sources,
    };
};

export const analyzeGrant = async (grant: Grant, userProfile: string): Promise<GrantSummary> => {
    const prompt = `
        Analyze the following grant opportunity based on my profile. Use Google Search to access the provided link and get the most up-to-date information.
        
        My Profile:
        ${userProfile} (An Animal Shelter and Rescue Organization)

        Grant Details:
        Title: ${grant.grantTitle}
        Funding Body: ${grant.fundingBody}
        Summary: ${grant.summary}
        Deadline: ${grant.deadline}
        Link: ${grant.link}

        After analyzing the grant from the link, extract the following information and respond ONLY with a valid JSON object. Do not add any other text or markdown formatting like \`\`\`json. The JSON object must contain these exact keys:
        "grantTitle", "fundingBody", "deadline", "amount", "duration", "geography", "eligibility", "scope", "howToApply", "contact", and "relevancePercentage" (an integer from 0 to 100 indicating relevance to my profile).
    `;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });
    
    return parseJsonResponse(response.text, 'grant analysis');
};

export const findPlantingSites = async (description: string, language: string): Promise<PlantingSite[]> => {
    // REPURPOSED: Finding Rescue/Shelter Sites instead of Planting Sites.
    // The Schema keys remain the same to avoid breaking the frontend types, but the content is mapped.
    const langInstruction = language === 'fa' ? "Output Language: Persian (Farsi). Translate ALL text content (names, rationales, species) to Persian. Do not include English text." : "Output Language: English.";
    const systemInstruction = `You are an expert animal welfare strategist for the Green Hope Project. Your task is to identify and recommend optimal locations for animal rescue operations, new shelters, or feeding stations based on user-defined goals. Analyze the request and provide 3-5 potential sites. 
    
    ${langInstruction}

    IMPORTANT: Map your response to the following JSON schema keys:
    - locationName: Name of the rescue zone or shelter site (MUST be in ${language === 'fa' ? 'Persian' : 'English'}).
    - country: Country.
    - latitude: Latitude.
    - longitude: Longitude.
    - rationale: Detailed explanation of why this site is needed for animals (stray population, lack of vets, etc.).
    - suggestedSpecies: List of animals that need help here (e.g., "Stray Dogs", "Feral Cats", "Injured Birds").
    - priority: Urgency level.
    `;
    
    const userPrompt = `Goal: ${description}\n\n${langInstruction}`;

    const response = await ai.models.generateContent({
        // FIX: Use gemini-3-pro-preview for complex text tasks as per guidelines.
        model: 'gemini-3-pro-preview',
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        locationName: { type: Type.STRING },
                        country: { type: Type.STRING },
                        latitude: { type: Type.NUMBER },
                        longitude: { type: Type.NUMBER },
                        rationale: { type: Type.STRING, description: "A detailed explanation in Markdown format about why this site is suitable for rescue operations." },
                        suggestedSpecies: { type: Type.ARRAY, items: { type: Type.STRING } },
                        priority: { type: Type.STRING, description: "Priority level: 'Critical', 'High', 'Medium', or 'Low'." },
                    },
                    required: ["locationName", "country", "latitude", "longitude", "rationale", "suggestedSpecies", "priority"]
                }
            }
        }
    });
    return parseJsonResponse(response.text, 'site locations');
};

export const analyzePlantingSite = async (site: PlantingSite, language: string): Promise<SiteAnalysis> => {
    // REPURPOSED: Analyzing Shelter/Rescue Site Feasibility.
    const langInstruction = language === 'fa' ? "Output Language: Persian (Farsi). Ensure ALL text fields are in Persian." : "Output Language: English.";
    
    const systemInstruction = `You are a shelter planner and financial analyst for an animal rescue NGO. Your task is to provide a detailed feasibility analysis for a proposed shelter or rescue project. ${langInstruction}`;
    const userPrompt = `
        Analyze the following proposed rescue site:
        - Location: ${site.locationName}, ${site.country}
        - Rationale: ${site.rationale}
        - Target Animals: ${site.suggestedSpecies.join(', ')}

        Provide the analysis in the following JSON format. Note the specific mapping for this schema:
        - estimatedCost: A realistic cost range for setting up the shelter/operation.
        - treeCount: The estimated ANIMAL CAPACITY (number of animals the site can hold).
        - projectDurationYears: Estimated time to fully establish the center.
        - carbonSequestrationTonnesPerYear: The estimated NUMBER OF ADOPTIONS per year.
        - keyChallenges: List of 2-3 key potential challenges (e.g., zoning, disease control).
        - successFactors: List of 2-3 critical success factors (e.g., community volunteers, vet partnership).

        ${langInstruction}
    `;
    const response = await ai.models.generateContent({
        // FIX: Use gemini-3-pro-preview for complex text tasks as per guidelines.
        model: 'gemini-3-pro-preview',
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    estimatedCost: { type: Type.STRING },
                    treeCount: { type: Type.INTEGER, description: "Estimated ANIMAL CAPACITY." },
                    projectDurationYears: { type: Type.STRING },
                    carbonSequestrationTonnesPerYear: { type: Type.INTEGER, description: "Estimated YEARLY ADOPTIONS." },
                    keyChallenges: { type: Type.ARRAY, items: { type: Type.STRING } },
                    successFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["estimatedCost", "treeCount", "projectDurationYears", "carbonSequestrationTonnesPerYear", "keyChallenges", "successFactors"]
            }
        }
    });
    return parseJsonResponse(response.text, 'site analysis');
}

export const findPlantingSitesWithMaps = async (query: string, userCoords: Coords, language: string): Promise<GroundedResult> => {
    const langInstruction = language === 'fa' ? "Respond in Persian (Farsi)." : "Respond in English.";
    const prompt = `Based on my current location, find information about: "${query}" related to animal welfare, vets, or pet resources. Provide details about relevant places and include links to Google Maps. ${langInstruction}`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{googleMaps: {}}],
            toolConfig: {
                retrievalConfig: {
                    latLng: {
                        latitude: userCoords.lat,
                        longitude: userCoords.lng
                    }
                }
            }
        },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    const sources: GroundedSource[] = groundingChunks
        .map(chunk => {
            if (chunk.maps) return { maps: chunk.maps };
            if (chunk.web) return { web: chunk.web };
            return null;
        })
        .filter((s): s is GroundedSource => s !== null);

    return {
        text: response.text,
        sources: sources,
    };
};

export const findSuitableTrees = async (latitude: number, longitude: number, language: string): Promise<SuitableTree[]> => {
    // REPURPOSED: Finding Suitable Animals/Breeds for the environment.
    const langInstruction = language === 'fa' ? "Output Language: Persian (Farsi). Translate ALL text content (names, rationales, descriptions) to Persian." : "Output Language: English.";

    const systemInstruction = `You are an expert veterinarian and animal behaviorist. Your task is to recommend suitable animal species or dog/cat breeds that would thrive in a specific geographic environment (considering climate, space, urban/rural). 
    
    ${langInstruction}
    
    Analyze the location based on latitude/longitude.
    Provide a list of 3-5 suitable animals.
    
    Map to Schema:
    - commonName: The breed or animal type (e.g., "Golden Retriever", "Domestic Shorthair Cat").
    - scientificName: Scientific name (e.g. "Canis lupus familiaris").
    - description: Brief description of the animal and its temperament.
    - rationale: Why this animal suits this climate/environment (e.g., "Thick coat good for cold climate", "Small size good for urban apartment").
    `;
    
    const userPrompt = `Recommend suitable animals/breeds for a shelter or home at latitude: ${latitude}, longitude: ${longitude}.\n${langInstruction}`
    const response = await ai.models.generateContent({
        // FIX: Use gemini-3-pro-preview for complex text tasks as per guidelines.
        model: 'gemini-3-pro-preview',
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        commonName: { type: Type.STRING },
                        scientificName: { type: Type.STRING },
                        description: { type: Type.STRING, description: "Description in Markdown." },
                        rationale: { type: Type.STRING, description: "Rationale in Markdown." },
                    },
                    required: ["commonName", "scientificName", "description", "rationale"]
                }
            }
        }
    });
    return parseJsonResponse(response.text, 'suitable animals');
};

export const calculateEconomicBenefits = async (treeName: string, scientificName: string, coords: Coords, language: string): Promise<EconomicBenefitAnalysis> => {
    // REPURPOSED: Calculate Care Costs & Impact.
    const langInstruction = language === 'fa' ? "Output Language: Persian (Farsi). Ensure costs and text are localized/translated." : "Output Language: English.";

    const systemInstruction = `You are an animal shelter administrator. Calculate the costs and impact of rescuing a specific animal type. ${langInstruction}`;
    const userPrompt = `
        Provide an analysis for rescuing a "${treeName}" (${scientificName}) at latitude ${coords.lat}, longitude ${coords.lng}.
        
        Map to Schema:
        - annualRevenuePerTree: Estimated ANNUAL CARE COST (Food, Vet, etc.). e.g. "$500 - $800".
        - yearsToProfitability: Average TIME TO ADOPTION. e.g. "2-4 Months".
        - primaryProducts: List of CARE REQUIREMENTS (e.g., "Daily Walks", "Grooming").
        - otherBenefits: Summary of SOCIAL/COMMUNITY BENEFITS of rescuing this animal (e.g., "Therapy animal potential").

        ${langInstruction}
    `;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    annualRevenuePerTree: { type: Type.STRING },
                    yearsToProfitability: { type: Type.STRING },
                    primaryProducts: { type: Type.ARRAY, items: { type: Type.STRING } },
                    otherBenefits: { type: Type.STRING, description: "A summary in Markdown." },
                },
                required: ["annualRevenuePerTree", "yearsToProfitability", "primaryProducts", "otherBenefits"]
            }
        }
    });
    return parseJsonResponse(response.text, 'care cost analysis');
};


export const suggestProjectGoals = async (latitude: number, longitude: number, language: string): Promise<string[]> => {
    const langInstruction = language === 'fa' ? "Output Language: Persian (Farsi)." : "Output Language: English.";
    const systemInstruction = `You are a animal rescue strategist. Based on the provided geographic coordinates, generate 3 concise and actionable goals for an animal shelter or rescue project in that area (considering likely climate/environment). ${langInstruction}`;
    const userPrompt = `Project location: latitude ${latitude}, longitude ${longitude}.\n${langInstruction}`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    goals: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "An array of 3 distinct project goal strings."
                    }
                },
                required: ["goals"]
            }
        }
    });

    const parsed = parseJsonResponse<{ goals: string[] }>(response.text, 'project goals');
    return parsed.goals;
};


type ScriptScene = Omit<VideoScene, 'videoUrls' | 'imageUrl' | 'isGenerating' | 'isApproved' | 'error'>;

export const generateVideoScript = async (prompt: string, image: string | null, duration: number, videoType: string): Promise<ScriptScene[]> => {
    const systemInstruction = `You are a creative scriptwriter for an Animal Rescue organization. Your task is to generate a script for a short video about animal adoption, rescue stories, or shelter showcases. The script should be broken down into scenes. For each scene, provide inspiring narration and a detailed description of the visuals (focusing on cute/heroic animals). The total number of scenes should be appropriate for a ${duration}-second video.`;
    
    let userPrompt = `Video Topic: ${prompt}\nVideo Type: ${videoType}`;
    if (image) {
        userPrompt += "\nAn image has been provided as inspiration.";
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING, description: "A unique ID for the scene, e.g., 'scene_1'" },
                        narration: { type: Type.STRING, description: "The voiceover narration for this scene." },
                        description: { type: Type.STRING, description: "A detailed visual description for the AI video/image generator." },
                    },
                    required: ["id", "narration", "description"],
                }
            }
        }
    });
    
    return parseJsonResponse(response.text, 'video script');
};

export const askGoogleBabaAboutImage = async (image: {data: string, mimeType: string}, userFocus?: string): Promise<GroundedResult> => {
    const textPart = { text: `Analyze this image in the context of animal rescue and welfare. The user is particularly interested in: "${userFocus || 'General information, breed identification (if applicable), and potential adoption/rescue context.'}". Use Google Search to find relevant information.` };
    const imagePart = { inlineData: image };

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    const sources = groundingChunks.map(chunk => chunk.web).filter(s => s).map(s => ({ web: s })) as GroundedSource[];
    
    return {
        text: response.text,
        sources: sources,
    };
};

export const generateSceneVideo = async (description: string): Promise<string[]> => {
    // This is a placeholder as video generation is a long-running operation.
    // In a real app, this would initiate an operation and poll for results.
    console.log("Generating video for:", description);
    await new Promise(res => setTimeout(res, 3000)); // Simulate network delay
    // Returning a placeholder URL
    return [`/videos/placeholder.mp4`];
};

export const generateSceneImage = async (description: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: description }]
        },
        config: {
            imageConfig: {
                aspectRatio: "16:9"
            }
        }
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }
    
    throw new Error("No image was generated for the scene.");
};

export const generateBlogImage = async (title: string): Promise<string> => {
    // Robust prompt construction to handle non-English titles and avoid model errors.
    const prompt = `A photorealistic, hopeful, and cute image for a blog post.
    The title of the post is: '${title}'.
    If the title is not in English, visualize the concept of the title.
    The image must be suitable for an animal rescue organization.
    Focus on happy animals (cats, dogs, wildlife) in a safe environment.
    Avoid text overlays.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: prompt }]
        },
        config: {
            imageConfig: {
                aspectRatio: "16:9"
            }
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }
    
    throw new Error("No image was generated for the blog post.");
};

export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string> => {
    const imagePart = {
        inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
        },
    };
    const textPart = {
        text: prompt,
    };

    // FIX: Removed `config` with `responseModalities` as it is not supported for image editing models.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [imagePart, textPart],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }

    throw new Error("No image was generated.");
};


export const generateMusicDescription = async (prompt: string): Promise<string> => {
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Describe a suitable background music track for a video with the following theme: "${prompt}". Describe the mood (likely heartwarming, playful, or emotional), instruments, and tempo.`,
    });
    return response.text;
};

export const generateRescueCampaign = async (name: string, condition: string, needs: string, tone: 'Urgent' | 'Hopeful'): Promise<RescueCampaign> => {
    const systemInstruction = `You are a social media manager for 'Janpanah Shelter' (an Iranian animal rescue NGO). Your goal is to write compelling fundraising posts for injured animals, similar to campaigns on Cuddly. 
    
    Tone: ${tone}.
    Brand Voice: Compassionate, Transparent, Urgent but Dignified. "Treatment First" philosophy.
    
    Output Format: JSON with 'instagramCaption', 'telegramPost', 'hashtags', and 'wishlistItems'.
    Language: The 'telegramPost' and 'instagramCaption' should be in Persian (Farsi), but you can include English translations at the bottom if appropriate. The wishlist items should be in Persian.`;

    const userPrompt = `
    Animal Name: ${name}
    Condition: ${condition}
    Specific Needs: ${needs}
    
    Generate:
    1. An emotional Instagram Caption (storytelling style, emojis).
    2. An informative Telegram Post (clear facts, bullet points for needs).
    3. Relevant Hashtags (Persian & English).
    4. A structured list of 3-5 specific items for the wishlist based on the condition.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    instagramCaption: { type: Type.STRING },
                    telegramPost: { type: Type.STRING },
                    hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                    wishlistItems: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["instagramCaption", "telegramPost", "hashtags", "wishlistItems"]
            }
        }
    });

    return parseJsonResponse(response.text, 'rescue campaign');
};

export const filterAnimalsByDescription = async (animals: AnimalProfile[], description: string): Promise<string[]> => {
    const systemInstruction = `You are an intelligent assistant for an animal shelter website. Your task is to match the user's natural language description of their ideal pet with the available animals in our database.
    
    Analyze the user's request and the list of animals (name, species, age, temperament, description).
    Return a JSON object containing an array of strings, where each string is the NAME of an animal that is a good match.
    If no animals match well, return an empty array.
    `;

    const animalsContext = animals.map(a => `
        Name: ${a.name}
        Species: ${a.species}
        Age: ${a.age}
        Temperament: ${a.temperament}
        Description: ${a.desc}
    `).join('\n---\n');

    const userPrompt = `
    Available Animals:
    ${animalsContext}
    
    User Preference: "${description}"
    
    Return the names of the matching animals.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    matches: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ["matches"]
            }
        }
    });

    const result = parseJsonResponse<{ matches: string[] }>(response.text, 'animal filter');
    return result.matches;
};
