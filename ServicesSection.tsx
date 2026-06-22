import { useState } from 'react';
import { Truck, Building2, Users, Leaf, Cpu, CheckCircle2, ArrowRight, ArrowLeft, MailOpen, Award, PlaneTakeoff } from 'lucide-react';
import { servicesData } from '../data/services';
import { Service } from '../types';

interface ServicesSectionProps {
  setCurrentTab: (tab: string) => void;
  setSelectedServiceFilter: (serviceId: string | null) => void;
  lang: 'bn' | 'en';
}

const iconMap: Record<string, any> = {
  Truck: Truck,
  Building2: Building2,
  Users: Users,
  Leaf: Leaf,
  Cpu: Cpu,
  PlaneTakeoff: PlaneTakeoff,
};

export default function ServicesSection({ setCurrentTab, setSelectedServiceFilter, lang }: ServicesSectionProps) {
  const [activeServicePage, setActiveServicePage] = useState<Service | null>(null);

  const handleInquireService = (service: Service) => {
    setSelectedServiceFilter(service.id);
    setCurrentTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeServicePage) {
    const IconComponent = iconMap[activeServicePage.iconName] || Award;
    return (
      <div className="pt-24 pb-16 bg-slate-950 min-h-screen text-slate-100 animate-in fade-in slide-in-from-bottom-6 duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb / Back button */}
          <button
            onClick={() => setActiveServicePage(null)}
            className="group inline-flex items-center space-x-2 text-sm text-amber-500 hover:text-amber-400 font-medium mb-8 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'bn' ? 'সব সেবাসমূহে ফিরে যান' : 'Back to all services'}</span>
          </button>

          {/* Service Title Block */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-slate-800 pb-8">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20 shadow-lg shadow-amber-500/5">
                <IconComponent className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-amber-500">{lang === 'bn' ? 'বিশেষায়িত সেবা' : 'Core Business Wing'}</span>
                <h1 className="text-3xl md:text-4xl font-bold font-sans text-white mt-1">
                  {lang === 'bn' ? activeServicePage.title : activeServicePage.titleEn}
                </h1>
              </div>
            </div>
          </div>

          {/* Service Display Image */}
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-2xl border border-slate-800">
            <img
              src={activeServicePage.imageUrl}
              alt={activeServicePage.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          </div>

          {/* Detailed Paragraph Text */}
          <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-lg leading-relaxed mb-10">
            <p>{lang === 'bn' ? activeServicePage.description : activeServicePage.descriptionEn}</p>
          </div>

          {/* Dynamic Core Features Bullet List */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 mb-10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <span>{lang === 'bn' ? 'আমাদের অনন্য বৈশিষ্ট্যসমূহ' : 'Our Key Deliverables'}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(lang === 'bn' ? activeServicePage.features : activeServicePage.featuresEn).map((feat, index) => (
                <div key={index} className="flex items-start space-x-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800/40">
                  <div className="mt-1 w-2 h-2 rounded-full bg-amber-400 shrink-0"></div>
                  <span className="text-slate-300 text-sm leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-tr from-slate-900 to-amber-950/20 border border-amber-500/10">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                {lang === 'bn' ? 'এই সেবার কাজ শুরু করতে চান?' : 'Ready to work with us?'}
              </h4>
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'ইনস্ট্যান্ট রিকোয়েস্ট পাঠান, আমাদের অভিজ্ঞ টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।' : 'Submit an inquiry form, and our representative will reach back in 24 hours.'}
              </p>
            </div>
            
            <button
              onClick={() => handleInquireService(activeServicePage)}
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95 transition-all text-sm"
            >
              <MailOpen className="w-4 h-4" />
              <span>{lang === 'bn' ? 'এই সেবার জন্য যোগাযোগ করুন' : 'Request Consultation'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 md:py-28 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-500 font-semibold bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10">
            {lang === 'bn' ? 'ড্রিভিমো অপারেশনস' : 'Corporate Divisions'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white mt-4 tracking-tight">
            {lang === 'bn' ? 'আমাদের উন্নত সেবাসমূহ' : 'Our Specialized Services'}
          </h2>
          <p className="text-slate-400 mt-4 text-base">
            {lang === 'bn' 
              ? 'ড্রিভিমো গ্রুপ প্রতিটি ক্যাটাগরিতে বিশ্বস্ততা, সর্বাধুনিক প্রযুক্তি ও অভিজ্ঞ জনবল দিয়ে একটি সফল সমাধান নিশ্চিত করে থাকে।'
              : 'Empowering diverse operations through unparalleled trust, modern equipment, and highly vetted professionals.'
            }
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.iconName] || Cpu;
            return (
              <div 
                key={service.id}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/30 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Visual Image Header */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-6 bg-slate-800 border border-slate-800">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 p-3 bg-slate-950/80 backdrop-blur-md text-amber-400 rounded-xl border border-slate-800">
                    <IconComponent className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                {/* Info block */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white font-sans group-hover:text-amber-400 transition-colors">
                    {lang === 'bn' ? service.title : service.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mt-2 font-light leading-relaxed">
                    {lang === 'bn' ? service.shortDesc : service.shortDescEn}
                  </p>
                </div>

                {/* Primary CTA list */}
                <div className="mt-auto pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  {/* Read More dynamic detail page button */}
                  <button
                    onClick={() => {
                      setActiveServicePage(service);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-amber-400 group-hover:text-amber-300 flex items-center space-x-1 hover:underline"
                  >
                    <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore Service'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleInquireService(service)}
                    className="px-3.5 py-1.5 rounded-lg text-[11px] bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-slate-950 font-mono transition-colors border border-slate-700/40"
                  >
                    {lang === 'bn' ? 'অনুরোধ পাঠান' : 'Quick Inquiry'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
