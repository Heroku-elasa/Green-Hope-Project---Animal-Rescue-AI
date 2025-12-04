
import React from 'react';
import { useLanguage } from '../types';
import TeamPage from './TeamPage';

const AboutPage: React.FC = () => {
    const { t } = useLanguage();
    const missionPoints: string[] = t('aboutPage.missionPoints');

    return (
        <div className="animate-fade-in text-bf-slate">
            {/* Mission Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight">
                        {t('nav.about')}
                    </h1>
                </div>

                <div className="max-w-4xl mx-auto space-y-12 text-lg text-gray-600 leading-relaxed">
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
                        <h2 className="text-3xl font-bold text-bf-slate mb-6 font-serif">{t('aboutPage.missionTitle')}</h2>
                        <p className="mb-4">
                            {t('aboutPage.missionText1')}
                        </p>
                        <p className="mb-4">
                            {t('aboutPage.missionText2')}
                        </p>
                        <ul className="list-disc list-inside space-y-2 mt-4 text-gray-600">
                            {missionPoints.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-bold text-bf-orange mb-4 font-serif">{t('aboutPage.historyTitle')}</h3>
                            <p>
                                {t('aboutPage.historyText')}
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-bold text-teal-600 mb-4 font-serif">{t('aboutPage.transparencyTitle')}</h3>
                            <p>
                                {t('aboutPage.transparencyText')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reuse Team Page Content */}
            <TeamPage />
        </div>
    );
};

export default AboutPage;
