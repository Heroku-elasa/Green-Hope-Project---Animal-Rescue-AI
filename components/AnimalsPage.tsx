
import React, { useState, useMemo } from 'react';
import { useLanguage, Page, AdoptionApplication, AnimalProfile } from '../types';
import ImageEditor from './ImageEditor';
import * as geminiService from '../services/geminiService';

interface AnimalsPageProps {
    setPage: (page: Page) => void;
    // Image Editor Props passing through
    originalImage: string | null;
    setOriginalImage: (image: string | null) => void;
    editedImage: string | null;
    prompt: string;
    setPrompt: (prompt: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    error: string | null;
    onClear: () => void;
}

const animals: AnimalProfile[] = [
    { name: "Hampo", status: "Under Treatment", img: "http://hakimemehr.ir/files/fa/news/1400/6/15/62472_110.jpg", desc: "Found with a broken leg, currently recovering.", species: 'dog', age: 'adult', temperament: 'calm' },
    { name: "Luna", status: "Available for Adoption", img: "https://storage.googleapis.com/aistudio-public/prompts/89b12852-9799-470a-8a58-45e69d727b12.jpeg", desc: "A gentle soul looking for a quiet home. Vaccinated.", species: 'cat', age: 'senior', temperament: 'shy' },
    { name: "Simba", status: "Available for Adoption", img: "https://storage.googleapis.com/aistudio-public/prompts/12a8385d-4f74-4b47-9759-450a80e6c271.jpeg", desc: "A playful and energetic young dog, great with kids.", species: 'dog', age: 'young', temperament: 'playful' },
    { name: "Bella", status: "Emergency Care", img: "https://storage.googleapis.com/aistudio-public/prompts/c7891b92-56c6-4d5b-9d7a-115f573c0545.jpeg", desc: "Arrived with severe dehydration. Currently in ICU.", species: 'dog', age: 'adult', temperament: 'calm' },
    { name: "Mochi", status: "Available for Adoption", img: "https://storage.googleapis.com/aistudio-public/prompts/89b12852-9799-470a-8a58-45e69d727b12.jpeg", desc: "A calm and independent cat who loves to nap in the sun.", species: 'cat', age: 'adult', temperament: 'calm' },
    { name: "Rocky", status: "Available for Adoption", img: "http://hakimemehr.ir/files/fa/news/1400/6/15/62472_110.jpg", desc: "A senior dog with a lot of love to give. Needs a peaceful home.", species: 'dog', age: 'senior', temperament: 'shy' },
];


const AnimalsPage: React.FC<AnimalsPageProps> = (props) => {
    const { t } = useLanguage();
    
    // Filter State
    const [speciesFilter, setSpeciesFilter] = useState('all');
    const [ageFilter, setAgeFilter] = useState('all');
    const [temperamentFilter, setTemperamentFilter] = useState('all');
    
    // AI Filter State
    const [aiQuery, setAiQuery] = useState('');
    const [aiFilteredNames, setAiFilteredNames] = useState<string[] | null>(null);
    const [isAiFiltering, setIsAiFiltering] = useState(false);
    
    // Adoption Form State
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [homeType, setHomeType] = useState<AdoptionApplication['homeType']>('');
    const [otherPets, setOtherPets] = useState('');
    const [reason, setReason] = useState('');
    const [formError, setFormError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const filteredAnimals = useMemo(() => {
        return animals.filter(animal => {
            const speciesMatch = speciesFilter === 'all' || animal.species === speciesFilter;
            const ageMatch = ageFilter === 'all' || animal.age === ageFilter;
            const temperamentMatch = temperamentFilter === 'all' || animal.temperament === temperamentFilter;
            
            // AI Filter: If names are present, check inclusion.
            const aiMatch = aiFilteredNames === null || aiFilteredNames.includes(animal.name);

            return speciesMatch && ageMatch && temperamentMatch && aiMatch;
        });
    }, [speciesFilter, ageFilter, temperamentFilter, aiFilteredNames]);
    
    const handleAiSearch = async () => {
        if (!aiQuery.trim()) return;
        setIsAiFiltering(true);
        try {
            const matches = await geminiService.filterAnimalsByDescription(animals, aiQuery);
            setAiFilteredNames(matches);
        } catch (e) {
            console.error("AI Filtering failed", e);
            // On error, maybe just reset or show all? Or alert.
            // For now, we keep the previous state or could reset.
        } finally {
            setIsAiFiltering(false);
        }
    };

    const clearAiFilter = () => {
        setAiQuery('');
        setAiFilteredNames(null);
    }

    const handleAdoptionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!fullName || !email || !phone || !address || !homeType || !reason) {
            setFormError(t('adoptionForm.validationError'));
            return;
        }

        const newApplication: AdoptionApplication = {
            fullName, email, phone, address, homeType, otherPets, reason,
            submissionDate: new Date().toISOString()
        };

        try {
            const existingAppsRaw = localStorage.getItem('adoptionApplications');
            const existingApps = existingAppsRaw ? JSON.parse(existingAppsRaw) : [];
            existingApps.push(newApplication);
            localStorage.setItem('adoptionApplications', JSON.stringify(existingApps));

            setIsSubmitted(true);
            // Reset form
            setFullName(''); setEmail(''); setPhone(''); setAddress(''); setHomeType(''); setOtherPets(''); setReason('');

        } catch (error) {
            console.error("Failed to save application to localStorage", error);
            setFormError("Could not save your application. Please try again.");
        }
    };

    return (
        <div className="animate-fade-in text-bf-slate">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight mb-4">
                        {t('nav.animals')}
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        Meet the residents of Janpanah. From those healing in our clinic to those ready for their forever homes.
                    </p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 mb-12 shadow-sm space-y-6">
                     <h3 className="text-xl font-bold text-bf-slate text-center font-serif">{t('animalsPage.filterTitle')}</h3>
                     
                     {/* Manual Filters */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{t('animalsPage.filterSpecies')}</label>
                            <select value={speciesFilter} onChange={e => setSpeciesFilter(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-bf-orange focus:border-bf-orange text-gray-700">
                                <option value="all">{t('animalsPage.filterSpeciesAll')}</option>
                                <option value="dog">{t('animalsPage.filterSpeciesDog')}</option>
                                <option value="cat">{t('animalsPage.filterSpeciesCat')}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{t('animalsPage.filterAge')}</label>
                            <select value={ageFilter} onChange={e => setAgeFilter(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-bf-orange focus:border-bf-orange text-gray-700">
                                <option value="all">{t('animalsPage.filterAgeAll')}</option>
                                <option value="young">{t('animalsPage.filterAgeYoung')}</option>
                                <option value="adult">{t('animalsPage.filterAgeAdult')}</option>
                                <option value="senior">{t('animalsPage.filterAgeSenior')}</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{t('animalsPage.filterTemperament')}</label>
                             <select value={temperamentFilter} onChange={e => setTemperamentFilter(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-bf-orange focus:border-bf-orange text-gray-700">
                                <option value="all">{t('animalsPage.filterTemperamentAll')}</option>
                                <option value="playful">{t('animalsPage.filterTemperamentPlayful')}</option>
                                <option value="calm">{t('animalsPage.filterTemperamentCalm')}</option>
                                <option value="shy">{t('animalsPage.filterTemperamentShy')}</option>
                            </select>
                        </div>
                     </div>

                     {/* AI Filter */}
                     <div className="pt-6 border-t border-gray-100">
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{t('animalsPage.aiSearchLabel')}</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="text" 
                                value={aiQuery} 
                                onChange={(e) => setAiQuery(e.target.value)} 
                                placeholder={t('animalsPage.aiSearchPlaceholder')}
                                className="flex-grow bg-gray-50 border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-gray-700"
                                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                            />
                            <button 
                                onClick={handleAiSearch} 
                                disabled={isAiFiltering || !aiQuery.trim()}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-md"
                            >
                                {isAiFiltering ? t('animalsPage.aiSearching') : t('animalsPage.aiSearchButton')}
                            </button>
                            {aiFilteredNames && (
                                <button onClick={clearAiFilter} className="bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition-colors">
                                    {t('animalsPage.aiSearchReset')}
                                </button>
                            )}
                        </div>
                     </div>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {filteredAnimals.length > 0 ? filteredAnimals.map((animal, idx) => (
                        <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:border-bf-orange transition-all duration-300 group">
                            <div className="h-64 overflow-hidden relative">
                                <img src={animal.img} alt={animal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-full shadow-sm uppercase tracking-wide ${
                                    animal.status.includes('Adoption') ? 'bg-green-600 text-white' :
                                    animal.status.includes('Adopted') ? 'bg-blue-600 text-white' :
                                    'bg-red-600 text-white'
                                }`}>
                                    {animal.status}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-2xl font-bold text-bf-slate font-serif">{animal.name}</h3>
                                    {aiFilteredNames && aiFilteredNames.includes(animal.name) && (
                                        <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full font-bold border border-pink-200">AI Match</span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">{animal.desc}</p>
                                <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded">{animal.species}</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded">{animal.age}</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded">{animal.temperament}</span>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-500 col-span-full text-center py-12 text-lg">No animals match your filter criteria.</p>
                    )}
                </div>
                
                 {/* Adoption Form Section */}
                <div className="border-t border-gray-200 pt-16 mb-24">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-bf-slate font-serif">{t('adoptionForm.title')}</h2>
                            <p className="text-gray-600 mt-2 text-lg">{t('adoptionForm.subtitle')}</p>
                        </div>
                         {isSubmitted ? (
                            <div className="bg-green-50 border border-green-200 text-center p-12 rounded-lg animate-fade-in shadow-sm">
                                <h3 className="text-2xl font-bold text-green-700 font-serif">{t('adoptionForm.successTitle')}</h3>
                                <p className="text-gray-700 mt-4 text-lg">{t('adoptionForm.successMessage')}</p>
                                <button onClick={() => setIsSubmitted(false)} className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full transition-colors uppercase tracking-wide">Submit Another Application</button>
                            </div>
                         ) : (
                            <form onSubmit={handleAdoptionSubmit} className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-1">{t('adoptionForm.fullName')}</label>
                                        <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md text-gray-900 py-3 px-4 focus:ring-bf-orange focus:border-bf-orange" placeholder={t('adoptionForm.fullNamePlaceholder')} required />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">{t('adoptionForm.email')}</label>
                                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md text-gray-900 py-3 px-4 focus:ring-bf-orange focus:border-bf-orange" placeholder={t('adoptionForm.emailPlaceholder')} required />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">{t('adoptionForm.phone')}</label>
                                        <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md text-gray-900 py-3 px-4 focus:ring-bf-orange focus:border-bf-orange" placeholder={t('adoptionForm.phonePlaceholder')} required />
                                    </div>
                                    <div>
                                        <label htmlFor="homeType" className="block text-sm font-bold text-gray-700 mb-1">{t('adoptionForm.homeType')}</label>
                                        <select id="homeType" value={homeType} onChange={e => setHomeType(e.target.value as AdoptionApplication['homeType'])} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md text-gray-900 py-3 px-4 focus:ring-bf-orange focus:border-bf-orange" required>
                                            <option value="" disabled>Select a type</option>
                                            <option value="apartment">{t('adoptionForm.homeTypeApartment')}</option>
                                            <option value="house">{t('adoptionForm.homeTypeHouse')}</option>
                                            <option value="farm">{t('adoptionForm.homeTypeFarm')}</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-1">{t('adoptionForm.address')}</label>
                                    <textarea id="address" value={address} onChange={e => setAddress(e.target.value)} rows={3} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md text-gray-900 py-3 px-4 focus:ring-bf-orange focus:border-bf-orange" placeholder={t('adoptionForm.addressPlaceholder')} required />
                                </div>
                                <div>
                                    <label htmlFor="otherPets" className="block text-sm font-bold text-gray-700 mb-1">{t('adoptionForm.otherPets')}</label>
                                    <input type="text" id="otherPets" value={otherPets} onChange={e => setOtherPets(e.target.value)} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md text-gray-900 py-3 px-4 focus:ring-bf-orange focus:border-bf-orange" placeholder={t('adoptionForm.otherPetsPlaceholder')} />
                                </div>
                                <div>
                                    <label htmlFor="reason" className="block text-sm font-bold text-gray-700 mb-1">{t('adoptionForm.reason')}</label>
                                    <textarea id="reason" value={reason} onChange={e => setReason(e.target.value)} rows={4} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md text-gray-900 py-3 px-4 focus:ring-bf-orange focus:border-bf-orange" placeholder={t('adoptionForm.reasonPlaceholder')} required />
                                </div>
                                {formError && <p className="text-red-600 font-semibold bg-red-50 p-3 rounded-md border border-red-200">{formError}</p>}
                                <div>
                                    <button type="submit" className="w-full py-4 bg-bf-orange hover:bg-bf-orange-dark text-white font-bold rounded-full transition-all uppercase tracking-wide text-lg shadow-md hover:shadow-lg">{t('adoptionForm.submitButton')}</button>
                                </div>
                            </form>
                         )}
                    </div>
                </div>


                {/* Integration of Image Editor */}
                <div className="border-t border-gray-200 pt-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-bf-slate font-serif">Create the Perfect Adoption Profile</h2>
                        <p className="text-gray-600 mt-2 text-lg">Use our AI tool to enhance photos of our rescues to help them find homes faster.</p>
                    </div>
                    <ImageEditor 
                        originalImage={props.originalImage}
                        setOriginalImage={props.setOriginalImage}
                        editedImage={props.editedImage}
                        prompt={props.prompt}
                        setPrompt={props.setPrompt}
                        onGenerate={props.onGenerate}
                        isLoading={props.isLoading}
                        error={props.error}
                        onClear={props.onClear}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnimalsPage;
