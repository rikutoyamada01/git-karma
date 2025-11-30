import React from 'react';

const ACTIONS = [
  { user: "kenji_dev", action: "fixed a bug in", repo: "fast-api-utils", karma: "+50" },
  { user: "sarah_js", action: "translated docs for", repo: "react-hooks-global", karma: "+30" },
  { user: "rust_fan", action: "refactored core in", repo: "actix-web-starter", karma: "+120" },
  { user: "design_pro", action: "improved UI in", repo: "tailwind-components", karma: "+45" },
  { user: "py_guru", action: "reviewed PR in", repo: "django-ninja", karma: "+20" },
  { user: "go_gopher", action: "added tests to", repo: "gin-middleware", karma: "+80" },
];

const TickerItem: React.FC<{ item: typeof ACTIONS[0] }> = ({ item }) => (
  <div className="inline-flex items-center gap-3 mx-8">
    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-accent to-blue-500 flex items-center justify-center text-[10px] text-white font-bold">
      {item.user.charAt(0).toUpperCase()}
    </div>
    <span className="text-brand-text font-bold text-sm">{item.user}</span>
    <span className="text-brand-muted text-sm">{item.action}</span>
    <span className="text-brand-text underline decoration-brand-border underline-offset-4 text-sm font-mono">{item.repo}</span>
    <span className="text-brand-accent font-bold text-sm">{item.karma} Karma</span>
  </div>
);

const Ticker: React.FC = () => {
  return (
    <div className="border-y border-brand-border bg-brand-panel/50 backdrop-blur-sm py-4 overflow-hidden relative z-20">
      <div className="flex animate-scroll whitespace-nowrap min-w-full">
        {/* First Loop */}
        <div className="flex items-center">
            {ACTIONS.map((item, i) => <TickerItem key={`a-${i}`} item={item} />)}
            {ACTIONS.map((item, i) => <TickerItem key={`b-${i}`} item={item} />)}
            {ACTIONS.map((item, i) => <TickerItem key={`c-${i}`} item={item} />)}
        </div>
        {/* Second Loop for seamless transition */}
        <div className="flex items-center">
            {ACTIONS.map((item, i) => <TickerItem key={`d-${i}`} item={item} />)}
            {ACTIONS.map((item, i) => <TickerItem key={`e-${i}`} item={item} />)}
            {ACTIONS.map((item, i) => <TickerItem key={`f-${i}`} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Ticker;
