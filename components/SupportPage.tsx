
import React from 'react';
import { useLanguage, Page } from '../types';

interface SupportPageProps {
    setPage: (page: Page) => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ setPage }) => {
    const { t } = useLanguage();

    const donationItems: string[] = t('supportPage.donation.items');
    const volunteerItems: string[] = t('supportPage.volunteer.items');

    return (
        <div className="animate-fade-in text-bf-slate">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight">
                        {t('nav.support')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('supportPage.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Donation Section */}
                    <div className="bg-white p-8 rounded-2xl border border-bf-orange/20 shadow-xl flex flex-col">
                        <div className="flex items-center mb-6 text-bf-orange">
                            <span className="text-4xl mr-4 rtl:mr-0 rtl:ml-4">💝</span>
                            <h2 className="text-3xl font-bold font-serif">{t('nav.donate')}</h2>
                        </div>
                        <p className="text-gray-600 mb-6 text-lg">
                            {t('supportPage.donation.description')}
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-8 text-gray-600 flex-grow">
                            {donationItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <div className="space-y-4">
                            <button className="w-full py-4 bg-bf-orange hover:bg-bf-orange-dark text-white font-bold text-xl rounded-full shadow-lg transition-transform hover:scale-105 uppercase tracking-wide">
                                {t('supportPage.donation.buttonCard')}
                            </button>
                            <button className="w-full py-4 bg-white border-2 border-bf-slate text-bf-slate hover:bg-gray-50 font-bold text-lg rounded-full transition-colors uppercase tracking-wide">
                                {t('supportPage.donation.buttonCorporate')}
                            </button>
                        </div>
                    </div>

                    {/* Volunteer Section */}
                    <div className="bg-white p-8 rounded-2xl border border-blue-200 shadow-xl flex flex-col">
                        <div className="flex items-center mb-6 text-blue-600">
                            <span className="text-4xl mr-4 rtl:mr-0 rtl:ml-4">🤝</span>
                            <h2 className="text-3xl font-bold font-serif">{t('supportPage.volunteer.title')}</h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            {t('supportPage.volunteer.description')}
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-8 text-gray-600 flex-grow">
                            {volunteerItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                         <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors uppercase tracking-wide">
                            {t('supportPage.volunteer.button')}
                        </button>
                    </div>
                </div>

                {/* Rescue Storyteller Link */}
                <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 text-center shadow-md">
                    <h3 className="text-2xl font-bold text-bf-slate mb-4 font-serif">{t('supportPage.storyteller.title')}</h3>
                    <p className="text-gray-600 mb-6">
                        {t('supportPage.storyteller.description')}
                    </p>
                    <button 
                        onClick={() => setPage('blog')}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-colors uppercase tracking-wide"
                    >
                        {t('supportPage.storyteller.button')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
