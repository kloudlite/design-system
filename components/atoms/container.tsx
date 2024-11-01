import { ReactNode } from 'react';
import { cn } from '../utils';

interface IContainer {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: IContainer) => {
  return (
    <div
      className={cn('kl-flex kl-flex-1 kl-justify-center kl-px-8xl', className)}
    >
      <div className={cn('kl-flex-1 kl-w-full kl-max-w-8xl kl-min-w-[320px]')}>
        {children}
      </div>
    </div>
  );
};

export default Container;
