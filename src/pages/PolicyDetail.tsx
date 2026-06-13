import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { Shield, CheckCircle, AlertCircle, Info, ArrowLeft, Layers, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { dummyPolicies } from '../data/dummyPolicies';
import { Policy } from '../types';
import { useCompare } from '../context/CompareContext';
import { CompareDrawer } from '../components/CompareDrawer';

const PolicyDetail: React.FC = () => {
  const { addToCompare, removeFromCompare, isPolicySelected } = useCompare();
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const [policy, setPolicy] = useState<Policy | null>(location.state?.policy || null);

  useEffect(() => {
    if (!policy && name) {
      const decodedName = decodeURIComponent(name);
      const foundPolicy = dummyPolicies.find(p => p.name === decodedName);
      if (foundPolicy) {
        setPolicy(foundPolicy as Policy);
      }
    }
  }, [name, policy]);

  if (!policy) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 text-center">
        <h2 className="text-3xl font-bold mb-6">Policy Not Found</h2>
        <Link to="/categories" className="text-blue-400 hover:underline">Back to Categories</Link>
      </div>
    );
  }

  const sections = [
    { title: 'Benefits', icon: <CheckCircle className="w-6 h-6 text-emerald-600" />, content: policy.benefits },
    { title: 'Eligibility', icon: <Info className="w-6 h-6 text-blue-600" />, content: policy.eligibility },
    { title: 'Risk Factors', icon: <AlertCircle className="w-6 h-6 text-amber-600" />, content: policy.riskFactors },
    { title: 'Key Features', icon: <Shield className="w-6 h-6 text-purple-600" />, content: policy.keyFeatures },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 text-slate-800">
      <Link to="/categories" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group font-medium">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Categories
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4 block">
            {policy.category}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight text-slate-900">
            {policy.name}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
            {policy.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link 
              to="/contact" 
              state={{ policyName: policy.name }}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
              Get a Free Quote
            </Link>
            <button
              onClick={() => isPolicySelected(policy.name) ? removeFromCompare(policy.name) : addToCompare(policy)}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${
                isPolicySelected(policy.name)
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                : 'glass text-slate-700 hover:bg-white/40'
              }`}
            >
              {isPolicySelected(policy.name) ? (
                <>
                  <Check className="w-5 h-5" /> Selected for Comparison
                </>
              ) : (
                <>
                  <Layers className="w-5 h-5" /> Add to Comparison
                </>
              )}
            </button>
          </div>

          {policy.youtubeLink && (
            <div className="mt-8 aspect-video w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl border border-white/20">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${policy.youtubeLink.split('v=')[1]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="flex flex-col md:flex-row gap-6 items-start">
                <div className="p-3 bg-white/40 rounded-xl shadow-sm">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{section.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="p-8 glass rounded-3xl border-amber-500/20 bg-amber-500/5 mb-20">
          <div className="flex gap-4 items-start">
            <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold text-amber-400 mb-2">Important Disclaimer</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                This information is based on publicly available data about LIC policies. 
                TrustShield Insurance is an authorized agency associated with Life Insurance Corporation of India. Policy terms, conditions, and benefits are subject 
                to change by the insurer. Always read the official policy document carefully before investing.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <CompareDrawer />
    </div>
  );
};

export default PolicyDetail;
