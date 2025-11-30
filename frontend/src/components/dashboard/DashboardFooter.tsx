import Link from 'next/link';
import React from 'react';
import { GitBranch } from 'lucide-react';

interface DashboardFooterProps {
  onNavigate: (page: any) => void;
}

export const DashboardFooter: React.FC<DashboardFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto py-6 max-w-[1280px] mx-auto px-4 md:px-6 w-full border-t border-brand-border">
      <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between text-xs text-brand-muted">
        <div className="flex items-center gap-2 order-2 md:order-1">
          <Link 
             href="/"
             className="cursor-pointer hover:text-brand-text transition-colors p-1 rounded-full hover:bg-brand-panel" 
             title="Go to Home"
          >
             <img src="/icon.png" alt="GitKarma Logo" className="w-6 h-6 object-contain" />
          </Link>
          <span>&copy; {new Date().getFullYear()} GitKarma Project.</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 order-1 md:order-2 font-medium">
            <Link href="/" className="hover:text-brand-accent hover:underline">Top (LP)</Link>
            <Link href="/docs" className="hover:text-brand-accent hover:underline">Docs</Link>
            <Link href="/guidelines" className="hover:text-brand-accent hover:underline">Guidelines</Link>
            <button onClick={() => alert('Not implemented yet')} className="hover:text-brand-accent hover:underline">Blog</button>
            <button onClick={() => alert('Not implemented yet')} className="hover:text-brand-accent hover:underline">About</button>
            <button onClick={() => alert('Not implemented yet')} className="hover:text-brand-accent hover:underline">Terms</button>
            <button onClick={() => alert('Not implemented yet')} className="hover:text-brand-accent hover:underline">Privacy</button>
            <button onClick={() => alert('Not implemented yet')} className="hover:text-brand-accent hover:underline">Contact</button>
        </div>
      </div>
    </footer>
  );
};
