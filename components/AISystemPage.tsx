
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
        <div className="animate-fade-in text-bf-slate">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight">
                        {t('aiSystemPage.title')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{t('aiSystemPage.subtitle')}</p>
                </div>

                <div className="space-y-12">
                    {modules.map((module) => (
                        <div key={module.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="p-6 bg-gray-50 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-bf-orange font-serif">
                                    Module {module.id}: {language === 'fa' ? module.name : module.name}
                                </h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-bf-slate text-lg mb-2">{t('aiSystemPage.sections.goal')}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{language === 'fa' ? module.goal : module.goal}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-bf-slate text-lg mb-2">{t('aiSystemPage.sections.inputs')}</h3>
                                        <pre className="bg-gray-50 border border-gray-200 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap font-mono overflow-x-auto shadow-sm">
                                            <code>{language === 'fa' ? module.inputs : module.inputs}</code>
                                        </pre>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-bf-slate text-lg mb-2">{t('aiSystemPage.sections.outputs')}</h3>
                                        <pre className="bg-gray-50 border border-gray-200 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap font-mono overflow-x-auto shadow-sm">
                                            <code>{language === 'fa' ? module.outputs : module.outputs}</code>
                                        </pre>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-bf-slate text-lg mb-2">{t('aiSystemPage.sections.prompt')}</h3>
                                        <pre className="bg-gray-50 border border-gray-200 p-4 rounded-md text-sm text-gray-700 whitespace-pre-wrap font-mono overflow-x-auto shadow-sm">
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
