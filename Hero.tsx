import { Landmark, FileSearch, ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  lang: 'bn' | 'en';
}

export default function Hero({ setCurrentTab, lang }: HeroProps) {
  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-transparent">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>

      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge Indicator */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-400 mb-6 font-mono tracking-wide">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          <span>{lang === 'bn' ? 'শতভাগ বিশ্বস্ত ও সরকারি অনুমোদনপ্রাপ্ত সংস্থা' : '100% Trusted & Govt. Approved Organization'}</span>
        </div>

        {/* Main H1 Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          {lang === 'bn' ? (
            <>
              স্বাগতম, <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent">
                ড্রিভিমো গ্রুপ অফ কোম্পানিজ
              </span>
            </>
          ) : (
            <>
              Welcome to, <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent">
                Drivimo Group of Companies
              </span>
            </>
          )}
        </h1>

        {/* Explanatory Paragraph */}
        <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed">
          {lang === 'bn' 
            ? 'পরিবহন ও লজিস্টিকস, রিয়েল এস্টেট ও কনস্ট্রাকশন, দক্ষ কর্মী সরবরাহ, এগ্রো ফুডস এবং ডিজিটাল আইটি সলিউশন সহ বহুমুখী শিল্প উদ্যোগে আমরা দেশজুড়ে আস্থার সাথে কাজ করে যাচ্ছি।'
            : 'We operate across multiple industrial frontiers with premium services spanning Transport & Logistics, Real Estate Construction, Skilled Manpower Recruiting, organic Agro processing, and advanced digital IT solutions.'
          }
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
          <button
            onClick={() => setCurrentTab('services')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-semibold rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-base flex items-center justify-center space-x-2"
          >
            <span>{lang === 'bn' ? 'আমাদের সেবাসমূহ' : 'Explore Services'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setCurrentTab('portal')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700/60 font-medium rounded-xl active:scale-95 transition-all text-base flex items-center justify-center space-x-2 shadow-inner"
          >
            <FileSearch className="w-5 h-5" />
            <span>{lang === 'bn' ? 'শ্রমিক ডকুমেন্ট অনুসন্ধান করুন' : 'Verify Labor Documents'}</span>
          </button>
        </div>

        {/* Feature stats card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/60 transition-all flex items-start space-x-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-sans">
                {lang === 'bn' ? '২৫+' : '25+'}
              </h3>
              <p className="text-sm font-semibold text-amber-400 mt-0.5">
                {lang === 'bn' ? 'সাফল্যমণ্ডিত প্রকল্প' : 'Completed Projects'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'bn' ? 'নির্ধারিত সময়ে নিখুঁত নির্মাণ ও সফল সরবরাহ।' : 'Flawless timelines on structures and nationwide fulfillment.'}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/60 transition-all flex items-start space-x-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-sans">
                {lang === 'bn' ? '১০,০০০+' : '10,000+'}
              </h3>
              <p className="text-sm font-semibold text-amber-400 mt-0.5">
                {lang === 'bn' ? 'দক্ষ শ্রম জনশক্তি' : 'Recruited Workers'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'bn' ? 'নিরাপদ ডেটাবেজে নিবন্ধিত ও সরকারি ছাড়পত্র প্রাপ্ত।' : 'Registered workers database equipped with quick search portals.'}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/60 transition-all flex items-start space-x-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-sans">
                {lang === 'bn' ? '২৪/৭ গ্রাহক সেবা' : '24/7 Client Desk'}
              </h3>
              <p className="text-sm font-semibold text-amber-400 mt-0.5">
                {lang === 'bn' ? 'উৎসর্গীকৃত ব্যাকআপ সাপোর্ট' : 'Active Query Panel'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'bn' ? 'নিখুঁত গ্রাহক কন্টাক্ট এবং ইনস্ট্যান্ট প্রসেসিং।' : 'Online dynamic inquiry management for rapid response cycles.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
