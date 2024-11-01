import { ReactNode } from 'react';
import { Button, IButton } from '../atoms/button';
import { cn } from '../utils';

interface IEmptyState {
  heading: string;
  image?: string;
  children: ReactNode;
  footer: ReactNode;
  action: IButton;
  secondaryAction: IButton;
}

export const EmptyState = ({
  image,
  heading = 'This is where you’ll manage your projects',
  children,
  footer,
  action,
  secondaryAction,
}: IEmptyState) => {
  return (
    <div className="kl-flex kl-flex-col kl-items-center kl-shadow-card kl-border kl-border-border-default kl-rounded">
      <div
        className={cn(
          'kl-flex kl-flex-col kl-items-center kl-px-3xl kl-py-8xl kl-gap-5xl',
        )}
      >
        {image ? (
          <img
            src={image}
            className="kl-max-h-43 kl-max-w-37"
            alt="empty state"
          />
        ) : (
          <div className="kl-h-43 kl-w-37 kl-bg-surface-basic-hovered" />
        )}
        <div className="kl-flex kl-flex-col kl-gap-2xl kl-pb-8xl">
          <div className="kl-headingLg kl-text-center">{heading}</div>
          {children && (
            <div className="kl-text-text-strong kl-bodyMd kl-text-center">
              {children}
            </div>
          )}
          {(!!action || !!secondaryAction) && (
            <div className="kl-flex kl-flex-row kl-items-center kl-justify-center kl-gap-lg">
              {!!secondaryAction && (
                <Button {...{ ...secondaryAction, variant: 'outline' }} />
              )}
              {!!action && <Button {...{ ...action, variant: 'primary' }} />}
            </div>
          )}
          {!!footer && (
            <div className="kl-bodySm kl-text-text-soft">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
};
