
import React from 'react';
import { useLanguage, Page } from '../types';

interface ActivitiesPageProps {
    setPage: (page: Page) => void;
}

interface ActivityItem {
    title: string;
    desc: string;
    iconKey: string;
    cta?: string;
}

const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const items: ActivityItem[] = t('activitiesPage.items');

    const renderIcon = (key: string) => {
        switch (key) {
            case 'medical': return <span className="text-4xl">🏥</span>;
            case 'cat': return <svg className="w-12 h-12 text-bf-orange" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 5.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>;
            case 'grant': return <span className="text-4xl">💰</span>;
            case 'planner': return <span className="text-4xl">📋</span>;
            case 'video': return <span className="text-4xl">🎥</span>;
            case 'map': return <span className="text-4xl">🗺️</span>;
            case 'research': return <span className="text-4xl">🔬</span>;
            case 'ai': return <span className="text-4xl">🤖</span>;
            default: return null;
        }
    };

    const getAction = (key: string) => {
        switch (key) {
            case 'grant': return () => setPage('grant');
            case 'planner': return () => setPage('generator');
            case 'video': return () => setPage('video');
            case 'map': return () => setPage('siteSelector');
            case 'research': return () => setPage('research');
            case 'ai': return () => setPage('aiSystem');
            default: return null;
        }
    };

    const colors = [
        "border-orange-200 hover:bg-orange-50",
        "border-orange-200 hover:bg-orange-50",
        "border-green-200 hover:bg-green-50",
        "border-blue-200 hover:bg-blue-50",
        "border-purple-200 hover:bg-purple-50",
        "border-teal-200 hover:bg-teal-50",
        "border-indigo-200 hover:bg-indigo-50",
        "border-pink-200 hover:bg-pink-50"
    ];

    return (
        <div className="animate-fade-in text-bf-slate">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight mb-4">
                        {t('nav.activities')}
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                        Combining compassionate care with cutting-edge technology. Explore our field operations and the digital tools that power them.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((activity, idx) => (
                        <div key={idx} className={`bg-white p-8 rounded-xl border-2 ${colors[idx % colors.length]} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col`}>
                            <div className="mb-6 flex justify-center">{renderIcon(activity.iconKey)}</div>
                            <h3 className="text-xl font-bold text-bf-slate mb-3 font-serif text-center">{activity.title}</h3>
                            <p className="text-gray-600 mb-8 flex-grow leading-relaxed text-center">{activity.desc}</p>
                            {activity.cta && (
                                <button 
                                    onClick={getAction(activity.iconKey) || undefined}
                                    className="w-full py-3 px-4 bg-bf-slate hover:bg-bf-orange text-white rounded-full font-bold transition-colors flex items-center justify-center uppercase tracking-wide text-sm"
                                >
                                    {activity.cta}
                                    <svg className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivitiesPage;
