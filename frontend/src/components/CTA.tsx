"use client";

import React from 'react';
import { Github, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CTA: React.FC = () => {
  const router = useRouter();
  return (
    <div className="relative py-24 overflow-hidden border-t border-brand-border">
        {/* Background Accent */}
        <div className="absolute inset-0 bg-brand-accent/5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-brand-accent/10 to-transparent blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight">
                あなたのコードは、<br />もっと世界を回せる。
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <button 
                    onClick={() => router.push('/login')}
                    className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 shadow-xl shadow-white/10"
                >
                    <Github className="w-6 h-6" />
                    GitHubで登録 (無料)
                </button>
            </div>
            <p className="text-brand-muted text-sm mt-6 flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                クレジットカード登録不要。まずはデポジット（貢献）からスタート。
            </p>
        </div>
    </div>
  );
};

export default CTA;
