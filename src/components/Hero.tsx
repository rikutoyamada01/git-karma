"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TerminalLine {
  id: number;
  html: string;
}

const RAW_LINES = [
  "<span class='text-green-400'>➜</span> <span class='text-blue-400'>~</span> git clone https://github.com/someone/awesome-project.git",
  "<span class='text-gray-400'>Cloning into 'awesome-project'...</span>",
  "<span class='text-green-400'>➜</span> <span class='text-blue-400'>awesome-project</span> git checkout -b fix/memory-leak",
  "<span class='text-gray-400'>Switched to a new branch 'fix/memory-leak'</span>",
  "<span class='text-green-400'>➜</span> <span class='text-blue-400'>awesome-project</span> git push origin fix/memory-leak",
  "<span class='text-purple-400'>★ Matched with @maintainer!</span>",
  "<span class='text-yellow-400'>★ PR Merged! You earned +150 Karma.</span>",
  "<span class='text-green-400'>➜</span> <span class='text-blue-400'>awesome-project</span> git request --help-my-repo",
  "<span class='text-gray-400'>Using 100 Karma to boost your issue...</span>",
  "<span class='text-purple-400'>★ Solver found in 5 minutes!</span>"
];

const Hero: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    let currentIndex = 0;
    
    const addLine = () => {
      if (currentIndex >= RAW_LINES.length) {
        setTimeout(() => {
          setLines([]);
          currentIndex = 0;
          addLine();
        }, 5000); // Wait 5s before clearing
        return;
      }

      const newLine = { html: RAW_LINES[currentIndex], id: Date.now() };
      setLines(prev => [...prev, newLine]);
      currentIndex++;
      
      const randomDelay = Math.random() * 800 + 400; // Faster typing for better effect
      setTimeout(addLine, randomDelay);
    };

    const timeoutId = setTimeout(addLine, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-[128px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-panel border border-brand-border text-xs text-brand-muted mb-6 hover:border-brand-accent/50 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></span>
            <span className="font-mono">v1.0 Beta is now live</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            Commit Good, <br />
            Get <span className="gradient-text">Karma</span>.
          </h1>
          
          {/* Subheadline */}
          <p className="mt-4 text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
            あなたの貢献は、もっと報われるべきだ。<br />
            OSS開発者のための「相互貢献」プラットフォーム。
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button 
                onClick={() => router.push('/login')}
                className="bg-brand-accent hover:bg-brand-accentHover text-white px-8 py-4 rounded-lg text-lg font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              今すぐ始める
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
                onClick={() => router.push('/docs')}
                className="bg-transparent border border-brand-border hover:border-brand-text text-brand-text hover:text-foreground px-8 py-4 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              ドキュメント
            </button>
          </div>
        </div>

        {/* Terminal Demo */}
        <div className="mt-20 relative mx-auto max-w-4xl">
          <div className="bg-[#0d1117] rounded-xl border border-brand-border shadow-2xl overflow-hidden animate-float">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 border-b border-brand-border bg-[#161b22]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 text-center text-xs text-brand-muted font-mono opacity-60">user@dev-cycle:~/projects</div>
            </div>
            
            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="p-6 font-mono text-sm sm:text-base overflow-y-auto h-[320px] scroll-smooth"
            >
              {lines.map((line) => (
                <div 
                  key={line.id} 
                  className="mb-2 leading-relaxed text-brand-text"
                  dangerouslySetInnerHTML={{ __html: line.html }}
                />
              ))}
              <div className="w-2 h-5 bg-brand-muted animate-pulse inline-block align-middle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
