import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const translations: Record<string, any> = {
  en: {
    langCode: 'en-US',
    nav: { 
      home: "Home", 
      reportGenerator: "Shelter Planner", 
      grantFinder: "Grant Finder", 
      siteSelector: "Rescue Map",
      videoGenerator: "Adoption Video",
      imageEditor: "Photo Editor",
      blogGenerator: "Blog Generator",
      projects: "Rescue Missions", 
      team: "Our Team", 
      docs: "Function Docs" 
    },
    hero: {
        title: "Giving Every Paw a<br/> Second Chance with AI",
        subtitle: "We leverage AI and data science to optimize animal shelter operations, secure funding, and find loving homes for animals in need.",
        button1: "Meet the Animals",
        button2: "Get Involved",
        videoUrl: "https://storage.googleapis.com/verdant-assets/forest-hero-2.mp4"
    },
    home: {
        introTitle: "The Green Hope Project is now dedicated to animal welfare. We use technology to identify areas with high stray populations, plan efficient shelters, and measure our success in adoptions and rehabilitation.",
        servicesTitle: "Our Core Strategies",
        services: [
            { iconKey: 'science', title: 'AI Rescue Mapping', text: 'Using data to identify high-density stray areas and optimal locations for new shelters or feeding stations.' },
            { iconKey: 'grant', title: 'Shelter Grants', text: 'Securing funding from global animal welfare funds to power medical supplies and facility upgrades.' },
            { iconKey: 'education', title: 'Adoption Analytics', text: 'Generating transparent reports on adoption rates, medical treatments, and community impact.' },
            { iconKey: 'consulting', title: 'Adoption Awareness', text: 'Creating compelling videos and content to showcase adoptable pets and promote responsible ownership.' }
        ],
        portfolioTitle: "Featured Rescue Missions",
        portfolioItems: [
            { img: "https://storage.googleapis.com/aistudio-public/prompts/89b12852-9799-470a-8a58-45e69d727b12.jpeg", title: "Urban Stray Cat Sterilization", link: "#", description: "A comprehensive TNR (Trap-Neuter-Return) program in metropolitan areas to control population and improve feline health.", tags: ["TNR", "Cats", "Urban Health", "Community"], latitude: 41.8781, longitude: -87.6298},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/12a8385d-4f74-4b47-9759-450a80e6c271.jpeg", title: "Wildlife Rehabilitation Center", link: "#", description: "Establishing a sanctuary for injured wildlife in the Sahel region, focusing on habitat restoration and safe release.", tags: ["Wildlife", "Rehab", "Conservation", "Africa"], latitude: 14.4974, longitude: -14.4524},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/c7891b92-56c6-4d5b-9d7a-115f573c0545.jpeg", title: "Marine Life Rescue", link: "#", description: "A specialized unit for rescuing and treating marine animals affected by pollution and nets in Southeast Asia.", tags: ["Marine Life", "Ocean", "Rescue", "Turtle"], latitude: -2.5489, longitude: 118.0149},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/6f3e334a-9391-450f-a63e-63f5b35274d4.jpeg", title: "Amazon Species Protection", link: "#", description: "Protecting endangered species in the Amazon from poaching and habitat loss through AI monitoring.", tags: ["Endangered", "Amazon", "Protection", "AI"], latitude: -3.4653, longitude: -62.2159},
        ],
        achievementsTitle: "Our Global Impact",
        achievements: [
            { iconKey: 'publications', count: 15, suffix: 'K+', label: 'Animals Rescued' },
            { iconKey: 'funded', count: 8500, suffix: '+', label: 'Successful Adoptions' },
            { iconKey: 'collaborations', count: 45, suffix: '+', label: 'Shelter Partners' },
            { iconKey: 'team', count: 12, suffix: '', label: 'Countries Active' },
            { iconKey: 'trained', count: 20, suffix: 'K+', label: 'Vaccinations Given' }
        ],
        map: {
            title: "Our Rescue Network",
            subtitle: "Explore our active shelters and rescue operations around the world.",
            button: "Find a Shelter Near You"
        },
        customersTitle: "In Collaboration With",
        customerLogos: [
            { img: 'https://storage.googleapis.com/verdant-assets/logo-wwf.svg', alt: 'World Wildlife Fund' },
            { img: 'https://storage.googleapis.com/verdant-assets/logo-gef.svg', alt: 'Global Environment Facility' },
            { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/ASPCA_logo.svg/1200px-ASPCA_logo.svg.png', alt: 'ASPCA' },
            { img: 'https://storage.googleapis.com/verdant-assets/logo-conservation-intl.svg', alt: 'Conservation International' },
        ],
        calendarTitle: "Tales from the Shelter",
        latestPosts: [
            { img: "https://storage.googleapis.com/verdant-assets/blog-1.jpg", title: "How AI Helps Match Pets with the Perfect Owners", date: "July 18, 2024", comments: 15, link: "#" },
            { img: "https://storage.googleapis.com/verdant-assets/blog-2.jpg", title: "Luna's Journey: From Street Dog to Service Animal", date: "June 30, 2024", comments: 22, link: "#" },
            { title: "Managing Shelter Supplies with Predictive Analytics", date: "June 12, 2024", comments: 9, link: "#" },
            { img: "https://storage.googleapis.com/verdant-assets/blog-4.jpg", title: "Why Senior Pets Make the Best Companions", date: "May 25, 2024", comments: 18, link: "#" },
        ]
    },
    footer: {
      description: "A non-profit organization dedicated to improving the lives of animals through technology, rescue, and rehabilitation.",
      contactTitle: "Get in Touch",
      email: "rescue@greenhope.proj",
      phone: "+1 555 123 4567",
      address: "San Francisco, USA",
      socialMediaTitle: "Follow Our Rescues",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      facebook: "Facebook",
      quickLinksTitle: "Quick Links",
      quickLinks: [
        { text: "About Us", link: "#" },
        { text: "Our Mission", link: "#services" },
        { text: "Adopt a Pet", link: "#" },
        { text: "Volunteer", link: "#" },
        { text: "Privacy Policy", link: "#" },
      ],
      addressTitle: "Our Location",
      copyright: "© 2024 Green Hope Animal Rescue. All Rights Reserved.",
    },
    projectsPage: {
        title: "Our Rescue Portfolio",
        subtitle: "A selection of our key operations demonstrating our commitment to animal welfare."
    },
    teamPage: {
        title: "Meet Our Rescuers",
        subtitle: "A dedicated team of veterinarians, behaviorists, and technologists committed to saving lives.",
        members: [
            { img: 'https://storage.googleapis.com/verdant-assets/team-1.jpg', name: 'Dr. Aris Thorne', title: 'Chief Veterinarian', bio: 'With 20+ years in vet medicine, Aris leads our medical triage and rehabilitation protocols.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-2.jpg', name: 'Lena Petrova', title: 'Director of Shelter AI', bio: 'Specializes in predictive modeling to manage shelter capacity and adoption trends.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-3.jpg', name: 'David Chen', title: 'Head of Partnerships', bio: 'Expert in securing grants from animal welfare foundations and building global coalitions.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-4.jpg', name: 'Dr. Samira Iqbal', title: 'Behavior Specialist', bio: 'Focuses on animal rehabilitation and preparing traumatized animals for their forever homes.', linkedin: '#' },
        ]
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
        title: "Animal Welfare Grant Finder",
        searchPlaceholder: "Enter keywords (e.g., 'shelter construction', 'spay neuter funding')",
        searchButton: "Find Grants",
        searching: "Searching...",
        from: "From",
        analyzeButton: "Analyze",
        error: "An error occurred while searching for grants.",
        noResults: "No grants found for these keywords. Try a broader search.",
        useGrounding: "Use Live Web Search (more up-to-date)",
        sources: "Sources",
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
        addWatermark: "Add Green Hope Watermark",
        numberOfVersions: "Number of Video Versions",
        aspectRatio: "Aspect Ratio",
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
        title: "Rescue Assistant",
        placeholder: "Ask about adoption or rescue...",
        initialGreeting: "Hello! How can I help you? Ask me about adopting a pet, our rescue missions, or how to volunteer.",
        send: "Send",
        initialPrompts: [
            "How do I adopt?",
            "What animals do you rescue?",
            "Tell me about the latest rescue mission.",
            "Do you need volunteers?",
            "How does AI help animals?",
            "Where are your shelters?"
        ]
    }
  },
  fa: {
    langCode: 'fa-IR',
    nav: { 
      home: "خانه", 
      reportGenerator: "برنامه‌ریز پناهگاه", 
      grantFinder: "گرنت یاب", 
      siteSelector: "نقشه نجات",
      videoGenerator: "ویدیو ساز",
      imageEditor: "ویرایشگر عکس",
      blogGenerator: "بلاگ ساز",
      projects: "مأموریت‌ها", 
      team: "تیم ما", 
      docs: "مستندات" 
    },
    hero: {
        title: "دادن شانسی دوباره به هر پنجه<br/> با هوش مصنوعی",
        subtitle: "ما از هوش مصنوعی و علم داده برای بهینه‌سازی عملیات پناهگاه حیوانات، تأمین بودجه و یافتن خانه‌های پرمهر برای حیوانات نیازمند استفاده می‌کنیم.",
        button1: "دیدار با حیوانات",
        button2: "مشارکت کنید",
        videoUrl: "https://storage.googleapis.com/verdant-assets/forest-hero-2.mp4"
    },
    home: {
        introTitle: "پروژه امید سبز اکنون به رفاه حیوانات اختصاص دارد. ما از فناوری برای شناسایی مناطق با جمعیت بالای حیوانات بی‌سرپناه، برنامه‌ریزی پناهگاه‌های کارآمد و اندازه‌گیری موفقیت خود در فرزندخواندگی و بازپروری استفاده می‌کنیم.",
        servicesTitle: "استراتژی‌های اصلی ما",
        services: [
            { iconKey: 'science', title: 'نقشه‌برداری نجات با هوش مصنوعی', text: 'استفاده از داده‌ها برای شناسایی مناطق با تراکم بالای حیوانات ولگرد و مکان‌های بهینه برای پناهگاه‌های جدید.' },
            { iconKey: 'grant', title: 'گرنت‌های پناهگاه', text: 'تأمین بودجه از صندوق‌های جهانی رفاه حیوانات برای تأمین لوازم پزشکی و ارتقای تأسیسات.' },
            { iconKey: 'education', title: 'تحلیل فرزندخواندگی', text: 'تهیه گزارش‌های شفاف در مورد نرخ فرزندخواندگی، درمان‌های پزشکی و تأثیر اجتماعی.' },
            { iconKey: 'consulting', title: 'آگاهی‌بخشی فرزندخواندگی', text: 'ساخت ویدیوها و محتوای جذاب برای نمایش حیوانات قابل واگذاری و ترویج مالکیت مسئولانه.' }
        ],
        portfolioTitle: "مأموریت‌های نجات برجسته",
        portfolioItems: [
            { img: "https://storage.googleapis.com/aistudio-public/prompts/89b12852-9799-470a-8a58-45e69d727b12.jpeg", title: "عقیم‌سازی گربه‌های شهری", link: "#", description: "یک برنامه جامع TNR (زنده‌گیری، عقیم‌سازی، رهاسازی) در مناطق کلان‌شهری برای کنترل جمعیت و بهبود سلامت گربه‌ها.", tags: ["TNR", "گربه‌ها", "سلامت شهری", "جامعه"], latitude: 41.8781, longitude: -87.6298},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/12a8385d-4f74-4b47-9759-450a80e6c271.jpeg", title: "مرکز بازپروری حیات وحش", link: "#", description: "ایجاد پناهگاهی برای حیات وحش آسیب‌دیده در منطقه ساحل، با تمرکز بر بازسازی زیستگاه و رهاسازی ایمن.", tags: ["حیات وحش", "بازپروری", "حفاظت", "آفریقا"], latitude: 14.4974, longitude: -14.4524},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/c7891b92-56c6-4d5b-9d7a-115f573c0545.jpeg", title: "نجات آبزیان", link: "#", description: "یک واحد تخصصی برای نجات و درمان حیوانات دریایی آسیب‌دیده از آلودگی و تورها در جنوب شرقی آسیا.", tags: ["آبزیان", "اقیانوس", "نجات", "لاک‌پشت"], latitude: -2.5489, longitude: 118.0149},
            { img: "https://storage.googleapis.com/aistudio-public/prompts/6f3e334a-9391-450f-a63e-63f5b35274d4.jpeg", title: "حفاظت از گونه‌های آمازون", link: "#", description: "حفاظت از گونه‌های در معرض خطر در آمازون در برابر شکار غیرقانونی و از دست دادن زیستگاه از طریق نظارت هوش مصنوعی.", tags: ["در معرض خطر", "آمازون", "حفاظت", "هوش مصنوعی"], latitude: -3.4653, longitude: -62.2159},
        ],
        achievementsTitle: "تأثیر جهانی ما",
        achievements: [
            { iconKey: 'publications', count: 15, suffix: '+ هزار', label: 'حیوان نجات یافته' },
            { iconKey: 'funded', count: 8500, suffix: '+', label: 'فرزندخواندگی موفق' },
            { iconKey: 'collaborations', count: 45, suffix: '+', label: 'پناهگاه همکار' },
            { iconKey: 'team', count: 12, suffix: '', label: 'کشور فعال' },
            { iconKey: 'trained', count: 20, suffix: '+ هزار', label: 'واکسیناسیون انجام شده' }
        ],
        map: {
            title: "شبکه نجات ما",
            subtitle: "پناهگاه‌های فعال و عملیات نجات ما را در سراسر جهان کاوش کنید.",
            button: "یافتن پناهگاه نزدیک"
        },
        customersTitle: "با همکاری",
        customerLogos: [
            { img: 'https://storage.googleapis.com/verdant-assets/logo-wwf.svg', alt: 'صندوق جهانی طبیعت' },
            { img: 'https://storage.googleapis.com/verdant-assets/logo-gef.svg', alt: 'تسهیلات جهانی محیط زیست' },
            { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/ASPCA_logo.svg/1200px-ASPCA_logo.svg.png', alt: 'ASPCA' },
            { img: 'https://storage.googleapis.com/verdant-assets/logo-conservation-intl.svg', alt: 'حفاظت بین‌الملل' },
        ],
        calendarTitle: "داستان‌های پناهگاه",
        latestPosts: [
            { img: "https://storage.googleapis.com/verdant-assets/blog-1.jpg", title: "چگونه هوش مصنوعی به ما در یافتن صاحب مناسب کمک می‌کند", date: "۲۸ تیر ۱۴۰۳", comments: 15, link: "#" },
            { img: "https://storage.googleapis.com/verdant-assets/blog-2.jpg", title: "سفر لونا: از سگ خیابانی تا حیوان خدماتی", date: "۱۰ تیر ۱۴۰۳", comments: 22, link: "#" },
            { title: "مدیریت لوازم پناهگاه با تحلیل‌های پیش‌بینی‌کننده", date: "۲۳ خرداد ۱۴۰۳", comments: 9, link: "#" },
            { img: "https://storage.googleapis.com/verdant-assets/blog-4.jpg", title: "چرا حیوانات خانگی مسن بهترین همراهان هستند", date: "۵ خرداد ۱۴۰۳", comments: 18, link: "#" },
        ]
    },
    footer: {
      description: "یک سازمان غیرانتفاعی که به بهبود زندگی حیوانات از طریق فناوری، نجات و بازپروری اختصاص دارد.",
      contactTitle: "در تماس باشید",
      email: "rescue@greenhope.proj",
      phone: "۴۵۶۷ ۱۲۳ ۵۵۵ ۱+",
      address: "سان فرانسیسکو، آمریکا",
      socialMediaTitle: "عملیات نجات ما را دنبال کنید",
      instagram: "اینستاگرام",
      linkedin: "لینکدین",
      facebook: "فیسبوک",
      quickLinksTitle: "دسترسی سریع",
      quickLinks: [
        { text: "درباره ما", link: "#" },
        { text: "مأموریت ما", link: "#services" },
        { text: "فرزندخواندگی", link: "#" },
        { text: "داوطلب شدن", link: "#" },
        { text: "سیاست حفظ حریم خصوصی", link: "#" },
      ],
      addressTitle: "موقعیت ما",
      copyright: "© ۲۰۲۴ نجات حیوانات امید سبز. تمامی حقوق محفوظ است.",
    },
    projectsPage: {
        title: "نمونه کارهای نجات ما",
        subtitle: "مجموعه‌ای از عملیات کلیدی ما که تعهد ما به رفاه حیوانات را نشان می‌دهد."
    },
    teamPage: {
        title: "با ناجیان ما آشنا شوید",
        subtitle: "تیمی متعهد از دامپزشکان، رفتارشناسان و فناوران که به نجات جان‌ها متعهد هستند.",
        members: [
            { img: 'https://storage.googleapis.com/verdant-assets/team-1.jpg', name: 'دکتر آریس تورن', title: 'دامپزشک ارشد', bio: 'با بیش از ۲۰ سال سابقه در دامپزشکی، آریس پروتکل‌های تریاژ پزشکی و بازپروری ما را رهبری می‌کند.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-2.jpg', name: 'لنا پتروا', title: 'مدیر هوش مصنوعی پناهگاه', bio: 'متخصص در مدل‌سازی پیش‌بینی‌کننده برای مدیریت ظرفیت پناهگاه و روندهای فرزندخواندگی.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-3.jpg', name: 'دیوید چن', title: 'رئیس مشارکت‌ها', bio: 'متخصص در تأمین گرنت از بنیادهای رفاه حیوانات و ایجاد ائتلاف‌های جهانی.', linkedin: '#' },
            { img: 'https://storage.googleapis.com/verdant-assets/team-4.jpg', name: 'دکتر سمیرا اقبال', title: 'متخصص رفتارشناسی', bio: 'تمرکز بر بازپروری حیوانات و آماده‌سازی حیوانات آسیب‌دیده برای خانه‌های همیشگی.', linkedin: '#' },
        ]
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
        title: "یابنده گرنت‌های رفاه حیوانات",
        searchPlaceholder: "کلمات کلیدی را وارد کنید (مثال: 'ساخت پناهگاه'، 'بودجه عقیم‌سازی')",
        searchButton: "جستجوی گرنت‌ها",
        searching: "در حال جستجو...",
        from: "از طرف",
        analyzeButton: "تحلیل",
        error: "خطایی هنگام جستجوی گرنت‌ها رخ داد.",
        noResults: "هیچ گرنتی برای این کلمات کلیدی یافت نشد. جستجوی گسترده‌تری را امتحان کنید.",
        useGrounding: "استفاده از جستجوی زنده وب (به‌روزتر)",
        sources: "منابع",
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
        addWatermark: "افزودن واترمارک امید سبز",
        numberOfVersions: "تعداد نسخه‌های ویدیو",
        aspectRatio: "نسبت تصویر",
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
        title: "دستیار نجات",
        placeholder: "درباره فرزندخواندگی یا نجات بپرسید...",
        initialGreeting: "سلام! چگونه می‌توانم به شما کمک کنم؟ می‌توانید درباره پذیرش حیوان خانگی، مأموریت‌های نجات ما یا نحوه داوطلب شدن سؤال کنید.",
        send: "ارسال",
        initialPrompts: [
            "چگونه می‌توانم سرپرستی بگیرم؟",
            "چه حیواناتی را نجات می‌دهید؟",
            "درباره آخرین مأموریت نجات بگویید.",
            "آیا به داوطلب نیاز دارید؟",
            "هوش مصنوعی چگونه به حیوانات کمک می‌کند؟",
            "پناهگاه‌های شما کجا هستند؟"
        ]
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
export type Page = 'home' | 'projects' | 'team' | 'docs' | 'generator' | 'grant' | 'siteSelector' | 'video' | 'blog' | 'imageEditor';

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