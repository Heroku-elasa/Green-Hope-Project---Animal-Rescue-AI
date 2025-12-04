
import React from 'react';
import { useLanguage } from '../types';

interface Startup {
    logo: string;
    name: string;
    description: string;
    link: string;
    lessons?: string[];
}

const ResearchPage: React.FC = () => {
    const { t } = useLanguage();
    const startups: Startup[] = t('researchPage.startups');

    return (
        <div className="animate-fade-in text-bf-slate">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight">
                        {t('researchPage.title')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t('researchPage.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {startups.map((startup, index) => (
                        <a 
                            key={index} 
                            href={startup.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col sm:flex-row items-start p-6 text-center sm:text-left transition-all hover:shadow-xl hover:border-bf-orange"
                        >
                            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 w-32 h-20 flex items-center justify-center bg-gray-50 rounded-lg p-2">
                                <img src={startup.logo} alt={`${startup.name} logo`} className="max-h-full max-w-full object-contain filter group-hover:contrast-125 transition-all" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-bf-slate group-hover:text-bf-orange transition-colors font-serif">{startup.name}</h3>
                                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{startup.description}</p>
                                
                                {startup.lessons && (
                                    <div className="mt-4 bg-orange-50 p-3 rounded-lg border border-orange-100 text-left rtl:text-right">
                                        <h4 className="text-xs font-bold text-bf-orange uppercase tracking-wide mb-2">{t('researchPage.takeawaysTitle')}</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                            {startup.lessons.map((lesson, i) => (
                                                <li key={i}>{lesson}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResearchPage;
