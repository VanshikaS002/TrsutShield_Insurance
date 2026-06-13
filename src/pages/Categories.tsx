import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { dummyPolicies } from '../data/dummyPolicies';
import { GlassCard } from '../components/GlassCard';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Policy } from '../types';
import { BannerCarousel } from '../components/BannerCarousel';
import { useCompare } from '../context/CompareContext';
import { CompareDrawer } from '../components/CompareDrawer';
import { Layers, Plus, Check } from 'lucide-react';

const Categories: React.FC = () => {
  const { addToCompare, removeFromCompare, isPolicySelected } = useCompare();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'All';
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Life Insurance', 'Term Plans', 'Endowment Plans', 'ULIPs', 'Pension Plans'];

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'policies'));
        const fetchedPolicies = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Policy[];

        if (fetchedPolicies.length === 0) {
          setPolicies(dummyPolicies as Policy[]);
        } else {
          setPolicies(fetchedPolicies);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
        setPolicies(dummyPolicies as Policy[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  useEffect(() => {
    let filtered = policies;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPolicies(filtered);
  }, [selectedCategory, searchQuery, policies]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      <BannerCarousel />
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tighter mb-4 text-slate-900">Insurance Categories</h1>
        <p className="text-slate-600">Browse through our comprehensive list of LIC policies at TrustShield Insurance</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="md:col-span-2 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'glass text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-800 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Policies Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="glass h-64 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPolicies.map((policy, index) => (
            <motion.div
              key={policy.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 block">
                    {policy.category}
                  </span>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{policy.name}</h3>
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                    {policy.description}
                  </p>
                </div>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <Link 
                    to={`/policy/${encodeURIComponent(policy.name)}`}
                    state={{ policy }}
                    className="text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all text-blue-600 hover:text-blue-700"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => isPolicySelected(policy.name) ? removeFromCompare(policy.name) : addToCompare(policy)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isPolicySelected(policy.name)
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isPolicySelected(policy.name) ? (
                      <>
                        <Check className="w-3 h-3" /> Selected
                      </>
                    ) : (
                      <>
                        <Layers className="w-3 h-3" /> Compare
                      </>
                    )}
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* Comparison Drawer */}
      <CompareDrawer />

      {!isLoading && filteredPolicies.length === 0 && (
        <div className="text-center py-20 glass rounded-3xl">
          <p className="text-slate-600 text-lg">No policies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Categories;
