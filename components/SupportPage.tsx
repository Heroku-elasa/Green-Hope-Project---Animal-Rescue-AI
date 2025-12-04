
import React from 'react';
import { useLanguage, Page } from '../types';

interface SupportPageProps {
    setPage: (page: Page) => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ setPage }) => {
    const { t } = useLanguage();

    return (
        <div className="animate-fade-in text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 tracking-tight">
                        {t('nav.support')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Your kindness keeps our doors open. Every contribution directly saves a life.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Donation Section */}
                    <div className="bg-slate-800/60 p-8 rounded-2xl border border-pink-500/30 shadow-xl">
                        <div className="flex items-center mb-6">
                            <span className="text-4xl mr-4">💝</span>
                            <h2 className="text-3xl font-bold text-white">{t('nav.donate')}</h2>
                        </div>
                        <p className="text-gray-300 mb-6 text-lg">
                            We rely entirely on public support. Your donation provides:
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-8 text-gray-300">
                            <li>Emergency surgeries for accident victims</li>
                            <li>Vaccinations and sterilization</li>
                            <li>Daily food and shelter maintenance</li>
                        </ul>
                        <div className="space-y-4">
                            <button className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xl rounded-xl shadow-lg transition-transform hover:scale-105">
                                Donate via Card
                            </button>
                            <button className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg rounded-xl transition-colors">
                                Corporate Sponsorship
                            </button>
                        </div>
                    </div>

                    {/* Volunteer Section */}
                    <div className="bg-slate-800/60 p-8 rounded-2xl border border-blue-500/30 shadow-xl flex flex-col">
                        <div className="flex items-center mb-6">
                            <span className="text-4xl mr-4">🤝</span>
                            <h2 className="text-3xl font-bold text-white">Volunteer</h2>
                        </div>
                        <p className="text-gray-300 mb-6">
                            Time is as valuable as money. Join our team of dedicated volunteers.
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-8 text-gray-300 flex-grow">
                            <li>Walk dogs and socialize cats</li>
                            <li>Clean kennels and maintenance</li>
                            <li>Assist with adoption events</li>
                            <li>Transport animals to vet appointments</li>
                        </ul>
                         <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                            Apply to Volunteer
                        </button>
                    </div>
                </div>

                {/* Rescue Storyteller Link */}
                <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Help Us Tell Their Stories</h3>
                    <p className="text-gray-300 mb-6">
                        We use AI to craft compelling stories for animals in critical need. You can help by generating a campaign for a specific animal you know.
                    </p>
                    <button 
                        onClick={() => setPage('blog')}
                        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-colors"
                    >
                        Use Rescue Storyteller Tool
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
