import React, { useState } from 'react';
import { useLanguage, RescueCampaign } from '../types';
import * as geminiService from '../services/geminiService';

interface BlogGeneratorProps {
    handleApiError: (err: unknown) => string;
    isQuotaExhausted: boolean;
}

const BlogGenerator: React.FC<BlogGeneratorProps> = ({ handleApiError, isQuotaExhausted }) => {
    const { t, direction } = useLanguage();
    const [name, setName] = useState('');
    const [condition, setCondition] = useState('');
    const [needs, setNeeds] = useState('');
    const [tone, setTone] = useState<'Urgent' | 'Hopeful'>('Urgent');
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState<RescueCampaign | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !condition.trim() || !needs.trim()) {
            setError(t('rescueStoryteller.validationError'));
            return;
        }
        setIsLoading(true);
        setError(null);
        setCampaign(null);

        try {
            const result = await geminiService.generateRescueCampaign(name, condition, needs, tone);
            setCampaign(result);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight">
                    {t('rescueStoryteller.title')}
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    {t('rescueStoryteller.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                {/* Input Form */}
                <div className="bg-slate-900/60 rounded-lg p-8 shadow-lg backdrop-blur-sm border border-slate-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">{t('rescueStoryteller.form.nameLabel')}</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full bg-slate-700/80 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-white"
                                placeholder={t('rescueStoryteller.form.namePlaceholder')}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">{t('rescueStoryteller.form.conditionLabel')}</label>
                            <textarea
                                rows={2}
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className="mt-1 block w-full bg-slate-700/80 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-white"
                                placeholder={t('rescueStoryteller.form.conditionPlaceholder')}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">{t('rescueStoryteller.form.needsLabel')}</label>
                            <textarea
                                rows={3}
                                value={needs}
                                onChange={(e) => setNeeds(e.target.value)}
                                className="mt-1 block w-full bg-slate-700/80 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-white"
                                placeholder={t('rescueStoryteller.form.needsPlaceholder')}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">{t('rescueStoryteller.form.toneLabel')}</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setTone('Urgent')}
                                    className={`py-2 px-4 rounded-md text-sm font-medium border-2 transition-colors ${tone === 'Urgent' ? 'border-red-500 bg-red-500/20 text-white' : 'border-slate-600 bg-slate-800 text-gray-400 hover:bg-slate-700'}`}
                                >
                                    {t('rescueStoryteller.form.toneUrgent')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTone('Hopeful')}
                                    className={`py-2 px-4 rounded-md text-sm font-medium border-2 transition-colors ${tone === 'Hopeful' ? 'border-green-500 bg-green-500/20 text-white' : 'border-slate-600 bg-slate-800 text-gray-400 hover:bg-slate-700'}`}
                                >
                                    {t('rescueStoryteller.form.toneHopeful')}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || isQuotaExhausted}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-700 to-pink-700 hover:from-blue-700 hover:to-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : t('rescueStoryteller.form.button')}
                        </button>
                    </form>
                    {error && <div className="mt-4 text-red-400 p-3 bg-red-900/50 rounded-md text-sm">{error}</div>}
                </div>

                {/* Results Display */}
                <div className="space-y-6">
                    {campaign ? (
                        <>
                            {/* Instagram Card */}
                            <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden animate-fade-in">
                                <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 flex justify-between items-center">
                                    <span className="font-bold text-white flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.011-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.262 0-3.67.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                        {t('rescueStoryteller.results.instagram')}
                                    </span>
                                    <button onClick={() => copyToClipboard(campaign.instagramCaption)} className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-white transition-colors">Copy</button>
                                </div>
                                <div className="p-4 text-gray-300 text-sm whitespace-pre-wrap font-sans leading-relaxed" dir={direction}>
                                    {campaign.instagramCaption}
                                </div>
                                <div className="px-4 pb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {campaign.hashtags.map((tag, i) => (
                                            <span key={i} className="text-blue-400 text-xs">#{tag.replace('#', '')}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Telegram Card */}
                            <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden animate-fade-in delay-100">
                                <div className="p-3 bg-blue-600 flex justify-between items-center">
                                    <span className="font-bold text-white flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                                        {t('rescueStoryteller.results.telegram')}
                                    </span>
                                    <button onClick={() => copyToClipboard(campaign.telegramPost)} className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-white transition-colors">Copy</button>
                                </div>
                                <div className="p-4 text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed" dir={direction}>
                                    {campaign.telegramPost}
                                </div>
                            </div>

                            {/* Wishlist Card */}
                            <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden animate-fade-in delay-200">
                                <div className="p-3 bg-slate-700 flex items-center">
                                    <span className="font-bold text-white">{t('rescueStoryteller.results.wishlist')}</span>
                                </div>
                                <ul className="p-4 space-y-2 text-sm text-gray-300">
                                    {campaign.wishlistItems.map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 ml-2"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-slate-900/30 rounded-lg border border-dashed border-slate-700 min-h-[400px]">
                            <p className="text-gray-500">{t('imageEditor.placeholder')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogGenerator;