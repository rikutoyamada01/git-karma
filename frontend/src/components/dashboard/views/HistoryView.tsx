
import React from 'react';
import { ExternalLink, ArrowDownLeft, ArrowUpRight, Zap } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../mockData';

export const TransactionHistoryView = () => {
    return (
        <div className="bg-background border border-brand-border rounded-md overflow-hidden">
            <div className="p-4 border-b border-brand-border bg-brand-panel flex items-center justify-between">
                <h3 className="font-bold text-brand-text">Transaction History</h3>
                <button className="text-xs text-brand-accent hover:underline flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Export CSV
                </button>
            </div>
            
            <div className="divide-y divide-[#30363d]">
                {MOCK_TRANSACTIONS.map((tx) => (
                    <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-brand-panel transition-colors">
                        <div className="flex items-start gap-3">
                            <div className={`mt-1 p-1.5 rounded-full border ${
                                tx.type === 'earned' 
                                ? 'bg-brand-success/10 border-brand-success text-brand-success' 
                                : 'bg-[#da3633]/10 border-[#da3633] text-[#da3633]'
                            }`}>
                                {tx.type === 'earned' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-brand-text">{tx.description}</div>
                                <div className="text-xs text-brand-muted flex items-center gap-2 mt-0.5">
                                    <span>{tx.date}</span>
                                    {tx.repo && (
                                        <>
                                            <span>•</span>
                                            <span className="font-mono">{tx.repo}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={`font-mono font-bold text-sm flex items-center gap-1 ${
                            tx.type === 'earned' ? 'text-brand-success' : 'text-brand-text'
                        }`}>
                            {tx.type === 'earned' ? '+' : '-'}{tx.amount}
                            <Zap className="w-3 h-3" />
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-3 text-center border-t border-brand-border bg-brand-panel">
                <button className="text-xs text-brand-accent hover:underline">View older transactions</button>
            </div>
        </div>
    );
};
