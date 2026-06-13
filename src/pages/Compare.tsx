import React from 'react';
import { useCompare } from '../context/CompareContext';
import { GlassCard } from '../components/GlassCard';
import { motion } from 'motion/react';
import { Check, X, Shield, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComparePage: React.FC = () => {
  const { selectedPolicies, removeFromCompare, clearCompare } = useCompare();

  if (selectedPolicies.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <GlassCard className="py-20">
          <Info className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">No policies selected for comparison</h1>
          <p className="text-slate-600 mb-8">Go back to categories and select up to 4 policies to compare them side by side.</p>
          <Link 
            to="/categories" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Categories
          </Link>
        </GlassCard>
      </div>
    );
  }

  const features = [
    { key: 'category', label: 'Category', icon: <Shield className="w-4 h-4" /> },
    { key: 'description', label: 'Overview' },
    { key: 'benefits', label: 'Benefits' },
    { key: 'eligibility', label: 'Eligibility' },
    { key: 'keyFeatures', label: 'Key Features' },
    { key: 'riskFactors', label: 'Risk Factors' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Policy Comparison</h1>
          <p className="text-slate-600">Side-by-side analysis of your selected LIC policies</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={clearCompare}
            className="px-6 py-2 rounded-full text-sm font-bold glass text-red-600 hover:bg-red-50 transition-all"
          >
            Clear All
          </button>
          <Link 
            to="/categories" 
            className="px-6 py-2 rounded-full text-sm font-bold glass text-slate-600 font-bold hover:text-slate-900 transition-all"
          >
            Add More
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto pb-8">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-5 gap-4">
            {/* Headers Column */}
            <div className="col-span-1 pt-48">
              {features.map((feature) => (
                <div key={feature.key} className="h-40 flex items-center border-b border-slate-200/50 pr-4">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm uppercase tracking-wider">
                    {feature.icon}
                    {feature.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Policy Columns */}
            {selectedPolicies.map((policy) => (
              <div key={policy.name} className="col-span-1">
                <GlassCard className="h-full relative overflow-hidden group">
                  <button 
                    onClick={() => removeFromCompare(policy.name!)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-red-100 hover:text-red-600 transition-all z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <div className="pt-8 pb-12 px-2 text-center border-b border-slate-100 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2 block">
                      {policy.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4">{policy.name}</h3>
                    <Link 
                      to={`/policy/${encodeURIComponent(policy.name)}`}
                      state={{ policy }}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>

                  {features.map((feature) => (
                    <div key={feature.key} className="h-40 flex items-center border-b border-slate-100/50 px-2">
                      <p className="text-sm text-slate-600 leading-relaxed overflow-y-auto max-h-full py-2 scrollbar-hide">
                        {policy[feature.key as keyof typeof policy]}
                      </p>
                    </div>
                  ))}
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      {/* <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 glass p-10 rounded-[2.5rem] bg-blue-600 text-white relative overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need expert advice on these options?</h2>
          <p className="text-blue-50 opacity-90 mb-8 leading-relaxed">
            Our certified insurance advisors can help you navigate these comparisons and find the absolute best fit for your family's future.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all"
          >
            Consult with an Advisor
          </Link>
        </div>
        <Shield className="absolute right-[-10%] bottom-[-20%] w-96 h-96 text-white/10 -rotate-12" />
      </motion.div> */}
    </div>
  );
};

export default ComparePage;
