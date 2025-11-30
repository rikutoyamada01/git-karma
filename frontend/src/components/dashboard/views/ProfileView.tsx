
import React from 'react';
import { Users, MapPin, Link as LinkIcon, Twitter, Book, Star, GitBranch, Zap, Award, Target, Calendar } from 'lucide-react';
import { RECENT_REPOS } from '../mockData';

export const ProfileView = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start max-w-7xl mx-auto">
            {/* Left Sidebar - User Info */}
            <div className="w-full md:w-[296px] shrink-0 -mt-8 md:mt-0 relative z-10">
                <div className="relative group">
                    <img 
                        src="https://ui-avatars.com/api/?name=Guest+User&background=random&size=300" 
                        alt="Avatar" 
                        className="w-[150px] h-[150px] md:w-[260px] md:h-[260px] rounded-full border border-brand-border shadow-xl"
                    />
                    <div className="absolute bottom-4 right-4 bg-brand-panel border border-brand-border rounded-full p-2 hidden group-hover:block cursor-pointer">
                        <span className="text-xs text-brand-text">Edit</span>
                    </div>
                </div>

                <div className="pt-4 pb-4">
                    <h1 className="text-2xl font-bold text-brand-text leading-tight">Guest User</h1>
                    <div className="text-xl text-brand-muted font-light">guest_dev</div>
                </div>

                <button className="w-full bg-brand-panel border border-brand-border hover:bg-brand-border text-brand-text py-1.5 rounded-md text-sm font-medium mb-4 transition-colors">
                    Edit profile
                </button>

                {/* GitKarma Specific Stats */}
                <div className="mb-6 bg-background border border-brand-border rounded-lg p-4 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                    <h3 className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">GitKarma Stats</h3>
                    
                    <div className="flex items-center gap-3 mb-4">
                         <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                             12
                         </div>
                         <div>
                             <div className="text-sm font-bold text-brand-text">Level 12</div>
                             <div className="text-xs text-brand-muted">Code Grandmaster</div>
                         </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                             <div className="flex items-center gap-2 text-brand-text">
                                 <Zap className="w-4 h-4 text-[#e3b341]" />
                                 Total Karma
                             </div>
                             <span className="font-mono font-bold">15,400</span>
                        </div>
                         <div className="flex items-center justify-between text-sm">
                             <div className="flex items-center gap-2 text-brand-text">
                                 <Target className="w-4 h-4 text-brand-success" />
                                 Mission Completion
                             </div>
                             <span className="font-mono font-bold">98.5%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                             <div className="flex items-center gap-2 text-brand-text">
                                 <Award className="w-4 h-4 text-[#a855f7]" />
                                 Global Rank
                             </div>
                             <span className="font-mono font-bold">Top 5%</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm text-brand-text mb-6">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-muted" />
                        <span className="font-bold hover:text-brand-accent cursor-pointer">1.2k</span> followers
                        <span>·</span>
                        <span className="font-bold hover:text-brand-accent cursor-pointer">450</span> following
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-muted" />
                        Tokyo, Japan
                    </div>
                    <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-brand-muted" />
                        <a href="#" className="hover:text-brand-accent hover:underline">gitkarma.dev</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Twitter className="w-4 h-4 text-brand-muted" />
                        <a href="#" className="hover:text-brand-accent hover:underline">@gitkarma_jp</a>
                    </div>
                </div>

                <div className="border-t border-brand-border pt-4">
                    <h2 className="text-base font-bold text-brand-text mb-3">Badges</h2>
                    <div className="flex flex-wrap gap-2">
                         <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" className="w-16 h-16" title="Pull Shark" />
                         <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" className="w-16 h-16" title="YOLO" />
                         <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" className="w-16 h-16" title="Quickdraw" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                {/* Profile Tabs */}
                <div className="border-b border-brand-border mb-4 overflow-x-auto">
                    <nav className="flex gap-4" aria-label="Tabs">
                         <button className="border-b-2 border-brand-accent py-2 px-1 text-sm font-semibold text-brand-text flex items-center gap-2 whitespace-nowrap">
                             <Book className="w-4 h-4" />
                             Overview
                         </button>
                         <button className="border-b-2 border-transparent hover:border-[#8b949e] py-2 px-1 text-sm text-brand-text flex items-center gap-2 whitespace-nowrap transition-colors">
                             <Book className="w-4 h-4 text-brand-muted" />
                             Repositories
                             <span className="bg-[#30363d] text-brand-text rounded-full px-1.5 py-0.5 text-xs">12</span>
                         </button>
                         <button className="border-b-2 border-transparent hover:border-[#8b949e] py-2 px-1 text-sm text-brand-text flex items-center gap-2 whitespace-nowrap transition-colors">
                             <Star className="w-4 h-4 text-brand-muted" />
                             Stars
                             <span className="bg-[#30363d] text-brand-text rounded-full px-1.5 py-0.5 text-xs">420</span>
                         </button>
                    </nav>
                </div>

                {/* Overview Section */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-base font-normal text-brand-text">Popular Repositories</h2>
                        <button className="text-xs text-brand-accent hover:underline">Customize your pins</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                         {RECENT_REPOS.slice(0, 4).map((repo, i) => (
                             <div key={i} className="border border-brand-border rounded-md p-4 bg-background flex flex-col justify-between">
                                 <div>
                                     <div className="flex items-center justify-between mb-2">
                                         <a href="#" className="font-bold text-brand-accent hover:underline text-sm truncate">{repo}</a>
                                         <span className="border border-brand-border rounded-full px-2 py-0.5 text-xs text-brand-muted font-medium">Public</span>
                                     </div>
                                     <p className="text-xs text-brand-muted mb-4 line-clamp-2">
                                         A high-performance framework for building karma-driven applications.
                                     </p>
                                 </div>
                                 <div className="flex items-center gap-4 text-xs text-brand-muted">
                                     <div className="flex items-center gap-1">
                                         <span className="w-3 h-3 rounded-full bg-[#3178c6]"></span>
                                         TypeScript
                                     </div>
                                     <div className="flex items-center gap-1 hover:text-brand-accent cursor-pointer">
                                         <Star className="w-4 h-4" />
                                         124
                                     </div>
                                     <div className="flex items-center gap-1 hover:text-brand-accent cursor-pointer">
                                         <GitBranch className="w-4 h-4" />
                                         12
                                     </div>
                                 </div>
                             </div>
                         ))}
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                             <h2 className="text-base font-normal text-brand-text">Contribution Activity</h2>
                        </div>
                        <div className="border border-brand-border rounded-md p-4 bg-background overflow-hidden">
                             <div className="flex items-center justify-between mb-4">
                                 <h3 className="text-sm font-semibold text-brand-text">1,234 contributions in the last year</h3>
                                 <div className="text-xs text-brand-muted flex items-center gap-4">
                                     <div className="flex items-center gap-1">
                                         <span className="w-3 h-3 bg-brand-panel border border-brand-border rounded-sm"></span>
                                         Less
                                     </div>
                                     <div className="flex items-center gap-1">
                                         <span className="w-3 h-3 bg-[#0e4429] rounded-sm"></span>
                                         <span className="w-3 h-3 bg-[#006d32] rounded-sm"></span>
                                         <span className="w-3 h-3 bg-[#26a641] rounded-sm"></span>
                                         <span className="w-3 h-3 bg-[#39d353] rounded-sm"></span>
                                         More
                                     </div>
                                 </div>
                             </div>
                             
                             {/* Simulated Graph */}
                             <div className="flex gap-[2px] h-[100px] items-end justify-center opacity-80">
                                 {Array.from({ length: 52 }).map((_, w) => (
                                     <div key={w} className="flex flex-col gap-[2px]">
                                         {Array.from({ length: 7 }).map((_, d) => {
                                             const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
                                             const colors = ['bg-brand-panel', 'bg-[#0e4429]', 'bg-[#006d32]', 'bg-[#26a641]', 'bg-[#39d353]'];
                                             return (
                                                 <div 
                                                    key={d} 
                                                    className={`w-[10px] h-[10px] rounded-[2px] ${colors[level]} ${level === 0 ? 'border border-brand-border/30' : ''}`}
                                                 ></div>
                                             );
                                         })}
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="text-base font-normal text-brand-text">Contribution Activity</h2>
                        <div className="relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-0 before:w-px before:bg-[#30363d]">
                            <div className="mb-6 relative">
                                <div className="absolute -left-6 top-1 bg-[#30363d] rounded-full p-1 border border-[#0d1117]">
                                    <GitBranch className="w-3 h-3 text-brand-muted" />
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-normal text-brand-text">
                                        Created a pull request in <a href="#" className="font-bold text-brand-accent hover:underline">gitkarma/frontend</a>
                                    </h3>
                                    <span className="text-xs text-brand-muted">2 days ago</span>
                                </div>
                                <div className="text-sm text-brand-muted font-mono">
                                    fix: update navbar responsiveness #124
                                </div>
                            </div>

                             <div className="mb-6 relative">
                                <div className="absolute -left-6 top-1 bg-[#30363d] rounded-full p-1 border border-[#0d1117]">
                                    <Zap className="w-3 h-3 text-[#e3b341]" />
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-normal text-brand-text">
                                        Earned <span className="font-bold text-[#e3b341]">450 Karma</span> from <a href="#" className="font-bold text-brand-accent hover:underline">facebook/react</a>
                                    </h3>
                                    <span className="text-xs text-brand-muted">5 days ago</span>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <button className="w-full py-2 border border-brand-border rounded-md text-xs font-bold text-brand-accent hover:bg-brand-panel hover:underline transition-colors">
                                    Show more activity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
