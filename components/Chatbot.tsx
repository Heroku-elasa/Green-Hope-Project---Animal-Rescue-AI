
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, ChatMessage } from '../types';
import { marked } from 'marked';

interface ChatbotProps {
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    suggestedPrompts: string[];
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1 p-2">
        <div className="w-2 h-2 bg-bf-orange rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-bf-orange rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-bf-orange rounded-full animate-bounce"></div>
    </div>
);

const Message: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const { direction } = useLanguage();
    const isUser = message.role === 'user';
    const isSystem = message.role === 'system';
    // Colors: User = Blue, System/Bot = White with border
    const bgClass = isUser ? 'bg-blue-600 text-white' : isSystem ? 'bg-gray-100 text-gray-600 italic text-xs text-center mx-auto' : 'bg-white text-gray-800 border border-gray-200 shadow-sm';
    const alignClass = isUser ? 'self-end' : isSystem ? 'self-center w-full' : 'self-start';
    const textAlign = direction === 'rtl' ? (isUser ? 'text-right' : 'text-right') : (isUser ? 'text-left' : 'text-left');
    
    const parsedText = isUser ? message.text : marked.parse(message.text);

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : isSystem ? 'justify-center' : 'justify-start'}`}>
            <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${alignClass} ${bgClass} ${textAlign} animate-fade-in`}>
                {isSystem ? (
                    <span>{message.text}</span>
                ) : (
                    <div 
                        className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : 'prose-slate'}`} 
                        dangerouslySetInnerHTML={{ __html: parsedText as string }}
                    />
                )}
            </div>
        </div>
    );
};

const Chatbot: React.FC<ChatbotProps> = ({ messages, onSendMessage, isLoading, suggestedPrompts }) => {
    const { t, direction } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInput.trim() && !isLoading) {
            onSendMessage(userInput.trim());
            setUserInput('');
        }
    };
    
    const handlePromptClick = (prompt: string) => {
        if (!isLoading) {
            onSendMessage(prompt);
        }
    }

    return (
        <>
            <div dir={direction} className={`chat-window fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] max-w-sm h-[65vh] max-h-[550px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-100 bg-white rounded-t-2xl shadow-sm z-10">
                    <div>
                        <h3 className="font-bold text-bf-slate text-lg">{t('chatbot.title')}</h3>
                        <p className="text-xs text-green-500 flex items-center mt-0.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto space-y-4 chat-messages bg-gray-50">
                    {messages.map((msg, index) => (
                        <Message key={index} message={msg} />
                    ))}
                    {isLoading && <div className="self-start"><TypingIndicator /></div>}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Prompts */}
                {!isLoading && suggestedPrompts.length > 0 && (
                    <div className="flex-shrink-0 p-3 bg-white border-t border-gray-100">
                        <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Suggested:</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestedPrompts.map((prompt, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePromptClick(prompt)}
                                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-bf-orange hover:text-white transition-colors border border-gray-200 animate-fade-in"
                                    style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}


                {/* Input */}
                <form onSubmit={handleFormSubmit} className="flex-shrink-0 p-3 bg-white border-t border-gray-200 flex items-center gap-2 rounded-b-2xl">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={t('chatbot.placeholder')}
                        className="flex-grow bg-gray-100 border-transparent focus:bg-white focus:border-bf-orange rounded-full shadow-inner py-3 px-4 focus:outline-none focus:ring-2 focus:ring-bf-orange/20 text-sm text-gray-800 transition-all"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim()}
                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-bf-orange text-white hover:bg-bf-orange-dark shadow-md disabled:bg-gray-300 disabled:shadow-none transition-all transform hover:scale-105 active:scale-95"
                        aria-label={t('chatbot.send')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={`chatbot-fab fixed bottom-6 right-4 sm:right-8 w-14 h-14 bg-bf-orange text-white rounded-full shadow-xl flex items-center justify-center z-50 hover:bg-bf-orange-dark transition-all duration-300 ${isOpen ? 'rotate-90 bg-gray-600' : ''}`}
                aria-label="Toggle Chatbot"
            >
                {isOpen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        </>
    );
};

export default Chatbot;
