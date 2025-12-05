import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
    message?: string;
    onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    message = "An error occurred",
    onRetry,
    className,
    ...props
}) => {
    return (
        <div 
            className={cn("p-4 text-red-500 bg-red-500/10 border border-red-500/20 rounded-md flex items-start gap-3", className)}
            {...props}
        >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
                <p className="font-medium">{message}</p>
                {onRetry && (
                    <button 
                        onClick={onRetry}
                        className="mt-2 text-sm underline hover:no-underline font-medium"
                    >
                        Try again
                    </button>
                )}
            </div>
        </div>
    );
};
