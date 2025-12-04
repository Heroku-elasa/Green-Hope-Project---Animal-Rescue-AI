
import React, { useRef, useEffect, useState } from 'react';
import { marked } from 'marked';
import { useLanguage, GroundedResult } from '../types';

interface ReportDisplayProps {
  generatedReport: GroundedResult | null;
  isLoading: boolean;
  error: string | null;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ generatedReport, isLoading, error }) => {
  const { t } = useLanguage();
  const endOfReportRef = useRef<HTMLDivElement>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const [reportHtml, setReportHtml] = useState('');

  const reportText = generatedReport?.text || '';
  const reportSources = generatedReport?.sources || [];

  const isComplete = !isLoading && reportText.length > 0 && !error;

  useEffect(() => {
    if (isLoading) {
      endOfReportRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reportText, isLoading]);

  useEffect(() => {
    let isMounted = true;
    const parseMarkdown = async () => {
      if (reportText) {
        const html = await marked.parse(reportText);
        if (isMounted) setReportHtml(html);
      } else {
        if (isMounted) setReportHtml('');
      }
    };
    parseMarkdown();
    return () => { isMounted = false; };
  }, [reportText]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const downloadFile = (filename: string, content: string | Blob | ArrayBuffer, mimeType: string) => {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setIsExportMenuOpen(false);
  };
  
  const handleDownloadMD = () => {
    downloadFile('report.md', reportText, 'text/markdown;charset=utf-8');
    setIsExportMenuOpen(false);
  };

  const createHtmlContent = async (markdownContent: string) => {
    const parsedHtml = await marked.parse(markdownContent);
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t('reportDisplay.docTitle')}</title>
  <style>
    body { font-family: 'Open Sans', sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto; color: #333; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Source Serif 4', serif; margin-top: 1.5em; margin-bottom: 0.5em; color: #3d3d3e; }
    h1 { border-bottom: 2px solid #f58220; padding-bottom: 0.3em; }
    h2 { border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
    code { font-family: monospace; background-color: #f4f4f4; padding: 0.2em 0.4em; border-radius: 3px; }
    pre { background-color: #f4f4f4; padding: 1em; border-radius: 5px; overflow-x: auto; }
    pre code { background-color: transparent; padding: 0; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f7f6f2; }
    blockquote { color: #666; margin: 0; padding-left: 1em; border-left: 0.25em solid #f58220; }
    ul { padding-left: 20px; }
    a { color: #f58220; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  ${parsedHtml}
</body>
</html>`;
  };
  
  const handleDownloadHTML = async () => {
    const htmlContent = await createHtmlContent(reportText);
    downloadFile('report.html', htmlContent, 'text/html;charset=utf-8');
    setIsExportMenuOpen(false);
  };

  const handlePrint = async () => {
    const htmlContent = await createHtmlContent(reportText);
    const printWindow = window.open('', '_blank');
    if(printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
    setIsExportMenuOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 min-h-[60vh] flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
        <h3 className="text-lg font-bold text-bf-slate font-serif flex items-center" key={isComplete ? 'complete' : 'pending'}>
          {isComplete && (
            <svg className="h-5 w-5 text-green-500 mr-2 animate-fade-in" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {t('reportDisplay.title')}
        </h3>
        {reportText && !isLoading && (
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setIsExportMenuOpen(prev => !prev)}
              className="px-3 py-1 bg-white hover:bg-gray-100 text-bf-slate border border-gray-300 text-sm rounded-md transition-colors flex items-center font-bold"
            >
              {t('reportDisplay.export')}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 border border-gray-200">
                <ul className="py-1 text-gray-700">
                  <li className="px-4 py-2 hover:bg-bf-buff cursor-pointer" onClick={handleCopy}>{t('reportDisplay.copy')}</li>
                  <li className="px-4 py-2 hover:bg-bf-buff cursor-pointer" onClick={handleDownloadMD}>{t('reportDisplay.downloadMD')}</li>
                  <li className="px-4 py-2 hover:bg-bf-buff cursor-pointer" onClick={handleDownloadHTML}>{t('reportDisplay.downloadHTML')}</li>
                  <li className="px-4 py-2 hover:bg-bf-buff cursor-pointer" onClick={handlePrint}>{t('reportDisplay.printPDF')}</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="p-8 prose-docs max-w-none flex-grow overflow-y-auto">
        {error && <div className="text-red-600 p-4 bg-red-50 rounded-md border border-red-200">{error}</div>}
        
        <div dangerouslySetInnerHTML={{ __html: reportHtml }} />

        {reportSources.length > 0 && !isLoading && (
            <div className="mt-8 pt-6 border-t border-gray-200 animate-fade-in">
                <h4 className="font-bold text-bf-slate mb-2 font-serif">{t('grantFinder.sources')}:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {reportSources.map((source, index) => (
                        source.web && (
                            <li key={index}>
                                <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-bf-orange hover:underline" title={source.web.title}>
                                    {source.web.title || source.web.uri}
                                </a>
                            </li>
                        )
                    ))}
                </ul>
            </div>
        )}

        {isLoading && (
           <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-bf-orange"></div>
            <span className="ml-3 text-gray-500 font-medium">{t('reportDisplay.generating')}</span>
          </div>
        )}

        {!isLoading && !reportText && !error && (
            <div className="text-center text-gray-400 py-16">
                <p className="text-lg">{t('reportDisplay.placeholder1')}</p>
                <p className="text-sm">{t('reportDisplay.placeholder2')}</p>
            </div>
        )}
        <div ref={endOfReportRef} />
      </div>
    </div>
  );
};

export default ReportDisplay;
