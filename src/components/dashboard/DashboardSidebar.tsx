import React from 'react';
import { Zap, Clock, Book, Star, GitPullRequest } from 'lucide-react';
import { RECENT_REPOS } from './mockData';

const UserStatsCard = ({ karma, onHistoryClick }: { karma: number, onHistoryClick: () => void }) => {
  const level = Math.floor(karma / 1000) + 1;
  const nextLevelKarma = level * 1000;
  const progress = ((karma % 1000) / 1000) * 100;

  return (
    <div className="mb-6 bg-brand-panel border border-brand-border rounded-md p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent to-blue-600 flex items-center justify-center shadow-lg shadow-purple-900/20">
          <Zap className="w-5 h-5 text-brand-text" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-brand-muted font-mono">Current Karma</div>
          <button 
            type="button"
            className="text-xl font-bold text-brand-text leading-none flex items-center gap-2 cursor-pointer hover:text-brand-accent transition-colors text-left"
            onClick={onHistoryClick}
            title="Click to view history"
          >
            {karma.toLocaleString()} 
            <span className="text-xs text-brand-muted font-normal">業</span>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-brand-muted">
          <span>Level {level} Contributor</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="w-full bg-background rounded-full h-2.5 border border-brand-border overflow-hidden">
          <div 
            className="bg-gradient-to-r from-brand-accent to-[#238636] h-2.5 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-[10px] text-brand-muted text-right">
          Next Rank: {nextLevelKarma}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-brand-border text-center">
        <button 
          type="button"
          onClick={onHistoryClick}
          className="text-xs text-brand-muted hover:text-brand-accent flex items-center justify-center gap-1 w-full transition-colors"
        >
          <Clock className="w-3 h-3" />
          View Transaction History
        </button>
      </div>
    </div>
  );
};

export const LeftSidebar = ({ karma, onHistoryClick }: { karma: number, onHistoryClick: () => void }) => (
  <div className="w-full md:w-[296px] shrink-0 md:block hidden">
    <UserStatsCard karma={karma} onHistoryClick={onHistoryClick} />

    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-brand-text">Top Repositories</h2>
        <button className="bg-brand-success text-brand-text text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 hover:bg-brand-success/80">
          <Book className="w-3 h-3" />
          New
        </button>
      </div>
      <div className="relative mb-3">
        <input 
          type="text" 
          placeholder="Find a repository..." 
          className="w-full bg-background border border-brand-border rounded-md py-1 px-2 text-sm text-brand-text placeholder-[#8b949e] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:outline-none"
        />
      </div>
      <ul className="space-y-1">
        {RECENT_REPOS.map((repo, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-brand-text hover:underline cursor-pointer py-1">
            <div className="w-4 h-4 rounded-full bg-[#30363d] flex items-center justify-center shrink-0">
               <img 
                 src={`https://github.com/${repo.split('/')[0]}.png`} 
                 className="w-4 h-4 rounded-full opacity-80"
                 alt=""
                 onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                 }}
               />
               <Book className="w-3 h-3 text-brand-muted absolute" style={{zIndex: -1}} />
            </div>
            <span className="truncate">{repo}</span>
          </li>
        ))}
      </ul>
      <button className="text-xs text-brand-muted mt-4 hover:text-brand-accent">Show more</button>
    </div>

    <div className="pt-4 border-t border-brand-border">
      <h2 className="text-sm font-semibold text-brand-text mb-3">Recent activity</h2>
      <div className="border border-brand-border border-dashed rounded-md p-4 text-center">
        <p className="text-xs text-brand-muted mb-2">You don&apos;t have any recent activity.</p>
        <button className="text-brand-accent text-xs hover:underline">Start a new project</button>
      </div>
    </div>
  </div>
);

export const RightSidebar = () => (
  <div className="w-full md:w-[296px] shrink-0 hidden lg:block">
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-brand-text mb-3">Explore</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b border-brand-border pb-4 last:border-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-semibold text-brand-text hover:text-brand-accent cursor-pointer">rust-lang/rust</h3>
              <button className="border border-brand-border bg-brand-panel rounded-md px-2 py-0.5 text-xs font-medium text-brand-text flex items-center gap-1 hover:bg-brand-border hover:border-[#8b949e] transition-colors">
                <Star className="w-3 h-3" />
                Star
              </button>
            </div>
            <p className="text-xs text-brand-muted mb-2 line-clamp-2">
              Empowering everyone to build reliable and efficient software.
            </p>
            <div className="flex items-center gap-3 text-xs text-brand-muted">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#dea584]"></span>
                Rust
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                92k
              </span>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="text-xs text-brand-accent hover:underline mt-2 block">Explore more →</a>
    </div>

    <div className="pt-4 border-t border-brand-border">
      <h2 className="text-sm font-semibold text-brand-text mb-2">Trending in your network</h2>
      <div className="flex items-start gap-2 mt-3">
        <div className="mt-0.5"><GitPullRequest className="w-4 h-4 text-brand-success" /></div>
        <div>
          <div className="text-xs text-brand-text">
            <span className="font-bold hover:underline cursor-pointer">torvalds</span> merged pull request <span className="text-brand-accent hover:underline cursor-pointer">linux/master#1</span>
          </div>
          <div className="text-xs text-brand-muted mt-0.5">2 hours ago</div>
        </div>
      </div>
    </div>
  </div>
);
