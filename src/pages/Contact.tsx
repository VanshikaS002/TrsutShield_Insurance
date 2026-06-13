import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle, AlertCircle, Phone, MapPin } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { GlassCard } from '../components/GlassCard';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20 text-slate-800">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tighter mb-4 text-slate-900">Get in Touch</h1>
        <p className="text-slate-600">Have questions? TrustShield Insurance is here to help you understand insurance better.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
        {/* Contact Info */}
        <div className="space-y-8">
          <GlassCard>
            <div className="flex gap-6 items-center">
              <div className="p-4 bg-blue-500/10 rounded-2xl">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-slate-900">Email Us</h4>
                <p className="text-slate-600">lic1127@gmail.com</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex gap-6 items-center">
              <div className="p-4 bg-purple-500/10 rounded-2xl">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-slate-900">Call Us</h4>
                <p className="text-slate-600">+91 99999 12345</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex gap-6 items-center">
              <div className="p-4 bg-emerald-500/10 rounded-2xl">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1 text-slate-900">Our Office</h4>
                <p className="text-slate-600">New Delhi, India</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <GlassCard>
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Message Sent!</h3>
              <p className="text-slate-600 mb-8">Thank you for reaching out. We'll get back to you soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="px-8 py-3 glass rounded-full font-semibold hover:bg-white/40 transition-all text-slate-800"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2">Your Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full glass px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none text-slate-800 placeholder:text-slate-400"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : (
                  <>Send Message <Send className="w-5 h-5" /></>
                )}
              </button>
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-4">
                  <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
                </div>
              )}
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default Contact;
