
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage, AppState, Page } from '../types';
import * as geminiService from '../services/geminiService';

// Declare Leaflet global object to avoid TypeScript errors, as it's loaded from a CDN.
declare const L: any;

interface HomePageProps {
  setPage: (page: AppState['page']) => void;
}

const Icon: React.FC<{ iconKey: string; className?: string }> = ({ iconKey, className = "w-12 h-12" }) => {
    const icons: { [key: string]: React.ReactElement } = {
        science: (
            // Paw Icon
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
               <path d="M10.72 5.234c-1.258 0-2.458 1.144-2.458 2.548 0 1.405 1.2 2.549 2.458 2.549 1.257 0 2.458-1.144 2.458-2.55 0-1.403-1.2-2.547-2.458-2.547zM6.505 6.641c-1.11 0-2.012.914-2.012 2.036 0 1.121.902 2.035 2.012 2.035 1.11 0 2.012-.914 2.012-2.035 0-1.122-.902-2.036-2.012-2.036zM3.483 11.238c-.965 0-1.748.794-1.748 1.77 0 .977.783 1.771 1.748 1.771.965 0 1.748-.794 1.748-1.77 0-.977-.783-1.771-1.748-1.771zM14.73 6.641c-1.11 0-2.012.914-2.012 2.036 0 1.121.902 2.035 2.012 2.035 1.11 0 2.012-.914 2.012-2.035 0-1.122-.902-2.036-2.012-2.036zM20.517 11.238c-.965 0-1.748.794-1.748 1.77 0 .977.783 1.771 1.748 1.771.965 0 1.748-.794 1.748-1.77 0-.977-.783-1.771-1.748-1.771zM12 11.451c-2.316 0-4.398 1.185-5.617 3.012-.348.523-.526 1.128-.526 1.737 0 .584.164 1.163.488 1.674 1.24 1.956 3.376 3.126 5.655 3.126 2.279 0 4.415-1.17 5.655-3.126.324-.511.488-1.09.488-1.674 0-.609-.178-1.214-.526-1.737-1.219-1.827-3.3-3.012-5.617-3.012z"></path>
            </svg>
        ),
        grant: (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
        ),
        education: (
            // Chart / Analytics
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
        ),
        consulting: (
            // Heart / Care
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        ),
        publications: (
            // Rescue Icon
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
        ),
        funded: (
             // Home Icon
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
               <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        ),
        collaborations: (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
        ),
        team: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
                 <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        ),
        trained: (
             // Medical/Cross
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        )
    };
    return icons[iconKey] || <div className={className}></div>;
};

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const services: { iconKey: string; title: string; text: string }[] = t('home.services');
  const portfolioItems: { img: string; title: string; link: string; description: string; tags: string[]; latitude: number; longitude: number; }[] = t('home.portfolioItems');
  const achievements: { iconKey: string; count: number; label: string; suffix: string }[] = t('home.achievements');
  const customerLogos: { img: string; alt: string }[] = t('home.customerLogos');
  
  const initialPostsFromT: { img?: string; title: string; date: string; comments: number; link: string }[] = t('home.latestPosts');
  const [latestPosts, setLatestPosts] = useState(initialPostsFromT);

  useEffect(() => {
    let isMounted = true;

    const processPosts = async () => {
      const postsNeedingImages = initialPostsFromT.filter(p => !p.img);
      
      if (postsNeedingImages.length === 0) {
        if (isMounted) {
          setLatestPosts(initialPostsFromT);
        }
        return;
      }

      if (isMounted) {
        setLatestPosts(initialPostsFromT);
      }

      const imagePromises = postsNeedingImages.map(post =>
        geminiService.generateBlogImage(post.title)
          .then(imageUrl => ({ title: post.title, img: imageUrl }))
          .catch(error => {
            console.error(`Failed to generate image for post: "${post.title}"`, error);
            return { title: post.title, img: null };
          })
      );
      
      const generatedImages = await Promise.all(imagePromises);

      const imageMap = new Map<string, string>();
      generatedImages.forEach(result => {
        if (result.img) {
          imageMap.set(result.title, result.img);
        }
      });
      
      if (isMounted) {
        setLatestPosts(currentPosts => {
          return initialPostsFromT.map(post => {
            if (imageMap.has(post.title)) {
              return { ...post, img: imageMap.get(post.title) };
            }
            return post;
          });
        });
      }
    };

    processPosts();

    return () => {
      isMounted = false;
    };
  }, [initialPostsFromT]);


  const servicePageMap: { [key: string]: Page } = {
      science: 'siteSelector',
      grant: 'grant',
      education: 'generator',
      consulting: 'video',
  };
  
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current && typeof L !== 'undefined') {
        const map = L.map(mapRef.current, {
            center: [35.6892, 51.3890], // Center on Tehran
            zoom: 11,
            scrollWheelZoom: false,
            zoomControl: false,
        });
        mapInstanceRef.current = map;

        // Changed to a lighter map style
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 18,
        }).addTo(map);
        
        const mapIconSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#f58220"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 5.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>`;
        const mapIcon = L.icon({
            iconUrl: 'data:image/svg+xml;base64,' + btoa(mapIconSvg),
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        portfolioItems.forEach(item => {
            if (item.latitude && item.longitude) {
                const marker = L.marker([item.latitude, item.longitude], { icon: mapIcon }).addTo(map);
                marker.bindPopup(`<b>${item.title}</b><p>${item.description.substring(0, 100)}...</p>`);
            }
        });
    }
  }, [portfolioItems]);

  return (
    <div className="animate-fade-in text-bf-gray font-sans">
      {/* Splash Hero Section - Replaces Video Hero */}
      <section className="bg-bf-buff">
        <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row h-auto md:h-[600px] lg:h-[700px] overflow-hidden md:rounded-b-3xl shadow-sm">
                {/* Image Side */}
                <div className="md:w-1/2 h-[300px] md:h-full relative overflow-hidden">
                    <img 
                        src={t('hero.imageUrl')} 
                        alt="Rescue Animal" 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2000ms]" 
                    />
                </div>
                {/* Content Side */}
                <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-16 lg:p-20 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-bf-buff rounded-bl-full opacity-50 -mr-16 -mt-16 hidden md:block"></div>
                    
                    <span className="text-bf-orange font-bold uppercase tracking-widest text-sm mb-4 block">
                        Lifesaving, this season and beyond
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-bf-slate font-serif leading-tight mb-6" dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
                    <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                        {t('hero.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => setPage('animals')}
                            className="px-8 py-3 bg-bf-orange hover:bg-bf-orange-dark text-white font-bold rounded-full shadow-md transition-all uppercase tracking-wide flex items-center justify-center group"
                        >
                            {t('hero.button1')}
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:mr-2 rtl:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                        <button
                            onClick={() => handleScrollTo('footer')}
                            className="px-8 py-3 bg-white border-2 border-bf-slate text-bf-slate hover:bg-bf-buff font-bold rounded-full transition-colors uppercase tracking-wide"
                        >
                            {t('hero.button2')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Intro Section - The "Quote" */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote className="text-center max-w-4xl mx-auto relative pl-0 md:pl-12">
                <svg className="hidden md:block absolute left-0 top-0 w-16 h-16 text-bf-orange opacity-20 -translate-y-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00001 15 9.00001 14 9.00001 13C9.00001 12 9.00001 11 9.00001 10H14.017C14.5693 10 15.017 9.55228 15.017 9V3C15.017 2.44772 14.5693 2 14.017 2H5C4.44772 2 4 2.44772 4 3V12C4 16.9706 8.02944 21 13 21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16C16 15 16 14 16 13C16 12 16 11 16 10H21.017C21.5693 10 22.017 9.55228 22.017 9V3C22.017 2.44772 21.5693 2 21.017 2H12C11.4477 2 11 2.44772 11 3V12C11 16.9706 15.0294 21 20 21H21.017Z" /></svg>
                <p className="text-2xl sm:text-3xl lg:text-4xl text-bf-slate font-serif italic leading-relaxed">
                    {t('home.introTitle')}
                </p>
            </blockquote>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-bf-buff">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-bf-slate font-serif">{t('home.servicesTitle')}</h2>
            <div className="w-24 h-1 bg-bf-orange mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <button 
                key={index}
                onClick={() => setPage(servicePageMap[service.iconKey])}
                className="text-center p-8 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
              >
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-bf-buff mx-auto text-bf-orange mb-6 group-hover:bg-bf-orange group-hover:text-white transition-colors duration-300">
                    <Icon iconKey={service.iconKey} className="w-10 h-10"/>
                </div>
                <h3 className="text-xl font-bold text-bf-slate mb-3 group-hover:text-bf-orange transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{service.text}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-bf-slate font-serif">{t('home.portfolioTitle')}</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {portfolioItems.slice(0, 4).map((item, index) => (
                <div key={index} className="group bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-72 w-full overflow-hidden">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                                <span key={tag} className="bg-white/95 backdrop-blur-sm text-bf-slate text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                        <h3 className="text-2xl font-bold text-bf-slate mb-3 group-hover:text-bf-orange transition-colors font-serif">{item.title}</h3>
                        <p className="text-gray-600 mb-6 flex-grow text-base leading-relaxed">{item.description}</p>
                        <a href={item.link} className="inline-flex items-center font-bold text-bf-orange uppercase tracking-wide text-sm hover:underline group-hover:translate-x-1 transition-transform">
                            Read Story <span className="ml-2 rtl:hidden">»</span><span className="mr-2 hidden rtl:inline">«</span>
                        </a>
                    </div>
                </div>
            ))}
          </div>
           <div className="mt-16 text-center">
                <button onClick={() => setPage('projects')} className="px-10 py-3 border-2 border-bf-orange text-bf-orange font-bold rounded-full hover:bg-bf-orange hover:text-white transition-colors uppercase tracking-wide">
                    {t('hero.button1')}
                </button>
           </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-bf-slate text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white font-serif">{t('home.achievementsTitle')}</h2>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center">
                {achievements.map((item, index) => (
                    <div key={index} className="flex flex-col items-center group">
                        <div className="text-bf-orange mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon iconKey={item.iconKey} className="w-12 h-12"/>
                        </div>
                        <p className="text-5xl font-bold text-white mt-2 mb-2 font-serif">{item.count}{item.suffix}</p>
                        <p className="text-sm text-gray-300 uppercase tracking-widest font-bold">{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-20 bg-bf-buff">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-bf-slate font-serif">{t('home.map.title')}</h2>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">{t('home.map.subtitle')}</p>
            </div>
            <div ref={mapRef} className="h-[60vh] w-full rounded-xl bg-white border border-gray-200 shadow-xl overflow-hidden" />
            <div className="mt-12 text-center">
                <button onClick={() => setPage('siteSelector')} className="px-10 py-3 bg-bf-orange text-white font-bold rounded-full shadow-md hover:bg-bf-orange-dark transition-colors uppercase tracking-wide">
                    {t('home.map.button')}
                </button>
           </div>
        </div>
      </section>


      {/* Partners Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">{t('home.customersTitle')}</h2>
            </div>
            <div className="mt-8 flow-root">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {customerLogos.map((logo, index) => (
                        <div key={index} className="flex justify-center w-full">
                            <img className="max-h-12 hover:opacity-100 transition-opacity" src={logo.img} alt={logo.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Blog/Insights Section */}
      <section className="py-20 bg-bf-buff">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-bf-slate font-serif">{t('home.calendarTitle')}</h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {latestPosts.map((post, index) => (
                    <div key={index} className="group flex flex-col overflow-hidden rounded-lg shadow-md bg-white border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex-shrink-0 h-48 w-full bg-gray-200 overflow-hidden relative">
                            {post.img ? (
                               <img className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" src={post.img} alt={post.title} />
                            ) : (
                                <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div className="flex-1">
                                <a href={post.link} className="block">
                                    <p className="text-xl font-bold text-bf-slate group-hover:text-bf-orange transition-colors font-serif leading-tight">{post.title}</p>
                                </a>
                            </div>
                            <div className="mt-6 flex items-center border-t border-gray-100 pt-4 justify-between">
                                <div className="text-sm font-medium text-gray-500">
                                    <time dateTime={post.date}>{post.date}</time>
                                </div>
                                <span className="text-xs font-bold text-bf-orange uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">Read More</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;
