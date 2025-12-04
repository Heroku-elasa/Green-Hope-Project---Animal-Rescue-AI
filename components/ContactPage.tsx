
import React from 'react';
import { useLanguage } from '../types';

const ContactPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="animate-fade-in text-bf-slate">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight">
                        {t('nav.contact')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Here's how you can reach us.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                            <h3 className="text-2xl font-bold text-bf-slate mb-6 font-serif">Get in Touch</h3>
                            <div className="space-y-6 text-lg">
                                <div className="flex items-center group">
                                    <span className="w-12 h-12 flex items-center justify-center bg-orange-100 text-bf-orange rounded-full mr-4 group-hover:bg-bf-orange group-hover:text-white transition-colors">📞</span>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Phone</p>
                                        <p className="font-semibold">{t('footer.phone')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center group">
                                    <span className="w-12 h-12 flex items-center justify-center bg-orange-100 text-bf-orange rounded-full mr-4 group-hover:bg-bf-orange group-hover:text-white transition-colors">📧</span>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Email</p>
                                        <p className="font-semibold">{t('footer.email')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center group">
                                    <span className="w-12 h-12 flex items-center justify-center bg-orange-100 text-bf-orange rounded-full mr-4 group-hover:bg-bf-orange group-hover:text-white transition-colors">📍</span>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Address</p>
                                        <p className="font-semibold">{t('footer.address')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                             <h3 className="text-2xl font-bold text-bf-slate mb-4 font-serif">FAQ</h3>
                             <div className="space-y-4">
                                <details className="group p-4 bg-gray-50 rounded-lg open:bg-white open:shadow-md transition-all">
                                    <summary className="flex justify-between items-center font-bold text-bf-slate cursor-pointer list-none">
                                        <span>Can I visit the shelter?</span>
                                        <span className="transition group-open:rotate-180 text-bf-orange">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <p className="text-gray-600 mt-3 group-open:animate-fadeIn leading-relaxed">
                                        Yes, we have open days on weekends from 10 AM to 4 PM. Please contact us to book a visit.
                                    </p>
                                </details>
                                <details className="group p-4 bg-gray-50 rounded-lg open:bg-white open:shadow-md transition-all">
                                    <summary className="flex justify-between items-center font-bold text-bf-slate cursor-pointer list-none">
                                        <span>Do you accept supply donations?</span>
                                        <span className="transition group-open:rotate-180 text-bf-orange">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <p className="text-gray-600 mt-3 group-open:animate-fadeIn leading-relaxed">
                                        Absolutely. We always need dry food, blankets, and cleaning supplies.
                                    </p>
                                </details>
                             </div>
                         </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
                        <h3 className="text-2xl font-bold text-bf-slate mb-6 font-serif">Send a Message</h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Name</label>
                                <input type="text" id="name" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 text-gray-900 focus:outline-none focus:ring-bf-orange focus:border-bf-orange transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Email</label>
                                <input type="email" id="email" className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 text-gray-900 focus:outline-none focus:ring-bf-orange focus:border-bf-orange transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Message</label>
                                <textarea id="message" rows={4} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 text-gray-900 focus:outline-none focus:ring-bf-orange focus:border-bf-orange transition-colors"></textarea>
                            </div>
                            <button type="submit" className="w-full py-4 bg-bf-orange hover:bg-bf-orange-dark text-white font-bold rounded-full transition-all uppercase tracking-wide shadow-md hover:shadow-lg">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
