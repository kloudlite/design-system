import { ReactNode, useState } from 'react';
import { cn } from '../utils';

interface IScrollArea {
  children: ReactNode;
  className?: string;
  leftblur?: boolean;
  rightblur?: boolean;
  blurfrom?: string;
}

const ScrollArea = ({
  children,
  className,
  leftblur = true,
  rightblur = true,
  blurfrom = '',
}: IScrollArea) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = ({ target }: any) => {
    setIsScrolled(target.scrollLeft > 0);
  };
  return (
    <div className={cn('kl-w-0 kl-relative', className)}>
      {isScrolled && leftblur && (
        <div
          className={cn(
            'kl-z-20 kl-bg-gradient-to-r kl-to-transparent kl-absolute kl-h-full kl-w-2xl -kl-left-[3px] kl-top-0',
            {
              'kl-from-surface-basic-subdued': !blurfrom,
            },

            blurfrom,
          )}
        />
      )}
      <div
        tabIndex={-1}
        className="kl-no-scrollbar kl-overflow-x-scroll kl-flex kl-flex-row kl-py-[3px] kl-pl-[3px] -kl-ml-[3px] kl-pr-2xl kl-whitespace-nowrap"
        onScroll={handleScroll}
      >
        {children}
        {rightblur && <div className="kl-w-[3px] kl-min-w-[3px]" />}
      </div>
      {rightblur && (
        <div
          className={cn(
            'kl-bg-gradient-to-l kl-to-transparent kl-absolute kl-h-full kl-w-2xl kl-right-0 kl-top-0 kl-z-20',
            {
              'kl-from-surface-basic-subdued': !blurfrom,
            },
            blurfrom,
          )}
        />
      )}
    </div>
  );
};

export default ScrollArea;
