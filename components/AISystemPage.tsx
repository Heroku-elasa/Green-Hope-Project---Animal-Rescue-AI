import React from 'react';
import { useLanguage } from '../types';

interface AIModule {
    id: number;
    name: string;
    goal: string;
    inputs: string;
    outputs: string;
    prompt_example: string;
}

const AISystemPage: React.FC = () => {
    const { t, language } = useLanguage();
    const modules: AIModule[] = t('aiSystemPage.modules');

    const getModuleProp = (module: any, prop: keyof AIModule) => {
        // A helper to get the correct language property from the module object
        // The structure from types.ts is already flattened, so we just access it.
        return module[prop];
    };

    return (
        <div className="animate-fade-in text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 tracking-tight">
                        {t('aiSystemPage.title')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">{t('aiSystemPage.subtitle')}</p>
                </div>

                <div className="space-y-12">
                    {modules.map((module) => (
                        <div key={module.id} className="bg-slate-800/70 rounded-lg shadow-lg backdrop-blur-sm border border-slate-700 overflow-hidden">
                            <div className="p-6 bg-slate-900/50 border-b border-slate-700">
                                <h2 className="text-2xl font-bold text-pink-400">
                                    Module {module.id}: {language === 'fa' ? module.name : module.name}
                                </h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-white text-lg mb-2">{t('aiSystemPage.sections.goal')}</h3>
                                        <p className="text-gray-300 text-sm">{language === 'fa' ? module.goal : module.goal}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-lg mb-2">{t('aiSystemPage.sections.inputs')}</h3>
                                        <pre className="bg-slate-900/50 p-4 rounded-md text-sm text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                                            <code>{language === 'fa' ? module.inputs : module.inputs}</code>
                                        </pre>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-white text-lg mb-2">{t('aiSystemPage.sections.outputs')}</h3>
                                        <pre className="bg-slate-900/50 p-4 rounded-md text-sm text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                                            <code>{language === 'fa' ? module.outputs : module.outputs}</code>
                                        </pre>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-lg mb-2">{t('aiSystemPage.sections.prompt')}</h3>
                                        <pre className="bg-slate-900/50 p-4 rounded-md text-sm text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                                            <code>{language === 'fa' ? module.prompt_example : module.prompt_example}</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AISystemPage;