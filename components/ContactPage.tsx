
import React from 'react';
import { useLanguage } from '../types';

const ContactPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="animate-fade-in text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight">
                        {t('nav.contact')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        We'd love to hear from you. Here's how you can reach us.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700">
                            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                            <div className="space-y-4 text-lg">
                                <div className="flex items-center">
                                    <span className="w-10 text-2xl">📞</span>
                                    <div>
                                        <p className="text-sm text-gray-400">Phone</p>
                                        <p className="font-semibold">{t('footer.phone')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-10 text-2xl">📧</span>
                                    <div>
                                        <p className="text-sm text-gray-400">Email</p>
                                        <p className="font-semibold">{t('footer.email')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-10 text-2xl">📍</span>
                                    <div>
                                        <p className="text-sm text-gray-400">Address</p>
                                        <p className="font-semibold">{t('footer.address')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700">
                             <h3 className="text-2xl font-bold text-white mb-4">FAQ</h3>
                             <div className="space-y-4">
                                <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                        <span>Can I visit the shelter?</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <p className="text-gray-400 mt-3 group-open:animate-fadeIn">
                                        Yes, we have open days on weekends from 10 AM to 4 PM. Please contact us to book a visit.
                                    </p>
                                </details>
                                <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                        <span>Do you accept supply donations?</span>
                                        <span className="transition group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <p className="text-gray-400 mt-3 group-open:animate-fadeIn">
                                        Absolutely. We always need dry food, blankets, and cleaning supplies.
                                    </p>
                                </details>
                             </div>
                         </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700">
                        <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                                <input type="text" id="name" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:ring-pink-500 focus:border-pink-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                                <input type="email" id="email" className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:ring-pink-500 focus:border-pink-500" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                                <textarea id="message" rows={4} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:ring-pink-500 focus:border-pink-500"></textarea>
                            </div>
                            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-md transition-all">
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
