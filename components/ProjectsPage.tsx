
import React from 'react';
import { useLanguage } from '../types';

interface Project {
    img: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
}

const ProjectsPage: React.FC = () => {
    const { t } = useLanguage();
    const projects: Project[] = t('home.portfolioItems');

    return (
        <div className="animate-fade-in text-bf-slate">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight">
                        {t('projectsPage.title')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t('projectsPage.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {projects.map((project, index) => (
                        <div key={index} className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-64 w-full ken-burns-container overflow-hidden">
                                <img src={project.img} alt={project.title} className="ken-burns-image" />
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold text-bf-slate mb-2 font-serif group-hover:text-bf-orange transition-colors">{project.title}</h3>
                                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-bf-buff text-bf-slate text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
