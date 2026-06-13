import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Shield, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 max-w-md w-full text-center relative z-10 shadow-2xl">
        <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-600/20">
          <Shield className="text-amber-400 w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Welcome to TrustShield Insurance</h1>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Access your professional dashboard and manage your LIC insurance portfolio with ease.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-xl"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          <span>Continue with Google</span>
        </button>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
            Secure Enterprise Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
