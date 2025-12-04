import React from 'react';
import { useLanguage } from '../types';

interface SEOItem {
    title: string;
    text: string;
}

const SEOPage: React.FC = () => {
    const { t } = useLanguage();
    
    const technicalItems: SEOItem[] = t('seoPage.technical.items');
    const contentItems: SEOItem[] = t('seoPage.content.items');
    const analyticsItems: SEOItem[] = t('seoPage.analytics.items');

    return (
        <div className="animate-fade-in text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight">
                        {t('seoPage.title')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">{t('seoPage.subtitle')}</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Technical SEO Section */}
                    <section>
                        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                            <h2 className="text-2xl font-bold text-pink-400 mb-3">{t('seoPage.technical.title')}</h2>
                            <p className="text-gray-400 mb-6 text-sm">{t('seoPage.technical.description')}</p>
                            <div className="space-y-4">
                                {technicalItems.map((item, index) => (
                                    <div key={index} className="p-4 bg-slate-900/50 rounded-md">
                                        <h3 className="font-semibold text-white">{item.title}</h3>
                                        <p className="text-gray-300 text-sm mt-1">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    
                    {/* Content SEO Section */}
                    <section>
                        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                            <h2 className="text-2xl font-bold text-teal-400 mb-3">{t('seoPage.content.title')}</h2>
                            <p className="text-gray-400 mb-6 text-sm">{t('seoPage.content.description')}</p>
                            <div className="space-y-4">
                                {contentItems.map((item, index) => (
                                     <div key={index} className="p-4 bg-slate-900/50 rounded-md">
                                        <h3 className="font-semibold text-white">{item.title}</h3>
                                        <p className="text-gray-300 text-sm mt-1">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Analytics Section */}
                    <section>
                        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                            <h2 className="text-2xl font-bold text-blue-400 mb-3">{t('seoPage.analytics.title')}</h2>
                            <p className="text-gray-400 mb-6 text-sm">{t('seoPage.analytics.description')}</p>
                             <div className="space-y-4">
                                {analyticsItems.map((item, index) => (
                                     <div key={index} className="p-4 bg-slate-900/50 rounded-md">
                                        <h3 className="font-semibold text-white">{item.title}</h3>
                                        <p className="text-gray-300 text-sm mt-1">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SEOPage;