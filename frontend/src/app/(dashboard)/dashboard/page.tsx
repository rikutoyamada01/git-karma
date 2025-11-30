"use client";

import React, { useState } from 'react';
import { Search, Inbox, Zap, Settings, Book, User, GitPullRequest } from 'lucide-react';
import { useRouter } from 'next/navigation';

import DashboardNavbar from '../../../components/dashboard/DashboardNavbar';
import { DashboardFooter } from '../../../components/dashboard/DashboardFooter';
import { LeftSidebar, RightSidebar } from '../../../components/dashboard/DashboardSidebar';
import { FeedView } from '../../../components/dashboard/views/FeedView';
import { CreateRequestView, MyRequestsView } from '../../../components/dashboard/views/RequestViews';
import { TransactionHistoryView } from '../../../components/dashboard/views/HistoryView';
import { SettingsView } from '../../../components/dashboard/views/SettingsView';
import { ProfileView } from '../../../components/dashboard/views/ProfileView';
import { ContributedView } from '../../../components/dashboard/views/ContributedView';
import { SearchView } from '../../../components/dashboard/views/SearchView';
import { MOCK_ISSUES } from '../../../components/dashboard/mockData';
import { Issue, DashboardView } from '../../../components/dashboard/types';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const [karma, setKarma] = useState(1250);
  const [view, setView] = useState<DashboardView>('feed');
  const [searchQuery, setSearchQuery] = useState('');

  // Swipe State
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
  const currentIssue = MOCK_ISSUES[currentIssueIndex];

  const handleNext = () => {
    setCurrentIssueIndex((prev) => (prev + 1) % MOCK_ISSUES.length);
  };

  const handleAccept = (issue?: Issue) => {
    const targetIssue = issue || currentIssue;
    window.open(targetIssue.html_url, '_blank');
    setActiveIssue(targetIssue);
    // If accepting an issue, typically you stay on the Feed/Overview tab where the active mission is shown.
    setView('feed'); 
  };

  const handlePublishRequest = (amount: number) => {
    setKarma(prev => prev - Math.floor(amount * 1.05)); // Deduct karma + fee
    setView('my-requests'); // Go to my requests after publishing
  };

  const handleNavigate = (page: any) => {
      if (page === 'home') {
          router.push('/');
      } else if (page === 'docs') {
          router.push('/docs');
      } else if (page === 'guidelines') {
          router.push('/guidelines');
      } else {
          // Handle other pages or default
          console.log('Navigate to:', page);
      }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setView('search');
  };

  const renderContent = () => {
      switch (view) {
          case 'create':
              return <CreateRequestView onPublish={handlePublishRequest} onCancel={() => setView('feed')} />;
          case 'history':
              return <TransactionHistoryView />;
          case 'settings':
              return <SettingsView />;
          case 'my-requests':
              return <MyRequestsView />;
          case 'profile':
              return <ProfileView />;
          case 'contributions':
              return <ContributedView onAcceptIssue={handleAccept} />;
          case 'search':
              return <SearchView query={searchQuery} onAccept={handleAccept} />;
          case 'feed':
          default:
              return <FeedView 
                  activeIssue={activeIssue} 
                  currentIssue={currentIssue}
                  onAbandon={() => setActiveIssue(null)}
                  onPass={handleNext}
                  onAccept={() => handleAccept()}
              />;
      }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-brand-text flex flex-col">
      <DashboardNavbar 
        onNavigate={handleNavigate} 
        karma={karma} 
        onCreateClick={() => setView('create')} 
        onHistoryClick={() => setView('history')}
        onSettingsClick={() => setView('settings')}
        onProfileClick={() => setView('profile')}
        onSearch={handleSearch}
        currentView={view}
        onViewChange={setView}
      />
      
      <main className="max-w-[1280px] mx-auto p-4 md:p-6 md:flex gap-6 w-full flex-1">
        {/* Left Sidebar - hidden on settings/profile page typically, but let's keep it for navigation consistency or hide it */}
        {view !== 'settings' && view !== 'profile' && <LeftSidebar karma={karma} onHistoryClick={() => setView('history')} />}

        <div className="flex-1 min-w-0">
             {/* Tab Navigation - Only show if not in Create/Profile/Settings mode */}
             {view !== 'create' && view !== 'profile' && view !== 'settings' && (
                <div className="border-b border-brand-border flex gap-6 px-2 mb-6 overflow-x-auto">
                    <button 
                        onClick={() => setView('feed')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${view === 'feed' ? 'border-brand-accent text-brand-text' : 'border-transparent text-brand-muted hover:text-brand-text'}`}
                    >
                        <Search className="w-4 h-4" />
                        Overview
                    </button>
                    <button 
                        onClick={() => setView('contributions')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${view === 'contributions' ? 'border-brand-accent text-brand-text' : 'border-transparent text-brand-muted hover:text-brand-text'}`}
                    >
                        <GitPullRequest className="w-4 h-4" />
                        Contributions
                    </button>
                    <button 
                        onClick={() => setView('my-requests')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${view === 'my-requests' ? 'border-brand-accent text-brand-text' : 'border-transparent text-brand-muted hover:text-brand-text'}`}
                    >
                        <Inbox className="w-4 h-4" />
                        My Requests
                    </button>
                    <button 
                        onClick={() => setView('history')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${view === 'history' ? 'border-brand-accent text-brand-text' : 'border-transparent text-brand-muted hover:text-brand-text'}`}
                    >
                        <Zap className="w-4 h-4" />
                        History
                    </button>
                </div>
             )}

             {renderContent()}
        </div>

        {/* Right Sidebar - Hide on Settings, History, Profile views to give more space */}
        {view !== 'settings' && view !== 'history' && view !== 'profile' && <RightSidebar />}
      </main>

      <DashboardFooter onNavigate={handleNavigate} />
    </div>
  );
};

export default Dashboard;
