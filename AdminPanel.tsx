import React, { useState, useEffect } from 'react';
import { getDocs, addDoc, deleteDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { workersCollection, contactsCollection, db } from '../firebase';
import { WorkerDocument, ContactMessage } from '../types';
import { servicesData } from '../data/services';
import { 
  Lock, KeyRound, ShieldAlert, FileText, Plus, PhoneCall, Trash2, 
  UploadCloud, Search, Calendar, FileCheck, Check, AlertCircle, RefreshCw 
} from 'lucide-react';

interface AdminPanelProps {
  lang: 'bn' | 'en';
}

const ADMIN_PASSCODE = 'DrivimoAdmin2026';

export default function AdminPanel({ lang }: AdminPanelProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Active module tabs inside admin: 'docs' | 'inquiries'
  const [activeSubTab, setActiveSubTab] = useState<'docs' | 'inquiries'>('docs');

  // Workers state
  const [workers, setWorkers] = useState<WorkerDocument[]>([]);
  const [loadingWorkers, setLoadingWorkers] = useState(false);
  const [workerSearch, setWorkerSearch] = useState('');

  // Form states to create worker document
  const [workerName, setWorkerName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [passportNid, setPassportNid] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [designation, setDesignation] = useState('');
  const [documentType, setDocumentType] = useState<WorkerDocument['documentType']>('Visa');
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [status, setStatus] = useState<WorkerDocument['status']>('Active');
  const [description, setDescription] = useState('');
  const [base64File, setBase64File] = useState<string>('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [isSubmittingDoc, setIsSubmittingDoc] = useState(false);
  const [docFeedback, setDocFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  // Inquiries State
  const [inquiries, setInquiries] = useState<ContactMessage[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  useEffect(() => {
    // Look at localStorage session persistence
    const savedSession = localStorage.getItem('drivimo_admin_active');
    if (savedSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWorkers();
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setLoginError(false);
      localStorage.setItem('drivimo_admin_active', 'true');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('drivimo_admin_active');
    setPasscode('');
  };

  // Fetch Workers docs
  const fetchWorkers = async () => {
    setLoadingWorkers(true);
    try {
      const q = query(workersCollection, orderBy('uploadedAt', 'desc'));
      const snapshot = await getDocs(q);
      const docsList: WorkerDocument[] = [];
      snapshot.forEach((docSnap) => {
        docsList.push({ id: docSnap.id, ...docSnap.data() } as WorkerDocument);
      });
      setWorkers(docsList);
    } catch (error) {
      console.error('Error listing workers:', error);
    } finally {
      setLoadingWorkers(false);
    }
  };

  // Fetch Inquiries
  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const q = query(contactsCollection, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const list: ContactMessage[] = [];
      snapshot.forEach((snap) => {
        list.push({ id: snap.id, ...snap.data() } as ContactMessage);
      });
      setInquiries(list);
    } catch (error) {
      console.error('Error listing inquiries:', error);
    } finally {
      setLoadingInquiries(false);
    }
  };

  // Handle upload selection to convert files into Base64 format
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileType(file.type);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64File(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Submit new Laborer Document
  const handleAddWorkerDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerName.trim() || !dateOfBirth || !passportNid.trim() || !documentTitle.trim()) {
      setDocFeedback({ success: false, msg: lang === 'bn' ? 'অনুগ্রহ করে সকল আবশ্যকীয় ঘর পূরণ করুন।' : 'Please fill all required inputs.' });
      return;
    }

    setIsSubmittingDoc(true);
    setDocFeedback(null);

    try {
      const newDocPayload = {
        workerName: workerName.trim(),
        dateOfBirth,
        passportNid: passportNid.trim(),
        employeeId: employeeId.trim() || `DRV-${Math.floor(1000 + Math.random() * 9000)}`,
        designation: designation.trim() || 'General Worker',
        documentType,
        documentTitle: documentTitle.trim(),
        documentNumber: documentNumber.trim() || 'N/A',
        issueDate: issueDate || 'N/A',
        expiryDate: expiryDate || 'N/A',
        status,
        description: description.trim(),
        uploadedAt: new Date().toISOString(),
        ...(base64File && {
          fileData: base64File,
          fileName,
          fileType
        })
      };

      await addDoc(workersCollection, newDocPayload);

      setDocFeedback({ success: true, msg: lang === 'bn' ? 'শ্রমিকের নথিপত্র কোয়ার্টার ডাটাবেজে সফলভাবে যুক্ত হয়েছে!' : 'Document uploaded successfully to Firestore!' });
      
      // Reset fields
      setWorkerName('');
      setDateOfBirth('');
      setPassportNid('');
      setEmployeeId('');
      setDesignation('');
      setDocumentTitle('');
      setDocumentNumber('');
      setIssueDate('');
      setExpiryDate('');
      setDescription('');
      setBase64File('');
      setFileName('');
      setFileType('');

      fetchWorkers();
    } catch (error) {
      console.error('Doc upload error:', error);
      setDocFeedback({ success: false, msg: 'Error: ' + (error as any).message });
    } finally {
      setIsSubmittingDoc(false);
    }
  };

  // Delete Laborer Document
  const handleDeleteDoc = async (id: string) => {
    if (!window.confirm(lang === 'bn' ? 'আপনি কি আসলেই এই শ্রমিক নথিটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this document permanently?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'workers', id));
      fetchWorkers();
    } catch (error) {
      console.error('Error deleting worker doc:', error);
    }
  };

  // Update contact inquiry status
  const handleUpdateInquiryStatus = async (id: string, currentStatus: any) => {
    const nextStatusMap: Record<string, string> = {
      Pending: 'Processing',
      Processing: 'Completed',
      Completed: 'Pending'
    };
    const nextText = nextStatusMap[currentStatus];

    try {
      await updateDoc(doc(db, 'contacts', id), {
        status: nextText
      });
      fetchInquiries();
    } catch (error) {
      console.error('Error updating inquiry status:', error);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm(lang === 'bn' ? 'মেসেজটি মুছে ফেলবেন?' : 'Delete this message permanently?')) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'contacts', id));
      fetchInquiries();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Filter local worker records matching search strings
  const filteredWorkersList = workers.filter(w => 
    w.workerName.toLowerCase().includes(workerSearch.toLowerCase()) ||
    w.passportNid.toLowerCase().includes(workerSearch.toLowerCase()) ||
    w.employeeId.toLowerCase().includes(workerSearch.toLowerCase())
  );

  // Login view if not verified
  if (!isAuthenticated) {
    return (
      <div className="py-32 md:py-40 bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 to-yellow-400"></div>
          
          <div className="inline-flex p-3 bg-amber-500/10 text-amber-500 rounded-2xl mb-4 border border-amber-500/20 shadow">
            <Lock className="w-7 h-7 mx-auto" />
          </div>

          <h2 className="text-xl font-bold text-white font-sans">
            {lang === 'bn' ? 'অ্যাডমিন সিকিউরিটি অ্যাক্সেস' : 'Admin Area Protection'}
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            {lang === 'bn' 
              ? 'ড্রিভিমো গ্রুপ ওয়েবসাইটের এই বিভাগটি পাসকোড দ্বারা সুরক্ষিত। শ্রমিকদের রেকর্ড আপলোড করার জন্য নিচের ঘরে এডমিন পিন যোগ করুন।'
              : 'Secure credentials required to upload worker credentials, certifications, NID transcripts or view messages.'
            }
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-semibold text-amber-500 uppercase tracking-widest mb-2">
                {lang === 'bn' ? 'এডমিন সিক্রেট পাসকোড' : 'Enter Admin PIN / Passcode'}
              </label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 text-slate-100 placeholder-slate-700 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed font-mono">
                {lang === 'bn' ? 'ডিফল্ট ডেমো পিন: DrivimoAdmin2026' : 'Default demo PIN: DrivimoAdmin2026'}
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{lang === 'bn' ? 'ভুল পাসকোড! অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Incorrect PIN! Check details and retry.'}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/10 transition-colors text-xs uppercase tracking-wide"
            >
              {lang === 'bn' ? 'লগইন করুন' : 'Verify passcode'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 md:py-32 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Frame Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-800 pb-8 mb-10 text-left">
          <div>
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest bg-amber-500/5 px-2.5 py-1 rounded-md border border-amber-500/10 inline-block font-semibold">
              {lang === 'bn' ? 'ড্যাশবোর্ড কন্ট্রোল প্যানেল' : 'HQ Control Desk'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-2">
              {lang === 'bn' ? 'ড্রিভিমো অ্যাডমিন প্যানেল' : 'Drivimo HQ Administration'}
            </h2>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-center">
            {/* Sync trigger */}
            <button
              onClick={() => {
                fetchWorkers();
                fetchInquiries();
              }}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800/80 transition-colors"
              title={lang === 'bn' ? 'রিফ্রেশ ডেটা' : 'Reload Snapshot'}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 rounded-xl text-xs font-semibold"
            >
              {lang === 'bn' ? 'লগআউট' : 'Sign Out Desk'}
            </button>
          </div>
        </div>

        {/* Master Tab Switches */}
        <div className="flex border-b border-slate-800 mb-10">
          <button
            onClick={() => setActiveSubTab('docs')}
            className={`flex items-center space-x-2 pb-4 px-6 text-sm font-semibold border-b-2 transition-colors ${
              activeSubTab === 'docs'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{lang === 'bn' ? 'শ্রমিক ডকুমেন্ট আপলোড এবং তালিকা' : 'Manage Laborer Docs'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('inquiries')}
            className={`flex items-center space-x-2 pb-4 px-6 text-sm font-semibold border-b-2 transition-colors ${
              activeSubTab === 'inquiries'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>{lang === 'bn' ? 'গ্রাহক যোগাযোগ বার্তা' : 'Client Inquiries'}</span>
            <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full">
              {inquiries.length}
            </span>
          </button>
        </div>

        {/* Dynamic Panels */}
        {activeSubTab === 'docs' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            
            {/* Left Box: New Document Upload Form */}
            <form onSubmit={handleAddWorkerDoc} className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-2">
                <Plus className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-lg text-white font-sans">{lang === 'bn' ? 'নতুন শ্রমিক নথি যোগ করুন' : 'Register New Document'}</h3>
              </div>

              {/* Worker Name & DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'শ্রমিকের নাম *' : 'Worker Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    placeholder="e.g. Md. Kamal"
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 placeholder-slate-800 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'জন্ম তারিখ *' : 'Date of Birth *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Passport/NID & Employee ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'পাসপোর্ট / এনআইডি নম্বর *' : 'Passport / NID No *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={passportNid}
                    onChange={(e) => setPassportNid(e.target.value)}
                    placeholder="NID-98765432 or Passport No"
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 placeholder-slate-800 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'শ্রমিক আইডি (ঐচ্ছিক)' : 'Worker Employee ID'}
                  </label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="e.g. DRV-1102"
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 placeholder-slate-800 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Designation & Doc Classification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'পদবী / কাজ' : 'Designation / Role'}
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Truck Driver, Construction Builder"
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 placeholder-slate-800 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'ডকুমেন্টের ধরন' : 'Document Type'}
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-300 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  >
                    <option value="NID">এনআইডি (NID)</option>
                    <option value="Passport">পাসপোর্ট (Passport)</option>
                    <option value="Contract">চুক্তিপত্র (Contract)</option>
                    <option value="Visa">ভিসা (Visa)</option>
                    <option value="Medical">মেডিকেল কার্ড (Medical)</option>
                    <option value="Certificate">শংসাপত্র (Certificate)</option>
                    <option value="Other">অন্যান্য (Other)</option>
                  </select>
                </div>
              </div>

              {/* Doc Title & Reference Registration ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'ডকুমেন্টের শিরোনাম *' : 'Document Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    placeholder="e.g. KSA Employment Visa, NID card copy"
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 placeholder-slate-800 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'ডকুমেন্ট নম্বর' : 'Document Registration No.'}
                  </label>
                  <input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="e.g. BD-881297"
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 placeholder-slate-800 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Issue Date & Exp Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'ইস্যুর তারিখ' : 'Issue Date'}
                  </label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'মেয়াদোত্তীর্ণের তারিখ' : 'Expiry Date'}
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Status & Short Descriptions */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'স্ট্যাটাস / অবস্থা' : 'Validity Status'}
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-300 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs"
                  >
                    <option value="Active">সক্রিয় (Active)</option>
                    <option value="Pending">অপেক্ষমান (Pending)</option>
                    <option value="Expired">মেয়াদোত্তীর্ণ (Expired)</option>
                    <option value="Canceled">বাতিলকৃত (Canceled)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {lang === 'bn' ? 'সংক্ষিপ্ত তথ্য / বিবরণ' : 'Description / Remarks'}
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={lang === 'bn' ? 'নথিপত্র সম্পর্কিত বিশেষ নির্দেশনা...' : 'Internal reference, validity clauses, or deployment remarks...'}
                    className="w-full px-3 py-2.5 bg-slate-950 text-slate-100 placeholder-slate-800 rounded-xl border border-slate-800 focus:border-amber-500/50 focus:outline-none text-xs resize-none"
                  ></textarea>
                </div>
              </div>

              {/* BASE64 FILE CONVERTER UPLOAD PANEL */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {lang === 'bn' ? 'সংযুক্ত নথিপত্র (ডিজিটাল কপি)' : 'Attach Digital Copy File'}
                </label>
                <div className="relative border-2 border-dashed border-slate-800 hover:border-amber-500/50 bg-slate-950/50 p-4 rounded-xl text-center cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  {fileName ? (
                    <div className="text-xs text-amber-400 font-mono truncate">{fileName}</div>
                  ) : (
                    <>
                      <p className="text-xs text-slate-400 font-semibold">{lang === 'bn' ? 'ফাইল নির্বাচন ক্লিক বা ড্র্যাগ করুন' : 'Click to select picture or pdf document'}</p>
                      <p className="text-[10px] text-slate-600 mt-1 font-mono">PNG, JPG, PDF up to 1MB</p>
                    </>
                  )}
                </div>
              </div>

              {docFeedback && (
                <div className={`p-4 rounded-xl text-xs flex items-center space-x-2 ${
                  docFeedback.success 
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                }`}>
                  {docFeedback.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{docFeedback.msg}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmittingDoc}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md cursor-pointer transition-all active:scale-[0.98]"
              >
                {isSubmittingDoc ? 'Adding Registration record...' : (lang === 'bn' ? 'ডকুমেন্ট আপলোড করুন' : 'Commit & Save Record')}
              </button>

            </form>

            {/* Right Box: Labor Archive & Filtering List */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="font-bold text-lg text-white font-sans">
                    {lang === 'bn' ? 'নিবন্ধিত শ্রমিক রেকর্ড' : 'Labor Registry Database'}
                  </h3>
                  
                  {/* Live filter input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-700 w-full sm:w-60 focus:border-amber-500/50 focus:outline-none"
                      placeholder={lang === 'bn' ? 'নাম, আইডি বা পাসপোর্ট খুঁজুন...' : 'Filter by Name, NID or Passport...'}
                      value={workerSearch}
                      onChange={(e) => setWorkerSearch(e.target.value)}
                    />
                  </div>
                </div>

                {loadingWorkers ? (
                  <div className="py-20 text-center text-slate-500 text-xs flex flex-col items-center justify-center space-y-2">
                    <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading logs and files...</span>
                  </div>
                ) : filteredWorkersList.length === 0 ? (
                  <div className="py-20 text-center text-slate-500 text-xs">
                    {lang === 'bn' ? 'কোনো শ্রমিক রেকর্ড পাওয়া যায়নি।' : 'No records match search filters.'}
                  </div>
                ) : (
                  <div className="max-h-[640px] overflow-y-auto space-y-3.5 pr-2">
                    {filteredWorkersList.map((worker) => (
                      <div 
                        key={worker.id}
                        className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 flex items-start justify-between gap-4 hover:border-slate-700 transition-all"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap gap-1">
                            <span className="text-[10px] bg-amber-500/10 text-amber-400 font-mono font-bold px-2 py-0.5 rounded uppercase border border-amber-500/10">
                              {worker.documentType}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              worker.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                              worker.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                            }`}>
                              {worker.status}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              DOB: {worker.dateOfBirth}
                            </span>
                          </div>

                          <h4 className="font-bold text-sm text-white truncate font-sans">{worker.workerName}</h4>
                          <p className="text-xs text-slate-400 font-medium truncate">{worker.documentTitle}</p>
                          
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500">
                            <span className="truncate">Ref No: {worker.documentNumber || 'N/A'}</span>
                            <span className="truncate">NID/Pass: {worker.passportNid}</span>
                          </div>
                        </div>

                        {/* Actions delete */}
                        <button
                          onClick={() => handleDeleteDoc(worker.id)}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 border border-slate-800/50 hover:border-rose-500/20 rounded-xl transition-colors self-center"
                          title="Delete worker document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        ) : (
          /* Client Inquiries Tab Panel */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-left max-w-4xl mx-auto">
            <h3 className="font-bold text-lg text-white font-sans mb-6">
              {lang === 'bn' ? 'গ্রাহকদের জমা দেওয়া বার্তা সমূহ' : 'Client Message Console'}
            </h3>

            {loadingInquiries ? (
              <div className="py-20 text-center text-slate-500 text-xs flex flex-col items-center justify-center space-y-2">
                <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Syncing message feed...</span>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="py-20 text-center text-slate-500 text-xs">
                {lang === 'bn' ? 'কোনো মেসেজ জমা পড়েনি।' : 'No consumer message logs yet.'}
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/85 hover:border-slate-800 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-800/50">
                      <div>
                        {/* Name & Selected Service Badge */}
                        <div className="flex items-center space-x-2 flex-wrap gap-1">
                          <span className="font-bold text-sm text-slate-100">{inquiry.fullName}</span>
                          <span className="text-[10px] bg-slate-900 font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                            {inquiry.selectedService}
                          </span>
                        </div>
                        
                        {/* Credentials metadata */}
                        <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-500 mt-1.5 flex-wrap">
                          <span>Phone: {inquiry.phone}</span>
                          <span>•</span>
                          <span>Email: {inquiry.email || 'N/A'}</span>
                          {inquiry.companyName && inquiry.companyName !== 'N/A' && (
                            <>
                              <span>•</span>
                              <span>Company: {inquiry.companyName}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* State management Buttons */}
                      <div className="flex items-center space-x-2 self-end sm:self-start">
                        <button
                          onClick={() => handleUpdateInquiryStatus(inquiry.id, inquiry.status)}
                          className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg border transition-all ${
                            inquiry.status === 'Completed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                            inquiry.status === 'Processing' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                            'bg-amber-500/10 border-amber-500/20 text-amber-400'
                          }`}
                        >
                          Status: {inquiry.status}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                          className="p-1 px-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-[10px]"
                          title="Delete message"
                        >
                          {lang === 'bn' ? 'মুছুন' : 'Delete'}
                        </button>
                      </div>
                    </div>

                    {/* Messages Body content */}
                    <div className="text-xs text-slate-300 leading-relaxed font-light">
                      <p className="whitespace-pre-line">{inquiry.message}</p>
                    </div>

                    <div className="text-[9px] text-slate-600 font-mono mt-3 text-right">
                      Received: {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : 'N/A'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
