import React from 'react';
import { useLanguage } from '../types';

interface Startup {
    logo: string;
    name: string;
    description: string;
    link: string;
}

const ResearchPage: React.FC = () => {
    const { t } = useLanguage();
    const startups: Startup[] = t('researchPage.startups');

    return (
        <div className="animate-fade-in text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight">
                        {t('researchPage.title')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{t('researchPage.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {startups.map((startup, index) => (
                        <a 
                            key={index} 
                            href={startup.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group bg-slate-800/70 rounded-lg shadow-lg backdrop-blur-sm border border-slate-700 overflow-hidden flex flex-col sm:flex-row items-center p-6 text-center sm:text-left transition-all hover:border-pink-500/50 hover:bg-slate-800"
                        >
                            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                                <img src={startup.logo} alt={`${startup.name} logo`} className="h-20 w-32 object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-pink-400">{startup.name}</h3>
                                <p className="text-gray-300 text-sm mt-2">{startup.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResearchPage;
