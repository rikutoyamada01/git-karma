import React from 'react';

const Stats: React.FC = () => {
  return (
    <div className="py-16 border-b border-brand-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-brand-border/30">
          <div className="p-4">
            <div className="text-4xl font-bold text-foreground tracking-tight">12,340</div>
            <div className="text-brand-muted text-sm mt-2 font-medium uppercase tracking-wider">Total PRs Merged</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-brand-accent tracking-tight">8.5M</div>
            <div className="text-brand-muted text-sm mt-2 font-medium uppercase tracking-wider">Karma Exchanged</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-foreground tracking-tight">2,100</div>
            <div className="text-brand-muted text-sm mt-2 font-medium uppercase tracking-wider">Active Projects</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-brand-success tracking-tight">98%</div>
            <div className="text-brand-muted text-sm mt-2 font-medium uppercase tracking-wider">Response Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
