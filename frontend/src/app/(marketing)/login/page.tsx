"use client";

import React from 'react';
import { Github, ArrowLeft, Ghost } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="bg-brand-panel border border-brand-border p-8 sm:p-12 rounded-2xl shadow-2xl max-w-md w-full relative z-10 mx-4">
        <button 
          onClick={() => router.push('/')}
          className="absolute top-6 left-6 text-brand-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center mb-10 mt-4">
          <div className="w-16 h-16 bg-brand-accent rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
            <Github className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to GitKarma</h1>
          <p className="text-brand-muted text-sm">
            開発者のための相互貢献プラットフォームへようこそ。
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white py-4 px-6 rounded-lg font-bold flex items-center justify-center gap-3 transition-all border border-transparent hover:border-gray-500 shadow-lg">
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </button>
          
          <button 
            onClick={() => router.push('/dashboard')}
            className="w-full bg-transparent hover:bg-brand-border/30 text-brand-text hover:text-white py-4 px-6 rounded-lg font-bold flex items-center justify-center gap-3 transition-all border border-brand-border hover:border-brand-accent/50 group"
          >
            <Ghost className="w-5 h-5 group-hover:text-brand-accent transition-colors" />
            匿名で体験する
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-brand-panel text-brand-muted">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-brand-muted leading-relaxed">
              By signing in, you agree to our <Link href="/guidelines" className="text-brand-accent hover:underline">Community Guidelines</Link> and <a href="#" className="text-brand-accent hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-border text-center">
            <p className="text-sm text-brand-muted">
                まずはデポジットなしで探索しますか？<br/>
                <button onClick={() => router.push('/docs')} className="text-white hover:text-brand-accent font-medium mt-2 transition-colors">ドキュメントを読む</button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
