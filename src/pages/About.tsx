import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Users, Award } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      <div className="text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 text-slate-900"
        >
          About – TrustShield Insurance
        </motion.h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          At TrustShield Insurance, we are committed to helping individuals and families secure their future through trusted and reliable LIC policies. As an authorized agency associated with Life Insurance Corporation of India, we specialize in offering comprehensive life insurance solutions designed to provide financial protection, savings, and peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-slate-900">Our Mission & Values</h2>
          <p className="text-slate-600 leading-relaxed">
            Our mission is to guide our clients in choosing the most suitable LIC plans based on their life goals — whether it is life protection, child education planning, retirement planning, wealth creation, or tax-saving benefits.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We believe that every family deserves financial security and a worry-free future. With a customer-first approach, transparent guidance, and dedicated support, TrustShield Insurance strives to build long-term relationships based on trust, service, and commitment.
          </p>
          <p className="text-slate-600 leading-relaxed">
            At every step, from policy selection to premium guidance and claim assistance, we stand by our clients as a dependable partner in their financial journey.
          </p>
          <div className="pt-4">
            <p className="text-lg font-bold text-blue-600">
              TrustShield Insurance — Protecting Lives, Securing Futures with LIC.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <GlassCard className="text-center p-6">
            <Target className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h4 className="font-bold">Transparency</h4>
          </GlassCard>
          <GlassCard className="text-center p-6">
            <Users className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h4 className="font-bold">Community</h4>
          </GlassCard>
          <GlassCard className="text-center p-6">
            <Award className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h4 className="font-bold">Integrity</h4>
          </GlassCard>
          <GlassCard className="text-center p-6">
            <Shield className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <h4 className="font-bold">Security</h4>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default About;
