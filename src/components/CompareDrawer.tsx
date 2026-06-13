import React from 'react';
import { useCompare } from '../context/CompareContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, auth } from '../firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const CompareDrawer: React.FC = () => {
  const { selectedPolicies, removeFromCompare, clearCompare } = useCompare();

  // Handle saving comparison to history (optional feature implied by user's attempted imports)
  const handleSaveToHistory = async () => {
    if (!auth.currentUser) return;
    try {
      await addDoc(collection(db, 'compare_history'), {
        userId: auth.currentUser.uid,
        policies: selectedPolicies.map(p => p.name),
        timestamp: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'compare_history');
    }
  };

  if (selectedPolicies.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
      >
        <div className="glass p-4 rounded-3xl shadow-2xl flex items-center gap-6 border border-white/40 bg-white/80 backdrop-blur-xl">
          <div className="hidden md:flex items-center gap-3 px-4 border-r border-slate-200">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{selectedPolicies.length} Selected</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Compare Policies</p>
            </div>
          </div>

          <div className="flex-grow flex items-center gap-3 overflow-x-auto scrollbar-hide py-1">
            {selectedPolicies.map((policy) => (
              <motion.div
                layout
                key={policy.name}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-2 px-3 py-2 bg-white/60 border border-slate-100 rounded-2xl whitespace-nowrap group"
              >
                <span className="text-sm font-bold text-slate-700 max-w-[120px] truncate">{policy.name}</span>
                <button
                  onClick={() => removeFromCompare(policy.name)}
                  className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="hidden sm:block text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest px-2"
            >
              Clear
            </button>
            <Link
              to="/compare"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap"
            >
              Compare <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
