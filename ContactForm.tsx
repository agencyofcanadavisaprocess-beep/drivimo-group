import React, { useState, useEffect } from 'react';
import { addDoc } from 'firebase/firestore';
import { contactsCollection } from '../firebase';
import { servicesData } from '../data/services';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

interface ContactFormProps {
  selectedServiceFilter: string | null;
  setSelectedServiceFilter: (serviceId: string | null) => void;
  lang: 'bn' | 'en';
}

export default function ContactForm({ selectedServiceFilter, setSelectedServiceFilter, lang }: ContactFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Synchronize preselected service filter if any clicked from the dynamic Services pages
  useEffect(() => {
    if (selectedServiceFilter) {
      setSelectedService(selectedServiceFilter);
    } else {
      setSelectedService('');
    }
  }, [selectedServiceFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !message.trim()) return;

    setLoading(true);
    try {
      await addDoc(contactsCollection, {
        fullName: fullName.trim(),
        email: email.trim() || 'N/A',
        phone: phone.trim(),
        companyName: companyName.trim() || 'N/A',
        selectedService: selectedService || 'General Inquiry',
        message: message.trim(),
        status: 'Pending',
        createdAt: new Date().toISOString()
      });

      setSuccess(true);
      // Reset form variables
      setFullName('');
      setEmail('');
      setPhone('');
      setCompanyName('');
      setMessage('');
      setSelectedServiceFilter(null);
    } catch (error) {
      console.error('Error submitting contact message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 md:py-28 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-500 font-semibold bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10">
            {lang === 'bn' ? 'যোগাযোগের মাধ্যম' : 'Contact Us'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white mt-4 tracking-tight">
            {lang === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Let\'s Discuss Your Project'}
          </h2>
          <p className="text-slate-400 mt-4 text-base">
            {lang === 'bn' 
              ? 'ড্রিভিমো গ্রুপের দক্ষ কর্মকর্তাদের সাথে সরাসরি কথা বলতে নিচের ফর্মটি পূরণ করুন অথবা সরাসরি ইমেইল/ফোন নাম্বারে কথা বলুন।'
              : 'Fill out our secured consultation panel to reach and coordinate projects with our team directly.'
            }
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Side: Contact Information Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-full blur-3xl"></div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white font-sans">
                  {lang === 'bn' ? 'ড্রিভিমো প্রধান কার্যালয়' : 'HQ contact Details'}
                </h3>
                <p className="text-slate-400 text-xs mt-1.5">
                  {lang === 'bn' ? 'যেকোনো কর্পোরেট প্রয়োজনের জন্য সরাসরি চলে আসুন আমাদের অফিসে।' : 'Feel free to stop by our corporate desk during standard working hours.'}
                </p>
              </div>

              <div className="space-y-6">
                {/* Physical Location */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/10 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{lang === 'bn' ? 'অফিস ঠিকানা' : 'Office Location'}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {lang === 'bn' 
                        ? 'স্যুট-৪০৫, লেভেল ৪, ড্রিভিমো প্লাজা, বারিধারা ডিওএইচএস, ঢাকা-১২০৬, বাংলাদেশ।'
                        : 'Suite 405, Level 4, Drivimo Plaza, Baridhara DOHS, Dhaka-1206, Bangladesh.'
                      }
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/10 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{lang === 'bn' ? 'হেল্পলাইন নাম্বার' : 'Call Support'}</h4>
                    <p className="text-xs text-slate-300 font-mono mt-1">+৮৮০ ১৮১২-৩৪৫৬৭৮, +৮৮০ ২-৯৮৭৬৫৪</p>
                    <span className="text-[10px] text-emerald-400 mt-1 block">{lang === 'bn' ? '● প্রতিদিন সকাল ৯টা থেকে রাত ৮টা' : '● Active 9 am - 8 pm'}</span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/10 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{lang === 'bn' ? 'ইমেল অ্যাড্রেস' : 'Official Email'}</h4>
                    <p className="text-xs text-slate-300 font-mono mt-1">info@drivimogroup.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Timeline disclaimer banner */}
            <div className="mt-12 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <Clock className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-[10px] text-slate-400 leading-snug">
                {lang === 'bn'
                  ? 'আমাদের প্রতিনিধি ২৪ ঘণ্টার মধ্যে ইমেল অথবা সরাসরি ফোন কলের মাধ্যমে আপনার ফাইলের অগ্রগতি জানিয়ে দেবে।'
                  : 'We respond to custom inquiries within 24 working hours containing structured quotation files.'
                }
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form Module */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
            {success ? (
              // Success triumph state block
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4 animate-in fade-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6 drop-shadow" />
                <h3 className="text-2xl font-bold text-white font-sans">
                  {lang === 'bn' ? 'বার্তাটি সফলভাবে পাঠানো হয়েছে!' : 'Inquiry Submitted successfully!'}
                </h3>
                <p className="text-slate-400 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                  {lang === 'bn'
                    ? 'ধন্যবাদ! ড্রিভিমো গ্রুপ অফ কোম্পানিতে আপনার মূল্যবান বার্তাটি সফলভাবে নিবন্ধিত হয়েছে। আমাদের টিম খুব দ্রুত আপনার সাথে যোগাযোগ করবে।'
                    : 'Your consultation has been securely stored. An automated confirmation ticket has been dispatched.'
                  }
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-8 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-medium rounded-xl text-xs transition-colors border border-slate-700/60"
                >
                  {lang === 'bn' ? 'নতুন আরেকটি মেসেজ পাঠান' : 'Submit Another Message'}
                </button>
              </div>
            ) : (
              // Normal inputs
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {lang === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={lang === 'bn' ? 'যেমন: হাসিবুর রহমান' : 'e.g. Hasibur Rahman'}
                      className="w-full px-4 py-3 bg-slate-950 text-slate-100 placeholder-slate-700 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none transition-all text-xs"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {lang === 'bn' ? 'মোবাইল নাম্বার *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={lang === 'bn' ? 'যেমন: ০১৮১২৩৪৫৬৭৮' : 'e.g. 01812345678'}
                      className="w-full px-4 py-3 bg-slate-950 text-slate-100 placeholder-slate-700 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {lang === 'bn' ? 'ইমেল এড্রেস (ঐচ্ছিক)' : 'Email Address (Optional)'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'bn' ? 'যেমন: example@gmail.com' : 'e.g. contact@gmail.com'}
                      className="w-full px-4 py-3 bg-slate-950 text-slate-100 placeholder-slate-700 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none transition-all text-xs"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {lang === 'bn' ? 'প্রতিষ্ঠানের নাম (ঐচ্ছিক)' : 'Company Name (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={lang === 'bn' ? 'যেমন: ড্রিভিমো ট্রেডার্স' : 'e.g. Drivimo Traders'}
                      className="w-full px-4 py-3 bg-slate-950 text-slate-100 placeholder-slate-700 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none transition-all text-xs"
                    />
                  </div>
                </div>

                {/* Service Dropdowns */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'আগ্রহী সেবাসমূহ নির্বাচন করুন' : 'Interested Corporate Wing'}
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 text-slate-300 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none transition-all text-xs"
                  >
                    <option value="">{lang === 'bn' ? '-- সাধারণ অনুসন্ধান ও প্রশ্ন --' : '-- General Inquiry & Questions --'}</option>
                    {servicesData.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {lang === 'bn' ? svc.title : svc.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'আপনার মেসেজ লিখুন *' : 'Detail Message *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={lang === 'bn' ? 'আপনার প্রয়োজন এবং প্রশ্নের বিস্তারিত লিখুন...' : 'Kindly describe your queries and requirements in detail...'}
                    className="w-full px-4 py-3 bg-slate-950 text-slate-100 placeholder-slate-700 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none transition-all text-xs resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/10 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-xs"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>{lang === 'bn' ? 'বার্তাটি পাঠানো হচ্ছে...' : 'Submitting Inquiry...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'বার্তা পাঠান' : 'Submit message'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
