import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CanadaSection from './components/CanadaSection';
import ServicesSection from './components/ServicesSection';
import WorkerPortal from './components/WorkerPortal';
import ContactForm from './components/ContactForm';
import AdminPanel from './components/AdminPanel';
import { Landmark, FileSearch, ShieldCheck, Mail, ArrowRight, Award } from 'lucide-react';
import bgImage from './assets/images/drivemo_bg_image_1782087471424.jpg';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-955 antialiased relative overflow-x-hidden">
      {/* Dynamic Background Image with sophisticated blend in dark theme */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.16] pointer-events-none z-0 brightness-[0.75]"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Content overlays safely over background */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        {/* Dynamic Navigation Bar */}
        <Navbar 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          lang={lang} 
          setLang={setLang} 
        />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Stunning Hero section */}
            <Hero setCurrentTab={setCurrentTab} lang={lang} />

            {/* Canada Direct Recruitment 2026 Spotlight Section */}
            <CanadaSection 
              setCurrentTab={setCurrentTab} 
              setSelectedServiceFilter={setSelectedServiceFilter} 
              lang={lang} 
            />

            {/* Quick Informative Section (Drivimo Values) */}
            <section className="py-20 bg-slate-900/40 border-t border-b border-slate-900 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Side: Quality banner statement */}
                  <div className="lg:col-span-5 text-left space-y-6">
                    <span className="text-xs uppercase tracking-widest font-mono text-amber-500 font-bold">
                      {lang === 'bn' ? 'আমাদের মূল লক্ষ্য' : 'OUR CORPORATE MISSION'}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                      {lang === 'bn' 
                        ? 'সততা, নিরাপত্তা ও আধুনিকতার মেলবন্ধনে নির্মিত পথচলা' 
                        : 'Forging Paths Built on Integrity, Safety, and Innovation'
                      }
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {lang === 'bn'
                        ? 'ড্রিভিমো গ্রুপ অফ কোম্পানিজ বিশ্বাস করে যে প্রতিটি দীর্ঘমেয়াদী সফলতার মূলমন্ত্র হলো উন্নত গুণমান বজায় রাখা। মালামাল পরিবহন থেকে শুরু করে কর্মী প্রশিক্ষণ ও আধুনিক আবাসন তৈরি—আমরা শতভাগ পেশাদারিত্ব এবং আইনি পরিপালন নিশ্চিত করে আসছি।'
                        : 'Drivimo Group of Companies believes that the cornerstone of long-term failure-proof corporate achievement is consistent quality. From logistical haulages to tech enablement, worker recruitment orientation, and structural designs—we ensure certified adherence to legal processes.'
                      }
                    </p>
                    
                    <div className="pt-4">
                      <button
                        onClick={() => setCurrentTab('services')}
                        className="inline-flex items-center space-x-2 text-sm text-amber-400 hover:text-amber-300 font-semibold"
                      >
                        <span>{lang === 'bn' ? 'আমাদের ব্যবসা উইংসমূহ দেখুন' : 'Explore Business Verticals'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Informational features and steps on Document Search */}
                  <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-left">
                    <div>
                      <h3 className="text-xl font-bold font-sans text-white border-b border-slate-800 pb-3 mb-4 flex items-center space-x-2">
                        <FileSearch className="w-5 h-5 text-amber-400" />
                        <span>{lang === 'bn' ? 'শ্রমিক অনুসন্ধান গাইড' : 'Labor Verification Steps'}</span>
                      </h3>
                      <p className="text-xs text-slate-400 mb-6">
                        {lang === 'bn'
                          ? 'আমাদের সম্মানিত এবং পরিশ্রমী শ্রমিকদের সকল নথিপত্র ডিজিটালভাবে যাচাই করার সহজ নিয়মাবলী:'
                          : 'Our laborers, operators and physical builders can securely cross-check credentials anytime:'
                        }
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          ০১
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-100">{lang === 'bn' ? 'নাম এবং জন্ম তারিখ সংগ্রহ করুন' : 'Retrieve details'}</h4>
                          <p className="text-xs text-slate-400 mt-1">{lang === 'bn' ? 'কোম্পানির ডেটাবেজে যুক্ত ঠিক নামটি সংগ্রহ করুন।' : 'Identify matching Name & Exact Date of Birth.'}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          ০২
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-100">{lang === 'bn' ? 'সার্চ ফর্মে তথ্য দিন' : 'Input data in search fields'}</h4>
                          <p className="text-xs text-slate-400 mt-1">{lang === 'bn' ? 'উপরে সার্চ ফিল্ডে নাম একই স্পেলিংয়ে লিখে সিলেক্ট বক্সে ক্লিক করে ডেট অব বার্থ দিন।' : 'Make sure string spaces are correct.'}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3.5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          ০৩
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-100">{lang === 'bn' ? ' সনদ প্রিন্ট বা ডাউনলোড করুন' : 'Download authenticated document'}</h4>
                          <p className="text-xs text-slate-400 mt-1">{lang === 'bn' ? 'সিস্টেম অটোমেটিক আপনার ভ্যালিডেশন পেপারস ভিউয়ারে নিয়ে যাবে এবং আপনি সহজে প্রিন্ট করতে পারবেন।' : 'Instantly view certifications and launch device print preview frames.'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

          </div>
        )}

        {currentTab === 'services' && (
          <ServicesSection 
            setCurrentTab={setCurrentTab} 
            setSelectedServiceFilter={setSelectedServiceFilter} 
            lang={lang} 
          />
        )}

        {currentTab === 'portal' && (
          <WorkerPortal lang={lang} />
        )}

        {currentTab === 'contact' && (
          <ContactForm 
            selectedServiceFilter={selectedServiceFilter} 
            setSelectedServiceFilter={setSelectedServiceFilter} 
            lang={lang} 
          />
        )}

        {currentTab === 'admin' && (
          <AdminPanel lang={lang} />
        )}
      </main>

      {/* Corporate Styled Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-10 border-b border-slate-900">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-bold text-base shadow">
                  D
                </div>
                <div>
                  <span className="block text-lg font-bold font-sans text-white">
                    {lang === 'bn' ? 'ড্রিভিমো গ্রুপ' : 'Drivimo Group'}
                  </span>
                  <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                    {lang === 'bn' ? 'অফ কোম্পানিজ' : 'Of Companies'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {lang === 'bn'
                  ? 'ড্রিভিমো গ্রুপ অফ কোম্পানিজ বিশ্বস্ততা, সর্বাধুনিক সুযোগ-সুবিধা এবং দেশের অর্থনৈতিক চালিকাশক্তিকে মজবুত করতে বদ্ধপরিকর।'
                  : 'Fostering industrial acceleration across logistical, structural recruitment oriented pipelines with state authorized values.'
                }
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs uppercase font-semibold text-slate-300 tracking-wide font-mono">
                {lang === 'bn' ? 'সহায়ক লিংকসমূহ' : 'Helpful Quicklinks'}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                <button onClick={() => { setCurrentTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 text-left transition-colors font-light">
                  {lang === 'bn' ? 'সেবসমূহ' : 'Our Services'}
                </button>
                <button onClick={() => { setCurrentTab('portal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 text-left transition-colors font-light">
                  {lang === 'bn' ? 'শ্রমিক অনুসন্ধান' : 'Labor Portal'}
                </button>
                <button onClick={() => { setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 text-left transition-colors font-light">
                  {lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact us'}
                </button>
                <button onClick={() => { setCurrentTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 text-left transition-colors font-light">
                  {lang === 'bn' ? 'অ্যাডমিন এরিয়া' : 'HQ Admin'}
                </button>
              </div>
            </div>

            {/* Legal Status badge block */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs uppercase font-semibold text-slate-300 tracking-wide font-mono">
                {lang === 'bn' ? 'নিরাপত্তা ও আইন' : 'Validation Status'}
              </h4>
              <div className="inline-flex items-center space-x-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-[10px] text-slate-300 leading-snug">
                  {lang === 'bn' ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত' : 'Licensed Corporator of Bangladesh'}
                </span>
              </div>
            </div>

          </div>

          {/* Trademarks */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
            <span>© {new Date().getFullYear()} Drivimo Group of Companies. All Rights Reserved.</span>
            <span>Powered by Drivimo Digital IT Wing</span>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
