import React from 'react';
import { 
  PlaneTakeoff, 
  PhoneCall, 
  Users, 
  Calendar, 
  BadgeCheck, 
  ChevronRight, 
  Tractor, 
  Factory, 
  Milk, 
  Hammer, 
  ShieldCheck, 
  Heart, 
  Utensils, 
  ChefHat, 
  GlassWater, 
  Home, 
  Coins, 
  Layers, 
  Contact, 
  Car, 
  Sparkles, 
  Package,
  Award,
  AlertCircle
} from 'lucide-react';

interface CanadaSectionProps {
  setCurrentTab: (tab: string) => void;
  setSelectedServiceFilter: (serviceId: string | null) => void;
  lang: 'bn' | 'en';
}

export default function CanadaSection({ setCurrentTab, setSelectedServiceFilter, lang }: CanadaSectionProps) {
  const helplineNumber = '+12498971772';

  // Professional mapping for jobs with premium badges
  const jobs = [
    { nameBn: 'খামার কর্মী (FARM WORKER)', nameEn: 'FARM WORKER', icon: Tractor, category: 'Agriculture' },
    { nameBn: 'কারখানা কর্মী (FACTORY WORKER)', nameEn: 'FACTORY WORKER', icon: Factory, category: 'Industrial' },
    { nameBn: 'গো-খামার কর্মী (COW FARM WORKER)', nameEn: 'COW FARM WORKER', icon: Milk, category: 'Agriculture' },
    { nameBn: 'সাধারণ লেবার (GENERAL LABOUR)', nameEn: 'GENERAL LABOUR', icon: Hammer, category: 'Construction' },
    { nameBn: 'নিরাপত্তা রক্ষী (SECURITY GUARD)', nameEn: 'SECURITY GUARD', icon: ShieldCheck, category: 'Security' },
    { nameBn: 'কেয়ারগিভার (CAREGIVER)', nameEn: 'CAREGIVER', icon: Heart, category: 'Healthcare' },
    { nameBn: 'ওয়েটার / ওয়েট্রেস (WAITER | WAITRESS)', nameEn: 'WAITER | WAITRESS', icon: Utensils, category: 'Hospitality' },
    { nameBn: 'শেফ / বাবুর্চি (CHEF)', nameEn: 'CHEF', icon: ChefHat, category: 'Hospitality' },
    { nameBn: 'ডিশওয়াশার (DISHWASHER)', nameEn: 'DISHWASHER', icon: GlassWater, category: 'Hospitality' },
    { nameBn: 'হাউসকিপার (HOUSEKEEPER)', nameEn: 'HOUSEKEEPER', icon: Home, category: 'Hospitality' },
    { nameBn: 'ক্যাশিয়ার (CASHIER)', nameEn: 'CASHIER', icon: Coins, category: 'Retail' },
    { nameBn: 'স্টোরকিপার (STOREKEEPER)', nameEn: 'STOREKEEPER', icon: Layers, category: 'Retail' },
    { nameBn: 'অফিস বয় / গার্ল (OFFICE BOY | GIRL)', nameEn: 'OFFICE BOY | GIRL', icon: Contact, category: 'Corporate' },
    { nameBn: 'ড্রাইভার (DRIVER)', nameEn: 'DRIVER', icon: Car, category: 'Logistics' },
    { nameBn: 'ক্লিনার (CLEANER)', nameEn: 'CLEANER', icon: Sparkles, category: 'Services' },
    { nameBn: 'প্যাকিং কর্মী (PACKING WORKER)', nameEn: 'PACKING WORKER', icon: Package, category: 'Industrial' }
  ];

  const handleInquire = () => {
    setSelectedServiceFilter('canada-recruitment-2026');
    setCurrentTab('contact');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-950/80 border-t border-slate-900">
      {/* Decorative glows */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-14">
        
        {/* Flag badge & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 mb-6 animate-pulse">
            <span className="text-lg">🇨🇦</span>
            <span className="text-xs font-semibold tracking-wide uppercase font-mono">
              {lang === 'bn' ? 'কানাডা নিয়োগ ২০২৬ - ২০২৭' : 'CANADA DIRECT RECRUITMENT 2026 - 2027'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {lang === 'bn' ? (
              <>
                কানাডা ওয়ার্ক পারমিট ভিসা – <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent">২০২৬ এর সুবর্ণ সুযোগ!</span>
              </>
            ) : (
              <>
                Canada Work Permit – <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent">2026 Golden Opportunity!</span>
              </>
            )}
          </h2>

          <p className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed">
            {lang === 'bn' ? (
              <>
                আপনার কি কানাডায় কাজ করার স্বপ্ন আছে? কানাডায় <span className="text-amber-400 font-bold">DRIVEMO GROUP OF COMPANY</span> ২০২৬–২০২৭ সালের মধ্যে বিভিন্ন খাতে দক্ষ ও অদক্ষ প্রায় <span className="text-red-400 font-bold underline">১৫ লক্ষ কর্মী</span> নিয়োগের ঐতিহাসিক ঘোষণা দিয়েছে।
              </>
            ) : (
              <>
                Dreaming of working in Canada? <span className="text-amber-400 font-bold">DRIVEMO GROUP OF COMPANY</span> has officially announced premium pathways to recruit approximately <span className="text-red-400 font-bold underline">1.5 Million workers</span> across multiple C&D domains for 2026-2027.
              </>
            )}
          </p>
        </div>

        {/* C&D Category Jobs Grid */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-10 mb-16 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-amber-500 font-bold">
                {lang === 'bn' ? 'সি ও ডি ক্যাটাগরির চাকরি' : 'C&D OCCUPATIONAL LIST'}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
                {lang === 'bn' ? 'আবেদনযোগ্য ১৬টি প্রধান খাত:' : '16 Eligible Open Trades:'}
              </h3>
            </div>
            
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-ping"></span>
              <span>{lang === 'bn' ? 'সরাসরি আবেদন গ্রহণ চলছে' : 'Accepting Applications Now'}</span>
            </div>
          </div>

          {/* Job cards container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {jobs.map((job, idx) => {
              const IconComp = job.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative p-5 rounded-2xl bg-slate-950 border border-slate-800/60 hover:border-red-500/30 hover:bg-slate-900/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-900 group-hover:bg-red-500/10 rounded-xl text-slate-400 group-hover:text-red-400 transition-colors border border-slate-800/40">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider font-bold text-slate-500 uppercase bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                      #{idx + 1}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500/80 font-bold mb-1 block">
                      {job.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors leading-snug">
                      {lang === 'bn' ? job.nameBn : job.nameEn}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits & Official Visa Assurance Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left: Benefits & Perks */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2 border-b border-slate-800 pb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>{lang === 'bn' ? 'বিশেষ সুযোগ-সুবিধাসমূহ:' : 'Direct Corporate Benefits & Perks:'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/50">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center font-bold mb-3">✓</div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {lang === 'bn' ? 'উচ্চ আয়ের নিশ্চয়তা' : 'High Guaranteed Wages'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {lang === 'bn' ? 'বৈধ সরকারি স্কেল অনুযায়ী মাসিক আকর্ষণীয় বেতন ব্যবস্থা।' : 'Secure premium high scale earnings based on your job tier.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/50">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center font-bold mb-3">✓</div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {lang === 'bn' ? 'থাকার ও খাবারের সুযোগ' : 'Company Food & Lodging'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {lang === 'bn' ? 'নিরাপদ আবাসন এবং স্বাস্থ্যকর খাবারের সম্পূর্ণ ব্যবস্থা।' : 'Worry-free fully arranged housing options near your workspace.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/50">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center font-bold mb-3">✓</div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {lang === 'bn' ? 'ভিসা প্রসেসিংয়ে পূর্ণ সহায়তা' : 'Visa Processing Assistance'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {lang === 'bn' ? 'হাইকমিশন অনুমোদিত প্রক্রিয়ায় ফাইল সাবমিশন সহায়তা।' : 'Guided processing support with transparent document submission.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/50">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center font-bold mb-3">✓</div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {lang === 'bn' ? 'PR (স্থায়ী বসবাস) সুযোগ' : 'PR (Permanent Residence) Path'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {lang === 'bn' ? 'আইন ও শর্তানুযায়ী কানাডায় স্থায়ী বসবাসের চমৎকার সুযোগ।' : 'Pathways to PR for eligible candidates who meet criteria.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/60 text-xs text-slate-400 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                {lang === 'bn' ? 'যোগ্যতা এবং শর্ত পূরণ সাপেক্ষে স্থায়ী বসবাসের (PR) আবেদন করা সম্ভব।' : 'PR requests are strictly subject to standard Canadian immigration eligibility frameworks.'}
              </span>
            </div>
          </div>

          {/* Right: Security & Professional Voice Announcement */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-red-950/20 border border-red-500/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-red-400 font-bold bg-red-950/30 px-3 py-1 rounded-full border border-red-900/30">
                <Award className="w-4 h-4 text-red-500" />
                <span>{lang === 'bn' ? 'হাইকমিশনের অনুমোদিত প্রক্রিয়া' : 'HIGH COMMISSION RATIFIED'}</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {lang === 'bn' ? (
                  <>
                    হাইকমিশনের অনুমোদিত প্রক্রিয়ায় সম্পূর্ণ কাজ করা হয়
                  </>
                ) : (
                  <>
                    Processed Completely via Authorized High Commission Routines
                  </>
                )}
              </h3>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{lang === 'bn' ? (
                    'আমাদের প্রতিটি কাজ অত্যন্ত স্বচ্ছ এবং পেশাদারিত্বের সাথে করা হয়। পুরুষের কথা শুনলেই আসল সত্যতা, ভরসা আর আস্থার পূর্ণ নির্ভরযোগ্যতা প্রকাশ পায়।'
                  ) : (
                    'Every step is built on transparent operations and rigorous legality. Hearing our experts clarify the pathways will reveal the reliable core structure of Drivimo.'
                  )}&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80">
              <p className="text-xs text-slate-400 mb-3 block">
                {lang === 'bn' ? 'আমাদের গ্লোবাল হেল্পলাইন (IMO) নম্বর:' : 'Instant Direct Global Helpline (IMO):'}
              </p>
              
              <a 
                href={`tel:${helplineNumber}`}
                className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 rounded-2xl transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase leading-none">IMO HELPLINE</span>
                    <span className="text-base font-extrabold text-blue-400 font-mono tracking-wider">{helplineNumber}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />
              </a>
            </div>
          </div>

        </div>

        {/* Dual Call to Actions (Contact Directly or Apply Online) */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto bg-slate-900/40 p-4 border border-slate-850 rounded-2xl">
          <button
            onClick={handleInquire}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-bold rounded-xl active:scale-95 transition-all text-sm flex items-center justify-center space-x-2 shrink-0 shadow-lg shadow-red-500/10"
          >
            <PlaneTakeoff className="w-5 h-5" />
            <span>
              {lang === 'bn' ? 'সরাসরি আবেদন ইভেন্ট ফর্ম পূরণ করুন' : 'Submit Direct Recruitment Inquiry'}
            </span>
          </button>

          <a
            href={`https://wa.me/12498971772`}
            target="_blank"
            referrerPolicy="no-referrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-950 text-amber-500 hover:text-amber-400 border border-slate-800 hover:border-slate-700 font-medium rounded-xl active:scale-95 transition-all text-sm text-center"
          >
            {lang === 'bn' ? 'ইমো/হোয়াটসঅ্যাপে চ্যাট করুন' : 'Chat via IMO/WhatsApp'}
          </a>
        </div>

      </div>
    </section>
  );
}
