import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'motion/react';
import { User, Save, AlertCircle, CheckCircle, Loader2, Shield, MapPin, Briefcase, HeartPulse } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { UserProfile } from '../types';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

const Profile: React.FC = () => {
  const [user, authLoading] = useAuthState(auth);
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    idProof: '',
    address: '',
    gender: 'Male',
    height: 0,
    weight: 0,
    age: 0,
    dob: '',
    qualification: '',
    maritalStatus: 'Single',
    occupationalDetails: '',
    annualIncome: 0,
    medicalHistory: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (authLoading) return;
      
      if (!user) {
        setProfileLoading(false);
        return;
      }
      
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // Initialize with basic auth info if no profile exists
          setProfile(prev => ({
            ...prev,
            uid: user.uid,
            email: user.email || '',
            name: user.displayName || '',
            role: 'user'
          }));
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage(null);

    try {
      const profileData = {
        ...profile,
        uid: user.uid,
        email: user.email || '',
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', user.uid), profileData, { merge: true });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const isLoading = authLoading || profileLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <GlassCard className="max-w-md w-full text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-400 mb-8">Please log in to manage your profile.</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tighter mb-2 text-slate-900">Profile Management</h1>
        <p className="text-slate-600">Keep your information up to date for accurate LIC insurance recommendations from TrustShield Insurance.</p>
      </motion.div>

      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-2xl mb-8 flex items-center gap-3 ${
            message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Full Name</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none text-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none appearance-none text-slate-800"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Age</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none text-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Date of Birth</label>
              <input
                type="date"
                value={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none text-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Height (cm)</label>
              <input
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none text-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Weight (kg)</label>
              <input
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none text-slate-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Marital Status</label>
              <select
                value={profile.maritalStatus}
                onChange={(e) => setProfile({ ...profile, maritalStatus: e.target.value as any })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none appearance-none text-slate-800"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">Qualification</label>
              <input
                type="text"
                value={profile.qualification}
                onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none text-slate-800"
                placeholder="e.g. Bachelor of Technology"
              />
            </div>
          </div>
        </GlassCard>

        {/* Identity & Address */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Identity & Address</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500">ID Proof Details</label>
              <input
                type="text"
                value={profile.idProof}
                onChange={(e) => setProfile({ ...profile, idProof: e.target.value })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none text-slate-800"
                placeholder="Aadhar Number / PAN Number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Residential Address
              </label>
              <textarea
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none min-h-[100px] text-slate-800"
                placeholder="Enter your full permanent address"
              />
            </div>
          </div>
        </GlassCard>

        {/* Professional Details */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Professional Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-500">Occupational Details</label>
              <input
                type="text"
                value={profile.occupationalDetails}
                onChange={(e) => setProfile({ ...profile, occupationalDetails: e.target.value })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none text-slate-800"
                placeholder="e.g. Software Engineer at Google"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-500">Annual Income (INR)</label>
              <input
                type="number"
                value={profile.annualIncome}
                onChange={(e) => setProfile({ ...profile, annualIncome: parseFloat(e.target.value) })}
                className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none text-slate-800"
              />
            </div>
          </div>
        </GlassCard>

        {/* Health Information */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Health Information</h3>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500">Medical History</label>
            <textarea
              value={profile.medicalHistory}
              onChange={(e) => setProfile({ ...profile, medicalHistory: e.target.value })}
              className="w-full bg-white/40 border border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 transition-colors outline-none min-h-[120px] text-slate-800"
              placeholder="Please mention any pre-existing conditions, surgeries, or chronic illnesses..."
            />
          </div>
        </GlassCard>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold px-12 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20"
          >
            {saving ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
            <span>{saving ? 'Saving Changes...' : 'Save Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
