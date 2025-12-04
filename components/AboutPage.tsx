
import React from 'react';
import { useLanguage } from '../types';
import TeamPage from './TeamPage';

const AboutPage: React.FC = () => {
    const { t } = useLanguage();

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
                        <h2 className="text-3xl font-bold text-bf-slate mb-6 font-serif">Mission Statement & Values</h2>
                        <p className="mb-4">
                            At Janpanah, we operate on a core philosophy: <strong>We are therapists for animals first.</strong> Our primary mission is to treat injured animals that have no other supporter.
                        </p>
                        <p className="mb-4">
                            We believe in the <strong>"Cycle of Kindness"</strong> (چرخه محبت). Kindness exists in everyone, regardless of background or belief. Our role is to nurture this kindness through education, example, and direct action.
                        </p>
                        <ul className="list-disc list-inside space-y-2 mt-4 text-gray-600">
                            <li><strong>Treatment First:</strong> Medical care for the injured is our top priority.</li>
                            <li><strong>Culture Building:</strong> Changing societal views on stray animals.</li>
                            <li><strong>Sterilization over Elimination:</strong> Humane population control.</li>
                        </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-bold text-bf-orange mb-4 font-serif">Our History</h3>
                            <p>
                                Founded by Monireh Safari, Janpanah began as a small initiative to help injured strays in Tehran. Over the years, it has grown into a comprehensive shelter and treatment center, pioneering the use of technology and community engagement to save lives.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-bold text-teal-600 mb-4 font-serif">Financial Transparency</h3>
                            <p>
                                We believe trust is the foundation of charity. Our financial reports are regularly audited and available for review. We ensure that every donation goes directly towards the medical care, food, and shelter of our animals.
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
