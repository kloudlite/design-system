import { ReactNode, cloneElement } from 'react';
import { cn } from '../utils';

interface IBadge {
  type?: 'neutral' | 'info' | 'success' | 'warning' | 'critical';
  children: ReactNode;
  icon?: JSX.Element;
  className?: string;
}

export const Badge = ({
  type = 'neutral',
  children,
  icon,
  className,
}: IBadge) => {
  const iconProps = { size: 12, color: 'currentColor' };

  return (
    <div
      className={cn(
        'kl-flex kl-gap-md kl-items-center kl-py-md kl-px-2xl kl-w-fit kl-rounded-full kl-bodySm kl-border kl-select-none kl-pulsable',
        {
          'kl-border-border-dark kl-bg-surface-basic-subdued kl-text-text-default':
            type === 'neutral',
          'kl-border-border-primary kl-bg-surface-primary-subdued kl-text-text-primary':
            type === 'info',
          'kl-border-border-success kl-bg-surface-success-subdued kl-text-text-success':
            type === 'success',
          'kl-border-border-warning kl-bg-surface-warning-subdued kl-text-text-warning':
            type === 'warning',
          'kl-border-border-critical kl-bg-surface-critical-subdued kl-text-text-critical':
            type === 'critical',
        },
        className,
      )}
    >
      {!!icon && cloneElement(icon, iconProps)}
      {children}
    </div>
  );
};
