import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is LIC?",
    answer: "Life Insurance Corporation of India (LIC) is an Indian state-owned insurance group and investment corporation. It is the largest insurance company in India."
  },
  {
    question: "What is the difference between Term Insurance and Endowment Plans?",
    answer: "Term insurance provides pure life cover for a specific period and pays out only in case of death. Endowment plans combine life cover with savings, providing a maturity benefit if the policyholder survives the term."
  },
  {
    question: "What are ULIPs?",
    answer: "Unit Linked Insurance Plans (ULIPs) are investment products that provide both insurance cover and investment in equity or debt markets. The investment risk is borne by the policyholder."
  },
  {
    question: "How do I choose the right insurance policy?",
    answer: "The right policy depends on your financial goals, age, income, and risk appetite. Term plans are best for pure protection, while endowment or pension plans are better for long-term savings and retirement."
  },
  {
    question: "Is TrustShield Insurance an official LIC website?",
    answer: "TrustShield Insurance is an authorized agency associated with Life Insurance Corporation of India (LIC). While we are not the official LIC corporate website, we are authorized to offer and facilitate LIC policy solutions to our clients."
  },
  {
    question: "What is a maturity benefit?",
    answer: "A maturity benefit is the amount paid to the policyholder if they survive the entire term of the insurance policy. This is common in endowment and money-back plans."
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 text-slate-800">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tighter mb-4 text-slate-900">Frequently Asked Questions</h1>
        <p className="text-slate-600">Everything you need to know about insurance and LIC policies</p>
      </div>

      <div className="space-y-4 mb-32">
        {faqs.map((faq, index) => (
          <GlassCard key={index} className="p-0 overflow-hidden">
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-4">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-lg font-semibold text-slate-900">{faq.question}</span>
              </div>
              {activeIndex === index ? (
                <Minus className="w-5 h-5 text-slate-400" />
              ) : (
                <Plus className="w-5 h-5 text-slate-400" />
              )}
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
