import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { newsData } from '../data/newsData';
import { GlassCard } from '../components/GlassCard';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const newsItem = newsData.find((item) => item.id === id);

  if (!newsItem) {
    return (
      <div className="max-w-7xl mx-auto px-6 pt-32 text-center">
        <h2 className="text-3xl font-bold mb-6">News item not found</h2>
        <Link to="/" className="text-blue-600 hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="mb-10">
          <div className="flex items-center gap-4 text-sm text-blue-600 font-medium mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {newsItem.date}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>TrustShield Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            {newsItem.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-blue-500 pl-6 py-2">
            {newsItem.summary}
          </p>
        </div>

        <GlassCard className="p-8 md:p-12 mb-12">
          <div className="prose prose-slate max-w-none">
            {newsItem.content.split('\n').map((paragraph, idx) => (
              paragraph.trim() ? (
                <p key={idx} className="text-slate-700 leading-loose mb-6 text-lg">
                  {paragraph}
                </p>
              ) : <br key={idx} />
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                TS
              </div>
              <div>
                <p className="font-bold text-slate-900">TrustShield Editorial</p>
                <p className="text-sm text-slate-500">Insurance Experts</p>
              </div>
            </div>
            <button className="p-3 glass rounded-full hover:bg-white/40 transition-all text-slate-600">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </GlassCard>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Related Updates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsData.filter(item => item.id !== id).slice(0, 2).map(item => (
              <Link key={item.id} to={`/news/${item.id}`}>
                <GlassCard className="text-left hover:scale-[1.02] transition-transform h-full">
                  <p className="text-xs text-blue-600 font-bold mb-2 uppercase tracking-wider">{item.date}</p>
                  <h4 className="font-bold text-slate-900 line-clamp-2">{item.title}</h4>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsDetail;
