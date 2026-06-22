import { useState, useEffect } from 'react';
import { Menu, X, Landmark, FileText, Phone, Award, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
}

export default function Navbar({ currentTab, setCurrentTab, lang, setLang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', labelBn: 'নীড়পাতা', labelEn: 'Home', icon: Landmark },
    { id: 'services', labelBn: 'সেবাসমূহ', labelEn: 'Services', icon: Award },
    { id: 'portal', labelBn: 'শ্রমিক অনুসন্ধান', labelEn: 'Worker Portal', icon: FileText },
    { id: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact Us', icon: Phone },
    { id: 'admin', labelBn: 'অ্যাডমিন', labelEn: 'Admin Area', icon: ShieldAlert },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg py-2' 
        : 'bg-slate-950/80 backdrop-blur-sm border-b border-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-xl flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              D
            </div>
            <div>
              <span className="block text-xl font-bold font-sans tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {lang === 'bn' ? 'ড্রিভিমো গ্রুপ' : 'Drivimo Group'}
              </span>
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                {lang === 'bn' ? 'অফ কোম্পানিজ' : 'Of Companies'}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/15 to-yellow-500/10 text-amber-400 border border-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                </button>
              );
            })}

            {/* Language Switcher */}
            <div className="h-6 w-[1px] bg-slate-800 mx-2"></div>
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/40 text-xs font-mono text-amber-400 hover:bg-slate-800 hover:text-amber-300 transition-colors"
            >
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 text-xs font-mono text-amber-400"
            >
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-200">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-400 border-l-4 border-amber-500'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <IconComp className="w-5 h-5 text-slate-400" />
                <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
