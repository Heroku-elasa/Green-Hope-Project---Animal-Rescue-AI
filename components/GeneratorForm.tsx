
import React from 'react';
import { REPORT_TYPES } from '../constants';
import { useLanguage } from '../types';

interface GeneratorFormProps {
  onGenerate: (topic: string, description: string, reportType: string) => void;
  isLoading: boolean;
  isComplete: boolean;
  topic: string;
  description: string;
  reportType: string;
  setTopic: (value: string) => void;
  setDescription: (value: string) => void;
  setReportType: (value: string) => void;
  isQuotaExhausted: boolean;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ 
  onGenerate, 
  isLoading, 
  isComplete,
  topic,
  description,
  reportType,
  setTopic,
  setDescription,
  setReportType,
  isQuotaExhausted
}) => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !description.trim()) {
      alert(t('generatorForm.validationError'));
      return;
    }
    onGenerate(topic, description, reportType);
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-bf-slate font-serif">{t('generatorForm.title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="reportType" className={`block text-sm font-bold uppercase tracking-wide text-gray-700 mb-2 relative transition-colors duration-500 ${isComplete ? 'strikethrough-animated' : ''}`}>{t('generatorForm.docType')}</label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-bf-orange focus:border-bf-orange sm:text-sm text-gray-900"
          >
            {REPORT_TYPES.map(option => (
              <option key={option.value} value={option.value}>
                {t(`reportTypes.${option.value}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="topic" className={`block text-sm font-bold uppercase tracking-wide text-gray-700 mb-2 relative transition-colors duration-500 ${isComplete ? 'strikethrough-animated' : ''}`}>{t('generatorForm.topic')}</label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-bf-orange focus:border-bf-orange sm:text-sm text-gray-900"
            placeholder={t('generatorForm.topicPlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="description" className={`block text-sm font-bold uppercase tracking-wide text-gray-700 mb-2 relative transition-colors duration-500 ${isComplete ? 'strikethrough-animated' : ''}`}>{t('generatorForm.description')}</label>
          <textarea
            id="description"
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-bf-orange focus:border-bf-orange sm:text-sm text-gray-900"
            placeholder={t('generatorForm.descriptionPlaceholder')}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading || isQuotaExhausted}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-md text-sm font-bold uppercase tracking-wide text-white bg-bf-orange hover:bg-bf-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bf-orange disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : isQuotaExhausted ? t('quotaErrorModal.title') : t('generatorForm.buttonText')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneratorForm;
