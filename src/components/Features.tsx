import React from 'react';
import { Layers, ShieldCheck, Ghost, TrendingUp, Heart, Github } from 'lucide-react';

const featuresData = [
    {
        icon: <Layers className="w-8 h-8" />,
        title: "Tinder風マッチング",
        desc: "興味のあるリポジトリをスワイプで直感的に探せます。言語や難易度でフィルタリングも可能。"
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "デポジット制度",
        desc: "「タダ飯」禁止。まず他者に貢献しないと、自分のIssueは登録できません。公平性をシステムで担保。"
    },
    {
        icon: <Ghost className="w-8 h-8" />,
        title: "Ghost Buster",
        desc: "マッチング後、連絡が途絶えたら自動でアサイン解除。信頼スコアが下がり、時間を無駄にしません。"
    },
    {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Dynamic Pricing",
        desc: "不人気なIssueほど獲得Karmaが上昇。誰もやりたがらない「負債返済」ほど高く評価されます。"
    },
    {
        icon: <Heart className="w-8 h-8" />,
        title: "Kindness Score",
        desc: "技術力だけでなく「優しさ」を評価。高圧的なメンテナを避け、心理的安全性を確保します。"
    },
    {
        icon: <Github className="w-8 h-8" />,
        title: "GitHub Decorator",
        desc: "ここでの実績をGitHubプロフィールのウィジェットとして出力。あなたのキャリアに箔がつきます。"
    }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    フェアで、安全な<br />
                    <span className="text-brand-accent">エコシステム</span>のための機能
                </h2>
                <div className="w-20 h-1 bg-brand-accent rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuresData.map((feature, index) => (
                    <div 
                        key={index}
                        className="p-8 rounded-xl border border-brand-border bg-brand-panel hover:bg-brand-panel/80 transition-all hover:-translate-y-1 hover:border-brand-accent/30 group"
                    >
                        <div className="text-brand-accent mb-6 bg-brand-dark w-fit p-3 rounded-lg border border-brand-border group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Features;
