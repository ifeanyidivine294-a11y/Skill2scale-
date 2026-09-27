import React, { useState, useEffect } from 'react';
import {
  Lock,
  Search,
  Filter,
  Download,
  Users,
  CreditCard,
  BookOpen,
  CheckCircle2,
  Clock,
  LogOut,
  Eye,
  RefreshCw,
  TrendingUp,
  MapPin,
  Calendar,
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { COURSES_DATA } from '../data/courses';

interface AdminPageProps {
  navigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationRecord | null>(null);

  // Check existing session
  useEffect(() => {
    const token = sessionStorage.getItem('s2s_admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchRegistrations();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('s2s_admin_token', data.token);
        setIsAuthenticated(true);
        fetchRegistrations();
      } else {
        setAuthError(data.error || 'Invalid passcode. Please try again.');
      }
    } catch {
      // Local fallback for offline testing
      if (passcode === 'skill2scale2026' || passcode === 'admin2026') {
        sessionStorage.setItem('s2s_admin_token', 'local_token');
        setIsAuthenticated(true);
        fetchRegistrations();
      } else {
        setAuthError('Incorrect admin code. Use: skill2scale2026');
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('s2s_admin_token');
    setIsAuthenticated(false);
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/registrations');
      if (res.ok) {
        const json = await res.json();
        setRegistrations(json.data || []);
      } else {
        throw new Error();
      }
    } catch {
      // Load from local storage fallback
      const stored = localStorage.getItem('s2s_registrations');
      if (stored) {
        setRegistrations(JSON.parse(stored));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayment = async (id: string, newStatus: 'Paid' | 'Pending / Optional' | 'Confirmed') => {
    try {
      await fetch(`/api/registrations/${id}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });
      fetchRegistrations();
      if (selectedRegistration && selectedRegistration.id === id) {
        setSelectedRegistration({ ...selectedRegistration, paymentStatus: newStatus });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered registrations
  const filtered = registrations.filter((reg) => {
    const matchesSearch =
      reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm) ||
      reg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse =
      selectedCourseFilter === 'All' ||
      reg.selectedCourse.toLowerCase() === selectedCourseFilter.toLowerCase();

    const matchesStatus =
      selectedStatusFilter === 'All' || reg.paymentStatus === selectedStatusFilter;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Calculate statistics
  const totalCount = registrations.length;
  const paidCount = registrations.filter((r) => r.paymentStatus === 'Paid' || r.paymentStatus === 'Confirmed').length;
  const pendingCount = registrations.filter((r) => r.paymentStatus === 'Pending / Optional').length;

  const exportCSV = () => {
    if (registrations.length === 0) return;

    const headers = [
      'Registration ID',
      'Full Name',
      'Phone',
      'Email',
      'Country',
      'State',
      'City',
      'House Address',
      'Date of Birth',
      'Education',
      'Referral Source',
      'Course',
      'Fee',
      'Payment Status',
      'Registration Date',
      'Motivation',
      'Additional Skills',
    ];

    const rows = filtered.map((r) => [
      `"${r.id}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      `"${r.country}"`,
      `"${r.state}"`,
      `"${r.city}"`,
      `"${(r.houseAddress || '').replace(/"/g, '""')}"`,
      `"${r.dob || ''}"`,
      `"${r.education || ''}"`,
      `"${r.referralSource || ''}"`,
      `"${r.selectedCourse}"`,
      `"${r.coursePrice || ''}"`,
      `"${r.paymentStatus}"`,
      `"${r.registrationDate || ''}"`,
      `"${(r.motivation || '').replace(/"/g, '""')}"`,
      `"${(r.additionalSkills || []).join(', ')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `skill2scale_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-[#F7F9FC] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-blue-100 text-[#0757D5] rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#071A3D]">Admin Portal</h2>
            <p className="text-xs text-slate-500">
              Authorized Skill2Scale Digital administrators only. Enter your access passcode.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter master passcode (e.g. skill2scale2026)"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#0757D5] hover:bg-[#064ab8] text-white py-3 rounded-xl text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              ← Back to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 bg-[#F7F9FC] text-[#111111]">
      {/* Top Admin Header */}
      <div className="bg-[#071A3D] text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.jpeg"
              alt="Skill2Scale Logo"
              className="h-9 w-auto rounded bg-white p-0.5"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight">Skill2Scale Admissions Dashboard</h1>
              <p className="text-xs text-blue-300">Live Registration Records &amp; Enrollment Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchRegistrations}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={exportCSV}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-rose-600/80 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Registrations
              </span>
              <div className="text-2xl font-black text-[#071A3D] mt-1">{totalCount}</div>
            </div>
            <div className="p-3 bg-blue-50 text-[#0757D5] rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Paid / Verified
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-1">{paidCount}</div>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending / Optional
              </span>
              <div className="text-2xl font-black text-amber-600 mt-1">{pendingCount}</div>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Catalog
              </span>
              <div className="text-2xl font-black text-[#071A3D] mt-1">17 Courses</div>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, phone, city or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Course:</span>
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
              >
                <option value="All">All Courses</option>
                {COURSES_DATA.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Status:</span>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0757D5]"
              >
                <option value="All">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending / Optional">Pending / Optional</option>
                <option value="Confirmed">Confirmed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-[#071A3D]">
              Applicants List ({filtered.length})
            </h3>
            <span className="text-xs text-slate-400">Click any applicant to view complete records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Applicant ID</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Phone / WhatsApp</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedRegistration(r)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0757D5]">{r.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{r.fullName}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{r.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{r.selectedCourse}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {r.city ? `${r.city}, ${r.country}` : r.country}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{r.phone}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          r.paymentStatus === 'Paid' || r.paymentStatus === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {r.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedRegistration(r)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#0757D5] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No registrations found matching the specified search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-[#0757D5]">
                  {selectedRegistration.id}
                </span>
                <h3 className="text-2xl font-bold text-[#071A3D]">
                  {selectedRegistration.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-2"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">Course Selected</span>
                <span className="text-sm font-bold text-[#071A3D]">
                  {selectedRegistration.selectedCourse}
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">Course Fee</span>
                <span className="text-sm font-bold text-[#0757D5]">
                  {selectedRegistration.coursePrice || '₦5,000'}
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">Phone Number</span>
                <span className="text-sm font-mono text-slate-800">{selectedRegistration.phone}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">Email</span>
                <span className="text-sm text-slate-800 break-all">{selectedRegistration.email}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">Location</span>
                <span className="text-sm text-slate-800">
                  {selectedRegistration.city}, {selectedRegistration.state}, {selectedRegistration.country}
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">House Address</span>
                <span className="text-sm text-slate-800">{selectedRegistration.houseAddress || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">Date of Birth</span>
                <span className="text-sm text-slate-800">{selectedRegistration.dob || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">Education</span>
                <span className="text-sm text-slate-800">{selectedRegistration.education}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">Referral Source</span>
                <span className="text-sm text-slate-800">{selectedRegistration.referralSource}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl">
                <span className="text-slate-400 uppercase font-semibold block mb-0.5">Payment Status</span>
                <span
                  className={`inline-block font-bold px-2 py-0.5 rounded-md ${
                    selectedRegistration.paymentStatus === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedRegistration.paymentStatus}
                </span>
                {selectedRegistration.paymentReference && (
                  <div className="text-[11px] text-slate-500 mt-1">
                    Ref: {selectedRegistration.paymentReference}
                  </div>
                )}
              </div>
            </div>

            {selectedRegistration.motivation && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 uppercase">Reason for choosing course:</span>
                <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl leading-relaxed border border-slate-100">
                  {selectedRegistration.motivation}
                </p>
              </div>
            )}

            {selectedRegistration.additionalSkills && selectedRegistration.additionalSkills.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 uppercase">Additional Skills:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedRegistration.additionalSkills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-blue-50 text-[#0757D5] rounded-md text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Status Toggle */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Update Payment:</span>
                <button
                  onClick={() => handleUpdatePayment(selectedRegistration.id, 'Paid')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                >
                  Mark Paid
                </button>
                <button
                  onClick={() => handleUpdatePayment(selectedRegistration.id, 'Pending / Optional')}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold"
                >
                  Mark Pending
                </button>
              </div>

              <a
                href={`https://wa.me/${selectedRegistration.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Chat Applicant on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
