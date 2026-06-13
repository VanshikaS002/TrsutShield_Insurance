import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-nav mt-auto border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Shield className="w-8 h-8 text-amber-500" />
            <span className="text-2xl font-bold tracking-tighter text-slate-900">TrustShield Insurance</span>
          </Link>
          <p className="text-slate-600 max-w-sm leading-relaxed">
            Protecting Lives, Securing Futures with LIC. 
            Your trusted resource for comprehensive life insurance solutions.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-slate-600">
            <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> lic1127@gmail.com</li>
            <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> +91 99999 12345</li>
            <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> New Delhi, India</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} TrustShield Insurance. All rights reserved. Not an official LIC website.
      </div>
    </footer>
  );
};
