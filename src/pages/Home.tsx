import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { newsData } from '../data/newsData';
import { GalleryPanel } from '../components/GalleryPanel';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      {/* Hero Section */}
      <section className="text-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Understand Insurance <br /> Before You Invest
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            TrustShield Insurance is your premier resource for LIC policies. 
            We break down complex insurance terms into simple, actionable knowledge.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/categories" className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/40 transition-all flex items-center justify-center gap-2 text-slate-800">
              Explore Policies <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="px-8 py-4 border border-slate-200 rounded-full font-semibold hover:bg-white/20 transition-all text-slate-700">
              Learn Our Mission
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        <GlassCard>
          <div className="p-4 bg-blue-500/10 rounded-2xl w-fit mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-900">Clear Focus</h3>
          <p className="text-slate-600 leading-relaxed">
            Our goal is to make you an expert in LIC policy structures.
          </p>
        </GlassCard>

        <GlassCard>
          <div className="p-4 bg-purple-500/10 rounded-2xl w-fit mb-6">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-900">Unbiased Analysis</h3>
          <p className="text-slate-600 leading-relaxed">
            Get clear insights into benefits, eligibility, and risk factors without any sales pressure.
          </p>
        </GlassCard>

        <GlassCard>
          <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-slate-900">Simple Language</h3>
          <p className="text-slate-600 leading-relaxed">
            No more insurance jargon. We explain policies in a way that anyone can understand.
          </p>
        </GlassCard>
      </section>

      {/* Quick Categories */}
      <section className="mb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-slate-900">Insurance Types</h2>
            <p className="text-slate-600">Discover the right category for your needs</p>
          </div>
          <Link to="/categories" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2 font-semibold">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Term Plans', 'Endowment Plans', 'ULIPs', 'Pension Plans'].map((cat) => (
            <Link key={cat} to={`/categories?filter=${cat}`}>
              <GlassCard className="text-center py-10 hover:scale-105">
                <h4 className="text-lg font-semibold">{cat}</h4>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
      
      <GalleryPanel />

      {/* Latest News and Updates Section */}
      <section className="mb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-slate-900">Latest News & Updates</h2>
            <p className="text-slate-600">Stay informed with the latest from TrustShield and LIC</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsData.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="text-sm text-blue-600 font-medium mb-2">{news.date}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{news.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                  {news.summary}
                </p>
                <div className="mt-auto">
                  <Link 
                    to={`/news/${news.id}`}
                    className="text-slate-800 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
