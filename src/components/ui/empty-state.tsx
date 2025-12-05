import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: LucideIcon | React.ComponentType<{ className?: string }>;
    title?: string;
    description?: string;
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    action,
    className,
    ...props
}) => {
    return (
        <div 
            className={cn("p-12 text-center text-brand-muted flex flex-col items-center justify-center", className)}
            {...props}
        >
            {Icon && (
                <div className="inline-block p-4 rounded-full bg-brand-panel mb-4 border border-brand-border">
                    <Icon className="w-8 h-8 opacity-50" />
                </div>
            )}
            {title && <h3 className="text-lg font-semibold text-brand-text mb-2">{title}</h3>}
            {description && <p className="max-w-md mx-auto mb-6">{description}</p>}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
};
