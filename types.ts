
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const translations: Record<string, any> = {
  en: {
    langCode: 'en-US',
    brandName: "Janpanah Shelter",
    nav: { 
      home: "Home", 
      about: "About Us",
      animals: "Our Animals",
      activities: "Activities & AI Tools",
      contentHub: "Content Hub",
      support: "Support Us",
      contact: "Contact",
      donate: "Donate Now",
      locations: "Locations",
      shop: "Shop"
    },
    hero: {
        title: "Janpanah Shelter:<br/> Where Healing Begins",
        subtitle: "We are therapists for animals first. We believe in the cycle of kindness and use technology to support our shelter's mission of treatment, support, and culture building.",
        button1: "Meet the Animals",
        button2: "Support Us",
        // Switched from videoUrl to imageUrl for the new "Splash" design
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
        overline: "Lifesaving, this season and beyond"
    },
    home: {
        introTitle: "\"In the first stage, we are therapists for animals. We treat injured animals that have no supporter. We believe kindness exists in everyone, religious or not.\"",
        servicesTitle: "Our Core Missions",
        readStory: "Read Story",
        readMore: "Read More",
        services: [
            { iconKey: 'science', title: 'Medical Treatment', text: 'Our primary goal is treating injured animals and providing necessary veterinary care.' },
            { iconKey: 'grant', title: 'Culture Building', text: 'Educating the public to correct misinformation and promote kindness towards animals.' },
            { iconKey: 'education', title: 'Sterilization', text: 'Advocating for vaccination and sterilization instead of elimination of strays.' },
            { iconKey: 'consulting', title: 'Shelter Support', text: 'Using AI to find grants and resources to improve our facilities for the animals.' }
        ],
        portfolioTitle: "Janpanah Updates",
        portfolioItems: [
            { img: "http://hakimemehr.ir/files/fa/news/1400/6/15/62472_110.jpg", title: "Treatment First", link: "#", description: "At Janpanah, our priority is treating animals who have suffered trauma. We provide medical care to those with no other support.", tags: ["Treatment", "Care", "Janpanah"], latitude: 35.6892, longitude: 51.3890},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/89b12852-9799-470a-8a58-45e69d727b12.jpeg", title: "Urban Sterilization", link: "#", description: "A comprehensive program to control the population of urban strays through ethical sterilization and vaccination.", tags: ["TNR", "Cats", "Urban Health"], latitude: 35.7219, longitude: 51.3347},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/12a8385d-4f74-4b47-9759-450a80e6c271.jpeg", title: "Public Education", link: "#", description: "Working to change the culture and showing that kindness to animals is a universal value.", tags: ["Culture", "Education", "Kindness"], latitude: 35.6961, longitude: 51.4231},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/c7891b92-56c6-4d5b-9d7a-115f573c0545.jpeg", title: "Emergency Rescue", link: "#", description: "Responding to reports of injured animals and providing immediate sanctuary.", tags: ["Rescue", "Emergency", "Shelter"], latitude: 35.7550, longitude: 51.4050},
        ],
        achievementsTitle: "Our Impact",
        achievements: [
            { iconKey: 'publications', count: 1200, suffix: '+', label: 'Animals Treated' },
            { iconKey: 'funded', count: 500, suffix: '+', label: 'Successful Adoptions' },
            { iconKey: 'collaborations', count: 10, suffix: '+', label: 'Years of Service' },
            { iconKey: 'team', count: 100, suffix: '%', label: 'Commitment to Life' },
            { iconKey: 'trained', count: 5000, suffix: '+', label: 'Vaccinations' }
        ],
        map: {
            title: "Rescue Network",
            subtitle: "See where we operate and find animals in need near you.",
            button: "View Map"
        },
        customersTitle: "Supported By",
        customerLogos: [
            { img: 'https://storage.googleapis.com/verdant-assets/logo-wwf.svg', alt: 'Partner 1' },
            { img: 'https://storage.googleapis.com/verdant-assets/logo-gef.svg', alt: 'Partner 2' },
            { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/ASPCA_logo.svg/1200px-ASPCA_logo.svg.png', alt: 'ASPCA' },
            { img: 'https://storage.googleapis.com/verdant-assets/logo-conservation-intl.svg', alt: 'Partner 3' },
        ],
        calendarTitle: "News & Stories",
        latestPosts: [
            { img: "http://hakimemehr.ir/files/fa/news/1400/6/15/62472_110.jpg", title: "Janpanah Head: We are Therapists First", date: "Sept 07, 2021", comments: 8, link: "https://hakimemehr.ir/fa/news/65134" },
            { img: "https://storage.googleapis.com/verdant-assets/blog-2.jpg", title: "The Cycle of Kindness in Society", date: "Aug 15, 2023", comments: 22, link: "#" },
            { title: "Managing Shelter Supplies with Predictive Analytics", date: "June 12, 2024", comments: 9, link: "#" },
            { img: "https://storage.googleapis.com/verdant-assets/blog-4.jpg", title: "Why Vaccination is Better than Elimination", date: "May 25, 2024", comments: 18, link: "#" },
        ]
    },
    footer: {
      description: "Janpanah Shelter: Treating animals, building culture, and spreading kindness.",
      contactTitle: "Contact Us",
      email: "info@janpanah.org",
      phone: "+98 21 1234 5678",
      address: "Tehran, Iran",
      socialMediaTitle: "Follow Us",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      quickLinksTitle: "Quick Links",
      quickLinks: [
        { text: "About Janpanah", link: "#" },
        { text: "Our Mission", link: "#services" },
        { text: "Adopt", link: "#" },
        { text: "Donate", link: "#" },
        { text: "Privacy Policy", link: "#" },
      ],
      addressTitle: "Location",
      copyright: "© 2024 Janpanah Shelter. All Rights Reserved.",
    },
    projectsPage: {
        title: "Our Rescue Portfolio",
        subtitle: "Key operations demonstrating our commitment to animal welfare."
    },
    teamPage: {
        title: "Our Team",
        subtitle: "Dedicated individuals working for the welfare of animals.",
        members: [
            { img: 'http://hakimemehr.ir/files/fa/news/1400/6/15/62472_110.jpg', name: 'Monireh Safari', title: 'Head of Janpanah Shelter', bio: 'Founder and leader focusing on treatment of injured animals and cultural education regarding animal rights.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-1.jpg', name: 'Dr. Aris Thorne', title: 'Lead Veterinarian', bio: 'Specialist in trauma surgery for rescued strays.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-2.jpg', name: 'Lena Petrova', title: 'Shelter Manager', bio: 'Manages daily operations and adoption coordination.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-3.jpg', name: 'David Chen', title: 'Community Outreach', bio: 'Works on educational programs and cultural building.', linkedin: '#' },
        ]
    },
    activitiesPage: {
        items: [
            { title: "Medical Treatment & Emergency", desc: "Our core mission. We provide surgeries, rehabilitation, and 24/7 care for injured strays.", iconKey: "medical", cta: "" },
            { title: "Urban Spay/Neuter (TNR)", desc: "Managing the population humanely through Trap-Neuter-Return programs in Tehran.", iconKey: "cat", cta: "" },
            { title: "AI Grant Finder", desc: "Using artificial intelligence to scan global databases for funding opportunities.", iconKey: "grant", cta: "Find Grants" },
            { title: "Shelter Operations Planner", desc: "Generates comprehensive plans for shelter management, medical protocols, and expansion.", iconKey: "planner", cta: "Plan Operations" },
            { title: "Education & Awareness", desc: "Creating video content to promote a culture of kindness and educate the public.", iconKey: "video", cta: "Create Video" },
            { title: "Rescue Site Analysis", desc: "Analyzing geographic data to find optimal locations for new rescue stations.", iconKey: "map", cta: "Analyze Sites" },
            { title: "Research & Development", desc: "Exploring new technologies like biometrics and telemedicine for animal welfare.", iconKey: "research", cta: "View R&D" },
            { title: "AI System Architecture", desc: "Transparency in how we use AI to optimize our rescue operations.", iconKey: "ai", cta: "View System" }
        ]
    },
    animalsPage: {
        filterTitle: "Find Your Perfect Companion",
        filterSpecies: "Species",
        filterSpeciesAll: "All Species",
        filterSpeciesDog: "Dog",
        filterSpeciesCat: "Cat",
        filterAge: "Age",
        filterAgeAll: "All Ages",
        filterAgeYoung: "Young",
        filterAgeAdult: "Adult",
        filterAgeSenior: "Senior",
        filterTemperament: "Temperament",
        filterTemperamentAll: "All Temperaments",
        filterTemperamentPlayful: "Playful",
        filterTemperamentCalm: "Calm",
        filterTemperamentShy: "Shy",
        aiSearchLabel: "Or Describe Your Ideal Pet",
        aiSearchPlaceholder: "e.g., A calm dog that is good for apartments and elderly owners...",
        aiSearchButton: "Find with AI",
        aiSearching: "Finding Matches...",
        aiSearchReset: "Clear AI Filter"
    },
    adoptionForm: {
      title: "Adoption Application",
      subtitle: "Ready to give a forever home? Fill out the form below to start the process.",
      fullName: "Full Name",
      fullNamePlaceholder: "e.g., Jane Doe",
      email: "Email Address",
      emailPlaceholder: "e.g., jane.doe@example.com",
      phone: "Phone Number",
      phonePlaceholder: "e.g., +1 555-123-4567",
      address: "Full Address",
      addressPlaceholder: "Street, City, Province/State, Postal Code",
      homeType: "Type of Home",
      homeTypeApartment: "Apartment",
      homeTypeHouse: "House with Yard",
      homeTypeFarm: "Farm / Rural Property",
      otherPets: "Do you have other pets?",
      otherPetsPlaceholder: "e.g., One 5-year-old cat, friendly",
      reason: "Why do you want to adopt?",
      reasonPlaceholder: "Tell us about your motivations and what you're looking for in a companion.",
      submitButton: "Submit Application",
      validationError: "Please fill out all required fields.",
      successTitle: "Application Submitted!",
      successMessage: "Thank you for your interest. Our team will review your application and contact you within 3-5 business days."
    },
    reportTypes: {
        shelter_plan: "Shelter Operations Plan",
        medical_report: "Veterinary Impact Report",
        funding_proposal: "Funding Proposal",
        adoption_strategy: "Adoption Strategy",
        community_outreach: "Community Outreach Plan"
    },
    generatorForm: {
        title: "Shelter & Rescue Planner",
        docType: "Document Type",
        topic: "Project / Rescue Title",
        topicPlaceholder: "e.g., New Cat Wing for Downtown Shelter",
        description: "Key Information & Needs",
        descriptionPlaceholder: "Provide details on capacity, target species, medical needs, community location, budget overview, etc.",
        buttonText: "Generate Document",
        validationError: "Please fill in both topic and description.",
    },
    reportDisplay: {
        title: "Generated Document",
        export: "Export",
        copy: "Copy Text",
        downloadMD: "Download (.md)",
        downloadDOCX: "Download (.docx)",
        downloadHTML: "Download (.html)",
        printPDF: "Print / Save as PDF",
        docTitle: "Generated Report",
        generating: "Generating...",
        placeholder1: "Your document will appear here.",
        placeholder2: "Fill out the form and click 'Generate' to begin."
    },
    grantFinder: {
        title: "Janpanah Grant Finder",
        searchPlaceholder: "Enter keywords (e.g., 'shelter construction', 'spay neuter funding')",
        searchButton: "Find Grants",
        searching: "Searching...",
        from: "From",
        analyzeButton: "Analyze",
        error: "An error occurred while searching for grants.",
        noResults: "No grants found for these keywords. Try a search.",
        useGrounding: "Use Live Web Search (more up-to-date)",
        sources: "Sources",
        subtitle: "Search for funding opportunities or analyze your own documents.",
        uploadLabel: "Upload Grant Document",
        selectFile: "Select File",
        removeFile: "Remove File",
        fileTypes: "Supported: .docx, .txt, .md",
        or: "OR",
        keywordsLabel: "Keywords / Supplemental Instructions",
        keywordsPlaceholder: "e.g., 'focus on feline leukemia research' or 'small rural shelters'",
        maxResults: "Max Results",
        readingFile: "Reading File...",
        finding: "Searching...",
        findButton: "Find & Analyze Grants",
        savedTitle: "Saved Grants",
        clearAll: "Clear All",
        deadlineLabel: "Deadline",
        summaryLabel: "Summary",
        notesLabel: "Your Notes",
        notesPlaceholder: "Add your thoughts here...",
        remove: "Remove",
        saved: "Saved",
        save: "Save",
        useForProposal: "Use for Proposal",
        analyze: "Deep Analysis",
        crateTitle: "Grant Crate",
        crateSubtitle: "Grants found in this session",
        clearCrate: "Clear Crate",
        loadingTitle: "Scanning for Opportunities...",
        loadingSubtitle: "AI is reading documents and searching the web.",
        sortBy: "Sort By",
        sort: {
            relevance: "Relevance",
            deadline: "Deadline",
            amount: "Amount",
            geography: "Geography"
        },
        documents: "Requirement Docs",
        parseErrorTitle: "Raw Search Results",
        parseErrorSubtitle: "We found some information, but couldn't structure it perfectly. Here is the raw text:",
        crateEmpty: "No grants found yet. Try a search!",
        fileTypeError: "Invalid file type. Please upload .docx, .txt, or .md.",
        validationError: "Please upload a file or enter keywords.",
        fileReadError: "Failed to read the file.",
        prompt: {
            common: "You are an expert grant researcher for an Animal Shelter.",
            supplementalKeywords: "Supplemental user instructions: {keywords}",
            noSupplementalKeywords: "No supplemental instructions.",
            fileBased: "{common} I have uploaded a document. Analyze it and finding matching grants. Document text: {documentText}. {keywordInstruction}. Return {maxResults} results in a Markdown table.",
            keywordBased: "{common} Find grants for these queries: {queries}. Return {maxResults} results in a Markdown table."
        }
    },
    grantAnalyzer: {
        title: "AI Grant Analysis",
        close: "Close Analysis",
        loadingTitle: "Analyzing Grant...",
        loadingSubtitle: "Our AI is reviewing the grant's relevance to our shelter mission.",
        viewOriginal: "View Original Grant Posting",
        relevance: "Relevance",
        deadline: "Deadline",
        amount: "Funding Amount",
        duration: "Project Duration",
        geography: "Geographic Focus",
        eligibility: "Eligibility",
        scope: "Scope & Objectives",
        howToApply: "Application Process",
        contact: "Contact Information",
        useForProposal: "Use this analysis to start a proposal",
        exportDOCX: "Export Analysis (.docx)",
        printPDF: "Print Analysis",
        export: {
            summaryTitle: "Grant Analysis Summary",
            officialLink: "Official Link",
            relevance: "Relevance Score",
            details: "Grant Details",
            fundingBody: "Funding Body",
            deadline: "Deadline",
            amount: "Amount",
            duration: "Duration",
            geography: "Geography",
            eligibility: "Eligibility",
            scope: "Scope",
            applicationProcess: "Application Process",
            contact: "Contact",
            fileName: "Grant_Analysis"
        }
    },
    siteSelector: {
        title: "Rescue & Habitat Planner",
        subtitle: "Get data-driven recommendations for shelter locations and suitable habitats for different species.",
        findLocationsMode: "Find Rescue Locations",
        findTreesMode: "Find Suitable Animals",
        locations: {
            label: "Describe your rescue goals",
            placeholder: "e.g., A high-traffic urban area needing a stray cat sterilization clinic and feeding station.",
            button: "Find Locations",
            examplePrompts: {
                title: "Or, try an example:",
                prompts: [
                    "Establish a wildlife rehabilitation center near a forest edge for injured birds.",
                    "Identify a location for a large dog sanctuary with ample running space in a rural area.",
                    "Find a spot for a temporary emergency shelter for pets displaced by floods."
                ]
            }
        },
        trees: {
            label: "Describe the shelter environment",
            placeholder: "e.g., Small urban apartment-style shelter with limited outdoor access. Best for small pets.",
            button: "Recommend Animals"
        },
        resultsTitle: "AI Recommendations",
        generating: "Analyzing...",
        placeholder: "Your recommendations will appear here.",
        validationError: "Please describe your requirements to get a recommendation.",
        validationErrorCoords: "Please provide valid coordinates.",
        selectOnMap: "To begin, click on the map to select an area for analysis.",
        selectedCoords: "Selected Location",
        latitude: "Latitude",
        longitude: "Longitude",
        manualCoordsTitle: "Or enter coordinates manually",
        analyzeCoordsButton: "Analyze Environment",
        locationResult: {
            rationale: "Rationale",
            species: "Suggested Species/Services"
        },
        treeResult: {
            description: "Breed/Species Description",
            rationale: "Suitability Rationale",
            findGrantsButton: "Find Grants for This Animal",
            analyzeBenefitsButton: "Analyze Care Costs",
            analyzingBenefits: "Analyzing...",
            economicAnalysisTitle: "Shelter Impact Analysis",
            annualRevenue: "Est. Annual Cost (Per Animal)",
            yearsToProfit: "Avg. Time to Adoption",
            primaryProducts: "Care Requirements",
            otherBenefits: "Social/Community Benefits"
        },
        suggestedGoals: {
            title: "Suggested Rescue Goals",
            loading: "Generating ideas...",
            useGoal: "Use this goal & find sites"
        },
        findMyLocation: "Find My Location",
        findingLocation: "Finding your location...",
        locationError: "Could not get your location. Please ensure location services are enabled in your browser and try again.",
        drawPrompt: "Find rescue sites within the area defined by the coordinates [{swLat}, {swLng}] to [{neLat}, {neLng}].",
        drawPolygonPrompt: "Find rescue sites within the polygon defined by these vertices: {vertices}.",
        drawArea: "Draw an area to search",
        confirmPopup: {
            title: "Confirm Location",
            coordinates: "Coordinates: {lat}, {lng}",
            button: "Check Suitability Here"
        },
        latLabelShort: "Lat",
        lngLabelShort: "Lng",
        mapLoading: "Loading map...",
        mapTooltip: {
            priority: "Priority",
            clickAnalyze: "Click to analyze"
        },
        nearbyAnalysis: {
            title: "Nearby Analysis",
            prompt: "What's nearby?",
            placeholder: "e.g., vet clinics, pet stores, parks",
            button: "Search with Maps",
            validation: "Please enter a search query and select a location on the map.",
            resultsTitle: "Nearby Analysis for \"{query}\"",
            mapLink: "Map Link",
            reviewLink: "Review",
        }
    },
    mapLegend: {
        title: "Map Legend",
        plantingSite: "Recommended Shelter Site",
        selectedPoint: "Selected Analysis Point",
        criticalSite: "Critical Need Area",
        highPrioritySite: "High Priority Area",
        mediumPrioritySite: "Medium Priority Area",
    },
    siteAnalysisModal: {
        title: "Detailed Site Analysis",
        analyzing: "Analyzing Site...",
        close: "Close",
        estimatedCost: "Estimated Setup Cost",
        treeCount: "Animal Capacity",
        duration: "Setup Duration",
        carbonSeq: "Est. Yearly Adoptions",
        tonnesPerYear: "animals/year",
        keyChallenges: "Key Challenges",
        successFactors: "Success Factors",
        error: "Could not generate analysis for this site.",
    },
    videoGenerator: {
        title: "Adoption Video Generator",
        subtitle: "Create compelling videos to showcase adoptable pets, share rescue stories, or raise awareness.",
        quotaExhaustedBanner: "Video generation quota may be limited. Some features might be unavailable.",
        errorTitle: "Error",
        step1Title: "1. Define Your Video Concept",
        videoType: "Video Purpose",
        typeGeneral: "General / Social Media",
        typeBooth: "Showcase / Medical Report",
        promptLabel: "What is the video about?",
        promptPlaceholder: "e.g., A heartwarming story of a Golden Retriever finding a forever home.",
        boothPromptPlaceholder: "e.g., A technical overview of our new veterinary wing and surgical capabilities.",
        negativePromptLabel: "Exclude these elements (Optional)",
        negativePromptPlaceholder: "e.g., sadness, cages, scary music",
        imageLabel: "Inspirational Image (Optional)",
        uploadButton: "Upload an image",
        imagePrompt: "Guides the AI on visual style and mood.",
        removeImage: "Remove Image",
        addWatermark: "Add Janpanah Watermark",
        numberOfVersions: "Number of Video Versions",
        versions: "Version(s)",
        aspectRatio: "Aspect Ratio",
        ratios: {
            widescreen: "Widescreen",
            vertical: "Vertical",
            square: "Square",
            portrait: "Portrait"
        },
        durationLabel: "Approximate Video Duration",
        generateScriptButton: "Generate Script & Scenes",
        generatingScriptTitle: "Generating Script...",
        validationError: "Please provide a prompt or an image to start.",
        step2Title: "2. Review & Generate Scenes",
        progressSavedAutomatically: "Progress is saved automatically.",
        startOver: "Start Over",
        scene: "Scene",
        narration: "Narration",
        readNarration: "Read narration aloud",
        visuals: "Visuals Prompt",
        confirmPrompt: "Confirm Prompt",
        editPrompt: "Edit Prompt",
        approveScene: "Approve",
        approved: "Approved",
        generateSceneVideo: "Generate Video",
        regenerateScene: "Regenerate Video",
        generateSceneImage: "Generate Image",
        regenerateSceneImage: "Regenerate Image",
        downloadVideo: "Download",
        promptRequiredError: "Visuals prompt cannot be empty.",
        quotaErrorImageFallback: "Video generation failed (Quota Exceeded). Try generating an alternative or a still image.",
        generateAlternativeVideo: "Generate Alternative Video",
        generateAnimatedScene: "Generate Animated Scene",
        askGoogleBaba: "Ask AI",
        askGoogleBabaFocus: "Focus your question (optional)",
        step3Title: "3. Add Music",
        musicPromptLabel: "Describe the music you want",
        generateMusicButton: "Generate Music Idea",
        generatingMusic: "Generating...",
        musicDescriptionTitle: "AI Music Suggestion",
        musicLibraryTitle: "Or Select from Library",
        select: "Select",
        selected: "Selected",
        step4Title: "4. Finalize",
        combineAndExport: "Combine & Export Video",
        approveAllToCombine: "Approve all {approvedCount}/{totalCount} scenes to enable export.",
        musicRequired: "Please select a music track to enable export.",
    },
    imageEditor: {
        title: "Pet Photo Editor",
        subtitle: "Enhance pet photos for adoption profiles. Add accessories, change backgrounds, or improve lighting.",
        uploadLabel: "Original Photo",
        uploadButton: "Upload Photo",
        uploadPrompt: "Drag and drop or click to upload.",
        editPromptLabel: "Describe your edit",
        editPromptPlaceholder: "e.g., Remove the leash, make the background a sunny park, put a bow tie on the cat...",
        generateButton: "Generate Edit",
        generatingButton: "Generating...",
        clearButton: "Start Over",
        resultTitle: "Edited Image",
        downloadButton: "Download Image",
        placeholder: "Your edited image will appear here.",
        validationError: "Please upload an image and provide an edit description."
    },
    rescueStoryteller: {
      title: "Rescue Story & Fundraiser",
      subtitle: "Generate emotional social media campaigns for injured animals, inspired by Cuddly. Perfect for Instagram and Telegram.",
      form: {
        nameLabel: "Animal Name",
        namePlaceholder: "e.g., Hampo",
        conditionLabel: "Medical Condition / Injury",
        conditionPlaceholder: "e.g., Broken leg from car accident, severe mange",
        needsLabel: "Specific Needs (Wishlist)",
        needsPlaceholder: "e.g., Orthopedic surgery, antibiotics, special food",
        toneLabel: "Campaign Tone",
        toneUrgent: "Urgent & Critical",
        toneHopeful: "Hopeful & Recovery",
        button: "Generate Campaign"
      },
      results: {
        instagram: "Instagram Caption",
        telegram: "Telegram Post",
        hashtags: "Hashtags",
        wishlist: "Suggested Wishlist Items"
      },
      validationError: "Please fill in all fields to generate a compelling story."
    },
    quotaErrorModal: {
        title: "API Quota Exceeded",
        body: "You have exceeded your current API quota. Please check your billing account or try again later. Some features may be unavailable.",
        cta: "Check Billing",
        close: "Close"
    },
    googleBabaModal: {
        title: "AI Insights",
        close: "Close",
        loading: "Searching the web for insights...",
        userFocus: "Your focus:",
        resultsTitle: "Analysis:",
        sourcesTitle: "Sources:",
    },
    chatbot: {
        title: "Janpanah Assistant",
        placeholder: "Ask about adoption, rescue, or our treatment center...",
        initialGreeting: "Hello! I am the Janpanah Assistant. Ask me about Ms. Monireh Safari, our treatment-first policy, or how to help.",
        send: "Send",
        initialPrompts: [
            "Who is Monireh Safari?",
            "How do I adopt?",
            "Do you need volunteers?",
            "What is 'Treatment First'?",
            "Where is Janpanah?"
        ]
    },
    researchPage: {
        title: "Research & Development",
        subtitle: "Exploring the landscape of technology in animal welfare to enhance our rescue operations.",
        startups: [
            {
                name: "Petia (Benchmark)",
                logo: "https://placehold.co/200x100/f58220/ffffff?text=Petia", 
                description: "An Iranian startup founded by Ali Delshad Tehrani. We look to Petia's 'Health Card' concept as a model for digitizing stray animal medical records. Their history highlights the need for stronger municipal cooperation for shelter infrastructure, a challenge we aim to solve with AI data.",
                link: "https://petia.ir/"
            },
            {
                name: "Cuddly",
                logo: "https://placehold.co/200x100/3d3d3e/ffffff?text=Cuddly",
                description: "A crowdfunding platform dedicated to helping animal organizations raise funds for medical cases and wishlists. Essential for our 'Treatment First' mission.",
                link: "https://cuddly.com/"
            },
            {
                name: "Snout",
                logo: "https://placehold.co/200x100/4c758a/ffffff?text=Snout",
                description: "Uses nose print biometrics to identify lost dogs, similar to fingerprints for humans. A vital tool for identifying strays where microchips are scarce.",
                link: "https://www.snoutid.com/"
            },
            {
                name: "Petfinder",
                logo: "https://placehold.co/200x100/663399/ffffff?text=Petfinder",
                description: "A leading online, searchable database of animals who need homes. It is also a directory of nearly 11,000 animal shelters and adoption organizations.",
                link: "https://www.petfinder.com/"
            },
            {
                name: "Petstablished",
                logo: "https://placehold.co/200x100/228b22/ffffff?text=Petstablished",
                description: "Provides comprehensive shelter management software, including tools for adoption, fostering, fundraising, and record-keeping.",
                link: "https://petstablished.com/"
            },
            {
                name: "Doobert",
                logo: "https://placehold.co/200x100/ff4500/ffffff?text=Doobert",
                description: "Connects animal rescues with volunteers for transport, fostering, and photography. Creating a supply chain for saving lives.",
                link: "https://www.doobert.com/"
            },
            {
                name: "VetCT",
                logo: "https://placehold.co/200x100/008080/ffffff?text=VetCT",
                description: "A global teleconsulting and teleradiology company that provides specialist support to veterinary teams.",
                link: "https://vet-ct.com/"
            }
        ]
    },
    aiSystemPage: {
        title: "AI System Design",
        subtitle: "A technical blueprint of the advanced AI modules powering the Janpanah Shelter's communication and management system.",
        sections: {
            goal: "Goal & Application",
            inputs: "Input Variables",
            outputs: "Output Structure",
            prompt: "Sample Prompt"
        },
        modules: [
            { id: 6, name: "Smart Pet Matching", goal: "Analyze applicant profiles and suggest suitable pets with a personalized email.", inputs: "ADOPTER_PROFILE:\n- Name: {{adopter_name}}\n- Housing Type: {{Apartment/House/Farm}}\n- Size: {{square_meters}}\n- Yard: {{Yes/No}}\n- Hours at home: {{hours_home}}\n- Other pets: {{List}}\n- Children: {{Age and number}}\n- Activity level: {{Low/Medium/High}}\n- Previous experience: {{Yes/No}}\n- Preferences: {{Species, size, age}}", outputs: "1. Match score for each pet (0-100)\n2. Reasons for matching\n3. Personalized email with top 3 suggestions\n4. Important notes for each suggestion", prompt_example: "Based on the applicant's profile and list of available pets:\n1. Perform compatibility analysis\n2. Select the top 3 pets\n3. Write a personal email explaining the reason for each suggestion\n4. Add specific care tips for each pet" },
            { id: 7, name: "Donor Behavior Prediction", goal: "Analyze history to predict the best time and type of donation request.", inputs: "DONOR_HISTORY:\n- ID: {{donor_id}}\n- Donation history: {{dates, amounts}}\n- Average donation: {{average}}\n- Last donation: {{last_donation_date}}\n- Preferred channel: {{email/sms/social}}\n- Interests: {{dogs/cats/all/medical/general}}\n- Email open rate: {{open_rate}}\n- Best engagement time: {{day, time}}", outputs: "1. Prediction of next donation time\n2. Suggested donation amount\n3. Suitable campaign type\n4. Optimized email", prompt_example: "OPTIMAL_SEND_TIME: [Suggested date and time]\nSUGGESTED_ASK: $[Amount]\nCAMPAIGN_TYPE: [Campaign Type]\nPERSONALIZATION_LEVEL: [High/Medium/Basic]\n---\nSUBJECT: [Personalized subject]\n---\n[Email body referring to specific interests]\n---" },
            { id: 8, name: "Medical Update & Follow-up", goal: "Send health status updates for animals under treatment.", inputs: "MEDICAL_CASE:\n- Pet name: {{pet_name}}\n- Initial condition: {{initial_condition}}\n- Admission date: {{admission_date}}\n- Treatments performed: {{treatments}}\n- Current status: {{current_status}}\n- Prognosis: {{prognosis}}\n- Treatment cost: {{total_cost}}\n- Amount raised: {{raised_amount}}\n- Progress photos: {{photo_urls}}", outputs: "1. Progress report email\n2. Social media post\n3. Website update page", prompt_example: "SUBJECT: 🏥 Good news about {{pet_name}}!\n---\nHi {{supporter_name}},\n\n[Status report with a hopeful tone]\n\n📊 Progress Summary:\n- Day {{day_number}} of treatment\n- [Current status]\n\n💝 How your donation helped:\n[Explain the impact of the donation]\n\n📸 [Progress photos]\n\n[CTA to continue support or share]" },
            { id: 9, name: "Smart Event & Reminder System", goal: "Manage events and send intelligent reminders.", inputs: "EVENT_DETAILS:\n- Event name: {{event_name}}\n- Type: {{adoption_day/fundraiser/vaccination/training/volunteer}}\n- Date: {{date}}\n- Time: {{time}}\n- Location: {{location}}\n- Capacity: {{capacity}}\n- Registered: {{registered_count}}\n- Fee: {{fee}}\n- Requirements: {{requirements}}", outputs: "For each stage:\nSTAGE: [Stage]\nSEND_DATE: [Send Date]\n---\nSUBJECT: [Subject appropriate for the stage]\n---\n[Email content]\n---\nCALENDAR_INVITE: [ics file]\n---", prompt_example: "Reminder Schedule:\n- 7 days before: Initial invitation\n- 3 days before: Reminder\n- 1 day before: Final details\n- Event day: Morning reminder\n- 1 day after: Thank you and follow-up" },
            { id: 10, name: "Auto-Response Chatbot", goal: "Automatically answer frequently asked questions via email.", inputs: "INCOMING_EMAIL:\n- Sender: {{sender_email}}\n- Subject: {{subject}}\n- Body: {{body}}\n- Timestamp: {{timestamp}}", outputs: "DETECTED_INTENT: [Inquiry type]\nCONFIDENCE: [Confidence percentage]\nAUTO_REPLY: [Yes/No/Needs human review]\n---\nSUBJECT: Re: {{original_subject}}\n---\n[Automated response]\n---\nHUMAN_FOLLOW_UP_NEEDED: [Yes/No]\nSUGGESTED_ACTIONS: [Suggested actions]", prompt_example: "Inquiry Types:\n1. adoption_process\n2. pet_availability\n3. volunteer_info\n4. donation_info\n5. lost_found\n..." },
            { id: 11, name: "Sentiment Analysis & Feedback", goal: "Analyze feedback and send appropriate responses.", inputs: "FEEDBACK_INPUT:\n- Source: {{email/survey/social/review}}\n- Content: {{content}}\n- Rating (if available): {{rating}}\n- Related topic: {{adoption/donation/visit/volunteer}}\n- User: {{user_id}}", outputs: "SENTIMENT: [positive/negative/neutral]\nINTENSITY: [1-10]\nKEY_TOPICS: [List of topics]\nURGENCY: [low/medium/high/critical]\n---\nRECOMMENDED_RESPONSE_TYPE: [thank_you/apology/follow_up/escalate]\n---\n[Appropriate response email]\n---\nINTERNAL_ALERT: [If management attention is needed]\n---", prompt_example: "AI Processing:\n1. Detect sentiment\n2. Sentiment intensity\n3. Key topics\n4. Need for immediate follow-up" },
            { id: 12, name: "Analytics & Reporting", goal: "Generate automated reports for stakeholders.", inputs: "REPORT_REQUEST:\n- Report type: {{report_type}}\n- Period: {{start_date}} to {{end_date}}\n- Audience: {{audience}}\n- Format: {{email/pdf/dashboard}}", outputs: "REPORT_TITLE: {{type}} Report - {{period}}\n---\n📊 Executive Summary:\n[3-4 key points]\n\n📈 Key Metrics:\n[Statistics table with comparison to previous period]\n\n🏆 Successes:\n[List of achievements]\n\n⚠️ Challenges:\n[Problems and proposed solutions]\n\n🎯 Next Period's Goals:\n[List of goals]\n\n💝 Highlight Story:\n[A success story]\n---", prompt_example: "Report Types:\n1. weekly_summary\n2. monthly_impact\n3. donor_report\n4. board_report\n..." },
            { id: 13, name: "Foster Program Management", goal: "Manage communication with foster families.", inputs: "FOSTER_FAMILY:\n- Name: {{foster_name}}\n- Experience: {{experience_level}}\n- Capacity: {{capacity}}\n- Preferences: {{preferences}}\n- History: {{history}}", outputs: "Email Types:\n1. New foster request\n2. Delivery coordination\n3. Weekly check-in\n4. Medical report\n5. Extension request\n6. Final adoption congratulations\n7. End-of-term thank you", prompt_example: "SUBJECT: 🏠 {{pet_name}} needs your help!\n---\nHi {{foster_name}},\n\nWe have a special foster opportunity we think would be perfect for you!\n\n🐾 Introducing {{pet_name}}:\n[Description of personality and needs]\n\n⏰ Duration: Approx. {{duration}}\n📦 Supplies provided: [List]\n💰 Costs: All medical and food costs are covered.\n\n[CTA: I accept / I have questions]" },
            { id: 14, name: "Social Media Integration", goal: "Generate tailored content for each platform from a single input.", inputs: "CONTENT_BASE:\n- Type: {{adoption/event/donation/story/alert}}\n- Main info: {{main_content}}\n- Images: {{images}}\n- Link: {{link}}\n- Brand hashtags: {{brand_hashtags}}", outputs: "Instagram:\n📸 Caption (max 2200 chars)\n#Hashtags (max 30)\n\nTwitter/X:\n🐦 Tweet (max 280 chars)\n\nTelegram:\n📱 Channel post\n\nWhatsApp:\n💬 Shareable text", prompt_example: "Generate multi-platform content from a base input, adapting tone and format for each social network." },
            { id: 15, name: "AI Image Generation Prompts", goal: "Generate effective prompts for AI image creation tools.", inputs: "IMAGE_REQUEST:\n- Type: {{poster/banner/social/email_header}}\n- Subject: {{adoption/event/donation/awareness}}\n- Animal: {{species, breed, color}}\n- Style: {{realistic/cartoon/watercolor/minimalist}}\n- Dimensions: {{dimensions}}\n- Overlay text: {{overlay_text}}", outputs: "For DALL-E / Midjourney:\nPROMPT: [Optimized English prompt]\nNEGATIVE_PROMPT: [Exclusions]\nSTYLE_REFERENCE: [Style reference]\n\nFor Canva AI:\nSEARCH_TERMS: [Search keywords]\nTEMPLATE_SUGGESTION: [Template suggestion]\nCOLOR_PALETTE: [Color palette]", prompt_example: "DALL-E PROMPT:\n'Heartwarming adoption event poster, happy family with rescued golden retriever puppy, warm sunset lighting, soft pastel colors, watercolor style, text space at top and bottom, 4k quality, emotional and inviting atmosphere'" }
        ]
    },
    seoPage: {
        title: "SEO Hub",
        subtitle: "A strategic guide to optimizing Janpanah Shelter's online presence to attract more supporters, adopters, and volunteers.",
        technical: {
            title: "Technical SEO Foundation",
            description: "Ensuring search engines like Google can easily find, crawl, and understand our site's content. Since this is a modern web application, we focus on making it accessible to crawlers.",
            items: [
                { title: "Dynamic Meta Tags", text: "Each page should have a unique, descriptive title and meta description. This is crucial for appearing correctly in search results." },
                { title: "Structured Data (Schema)", text: "This is a 'vocabulary' for search engines. By adding it, we can tell Google we are an 'Organization', that our news stories are 'Articles', helping them show richer results." },
                { title: "Sitemap & robots.txt", text: "A sitemap is a map of all our pages for Google to follow. The robots.txt file gives crawlers rules on what they can and cannot index." },
                { title: "Page Speed & Core Web Vitals", text: "A fast-loading, stable website is essential for both users and SEO. Our build system (Vite) already handles many optimizations like code minification." }
            ]
        },
        content: {
            title: "Content & Keyword Strategy",
            description: "Creating valuable content that answers the questions of our target audience—potential adopters, donors, and volunteers.",
            items: [
                { title: "Keyword Research", text: "We must identify the terms people use to find us. Examples for Janpanah include 'animal shelter in Tehran', 'adopt a dog in Iran', or 'how to help injured animals'." },
                { title: "On-Page SEO", text: "These keywords should be naturally integrated into our page titles, headings, and text content to signal their relevance to search engines." },
                { title: "High-Quality Content", text: "Our 'Rescue Storyteller' is a perfect SEO tool. Each story is a unique piece of content that can rank for specific terms and attract emotional engagement and links." },
                { title: "Internal Linking", text: "Connecting pages within our site (e.g., linking from a rescue story to the adoption page) helps users and search engines navigate and understand the site structure." }
            ]
        },
        analytics: {
            title: "Analytics & Monitoring Dashboard",
            description: "To measure our success, we need to track performance. Since this is not a traditional WordPress site, we integrate with powerful, industry-standard external services.",
            items: [
                { title: "Google Search Console", text: "This is a free service from Google that helps us monitor our site's presence in search results. We must register our domain here to see which queries bring users to our site and to identify any crawl errors." },
                { title: "Google Analytics 4 (GA4)", text: "This tool tracks user behavior on our site—which pages are popular, where users come from, and how they interact with our content. We need to create a property and add its tracking script to our application." },
                { title: "Third-Party SEO Dashboards", text: "For more advanced analysis (like tracking backlinks or competitor performance), we would register with services like Ahrefs or Semrush. These platforms provide in-depth dashboards and would be integrated via their APIs." }
            ]
        }
    },
    errors: {
        quota: "You have exceeded your current API quota. Please check your billing account or try again later.",
        internal: "A temporary server issue occurred. Please wait a moment and try again. If the problem persists, consider simplifying your prompt.",
        permissionDenied: "Permission denied. Please ensure your API key has access to the requested model.",
        invalidKey: "Your API key is invalid. Please check your configuration.",
        invalidArgument: "There was an issue with the request (e.g., an invalid value). Please check your input and try again.",
        network: "A network error occurred. Please check your internet connection and try again.",
        jsonParse: "The AI returned an unexpected format. Please try your request again.",
        unknown: "An unexpected error occurred. Please try again later."
    }
  },
  fa: {
    langCode: 'fa-IR',
    brandName: "پناهگاه جان‌پناه",
    nav: { 
      home: "خانه", 
      about: "درباره ما",
      animals: "حیوانات ما",
      activities: "فعالیت‌ها و پروژه‌ها",
      contentHub: "مرکز محتوا",
      support: "حمایت و مشارکت",
      contact: "تماس با ما",
      donate: "کمک مالی",
      locations: "شعب",
      shop: "فروشگاه"
    },
    hero: {
        title: "پناهگاه جان‌پناه:<br/> جایی که درمان آغاز می‌شود",
        subtitle: "ما در مرحله اول درمانگر حیوانات هستیم. ما به چرخه محبت در همه انسان‌ها باور داریم و از فناوری برای حمایت از مأموریت درمان و فرهنگ‌سازی استفاده می‌کنیم.",
        button1: "دیدار با حیوانات",
        button2: "حمایت کنید",
        // Switched from videoUrl to imageUrl for the new "Splash" design
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
        overline: "نجات زندگی، در این فصل و فراتر از آن"
    },
    home: {
        introTitle: "«در مرحله اول درمانگر حیوانات هستیم یعنی در ابتدا حیواناتی که دچار آسیب شده‌اند و حمایت کننده‌ای ندارند را درمان می‌کنیم. چرخه محبت و مهربانی همیشه بوده و هست.» - منیره صفری، سرپرست جان‌پناه",
        servicesTitle: "مأموریت‌های اصلی ما",
        readStory: "خواندن داستان",
        readMore: "بیشتر بخوانید",
        services: [
            { iconKey: 'science', title: 'درمان پزشکی', text: 'هدف اصلی ما درمان حیوانات آسیب‌دیده و ارائه مراقبت‌های دامپزشکی لازم است.' },
            { iconKey: 'grant', title: 'فرهنگ‌سازی', text: 'آموزش عمومی برای اصلاح اطلاعات غلط و ترویج مهربانی با حیوانات در همه اقشار جامعه.' },
            { iconKey: 'education', title: 'عقیم‌سازی', text: 'حمایت از واکسیناسیون و عقیم‌سازی به جای حذف و کشتار حیوانات ولگرد.' },
            { iconKey: 'consulting', title: 'تجهیز پناهگاه', text: 'استفاده از هوش مصنوعی برای یافتن گرنت‌ها و منابع جهت بهبود امکانات برای حیوانات.' }
        ],
        portfolioTitle: "اخبار جان‌پناه",
        portfolioItems: [
            { img: "http://hakimemehr.ir/files/fa/news/1400/6/15/62472_110.jpg", title: "اولویت با درمان است", link: "#", description: "در جان‌پناه، اولویت ما درمان حیواناتی است که دچار تروما شده‌اند. ما به کسانی که هیچ حامی دیگری ندارند خدمات پزشکی ارائه می‌دهдим.", tags: ["درمان", "مراقبت", "جان‌پناه"], latitude: 35.6892, longitude: 51.3890},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/89b12852-9799-470a-8a58-45e69d727b12.jpeg", title: "عقیم‌سازی شهری", link: "#", description: "یک برنامه جامع برای کنترل جمعیت حیوانات شهری از طریق عقیم‌سازی اخلاقی و واکسیناسیون.", tags: ["TNR", "گربه‌ها", "سلامت شهری"], latitude: 35.7219, longitude: 51.3347},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/12a8385d-4f74-4b47-9759-450a80e6c271.jpeg", title: "آموزش همگانی", link: "#", description: "تلاش برای تغییر فرهنگ و نشان دادن اینکه مهربانی با حیوانات یک ارزش همگانی است.", tags: ["فرهنگ", "آموزش", "مهربانی"], latitude: 35.6961, longitude: 51.4231},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/c7891b92-56c6-4d5b-9d7a-115f573c0545.jpeg", title: "نجات اضطراری", link: "#", description: "پاسخ به گزارش‌های حیوانات آسیب‌دیده و انتقال فوری به پناهگاه.", tags: ["نجات", "اضطراری", "پناهگاه"], latitude: 35.7550, longitude: 51.4050},
        ],
        achievementsTitle: "تأثیر ما",
        achievements: [
            { iconKey: 'publications', count: 1200, suffix: '+', label: 'حیوان درمان شده' },
            { iconKey: 'funded', count: 500, suffix: '+', label: 'فرزندخواندگی موفق' },
            { iconKey: 'collaborations', count: 10, suffix: '+', label: 'سال خدمت' },
            { iconKey: 'team', count: 100, suffix: '%', label: 'تعهد به زندگی' },
            { iconKey: 'trained', count: 5000, suffix: '+', label: 'واکسیناسیون' }
        ],
        map: {
            title: "شبکه نجات",
            subtitle: "ببینید کجا فعالیت می‌کنیم و حیوانات نیازمند نزدیک خود را بیابید.",
            button: "مشاهده نقشه"
        },
        customersTitle: "با حمایت",
        customerLogos: [
            { img: 'https://storage.googleapis.com/verdant-assets/logo-wwf.svg', alt: 'Partner 1' },
            { img: 'https://storage.googleapis.com/verdant-assets/logo-gef.svg', alt: 'Partner 2' },
            { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/ASPCA_logo.svg/1200px-ASPCA_logo.svg.png', alt: 'ASPCA' },
            { img: 'https://storage.googleapis.com/verdant-assets/logo-conservation-intl.svg', alt: 'Partner 3' },
        ],
        calendarTitle: "اخبار و داستان‌ها",
        latestPosts: [
            { img: "http://hakimemehr.ir/files/fa/news/1400/6/15/62472_110.jpg", title: "سرپرست مجموعه جان‌پناه: در مرحله اول درمانگر حیوانات هستیم", date: "۱۶ شهريور ۱۴۰۰", comments: 8, link: "https://hakimemehr.ir/fa/news/65134" },
            { img: "https://storage.googleapis.com/verdant-assets/blog-2.jpg", title: "چرخه مهربانی در جامعه", date: "۲۴ مرداد ۱۴۰۲", comments: 22, link: "#" },
            { title: "مدیریت لوازم پناهگاه با تحلیل‌های پیش‌بینی‌کننده", date: "۲۳ خرداد ۱۴۰۳", comments: 9, link: "#" },
            { img: "https://storage.googleapis.com/verdant-assets/blog-4.jpg", title: "چرا واکسیناسیون بهتر از حذف فیزیکی است", date: "۵ خرداد ۱۴۰۳", comments: 18, link: "#" },
        ]
    },
    footer: {
      description: "پناهگاه جان‌پناه: درمان حیوانات، فرهنگ‌سازی و گسترش مهربانی.",
      contactTitle: "تماس با ما",
      email: "info@janpanah.org",
      phone: "۶۷۸ ۴۵ ۱۲۳ ۲۱ ۹۸+",
      address: "تهران، ایران",
      socialMediaTitle: "ما را دنبال کنید",
      instagram: "اینستاگرام",
      linkedin: "لینکدین",
      facebook: "فیسبوک",
      quickLinksTitle: "دسترسی سریع",
      quickLinks: [
        { text: "درباره جان‌پناه", link: "#" },
        { text: "مأموریت ما", link: "#services" },
        { text: "فرزندخواندگی", link: "#" },
        { text: "کمک مالی", link: "#" },
        { text: "سیاست حفظ حریم خصوصی", link: "#" },
      ],
      addressTitle: "موقعیت",
      copyright: "© ۲۰۲۴ پناهگاه جان‌پناه. تمامی حقوق محفوظ است.",
    },
    projectsPage: {
        title: "نمونه کارهای نجات ما",
        subtitle: "عملیات کلیدی که تعهد ما به رفاه حیوانات را نشان می‌دهد."
    },
    teamPage: {
        title: "تیم ما",
        subtitle: "افراد متعهدی که برای رفاه حیوانات تلاش می‌کنند.",
        members: [
            { img: 'http://hakimemehr.ir/files/fa/news/1400/6/15/62472_110.jpg', name: 'منیره صفری', title: 'سرپرست پناهگاه جان‌پناه', bio: 'بنیان‌گذار و رهبر مجموعه با تمرکز بر درمان حیوانات آسیب‌دیده و فرهنگ‌سازی در زمینه حقوق حیوانات.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-1.jpg', name: 'دکتر آریس تورن', title: 'دامپزشک ارشد', bio: 'متخصص جراحی تروما برای حیوانات ولگرد نجات‌یافته.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-2.jpg', name: 'لنا پتروا', title: 'مدیر پناهگاه', bio: 'مدیریت عملیات روزانه و هماهنگی فرزندخواندگی.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-3.jpg', name: 'دیوید چن', title: 'ارتباطات مردمی', bio: 'فعالیت در برنامه‌های آموزشی و فرهنگ‌سازی.', linkedin: '#' },
        ]
    },
    activitiesPage: {
        items: [
            { title: "درمان پزشکی و اورژانس", desc: "ماموریت اصلی ما. ما جراحی، توانبخشی و مراقبت ۲۴ ساعته برای حیوانات ولگرد آسیب دیده ارائه می‌دهیم.", iconKey: "medical", cta: "" },
            { title: "عقیم‌سازی شهری (TNR)", desc: "مدیریت جمعیت به روشی انسانی از طریق برنامه‌های زنده‌گیری، عقیم‌سازی و رهاسازی در تهران.", iconKey: "cat", cta: "" },
            { title: "یابنده گرنت هوشمند", desc: "استفاده از هوش مصنوعی برای اسکن پایگاه‌های داده جهانی جهت یافتن فرصت‌های تأمین مالی.", iconKey: "grant", cta: "یافتن گرنت" },
            { title: "برنامه‌ریز عملیات پناهگاه", desc: "تولید برنامه‌های جامع برای مدیریت پناهگاه، پروتکل‌های پزشکی و توسعه.", iconKey: "planner", cta: "برنامه‌ریزی عملیات" },
            { title: "آموزش و آگاهی‌بخشی", desc: "تولید محتوای ویدیویی برای ترویج فرهنگ مهربانی و آموزش عمومی.", iconKey: "video", cta: "ساخت ویدیو" },
            { title: "تحلیل سایت‌های نجات", desc: "تحلیل داده‌های جغرافیایی برای یافتن مکان‌های بهینه برای ایستگاه‌های نجات جدید.", iconKey: "map", cta: "تحلیل سایت‌ها" },
            { title: "تحقیق و توسعه", desc: "بررسی فناوری‌های جدید مانند بیومتریک و پزشکی از راه دور برای رفاه حیوانات.", iconKey: "research", cta: "مشاهده تحقیق و توسعه" },
            { title: "معماری سیستم هوش مصنوعی", desc: "شفافیت در نحوه استفاده ما از هوش مصنوعی برای بهینه‌سازی عملیات نجات.", iconKey: "ai", cta: "مشاهده سیستم" }
        ]
    },
    animalsPage: {
        filterTitle: "همراه ایده‌آل خود را پیدا کنید",
        filterSpecies: "گونه",
        filterSpeciesAll: "همه گونه‌ها",
        filterSpeciesDog: "سگ",
        filterSpeciesCat: "گربه",
        filterAge: "سن",
        filterAgeAll: "همه سنین",
        filterAgeYoung: "جوان",
        filterAgeAdult: "بالغ",
        filterAgeSenior: "سالمند",
        filterTemperament: "خلق و خو",
        filterTemperamentAll: "همه خلق و خوها",
        filterTemperamentPlayful: "بازیگوش",
        filterTemperamentCalm: "آرام",
        filterTemperamentShy: "خجالتی",
        aiSearchLabel: "یا حیوان ایده‌آل خود را توصیف کنید",
        aiSearchPlaceholder: "مثال: یک سگ آرام که با آپارتمان و افراد مسن سازگار باشد...",
        aiSearchButton: "یافتن با هوش مصنوعی",
        aiSearching: "در حال یافتن...",
        aiSearchReset: "پاک کردن فیلتر هوشمند"
    },
    adoptionForm: {
      title: "فرم درخواست سرپرستی",
      subtitle: "آماده‌اید تا یک خانه همیشگی هدیه دهید؟ برای شروع فرآیند، فرم زیر را پر کنید.",
      fullName: "نام و نام خانوادگی",
      fullNamePlaceholder: "مثال: مریم رضایی",
      email: "آدرس ایمیل",
      emailPlaceholder: "مثال: maryam.rezaei@example.com",
      phone: "شماره تلفن",
      phonePlaceholder: "مثال: ۰۹۱۲۱۲۳۴۵۶۷",
      address: "آدرس کامل",
      addressPlaceholder: "خیابان، شهر، استان، کد پستی",
      homeType: "نوع محل سکونت",
      homeTypeApartment: "آپارتمان",
      homeTypeHouse: "خانه حیاط‌دار",
      homeTypeFarm: "مزرعه / ملک روستایی",
      otherPets: "آیا حیوان خانگی دیگری دارید؟",
      otherPetsPlaceholder: "مثال: یک گربه ۵ ساله، آرام و اجتماعی",
      reason: "چرا می‌خواهید سرپرستی بگیرید؟",
      reasonPlaceholder: "درباره انگیزه‌های خود و اینکه به دنبال چه نوع همراهی هستید برای ما بنویسید.",
      submitButton: "ارسال درخواست",
      validationError: "لطفاً تمام فیلدهای الزامی را پر کنید.",
      successTitle: "درخواست شما ثبت شد!",
      successMessage: "از علاقه شما سپاسگزاریم. تیم ما درخواست شما را بررسی کرده و ظرف ۳ تا ۵ روز کاری با شما تماس خواهد گرفت."
    },
    reportTypes: {
        shelter_plan: "طرح عملیاتی پناهگاه",
        medical_report: "گزارش اثرات دامپزشکی",
        funding_proposal: "پروپوزال تأمین بودجه",
        adoption_strategy: "استراتژی فرزندخواندگی",
        community_outreach: "طرح مشارکت اجتماعی"
    },
    generatorForm: {
        title: "برنامه‌ریز پناهگاه و نجات",
        docType: "نوع سند",
        topic: "عنوان پروژه / نجات",
        topicPlaceholder: "مثال: بخش جدید گربه‌ها برای پناهگاه مرکز شهر",
        description: "اطلاعات کلیدی و نیازها",
        descriptionPlaceholder: "جزئیات ظرفیت، گونه‌های هدف، نیازهای پزشکی، موقعیت اجتماعی، بودجه کلی و غیره را ارائه دهید.",
        buttonText: "تولید سند",
        validationError: "لطفاً هم موضوع و هم توضیحات را پر کنید.",
    },
    reportDisplay: {
        title: "سند تولید شده",
        export: "خروجی",
        copy: "کپی کردن متن",
        downloadMD: "دانلود (.md)",
        downloadDOCX: "دانلود (.docx)",
        downloadHTML: "دانلود (.html)",
        printPDF: "چاپ / ذخیره به صورت PDF",
        docTitle: "گزارش تولید شده",
        generating: "در حال تولید...",
        placeholder1: "سند شما در اینجا نمایش داده خواهد شد.",
        placeholder2: "فرم را پر کرده و روی 'تولید' کلیک کنید تا شروع شود."
    },
    grantFinder: {
        title: "یابنده گرنت‌های جان‌پناه",
        searchPlaceholder: "کلمات کلیدی را وارد کنید (مثال: 'ساخت پناهگاه'، 'بودجه عقیم‌سازی')",
        searchButton: "جستجوی گرنت‌ها",
        searching: "در حال جستجو...",
        from: "از طرف",
        analyzeButton: "تحلیل",
        error: "خطایی هنگام جستجوی گرنت‌ها رخ داد.",
        noResults: "هیچ گرنتی برای این کلمات کلیدی یافت نشد. جستجوی گسترده‌تری را امتحان کنید.",
        useGrounding: "استفاده از جستجوی زنده وب (به‌روزتر)",
        sources: "منابع",
        subtitle: "جستجو برای فرصت‌های تأمین مالی یا تحلیل اسناد خودتان.",
        uploadLabel: "آپلود سند گرنت",
        selectFile: "انتخاب فایل",
        removeFile: "حذف فایل",
        fileTypes: "پشتیبانی می‌شود: .docx, .txt, .md",
        or: "یا",
        keywordsLabel: "کلمات کلیدی / دستورالعمل‌های تکمیلی",
        keywordsPlaceholder: "مثال: 'تمرکز بر تحقیق لوسمی گربه‌ها' یا 'پناهگاه‌های کوچک روستایی'",
        maxResults: "حداکثر نتایج",
        readingFile: "خواندن فایل...",
        finding: "در حال جستجو...",
        findButton: "یافتن و تحلیل گرنت‌ها",
        savedTitle: "گرنت‌های ذخیره شده",
        clearAll: "پاک کردن همه",
        deadlineLabel: "مهلت",
        summaryLabel: "خلاصه",
        notesLabel: "یادداشت‌های شما",
        notesPlaceholder: "نظرات خود را اینجا بنویسید...",
        remove: "حذف",
        saved: "ذخیره شد",
        save: "ذخیره",
        useForProposal: "استفاده برای پروپوزال",
        analyze: "تحلیل عمیق",
        crateTitle: "جعبه گرنت",
        crateSubtitle: "گرنت‌های یافت شده در این نشست",
        clearCrate: "پاک کردن جعبه",
        loadingTitle: "در حال اسکن فرصت‌ها...",
        loadingSubtitle: "هوش مصنوعی در حال خواندن اسناد و جستجو در وب است.",
        sortBy: "مرتب‌سازی بر اساس",
        sort: {
            relevance: "ارتباط",
            deadline: "مهلت",
            amount: "مبلغ",
            geography: "جغرافیا"
        },
        documents: "اسناد مورد نیاز",
        parseErrorTitle: "نتایج خام جستجو",
        parseErrorSubtitle: "ما اطلاعاتی پیدا کردیم، اما نتوانستیم آن را به طور کامل ساختاردهی کنیم. متن خام در اینجا آمده است:",
        crateEmpty: "هنوز گرنتی پیدا نشده است. یک جستجو امتحان کنید!",
        fileTypeError: "نوع فایل نامعتبر است. لطفاً .docx، .txt یا .md آپلود کنید.",
        validationError: "لطفاً یک فایل آپلود کنید یا کلمات کلیدی را وارد نمایید.",
        fileReadError: "خواندن فایل ناموفق بود.",
        prompt: {
            common: "شما یک پژوهشگر متخصص گرنت برای پناهگاه حیوانات هستید.",
            supplementalKeywords: "دستورالعمل‌های تکمیلی کاربر: {keywords}",
            noSupplementalKeywords: "بدون دستورالعمل تکمیلی.",
            fileBased: "{common} من یک سند آپلود کرده‌ام. آن را تحلیل کنید و گرنت‌های منطبق را بیابید. متن سند: {documentText}. {keywordInstruction}. {maxResults} نتیجه را در یک جدول Markdown برگردانید.",
            keywordBased: "{common} برای این عبارات گرنت پیدا کنید: {queries}. {maxResults} نتیجه را در یک جدول Markdown برگردانید."
        }
    },
    grantAnalyzer: {
        title: "تحلیل گرنت با هوش مصنوعی",
        close: "بستن تحلیل",
        loadingTitle: "در حال تحلیل گرنت...",
        loadingSubtitle: "هوش مصنوعی ما در حال بررسی ارتباط گرنت با مأموریت پناهگاه ماست.",
        viewOriginal: "مشاهده آگهی اصلی گرنت",
        relevance: "ارتباط",
        deadline: "مهلت",
        amount: "مبلغ بودجه",
        duration: "مدت زمان پروژه",
        geography: "تمرکز جغرافیایی",
        eligibility: "شرایط لازم",
        scope: "محدوده و اهداف",
        howToApply: "فرآیند درخواست",
        contact: "اطلاعات تماس",
        useForProposal: "استفاده از این تحلیل برای شروع پروپوزال",
        exportDOCX: "خروجی تحلیل (.docx)",
        printPDF: "چاپ تحلیل",
        export: {
            summaryTitle: "خلاصه تحلیل گرنت",
            officialLink: "لینک رسمی",
            relevance: "درصد ارتباط",
            details: "جزئیات گرنت",
            fundingBody: "نهاد تأمین کننده بودجه",
            deadline: "مهلت",
            amount: "مبلغ",
            duration: "مدت",
            geography: "جغرافیا",
            eligibility: "شرایط",
            scope: "محدوده",
            applicationProcess: "فرآیند درخواست",
            contact: "تماس",
            fileName: "تحلیل_گرنت"
        }
    },
    siteSelector: {
        title: "برنامه‌ریز نجات و زیستگاه",
        subtitle: "توصیه‌های مبتنی بر داده برای مکان‌های پناهگاه و زیستگاه‌های مناسب برای گونه‌های مختلف دریافت کنید.",
        findLocationsMode: "یافتن مکان‌های نجات",
        findTreesMode: "یافتن حیوانات مناسب",
        locations: {
            label: "اهداف نجات خود را توصیف کنید",
            placeholder: "مثال: یک منطقه شهری پرتردد که به کلینیک عقیم‌سازی گربه‌های ولگرد و ایستگاه تغذیه نیاز دارد.",
            button: "یافتن مکان‌ها",
            examplePrompts: {
                title: "یا، یک مثال را امتحان کنید:",
                prompts: [
                    "ایجاد یک مرکز بازپروری حیات وحش در نزدیکی لبه جنگل برای پرندگان آسیب‌دیده.",
                    "شناسایی مکانی برای پناهگاه بزرگ سگ‌ها با فضای کافی برای دویدن در یک منطقه روستایی.",
                    "یافتن مکانی برای پناهگاه اضطراری موقت برای حیوانات خانگی آواره شده در اثر سیل."
                ]
            }
        },
        trees: {
            label: "محیط پناهگاه را توصیف کنید",
            placeholder: "مثال: پناهگاه کوچک آپارتمانی شهری با دسترسی محدود به فضای باز. مناسب برای حیوانات خانگی کوچک.",
            button: "پیشنهاد حیوانات"
        },
        resultsTitle: "توصیه‌های هوش مصنوعی",
        generating: "در حال تحلیل...",
        placeholder: "توصیه‌های شما در اینجا نمایش داده خواهد شد.",
        validationError: "لطفاً برای دریافت توصیه، نیازمندی‌های خود را توصیف کنید.",
        validationErrorCoords: "لطفا مختصات معتبری را وارد کنید.",
        selectOnMap: "برای شروع، روی نقشه کلیک کنید یا یک منطقه را برای تحلیل انتخاب نمایید.",
        selectedCoords: "مکان انتخاب شده",
        latitude: "عرض جغرافیایی",
        longitude: "طول جغرافیایی",
        manualCoordsTitle: "یا مختصات را دستی وارد کنید",
        analyzeCoordsButton: "تحلیل محیط",
        locationResult: {
            rationale: "دلایل انتخاب",
            species: "گونه‌ها/خدمات پیشنهادی"
        },
        treeResult: {
            description: "توضیحات نژاد/گونه",
            rationale: "دلایل مناسب بودن",
            findGrantsButton: "یافتن گرنت برای این حیوان",
            analyzeBenefitsButton: "تحلیل هزینه‌های نگهداری",
            analyzingBenefits: "در حال تحلیل...",
            economicAnalysisTitle: "تحلیل تأثیر پناهگاه",
            annualRevenue: "هزینه سالانه تخمینی (هر حیوان)",
            yearsToProfit: "میانگین زمان تا فرزندخواندگی",
            primaryProducts: "الزامات نگهداری",
            otherBenefits: "مزایای اجتماعی/جامعه"
        },
        suggestedGoals: {
            title: "اهداف پیشنهادی نجات",
            loading: "در حال تولید ایده...",
            useGoal: "استفاده از این هدف و یافتن مکان‌ها"
        },
        findMyLocation: "مکان‌یابی من",
        findingLocation: "در حال یافتن موقعیت شما...",
        locationError: "موقعیت شما یافت نشد. لطفاً خدمات موقعیت مکانی را در مرورگر خود فعال کرده و دوباره امتحان کنید.",
        drawPrompt: "یافتن سایت‌های نجات در محدوده مشخص شده با مختصات [{swLat}, {swLng}] تا [{neLat}, {neLng}].",
        drawPolygonPrompt: "یافتن سایت‌های نجات در محدوده چندضلعی با رئوس زیر: {vertices}.",
        drawArea: "برای جستجو یک منطقه رسم کنید",
        confirmPopup: {
            title: "تایید مکان",
            coordinates: "مختصات: {lat}, {lng}",
            button: "بررسی مناسب بودن در اینجا"
        },
        latLabelShort: "عرض",
        lngLabelShort: "طول",
        mapLoading: "در حال بارگذاری نقشه...",
        mapTooltip: {
            priority: "اولویت",
            clickAnalyze: "برای تحلیل کلیک کنید"
        },
        nearbyAnalysis: {
            title: "تحلیل مناطق نزدیک",
            prompt: "چه چیزی در این نزدیکی است؟",
            placeholder: "مثال: کلینیک‌های دامپزشکی، پت‌شاپ‌ها، پارک‌ها",
            button: "جستجو با نقشه",
            validation: "لطفاً یک عبارت جستجو وارد کرده و مکانی را روی نقشه انتخاب کنید.",
            resultsTitle: "تحلیل مناطق نزدیک برای \"{query}\"",
            mapLink: "لینک نقشه",
            reviewLink: "نظر",
        }
    },
    mapLegend: {
        title: "راهنمای نقشه",
        plantingSite: "سایت پیشنهادی پناهگاه",
        selectedPoint: "نقطه انتخابی تحلیل",
        criticalSite: "منطقه با نیاز حیاتی",
        highPrioritySite: "منطقه با اولویت بالا",
        mediumPrioritySite: "منطقه با اولویت متوسط",
    },
    siteAnalysisModal: {
        title: "تحلیل دقیق سایت",
        analyzing: "در حال تحلیل سایت...",
        close: "بستن",
        estimatedCost: "هزینه راه‌اندازی تخمینی",
        treeCount: "ظرفیت حیوانات",
        duration: "مدت زمان راه‌اندازی",
        carbonSeq: "تخمین فرزندخواندگی سالانه",
        tonnesPerYear: "حیوان در سال",
        keyChallenges: "چالش‌های کلیدی",
        successFactors: "عوامل موفقیت",
        error: "تحلیل این سایت امکان‌پذیر نبود.",
    },
    videoGenerator: {
        title: "ویدیو ساز فرزندخواندگی",
        subtitle: "برای نمایش حیوانات قابل واگذاری، اشتراک‌گذاری داستان‌های نجات یا افزایش آگاهی، ویدیوهای جذاب بسازید.",
        quotaExhaustedBanner: "سهمیه تولید ویدیو ممکن است محدود باشد. برخی ویژگی‌ها ممکن است در دسترس نباشند.",
        errorTitle: "خطا",
        step1Title: "۱. ایده ویدیوی خود را تعریف کنید",
        videoType: "هدف ویدیو",
        typeGeneral: "عمومی / رسانه اجتماعی",
        typeBooth: "نمایش / گزارش پزشکی",
        promptLabel: "موضوع ویدیو چیست؟",
        promptPlaceholder: "مثال: داستانی دلگرم‌کننده از یک گلدن رتریور که خانه‌ای همیشگی پیدا می‌کند.",
        boothPromptPlaceholder: "مثال: مروری فنی بر بخش جدید دامپزشکی و قابلیت‌های جراحی ما.",
        negativePromptLabel: "این موارد را حذف کن (اختیاری)",
        negativePromptPlaceholder: "مثال: غم، قفس، موسیقی ترسناک",
        imageLabel: "تصویر الهام‌بخش (اختیاری)",
        uploadButton: "آپلود تصویر",
        imagePrompt: "هوش مصنوعی را در مورد سبک بصری و حال و هوا راهنمایی می‌کند.",
        removeImage: "حذف تصویر",
        addWatermark: "افزودن واترمارک جان‌پناه",
        numberOfVersions: "تعداد نسخه‌های ویدیو",
        versions: "نسخه(ها)",
        aspectRatio: "نسبت تصویر",
        ratios: {
            widescreen: "صفحه عریض",
            vertical: "عمودی",
            square: "مربع",
            portrait: "پرتره"
        },
        durationLabel: "مدت زمان تقریبی ویدیو",
        generateScriptButton: "تولید فیلمنامه و صحنه‌ها",
        generatingScriptTitle: "در حال تولید فیلمنامه...",
        validationError: "لطفاً برای شروع یک دستور یا یک تصویر ارائه دهید.",
        step2Title: "۲. بازبینی و تولید صحنه‌ها",
        progressSavedAutomatically: "پیشرفت به طور خودکار ذخیره می‌شود.",
        startOver: "شروع مجدد",
        scene: "صحنه",
        narration: "گویندگی",
        readNarration: "خواندن گویندگی",
        visuals: "دستور بصری",
        confirmPrompt: "تایید دستور",
        editPrompt: "ویرایش دستور",
        approveScene: "تایید",
        approved: "تایید شده",
        generateSceneVideo: "تولید ویدیو",
        regenerateScene: "تولید مجدد ویدیو",
        generateSceneImage: "تولید تصویر",
        regenerateSceneImage: "تولید مجدد تصویر",
        downloadVideo: "دانلود",
        promptRequiredError: "دستور بصری نمی‌تواند خالی باشد.",
        quotaErrorImageFallback: "تولید ویدیو ناموفق بود (سهمیه تمام شده). تولید یک جایگزین یا یک تصویر ثابت را امتحان کنید.",
        generateAlternativeVideo: "تولید ویدیوی جایگزین",
        generateAnimatedScene: "تولید صحنه متحرک",
        askGoogleBaba: "بپرس از AI",
        askGoogleBabaFocus: "سوال خود را متمرکز کنید (اختیاری)",
        step3Title: "۳. افزودن موسیقی",
        musicPromptLabel: "موسیقی مورد نظر خود را توصیف کنید",
        generateMusicButton: "تولید ایده موسیقی",
        generatingMusic: "در حال تولید...",
        musicDescriptionTitle: "پیشنهاد موسیقی هوش مصنوعی",
        musicLibraryTitle: "یا از کتابخانه انتخاب کنید",
        select: "انتخاب",
        selected: "انتخاب شد",
        step4Title: "۴. نهایی‌سازی",
        combineAndExport: "ترکیب و خروجی ویدیو",
        approveAllToCombine: "برای فعال کردن خروجی، همه {approvedCount}/{totalCount} صحنه را تایید کنید.",
        musicRequired: "لطفاً برای فعال کردن خروجی، یک قطعه موسیقی انتخاب کنید.",
    },
    imageEditor: {
        title: "ویرایشگر عکس حیوانات",
        subtitle: "عکس‌های حیوانات را برای پروفایل‌های فرزندخواندگی بهبود دهید. لوازم جانبی اضافه کنید، پس‌زمینه را تغییر دهید یا نورپردازی را بهتر کنید.",
        uploadLabel: "عکس اصلی",
        uploadButton: "آپلود عکس",
        uploadPrompt: "فایل را بکشید و رها کنید یا برای آپلود کلیک کنید.",
        editPromptLabel: "تغییرات خود را توصیف کنید",
        editPromptPlaceholder: "مثال: قلاده را حذف کن، پس‌زمینه را یک پارک آفتابی کن، یک پاپیون روی گربه بگذار...",
        generateButton: "اعمال تغییرات",
        generatingButton: "در حال تولید...",
        clearButton: "شروع مجدد",
        resultTitle: "تصویر ویرایش شده",
        downloadButton: "دانلود تصویر",
        placeholder: "تصویر ویرایش شده شما در اینجا نمایش داده خواهد شد.",
        validationError: "لطفاً یک تصویر آپلود کرده و توضیحات ویرایش را ارائه دهید."
    },
    rescueStoryteller: {
      title: "داستان‌سرای نجات و تأمین مالی",
      subtitle: "تولید کمپین‌های احساسی برای حیوانات آسیب‌دیده، الهام گرفته از Cuddly. مناسب برای اینستاگرام و تلگرام.",
      form: {
        nameLabel: "نام حیوان",
        namePlaceholder: "مثال: همپا",
        conditionLabel: "وضعیت پزشکی / آسیب",
        conditionPlaceholder: "مثال: شکستگی پا در تصادف، جرب شدید",
        needsLabel: "نیازهای خاص (لیست آرزوها)",
        needsPlaceholder: "مثال: جراحی ارتوپدی، آنتی‌بیوتیک، غذای ریکاوری",
        toneLabel: "لحن کمپین",
        toneUrgent: "فوری و حیاتی",
        toneHopeful: "امیدوارکننده و بهبودی",
        button: "تولید کمپین"
      },
      results: {
        instagram: "کپشن اینستاگرام",
        telegram: "پست تلگرام",
        hashtags: "هشتگ‌ها",
        wishlist: "اقلام پیشنهادی لیست آرزوها"
      },
      validationError: "لطفاً تمام فیلدها را پر کنید تا داستانی جذاب تولید شود."
    },
    quotaErrorModal: {
        title: "سهمیه API تمام شد",
        body: "شما از سهمیه API فعلی خود فراتر رفته‌اید. لطفاً حساب صورتحساب خود را بررسی کنید یا بعداً دوباره تلاش کنید. برخی ویژگی‌ها ممکن است در دسترس نباشند.",
        cta: "بررسی صورتحساب",
        close: "بستن"
    },
    googleBabaModal: {
        title: "بینش‌های هوش مصنوعی",
        close: "بستن",
        loading: "در حال جستجو در وب برای یافتن بینش‌ها...",
        userFocus: "تمرکز شما:",
        resultsTitle: "تحلیل:",
        sourcesTitle: "منابع:",
    },
    chatbot: {
        title: "دستیار جان‌پناه",
        placeholder: "درباره فرزندخواندگی یا نجات بپرسید...",
        initialGreeting: "سلام! من دستیار هوشمند جان‌پناه هستم. می‌توانید درباره خانم منیره صفری، سیاست درمان در مرحله اول، یا نحوه کمک به پناهگاه بپرسید.",
        send: "ارسال",
        initialPrompts: [
            "منیره صفری کیست؟",
            "سیاست درمان اول چیست؟",
            "چگونه می‌توانم سرپرستی بگیرم؟",
            "آیا به داوطلب نیاز دارید؟",
            "پناهگاه جان‌پناه کجاست؟"
        ]
    },
    researchPage: {
        title: "تحقیق و توسعه",
        subtitle: "بررسی چشم‌انداز فناوری در حوزه رفاه حیوانات برای بهبود عملیات نجات.",
        startups: [
            {
                name: "پتیا (الگوی بومی)",
                logo: "https://placehold.co/200x100/f58220/ffffff?text=Petia",
                description: "استارتاپ پتیا (تاسیس علی دلشاد تهرانی) پیشگام خدمات آنلاین حیوانات است. ما قصد داریم از ایده «پت‌کارت» (کارت سلامت) آن‌ها برای پرونده‌سازی دیجیتال حیوانات حمایتی استفاده کنیم. تجربه آن‌ها در عدم حمایت شهرداری برای ساخت پناهگاه، نقشه راهی برای ماست تا با ابزارهای هوش مصنوعی این موانع را رفع کنیم.",
                link: "https://petia.ir/"
            },
            {
                name: "Cuddly",
                logo: "https://placehold.co/200x100/3d3d3e/ffffff?text=Cuddly", 
                description: "یک پلتفرم تأمین مالی جمعی که به سازمان‌های حیوانات کمک می‌کند تا برای موارد پزشکی و لیست آرزوها کمک مالی جمع کنند. ضروری برای مأموریت 'درمان در اولویت'.",
                link: "https://cuddly.com/"
            },
            {
                name: "Snout",
                logo: "https://placehold.co/200x100/4c758a/ffffff?text=Snout",
                description: "استفاده از بیومتریک اثر بینی برای شناسایی سگ‌های گمشده، مشابه اثر انگشت انسان. ابزاری حیاتی برای شناسایی سگ‌های ولگرد در جایی که میکروچیپ کمیاب است.",
                link: "https://www.snoutid.com/"
            },
            {
                name: "Petfinder",
                logo: "https://placehold.co/200x100/663399/ffffff?text=Petfinder",
                description: "یک پایگاه داده آنلاین و قابل جستجو از حیواناتی که به خانه نیاز دارند. این سایت همچنین فهرستی از تقریباً ۱۱۰۰۰ پناهگاه و سازمان واگذاری حیوانات در آمریکا، کانادا و مکزیک است.",
                link: "https://www.petfinder.com/"
            },
            {
                name: "Petstablished",
                logo: "https://placehold.co/200x100/228b22/ffffff?text=Petstablished",
                description: "نرم‌افزار جامع مدیریت پناهگاه که شامل ابزارهایی برای واگذاری، نگهداری موقت، جمع‌آوری کمک‌های مالی و ثبت سوابق است و به بهینه‌سازی عملیات سازمان‌های نجات کمک می‌کند.",
                link: "https://petstablished.com/"
            },
            {
                name: "Doobert",
                logo: "https://placehold.co/200x100/ff4500/ffffff?text=Doobert", 
                description: "اتصال پناهگاه‌ها به داوطلبان برای حمل و نقل، نگهداری موقت و عکاسی. ایجاد زنجیره تأمین برای نجات زندگی‌ها.",
                link: "https://www.doobert.com/"
            },
            {
                name: "VetCT",
                logo: "https://placehold.co/200x100/008080/ffffff?text=VetCT",
                description: "یک شرکت جهانی مشاوره از راه دور و رادیولوژی از راه دور که پشتیبانی تخصصی به تیم‌های دامپزشکی ارائه می‌دهد و دسترسی به مشاوره تخصصی برای موارد پیچیده در مراقبت‌های بهداشتی حیوانات را فراهم می‌کند.",
                link: "https://vet-ct.com/"
            }
        ]
    },
    aiSystemPage: {
        title: "طراحی سیستم هوش مصنوعی",
        subtitle: "یک طرح فنی و مفهومی از ماژول‌های پیشرفته هوش مصنوعی که سیستم ارتباطات و مدیریت پناهگاه جان‌پناه را قدرت می‌بخشد.",
        sections: {
            goal: "هدف و کاربرد",
            inputs: "متغیرهای ورودی",
            outputs: "ساختار خروجی",
            prompt: "پرامپت نمونه"
        },
        modules: [
            { id: 6, name: "تطبیق هوشمند", goal: "تحلیل پروفایل متقاضی و پیشنهاد حیوان مناسب با ایمیل شخصی‌سازی شده.", inputs: "پروفایل متقاضی:\n- نام: {{adopter_name}}\n- نوع مسکن: {{آپارتمان/خانه ویلایی/مزرعه}}\n- متراژ: {{square_meters}}\n- حیاط: {{دارد/ندارد}}\n- ساعات حضور در خانه: {{hours_home}}\n- سایر حیوانات: {{لیست}}\n- کودکان: {{سن و تعداد}}\n- سطح فعالیت: {{کم/متوسط/زیاد}}\n- تجربه قبلی: {{دارد/ندارد}}\n- ترجیحات: {{گونه، اندازه، سن}}", outputs: "۱. امتیاز تطبیق برای هر حیوان (۰-۱۰۰)\n۲. دلایل تطبیق\n۳. ایمیل شخصی با ۳ پیشنهاد برتر\n۴. نکات مهم برای هر پیشنهاد", prompt_example: "بر اساس پروفایل متقاضی و لیست حیوانات موجود:\n۱. تحلیل سازگاری انجام بده\n۲. ۳ حیوان برتر را انتخاب کن\n۳. ایمیل شخصی با توضیح دلیل هر پیشنهاد بنویس\n۴. نکات مراقبتی خاص هر حیوان را اضافه کن" },
            { id: 7, name: "پیش‌بینی رفتار اهداکنندگان", goal: "تحلیل تاریخچه و پیش‌بینی بهترین زمان و نوع درخواست کمک.", inputs: "تاریخچه اهداکننده:\n- شناسه: {{donor_id}}\n- تاریخچه کمک‌ها: {{dates, amounts}}\n- میانگین کمک: {{average}}\n- آخرین کمک: {{last_donation_date}}\n- کانال ترجیحی: {{email/sms/social}}\n- علاقه‌مندی: {{dogs/cats/all/medical/general}}\n- نرخ باز کردن ایمیل: {{open_rate}}\n- بهترین زمان تعامل: {{day, time}}", outputs: "۱. پیش‌بینی زمان کمک بعدی\n۲. مبلغ پیشنهادی\n۳. نوع کمپین مناسب\n۴. ایمیل بهینه‌شده", prompt_example: "زمان ارسال بهینه: [تاریخ و ساعت پیشنهادی]\nمبلغ پیشنهادی: $[مبلغ]\nنوع کمپین: [نوع کمپین]\nسطح شخصی‌سازی: [بالا/متوسط/پایه]\n---\nموضوع: [موضوع شخصی‌سازی شده]\n---\n[متن ایمیل با اشاره به علاقه‌مندی خاص]\n---" },
            { id: 8, name: "گزارش پزشکی و پیگیری", goal: "ارسال به‌روزرسانی وضعیت سلامت حیوانات تحت درمان.", inputs: "پرونده پزشکی:\n- نام حیوان: {{pet_name}}\n- وضعیت اولیه: {{initial_condition}}\n- تاریخ پذیرش: {{admission_date}}\n- درمان‌های انجام شده: {{treatments}}\n- وضعیت فعلی: {{current_status}}\n- پیش‌آگهی: {{prognosis}}\n- هزینه درمان: {{total_cost}}\n- مبلغ جمع‌آوری شده: {{raised_amount}}\n- عکس‌های پیشرفت: {{photo_urls}}", outputs: "۱. ایمیل گزارش پیشرفت\n۲. پست شبکه اجتماعی\n۳. صفحه به‌روزرسانی وب", prompt_example: "موضوع: 🏥 خبر خوب درباره {{pet_name}}!\n---\nسلام {{supporter_name}} عزیز،\n\n[گزارش وضعیت با لحن امیدوارکننده]\n\n📊 خلاصه پیشرفت:\n- روز {{day_number}} درمان\n- [وضعیت فعلی]\n\n💝 کمک شما چه تاثیری داشت:\n[توضیح تاثیر کمک]\n\n📸 [تصاویر پیشرفت]\n\n[CTA برای ادامه حمایت یا اشتراک‌گذاری]" },
            { id: 9, name: "سیستم رویداد هوشمند", goal: "مدیریت رویدادها و ارسال یادآوری‌های هوشمند.", inputs: "جزئیات رویداد:\n- نام رویداد: {{event_name}}\n- نوع: {{adoption_day/fundraiser/vaccination/training/volunteer}}\n- تاریخ: {{date}}\n- ساعت: {{time}}\n- مکان: {{location}}\n- ظرفیت: {{capacity}}\n- ثبت‌نام شده: {{registered_count}}\n- هزینه: {{fee}}\n- الزامات: {{requirements}}", outputs: "برای هر مرحله:\nمرحله: [مرحله]\nتاریخ ارسال: [تاریخ ارسال]\n---\nموضوع: [موضوع متناسب با مرحله]\n---\n[محتوای ایمیل]\n---\nدعوتنامه تقویم: [فایل ics]\n---", prompt_example: "برنامه یادآوری:\n- ۷ روز قبل: دعوت اولیه\n- ۳ روز قبل: یادآوری\n- ۱ روز قبل: جزئیات نهایی\n- روز رویداد: یادآوری صبح\n- ۱ روز بعد: تشکر و پیگیری" },
            { id: 10, name: "پاسخ‌دهی خودکار", goal: "پاسخ خودکار به سوالات متداول از طریق ایمیل.", inputs: "ایمیل ورودی:\n- فرستنده: {{sender_email}}\n- موضوع: {{subject}}\n- متن: {{body}}\n- زمان: {{timestamp}}", outputs: "قصد شناسایی شده: [نوع سوال]\nاطمینان: [درصد اطمینان]\nپاسخ خودکار: [بله/خیر/نیاز به بررسی انسانی]\n---\nموضوع: Re: {{original_subject}}\n---\n[پاسخ خودکار]\n---\nنیاز به پیگیری انسانی: [بله/خیر]\nاقدامات پیشنهادی: [اقدامات پیشنهادی]", prompt_example: "انواع سوالات:\n۱. فرآیند فرزندخواندگی\n۲. موجودی حیوانات\n۳. اطلاعات داوطلبی\n۴. روش‌های کمک مالی\n۵. گم‌شده و پیدا شده\n..." },
            { id: 11, name: "تحلیل احساسات و بازخورد", goal: "تحلیل بازخوردها و ارسال پاسخ متناسب.", inputs: "ورودی بازخورد:\n- منبع: {{email/survey/social/review}}\n- متن: {{content}}\n- امتیاز (اگر موجود): {{rating}}\n- موضوع مرتبط: {{adoption/donation/visit/volunteer}}\n- کاربر: {{user_id}}", outputs: "احساس: [مثبت/منفی/خنثی]\nشدت: [۱-۱۰]\nموضوعات کلیدی: [لیست موضوعات]\nفوریت: [کم/متوسط/زیاد/حیاتی]\n---\nنوع پاسخ پیشنهادی: [تشکر/عذرخواهی/پیگیری/ارجاع]\n---\n[ایمیل پاسخ مناسب]\n---\nهشدار داخلی: [اگر نیاز به توجه مدیریت باشد]\n---", prompt_example: "پردازش هوش مصنوعی:\n۱. تشخیص احساس\n۲. شدت احساس\n۳. موضوعات کلیدی\n۴. نیاز به پیگیری فوری" },
            { id: 12, name: "گزارش و آمار", goal: "تولید گزارش‌های خودکار برای ذینفعان.", inputs: "درخواست گزارش:\n- نوع گزارش: {{report_type}}\n- دوره: {{start_date}} تا {{end_date}}\n- مخاطب: {{audience}}\n- فرمت: {{email/pdf/dashboard}}", outputs: "عنوان گزارش: گزارش {{type}} - {{period}}\n---\n📊 خلاصه اجرایی:\n[۳-۴ نکته کلیدی]\n\n📈 آمار کلیدی:\n[جدول آمار با مقایسه دوره قبل]\n\n🏆 موفقیت‌ها:\n[لیست دستاوردها]\n\n⚠️ چالش‌ها:\n[مشکلات و راه‌حل‌های پیشنهادی]\n\n🎯 اهداف دوره بعد:\n[لیست اهداف]\n\n💝 داستان برجسته:\n[یک داستان موفقیت]\n---", prompt_example: "انواع گزارش:\n۱. خلاصه هفتگی\n۲. تاثیر ماهانه\n۳. گزارش اهداکنندگان\n۴. گزارش هیئت مدیره\n..." },
            { id: 13, name: "مدیریت سرپرستی موقت", goal: "مدیریت ارتباط با خانواده‌های فاستر.", inputs: "خانواده فاستر:\n- نام: {{foster_name}}\n- تجربه: {{experience_level}}\n- ظرفیت: {{capacity}}\n- ترجیحات: {{preferences}}\n- تاریخچه: {{history}}", outputs: "انواع ایمیل:\n۱. درخواست سرپرستی جدید\n۲. هماهنگی تحویل\n۳. چک‌این هفتگی\n۴. گزارش پزشکی\n۵. درخواست تمدید\n۶. تبریک فرزندخواندگی نهایی\n۷. تشکر پایان دوره", prompt_example: "موضوع: 🏠 {{pet_name}} به کمک شما نیاز دارد!\n---\nسلام {{foster_name}} عزیز،\n\nیک فرصت سرپرستی ویژه داریم که فکر می‌کنیم برای شما مناسب است!\n\n🐾 معرفی {{pet_name}}:\n[توضیحات شخصیت و نیازها]\n\n⏰ مدت: حدود {{duration}}\n📦 تجهیزات ارائه شده: [لیست]\n💰 هزینه‌ها: تمام هزینه‌های پزشکی و غذا تامین می‌شود\n\n[CTA: قبول می‌کنم / سوال دارم]" },
            { id: 14, name: "یکپارچه‌سازی اجتماعی", goal: "تولید محتوای متناسب برای هر پلتفرم از یک ورودی.", inputs: "پایه محتوا:\n- نوع: {{adoption/event/donation/story/alert}}\n- اطلاعات اصلی: {{main_content}}\n- تصاویر: {{images}}\n- لینک: {{link}}\n- هشتگ‌های برند: {{brand_hashtags}}", outputs: "اینستاگرام:\n📸 کپشن (حداکثر ۲۲۰۰ کاراکتر)\n#هشتگ‌ها (حداکثر ۳۰)\n\nتوییتر/X:\n🐦 توییت (حداکثر ۲۸۰ کاراکتر)\n\nتلگرام:\n📱 پست کانال\n\nواتساپ:\n💬 متن اشتراک‌گذاری", prompt_example: "تولید محتوای چندپلتفرمی از یک ورودی پایه، با تطبیق لحن و فرمت برای هر شبکه اجتماعی." },
            { id: 15, name: "تولید تصویر با هوش مصنوعی", goal: "تولید پرامپت‌های موثر برای ابزارهای تصویرساز هوش مصنوعی.", inputs: "درخواست تصویر:\n- نوع: {{poster/banner/social/email_header}}\n- موضوع: {{adoption/event/donation/awareness}}\n- حیوان: {{species, breed, color}}\n- سبک: {{realistic/cartoon/watercolor/minimalist}}\n- ابعاد: {{dimensions}}\n- متن روی تصویر: {{overlay_text}}", outputs: "برای DALL-E / Midjourney:\nپرامپت: [پرامپت انگلیسی بهینه]\nپرامپت منفی: [موارد اجتناب]\nمرجع سبک: [مرجع سبک]\n\nبرای Canva AI:\nعبارات جستجو: [کلیدواژه‌های جستجو]\nپیشنهاد قالب: [پیشنهاد قالب]\nپالت رنگ: [پالت رنگ]", prompt_example: "پرامپت DALL-E:\n'پوستر رویداد فرزندخواندگی دلگرم‌کننده، خانواده خوشحال با توله سگ گلدن رتریور نجات‌یافته، نور گرم غروب، رنگ‌های پاستلی نرم، سبک آبرنگ، فضای متن در بالا و پایین، کیفیت 4k، اتمسفر احساسی و دعوت‌کننده'" }
        ]
    },
    seoPage: {
        title: "مرکز سئو",
        subtitle: "یک راهنمای استراتژیک برای بهینه‌سازی حضور آنلاین پناهگاه جان‌پناه جهت جذب حامیان، داوطلبان و سرپرستان بیشتر.",
        technical: {
            title: "زیرساخت فنی سئو",
            description: "اطمینان از اینکه موتورهای جستجو مانند گوگل می‌توانند به راحتی محتوای سایت ما را پیدا، خزش و درک کنند. از آنجا که این یک وب اپلیکیشن مدرن است، تمرکز ما بر دسترس‌پذیر کردن آن برای خزنده‌ها است.",
            items: [
                { title: "متا تگ‌های پویا", text: "هر صفحه باید عنوان و توضیحات متای منحصر به فرد و توصیفی داشته باشد. این برای نمایش صحیح در نتایج جستجو حیاتی است." },
                { title: "داده‌های ساختاریافته (Schema)", text: "این یک 'واژگان' برای موتورهای جستجو است. با افزودن آن، می‌توانیم به گوگل بگوییم که ما یک 'سازمان' هستیم یا اخبار ما 'مقاله' هستند، که به نمایش نتایج غنی‌تر کمک می‌کند." },
                { title: "نقشه سایت و robots.txt", text: "نقشه سایت، نقشه‌ای از تمام صفحات ما برای گوگل است. فایل robots.txt به خزنده‌ها قوانین مربوط به ایندکس کردن را می‌دهد." },
                { title: "سرعت صفحه و Core Web Vitals", text: "یک وب‌سایت سریع و پایدار برای کاربران و سئو ضروری است. سیستم ساخت ما (Vite) بسیاری از بهینه‌سازی‌ها را انجام می‌دهد." }
            ]
        },
        content: {
            title: "استراتژی محتوا و کلمات کلیدی",
            description: "ایجاد محتوای ارزشمند که به سوالات مخاطبان هدف ما—سرپرستان، اهداکنندگان و داوطلبان بالقوه—پاسخ دهد.",
            items: [
                { title: "تحقیق کلمات کلیدی", text: "باید عباراتی را که مردم برای یافتن ما استفاده می‌کنند، شناسایی کنیم. مثال‌ها برای جان‌پناه: 'پناهگاه حیوانات در تهران'، 'واگذاری سگ در ایران'، 'کمک به حیوانات آسیب‌دیده'." },
                { title: "سئوی داخلی (On-Page)", text: "این کلمات کلیدی باید به طور طبیعی در عناوین صفحات، سرتیترها و متن‌ها ادغام شوند تا ارتباط آن‌ها با موضوع به موتورهای جستجو نشان داده شود." },
                { title: "تولید محتوای با کیفیت", text: "ابزار 'داستان‌سرای نجات' ما یک ابزار سئوی عالی است. هر داستان یک محتوای منحصر به فرد است که می‌تواند برای عبارات خاص رتبه بگیرد." },
                { title: "لینک‌سازی داخلی", text: "اتصال صفحات مختلف سایت به یکدیگر (مثلاً لینک از یک داستان نجات به صفحه واگذاری) به کاربران و موتورهای جستجو در پیمایش و درک ساختار سایت کمک می‌کند." }
            ]
        },
        analytics: {
            title: "داشبورد تحلیل و نظارت",
            description: "برای سنجش موفقیت، باید عملکرد را ردیابی کنیم. از آنجا که این یک سایت وردپرسی سنتی نیست، ما با سرویس‌های خارجی قدرتمند و استاندارد صنعتی ادغام می‌شویم.",
            items: [
                { title: "گوگل سرچ کنسول", text: "این یک سرویس رایگان از گوگل است که به ما کمک می‌کند حضور سایت خود در نتایج جستجو را نظارت کنیم. باید دامنه خود را در اینجا ثبت کنیم تا ببینیم کدام جستجوها کاربران را به سایت ما می‌آورند." },
                { title: "گوگل آنالیتیکس ۴ (GA4)", text: "این ابزار رفتار کاربر در سایت ما را ردیابی می‌کند—کدام صفحات محبوب هستند، کاربران از کجا می‌آیند و چگونه با محتوای ما تعامل دارند. باید یک پراپرتی ایجاد کرده و اسکریپت ردیابی آن را به برنامه اضافه کنیم." },
                { title: "داشبوردهای سئوی شخص ثالث", text: "برای تحلیل‌های پیشرفته‌تر (مانند ردیابی بک‌لینک‌ها یا عملکرد رقبا)، باید در سرویس‌هایی مانند Ahrefs یا Semrush ثبت‌نام کنیم. این پلتفرم‌ها داشبوردهای جامعی ارائه می‌دهند." }
            ]
        }
    },
    errors: {
        quota: "You have exceeded your current API quota. Please check your billing account or try again later.",
        internal: "A temporary server issue occurred. Please wait a moment and try again. If the problem persists, consider simplifying your prompt.",
        permissionDenied: "Permission denied. Please ensure your API key has access to the requested model.",
        invalidKey: "Your API key is invalid. Please check your configuration.",
        invalidArgument: "There was an issue with the request (e.g., an invalid value). Please check your input and try again.",
        network: "A network error occurred. Please check your internet connection and try again.",
        jsonParse: "The AI returned an unexpected format. Please try your request again.",
        unknown: "An unexpected error occurred. Please try again later."
    }
  }
};


type Language = 'en' | 'fa';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => any;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// A helper function for nested object access
const getNested = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');

  const t = (key: string): any => {
    const translation = getNested(translations[language], key);
    if (translation !== undefined) {
      return translation;
    }
    // Fallback to English
    const fallback = getNested(translations.en, key);
    // If fallback is also not found, return the key itself
    return fallback !== undefined ? fallback : key;
  };

  const direction = language === 'fa' ? 'rtl' : 'ltr';

  // Apply direction to HTML element for global styles
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  return React.createElement(LanguageContext.Provider, { value: { language, setLanguage, t, direction } }, children);
};

// --- App State ---
export type Page = 'home' | 'about' | 'animals' | 'activities' | 'support' | 'contact' | 'projects' | 'team' | 'docs' | 'generator' | 'grant' | 'siteSelector' | 'video' | 'blog' | 'imageEditor' | 'research' | 'aiSystem' | 'seo';

export interface AppState {
  page: Page;
}

// --- Grant Related Types ---
export interface Grant {
  grantTitle: string;
  fundingBody: string;
  summary: string;
  deadline: string;
  link: string;
  // Extended fields for the new GrantFinder
  linkTitle?: string;
  relevanceScore?: number;
  amount?: string;
  geography?: string;
  requirementDocuments?: { title: string; url: string }[];
  notes?: string;
}

export interface GrantSummary {
  grantTitle: string;
  fundingBody: string;
  deadline: string;
  amount: string;
  duration: string;
  geography: string;
  eligibility: string;
  scope: string;
  howToApply: string;
  contact: string;
  relevancePercentage: number;
}

export interface GroundedSource {
    web?: { uri: string; title: string };
    maps?: { uri: string; title: string; placeAnswerSources?: { reviewSnippets: { uri: string; text: string; }[] } };
}

export interface GroundedResult {
    text: string;
    sources: GroundedSource[];
}

export interface GrantResult extends GroundedResult {
    // Alias for compatibility if needed, but GroundedResult covers text + sources.
}


// --- Site Selector Types ---
export interface Coords {
    lat: number;
    lng: number;
}

export interface PlantingSite {
    locationName: string;
    country: string;
    latitude: number;
    longitude: number;
    rationale: string;
    suggestedSpecies: string[];
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface SiteAnalysis {
  estimatedCost: string;
  treeCount: number;
  projectDurationYears: string;
  carbonSequestrationTonnesPerYear: number;
  keyChallenges: string[];
  successFactors: string[];
}

export interface SuitableTree {
    commonName: string;
    scientificName: string;
    description: string;
    rationale: string;
}

export interface EconomicBenefitAnalysis {
    annualRevenuePerTree: string;
    yearsToProfitability: string;
    primaryProducts: string[];
    otherBenefits: string;
}

// --- Video Generator Types ---
export interface VideoScene {
    id: string;
    description: string;
    narration: string;
    videoUrls: string[];
    imageUrl: string | null;
    isGenerating: boolean;
    isApproved: boolean;
    isConfirmed: boolean;
    error: string | null;
}

// --- Chatbot Types ---
export interface ChatMessage {
    role: 'user' | 'model' | 'system';
    text: string;
}

// --- User Profile ---
export interface UserProfile {
    name: string;
    email: string;
    picture: string;
}

// --- Blog / Rescue Storyteller Types ---
export interface RescueCampaign {
    instagramCaption: string;
    telegramPost: string;
    hashtags: string[];
    wishlistItems: string[];
}

// --- Adoption Form Types ---
export interface AdoptionApplication {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    homeType: 'apartment' | 'house' | 'farm' | '';
    otherPets: string;
    reason: string;
    submissionDate: string;
}

// --- Animal Profile for AI Filtering ---
export interface AnimalProfile {
    name: string;
    species: string;
    age: string;
    temperament: string;
    desc: string;
    status: string;
    img: string;
}
