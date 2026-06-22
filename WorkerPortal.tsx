import React, { useState } from 'react';
import { getDocs, query, where } from 'firebase/firestore';
import { workersCollection } from '../firebase';
import { WorkerDocument } from '../types';
import { Search, FileCheck, Calendar, User, Eye, Download, Printer, ShieldCheck, AlertCircle, Landmark } from 'lucide-react';

interface WorkerPortalProps {
  lang: 'bn' | 'en';
}

export default function WorkerPortal({ lang }: WorkerPortalProps) {
  const [searchName, setSearchName] = useState('');
  const [searchDob, setSearchDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<WorkerDocument[]>([]);
  const [activeDoc, setActiveDoc] = useState<WorkerDocument | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim() || !searchDob) return;

    setLoading(true);
    setSearched(true);
    setActiveDoc(null);
    setResults([]);

    try {
      // Direct query on dateOfBirth to narrow down precisely
      const q = query(workersCollection, where('dateOfBirth', '==', searchDob));
      const querySnapshot = await getDocs(q);
      
      const foundDocs: WorkerDocument[] = [];
      const normalizedQueryName = searchName.toLowerCase().replace(/\s+/g, '');

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Omit<WorkerDocument, 'id'>;
        const normalizedWorkerName = data.workerName.toLowerCase().replace(/\s+/g, '');
        
        // Exact name contains check or loose equal check
        if (normalizedWorkerName.includes(normalizedQueryName) || normalizedQueryName.includes(normalizedWorkerName)) {
          foundDocs.push({
            id: docSnap.id,
            ...data
          });
        }
      });

      setResults(foundDocs);
      if (foundDocs.length > 0) {
        setActiveDoc(foundDocs[0]);
      }
    } catch (error) {
      console.error('Error fetching worker docs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-20 md:py-28 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Portal Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex p-3 bg-amber-500/10 text-amber-400 rounded-2xl mb-4 border border-amber-500/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-sans text-white">
            {lang === 'bn' ? 'শ্রমিক তথ্য ও ডকুমেন্ট পোর্টাল' : 'Laborer Document verification Portal'}
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            {lang === 'bn' 
              ? 'আপনার দেওয়া কোম্পানি-নিবন্ধিত পুরো নাম এবং জন্ম তারিখ সঠিক উপায়ে দিয়ে আপনার এনআইডি, পাসপোর্ট, চুক্তিপত্র বা ভিসা সম্পর্কিত নথিপত্র অনুসন্ধান করুন।'
              : 'Provide your company-registered full name and Date of Birth to search and verify your profile, visa, contract status or other documents.'
            }
          </p>
        </div>

        {/* Search Panel Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg mx-auto mb-16 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                {lang === 'bn' ? 'শ্রমিকের পূর্ণ নাম (বাংলা/ইংরেজি)' : 'Laborer Name (Bangla/English)'}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? ' যেমন: Md. Kamal Hossain' : 'e.g. Md. Kamal Hossain'}
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-950 text-slate-100 placeholder-slate-600 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none transition-all text-sm font-sans"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                {lang === 'bn' 
                  ? '*কোম্পানি নথিপত্রে যেভাবে নাম দেওয়া আছে ঠিক সেভাবেই লিখুন।' 
                  : '*Provide matching characters as stated in your official registration papers.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                {lang === 'bn' ? 'জন্ম তারিখ নির্বাচন করুন' : 'Select Date of Birth'}
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <input
                  type="date"
                  required
                  value={searchDob}
                  onChange={(e) => setSearchDob(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none transition-all text-sm font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/10 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-sm"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>{lang === 'bn' ? 'অনুসন্ধান করা হচ্ছে...' : 'Searching archives...'}</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>{lang === 'bn' ? 'ডকুমেন্ট অনুসন্ধান করুন' : 'Search Documents'}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Block */}
        {searched && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-300">
            {results.length === 0 ? (
              // No documents found warning
              <div className="text-center p-12 bg-slate-900/30 border border-slate-800/80 rounded-3xl max-w-xl mx-auto">
                <AlertCircle className="w-12 h-12 text-rose-500/80 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white font-sans">
                  {lang === 'bn' ? 'কোনো তথ্য পাওয়া যায়নি' : 'No Records Found'}
                </h3>
                <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  {lang === 'bn'
                    ? 'দুঃখিত! আপনার দেওয়া নাম অথবা জন্ম তারিখ কোম্পানির নিবন্ধিত ডাটাবেজে সঠিক পাওয়া যায়নি। অনুগ্রহ করে স্পেলিং পরীক্ষা করে আবারও চেষ্টা করুন।'
                    : 'We could not locate any registered document with the provided details. Please check spelling or consult company HR team.'
                  }
                </p>
              </div>
            ) : (
              // Documents Found Grid Display
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Document List (If multiple matched) */}
                <div className="lg:col-span-4 space-y-3">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-4 px-1">
                    {lang === 'bn' ? `মোট পাওয়া গেছে: ${results.length} টি নথি` : `Search hits: ${results.length} Document(s)`}
                  </h3>
                  {results.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setActiveDoc(doc)}
                      className={`p-4 rounded-2xl border cursor-pointer text-left transition-all ${
                        activeDoc?.id === doc.id
                          ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                          : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs uppercase font-mono px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-amber-400 font-bold shrink-0">
                          {doc.documentType}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          doc.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                          doc.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white mt-3 truncate">{doc.documentTitle}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">ID: {doc.employeeId || 'N/A'}</p>
                    </div>
                  ))}
                </div>

                {/* Right Side: Active Document Viewer (Designed like high-security certificate paper) */}
                {activeDoc && (
                  <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
                    
                    {/* Header Controls for Print / Copy */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-semibold text-slate-200">{lang === 'bn' ? 'নথি ভিউয়ার' : 'Document Viewer'}</span>
                      </div>
                      <button
                        onClick={handlePrint}
                        className="p-2 bg-slate-950 text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors flex items-center space-x-1 text-xs"
                      >
                        <Printer className="w-4 h-4" />
                        <span className="hidden sm:inline">{lang === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
                      </button>
                    </div>

                    {/* Highly stylized digital validation card */}
                    <div id="printable-area" className="bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-amber-500/20 p-6 md:p-8 rounded-2xl relative shadow-md text-left">
                      
                      {/* Stylized background Watermark */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none text-center">
                        <Landmark className="w-64 h-64 text-amber-500 mx-auto" />
                        <span className="text-5xl font-sans font-bold uppercase tracking-widest block mt-4">DRIVIMO</span>
                      </div>

                      {/* Document Seal / Watermark Accent */}
                      <div className="absolute top-4 right-4 text-[10px] font-mono p-1 bg-amber-500/5 text-amber-500 border border-amber-500/10 rounded uppercase">
                        {lang === 'bn' ? 'পরীক্ষিত ও ডিজিটালভাবে সিল করা' : 'E-Verified Digital Record'}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        {/* Worker Details Column */}
                        <div>
                          <h4 className="text-[10px] uppercase tracking-wider font-mono text-amber-500 font-bold mb-3">
                            {lang === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Profile'}
                          </h4>
                          
                          <div className="space-y-3.5">
                            <div>
                              <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'শ্রমিকের নাম' : 'Full Name'}</span>
                              <span className="text-sm font-bold text-white">{activeDoc.workerName}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'জন্ম তারিখ' : 'Date of Birth'}</span>
                              <span className="text-sm font-medium text-slate-200">{activeDoc.dateOfBirth}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'পদবী / কাজ' : 'Designation / Role'}</span>
                              <span className="text-sm font-medium text-slate-200">{activeDoc.designation || 'General Staff'}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'শ্রমিক আইডি' : 'ID Number'}</span>
                              <span className="text-xs font-mono text-slate-300">{activeDoc.employeeId || 'Unassigned'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Document Details Column */}
                        <div>
                          <h4 className="text-[10px] uppercase tracking-wider font-mono text-amber-500 font-bold mb-3">
                            {lang === 'bn' ? 'অনুমোদন ও নথিপত্রের তথ্য' : 'Document Metadata'}
                          </h4>

                          <div className="space-y-3.5">
                            <div>
                              <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'ডকুমেন্টের ধরন' : 'Document Class'}</span>
                              <span className="inline-block text-xs uppercase font-semibold text-white px-2 py-0.5 mt-1 bg-amber-500/20 border border-amber-500/30 rounded">
                                {activeDoc.documentType}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'নথির শিরোনাম' : 'Document Title'}</span>
                              <span className="text-sm font-bold text-white">{activeDoc.documentTitle}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'পাসপোর্ট / এনআইডি নম্বর' : 'Passport / NID Ref.'}</span>
                              <span className="text-xs font-mono text-slate-300">{activeDoc.passportNid || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'ডকুমেন্ট নম্বর / আইডি' : 'Doc Reference Reg No.'}</span>
                              <span className="text-xs font-mono text-slate-300">{activeDoc.documentNumber || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timestamps Row */}
                      <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 mt-6 relative z-10 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'ইস্যুর তারিখ' : 'Issue Date'}</span>
                          <span className="text-slate-200">{activeDoc.issueDate || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'মেয়াদোত্তীর্ণের তারিখ' : 'Expiry Date'}</span>
                          <span className={`font-semibold ${
                            activeDoc.status === 'Expired' ? 'text-rose-400' : 'text-slate-200'
                          }`}>{activeDoc.expiryDate || 'Lifelong / Persistent'}</span>
                        </div>
                      </div>

                      {/* Description Panel */}
                      {activeDoc.description && (
                        <div className="mt-4 border-t border-slate-800/80 pt-4 relative z-10">
                          <span className="text-[10px] text-slate-500 block mb-1">{lang === 'bn' ? ' বিবরণ ও বিশেষ দ্রষ্টব্য' : 'Descriptions & Terms'}</span>
                          <p className="text-xs text-slate-400 leading-relaxed font-light">{activeDoc.description}</p>
                        </div>
                      )}

                      {/* Base64 Attachment Preview if uploaded */}
                      {activeDoc.fileData && (
                        <div className="mt-6 border-t border-slate-800/80 pt-4 relative z-10">
                          <span className="text-[10px] text-slate-500 block mb-2">{lang === 'bn' ? 'সংযুক্ত নথির চিত্র / প্রিভিউ' : 'Attached Digital Document'}</span>
                          <div className="w-full bg-slate-950/40 border border-slate-800 rounded-xl p-2 flex items-center justify-center overflow-hidden">
                            {activeDoc.fileType?.startsWith('image/') || activeDoc.fileData.includes('data:image/') ? (
                              <img
                                src={activeDoc.fileData}
                                alt={activeDoc.fileName || "document file"}
                                className="max-h-64 object-contain rounded-lg"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="p-6 text-center text-xs text-slate-400">
                                <FileCheck className="w-8 h-8 text-amber-500/40 mx-auto mb-2 animate-bounce" />
                                <span>{activeDoc.fileName || 'Attached Binary File (Encrypted)'}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Anchor download for image/file */}
                          <div className="mt-2 text-right">
                            <a
                              href={activeDoc.fileData}
                              download={activeDoc.fileName || `document-${activeDoc.id}`}
                              className="inline-flex items-center space-x-1.5 text-[10px] text-amber-400 hover:text-amber-300 font-mono"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{lang === 'bn' ? 'সংযুক্ত ফাইল ডাউনলোড করুন' : 'Download Attachment'}</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
