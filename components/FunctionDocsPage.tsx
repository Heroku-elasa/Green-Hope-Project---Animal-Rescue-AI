
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

const FunctionDocsPage: React.FC = () => {
    const [markdown, setMarkdown] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const response = await fetch('/function-documentation.md');
                if (!response.ok) {
                    throw new Error(`Failed to fetch documentation: ${response.statusText}`);
                }
                const text = await response.text();
                const html = await marked.parse(text);
                setMarkdown(html);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocs();
    }, []);

    return (
        <div className="animate-fade-in text-bf-slate">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif tracking-tight">
                        Function Documentation
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        This page provides a technical overview of the application's core functions and services.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    {isLoading && <p className="text-gray-500">Loading documentation...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {!isLoading && !error && (
                        <div className="prose-docs" dangerouslySetInnerHTML={{ __html: markdown }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FunctionDocsPage;
