
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Page, UserProfile } from '../types';

interface HeaderProps {
  setPage: (page: Page) => void;
  currentPage: Page;
  user: UserProfile | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ setPage, currentPage, user, onLogout }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const navItems: { page: Page; labelKey: string }[] = [
    { page: 'home', labelKey: 'nav.home' },
    { page: 'about', labelKey: 'nav.about' },
    { page: 'animals', labelKey: 'nav.animals' },
    { page: 'activities', labelKey: 'nav.activities' },
    { page: 'blog', labelKey: 'nav.contentHub' },
    { page: 'support', labelKey: 'nav.support' },
    { page: 'contact', labelKey: 'nav.contact' },
  ];
  
  const handleLanguageChange = (lang: 'en' | 'fa') => {
    setLanguage(lang);
  };
  
  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
  }

  const handleLogoutClick = () => {
    onLogout();
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    if (!user) {
        const renderGoogleButton = (elementId: string) => {
            const element = document.getElementById(elementId);
            // @ts-ignore
            if (element && window.google) {
                // @ts-ignore
                google.accounts.id.renderButton(
                    element,
                    { theme: 'outline', size: 'large', type: 'standard', text: 'signin_with', shape: 'pill' }
                );
            }
        };

        const initAndRender = () => {
            renderGoogleButton('google-signin-button');
            if (isMobileMenuOpen) {
                renderGoogleButton('google-signin-button-mobile');
            }
        }

        // @ts-ignore
        if (window.google) {
            initAndRender();
        } else {
            const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            // FIX: Add type guard to ensure script is HTMLScriptElement before accessing onload.
            if (script instanceof HTMLScriptElement) {
                script.onload = initAndRender;
            }
        }
    }
  }, [user, isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white sticky top-0 z-40 w-full shadow-sm">
      {/* Top Bar (Optional, for "Tertiary Menu" look) */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-100 py-1 text-xs text-gray-500">
          <div className="container mx-auto px-4 lg:px-8 text-right rtl:text-left">
              <span>{t('nav.contact')} | Locations | Shop</span>
          </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            {/* Logo area */}
            <button onClick={() => handleNavClick('home')} className="flex-shrink-0 text-xl md:text-2xl font-bold tracking-tight text-bf-slate hover:text-bf-orange transition-colors font-serif">
              Janpanah Shelter
            </button>
            <nav className="hidden lg:flex lg:ml-8 lg:mr-8 lg:space-x-6 lg:rtl:space-x-reverse">
              {navItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-sm font-bold uppercase tracking-wide transition-colors hover:text-bf-orange ${currentPage === item.page ? 'text-bf-orange' : 'text-gray-700'}`}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
             
             {/* Donate Button - Desktop */}
             <button 
                onClick={() => handleNavClick('support')}
                className="hidden md:block bg-bf-orange hover:bg-bf-orange-dark text-white font-bold py-2 px-6 rounded-full mr-4 rtl:ml-4 rtl:mr-0 text-sm transition-transform hover:scale-105 shadow-sm uppercase tracking-wider"
             >
                {t('nav.donate')}
             </button>

             <div className="flex items-center space-x-2 text-sm mr-4 rtl:mr-0 rtl:ml-4">
                <button onClick={() => handleLanguageChange('en')} className={`px-2 py-1 rounded font-semibold ${language === 'en' ? 'text-bf-orange' : 'text-gray-500 hover:text-bf-orange'}`}>EN</button>
                <button onClick={() => handleLanguageChange('fa')} className={`px-2 py-1 rounded font-semibold ${language === 'fa' ? 'text-bf-orange' : 'text-gray-500 hover:text-bf-orange'}`}>FA</button>
             </div>

             <div className="hidden md:block">
                {user ? (
                    <div className="relative" ref={profileMenuRef}>
                        <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="flex items-center space-x-2 rounded-full hover:ring-2 hover:ring-bf-orange transition-all">
                            <img src={user.picture} alt={user.name} className="w-9 h-9 rounded-full" />
                        </button>
                        {isProfileMenuOpen && (
                            <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-64 bg-white rounded-md shadow-xl z-20 border border-gray-200 animate-fade-in">
                                <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
                                    <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <ul className="py-1 text-gray-700">
                                    <li className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm" onClick={handleLogoutClick}>
                                         <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                        Sign Out
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div id="google-signin-button"></div>
                )}
             </div>
             
             <div className="lg:hidden ml-4 rtl:mr-4 rtl:ml-0">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-bf-orange hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bf-orange"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {navItems.map(item => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left rtl:text-right block px-3 py-2 rounded-md text-base font-bold transition-colors ${currentPage === item.page ? 'bg-gray-50 text-bf-orange' : 'text-gray-700 hover:bg-gray-50 hover:text-bf-orange'}`}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                >
                  {t(item.labelKey)}
                </button>
              ))}
              <button 
                onClick={() => handleNavClick('support')}
                className="w-full text-center block px-3 py-3 mt-4 rounded-md text-base font-bold bg-bf-orange text-white hover:bg-bf-orange-dark shadow-md"
              >
                  {t('nav.donate')}
              </button>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 flex justify-center">
            {user ? (
                 <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                        <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button onClick={handleLogoutClick} className="text-gray-500 hover:text-bf-orange">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </button>
                </div>
            ) : (
                <div id="google-signin-button-mobile"></div>
            )}
            </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
