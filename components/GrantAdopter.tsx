
import React from 'react';
import { Grant, GrantSummary } from '../types';
import { useLanguage } from '../types';

interface GrantAdopterProps {
    grant: Grant;
    isAnalyzing: boolean;
    result: GrantSummary | null;
    error: string | null;
    onClear: () => void;
    onPrepareProposal: (grant: Grant) => void;
}

const SummaryItem: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-gray-100 last:border-0">
        <dt className="text-sm font-bold text-gray-500 uppercase tracking-wide">{label}</dt>
        <dd className="mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2 whitespace-pre-wrap leading-relaxed">{value || 'Not Found'}</dd>
    </div>
);

const RelevanceBadge: React.FC<{ score: number }> = ({ score }) => {
    const { t } = useLanguage();
    const getPillColor = () => {
        if (score >= 75) return 'bg-green-100 text-green-700';
        if (score >= 50) return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    return (
        <div className={`ml-3 inline-flex items-baseline px-3 py-1 rounded-full text-sm font-semibold ${getPillColor()}`}>
            <span className="font-bold text-base">{score}</span>
            <span className="text-sm">%</span>
            <span className="ml-1.5 font-medium">{t('grantAnalyzer.relevance')}</span>
        </div>
    );
};


const GrantAdopter: React.FC<GrantAdopterProps> = ({ grant, isAnalyzing, result, error, onClear, onPrepareProposal }) => {
    const { t } = useLanguage();
    
    const createHtmlForExport = (summary: GrantSummary): string => {
        const content = `
            <h1>${t('grantAnalyzer.export.summaryTitle')}: ${summary.grantTitle}</h1>
            <p><strong>${t('grantAnalyzer.export.officialLink')}:</strong> <a href="${grant.link}">${grant.link}</a></p>
            <p><strong>${t('grantAnalyzer.export.relevance')}:</strong> ${summary.relevancePercentage}%</p>
            <h2>${t('grantAnalyzer.export.details')}</h2>
            <ul>
                <li><strong>${t('grantAnalyzer.export.fundingBody')}:</strong> ${summary.fundingBody}</li>
                <li><strong>${t('grantAnalyzer.export.deadline')}:</strong> ${summary.deadline}</li>
                <li><strong>${t('grantAnalyzer.export.amount')}:</strong> ${summary.amount}</li>
                <li><strong>${t('grantAnalyzer.export.duration')}:</strong> ${summary.duration}</li>
                <li><strong>${t('grantAnalyzer.export.geography')}:</strong> ${summary.geography}</li>
            </ul>
            <h2>${t('grantAnalyzer.export.eligibility')}</h2>
            <p>${summary.eligibility}</p>
            <h2>${t('grantAnalyzer.export.scope')}</h2>
            <p>${summary.scope}</p>
            <h2>${t('grantAnalyzer.export.applicationProcess')}</h2>
            <p>${summary.howToApply}</p>
            <h2>${t('grantAnalyzer.export.contact')}</h2>
            <p>${summary.contact}</p>
        `;

        return `<!DOCTYPE html>
        <html lang="${t('langCode')}">
        <head>
          <meta charset="UTF-8">
          <title>${t('grantAnalyzer.export.summaryTitle')}: ${summary.grantTitle}</title>
          <style>
            body { font-family: 'Open Sans', sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto; color: #333; }
            h1, h2 { font-family: 'Source Serif 4', serif; border-bottom: 1px solid #eee; padding-bottom: 0.3em; color: #3d3d3e; }
            h1 { color: #f58220; }
            ul { padding-left: 20px; list-style-type: none; }
            li { margin-bottom: 0.5em; }
            p { white-space: pre-wrap; }
            a { color: #f58220; text-decoration: none; }
          </style>
        </head>
        <body>
          ${content}
        </body>
        </html>`;
    };
    
    const handlePrint = () => {
        if (!result) return;
        const htmlContent = createHtmlForExport(result);
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    return (
        <section id="grant-analyzer" className="py-12 sm:py-16 animate-fade-in">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-bf-slate flex items-center font-serif">
                        <svg className="h-5 w-5 mx-2 text-teal-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                        {t('grantAnalyzer.title')}: <span className="ml-2 font-normal text-gray-600 truncate">{grant.grantTitle}</span>
                    </h3>
                    <button onClick={onClear} className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" aria-label={t('grantAnalyzer.close')} title={t('grantAnalyzer.close')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-8">
                    {isAnalyzing && (
                        <div className="text-center py-10">
                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-bf-orange mx-auto mb-4"></div>
                            <h4 className="text-lg font-bold text-bf-slate">{t('grantAnalyzer.loadingTitle')}</h4>
                            <p className="text-gray-500 mt-2">{t('grantAnalyzer.loadingSubtitle')}</p>
                        </div>
                    )}
                    {error && <div className="text-red-600 p-4 bg-red-50 rounded-md border border-red-200">{error}</div>}
                    {result && !isAnalyzing && (
                        <div className="animate-fade-in">
                            <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                      <h4 className="text-2xl font-bold text-bf-slate font-serif">{result.grantTitle}</h4>
                                      {typeof result.relevancePercentage === 'number' && <RelevanceBadge score={result.relevancePercentage} />}
                                    </div>
                                    <p className="text-md text-gray-500 mb-2">{t('grantFinder.from')} {result.fundingBody}</p>
                                    <a href={grant.link} target="_blank" rel="noopener noreferrer" className="text-sm text-bf-orange hover:underline inline-flex items-center font-bold">
                                        {t('grantAnalyzer.viewOriginal')}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
                                    </a>
                                </div>
                                <div className="flex space-x-2 flex-shrink-0">
                                     <button onClick={handlePrint} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-bold rounded-md hover:bg-gray-200 transition-colors border border-gray-300" aria-label={t('grantAnalyzer.printPDF')} title={t('grantAnalyzer.printPDF')}>
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v-2a1 1 0 011-1h8a1 1 0 011 1v2h1a2 2 0 002-2v-3a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <dl>
                                    <SummaryItem label={t('grantAnalyzer.deadline')} value={result.deadline} />
                                    <SummaryItem label={t('grantAnalyzer.amount')} value={result.amount} />
                                    <SummaryItem label={t('grantAnalyzer.duration')} value={result.duration} />
                                    <SummaryItem label={t('grantAnalyzer.geography')} value={result.geography} />
                                    <SummaryItem label={t('grantAnalyzer.eligibility')} value={result.eligibility} />
                                    <SummaryItem label={t('grantAnalyzer.scope')} value={result.scope} />
                                    <SummaryItem label={t('grantAnalyzer.howToApply')} value={result.howToApply} />
                                    <SummaryItem label={t('grantAnalyzer.contact')} value={result.contact} />
                                </dl>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => onPrepareProposal(grant)}
                                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-md text-sm font-bold uppercase tracking-wide text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                                >
                                    {t('grantAnalyzer.useForProposal')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GrantAdopter;
