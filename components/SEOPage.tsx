
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
        <div className="animate-fade-in text-bf-slate">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight">
                        {t('seoPage.title')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{t('seoPage.subtitle')}</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Technical SEO Section */}
                    <section>
                        <div className="p-8 bg-white rounded-xl shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-pink-600 mb-3 font-serif">{t('seoPage.technical.title')}</h2>
                            <p className="text-gray-500 mb-6 text-sm">{t('seoPage.technical.description')}</p>
                            <div className="space-y-4">
                                {technicalItems.map((item, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <h3 className="font-bold text-bf-slate">{item.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    
                    {/* Content SEO Section */}
                    <section>
                        <div className="p-8 bg-white rounded-xl shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-teal-600 mb-3 font-serif">{t('seoPage.content.title')}</h2>
                            <p className="text-gray-500 mb-6 text-sm">{t('seoPage.content.description')}</p>
                            <div className="space-y-4">
                                {contentItems.map((item, index) => (
                                     <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <h3 className="font-bold text-bf-slate">{item.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Analytics Section */}
                    <section>
                        <div className="p-8 bg-white rounded-xl shadow-md border border-gray-200">
                            <h2 className="text-2xl font-bold text-blue-600 mb-3 font-serif">{t('seoPage.analytics.title')}</h2>
                            <p className="text-gray-500 mb-6 text-sm">{t('seoPage.analytics.description')}</p>
                             <div className="space-y-4">
                                {analyticsItems.map((item, index) => (
                                     <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <h3 className="font-bold text-bf-slate">{item.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.text}</p>
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
