import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
    text?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
    text = "Loading...", 
    className,
    ...props 
}) => {
    return (
        <div 
            className={cn("p-8 text-center text-brand-muted flex flex-col items-center justify-center gap-2", className)} 
            {...props}
        >
            <Loader2 className="w-6 h-6 animate-spin" />
            <p>{text}</p>
        </div>
    );
};
