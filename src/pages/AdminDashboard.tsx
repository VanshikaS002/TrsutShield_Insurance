import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, orderBy, onSnapshot, limit, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Users, MessageSquare, TrendingUp, Activity, 
  Clock, CheckCircle, AlertCircle, Search, Filter 
} from 'lucide-react';
import { Inquiry, AnalyticsData } from '../types';
import { motion } from 'motion/react';

const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Listen for inquiries
    const qInquiries = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribeInquiries = onSnapshot(qInquiries, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
      setInquiries(data);
      setLoading(false);
    });

    // Mock analytics data if collection is empty
    const mockAnalytics: AnalyticsData[] = [
      { date: '2026-03-12', pageViews: 450, totalInquiries: 12 },
      { date: '2026-03-13', pageViews: 520, totalInquiries: 15 },
      { date: '2026-03-14', pageViews: 480, totalInquiries: 10 },
      { date: '2026-03-15', pageViews: 610, totalInquiries: 22 },
      { date: '2026-03-16', pageViews: 590, totalInquiries: 18 },
      { date: '2026-03-17', pageViews: 750, totalInquiries: 28 },
      { date: '2026-03-18', pageViews: 820, totalInquiries: 35 },
    ];
    setAnalytics(mockAnalytics);

    return () => unsubscribeInquiries();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Access Denied</h2>
          <p className="text-slate-600">Please login to view the dashboard.</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Inquiries', value: inquiries.length, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-500/10' },
    { label: 'Active Leads', value: inquiries.filter(i => i.status === 'new').length, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
    { label: 'Conversion Rate', value: '12.5%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-500/10' },
    { label: 'Avg. Response', value: '2.4h', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">TrustShield Insurance Dashboard</h1>
            <p className="text-slate-600">Real-time monitoring and inquiry management for TrustShield Insurance.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search inquiries..." 
                className="glass border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-500 transition-colors w-64 placeholder:text-slate-400"
              />
            </div>
            <button className="p-2 glass border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass border border-white/60 rounded-3xl p-6 shadow-xl"
            >
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass border border-white/60 rounded-[2rem] p-8 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-8">Traffic Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00000010" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#1e293b' }}
                    itemStyle={{ color: '#2563eb' }}
                  />
                  <Area type="monotone" dataKey="pageViews" stroke="#2563eb" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass border border-white/60 rounded-[2rem] p-8 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-8">Inquiry Volume</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00000010" vertical={false} />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#1e293b' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Bar dataKey="totalInquiries" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Inquiries Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass border border-white/60 rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Recent Inquiries</h3>
            <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-widest font-bold">
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Insurance Type</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-white/40 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                          {inquiry.userName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{inquiry.userName}</div>
                          <div className="text-xs text-slate-500">{inquiry.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-white/60 border border-slate-200 rounded-full text-xs font-semibold text-slate-600">
                        {inquiry.insuranceType}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500">
                      {inquiry.createdAt?.toDate().toLocaleDateString() || 'Just now'}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${inquiry.status === 'new' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${inquiry.status === 'new' ? 'text-emerald-600' : 'text-slate-500'}`}>
                          {inquiry.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <CheckCircle size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-500">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
