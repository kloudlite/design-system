/* eslint-disable jsx-a11y/label-has-associated-control */
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ReactNode } from 'react';
import { IButton, Button as NativeButton } from '../atoms/button';
import { ChildrenProps } from '../types';

export const Trigger = ({ children }: ChildrenProps) => {
  return (
    <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
  );
};
export const Content = ({
  children,
  align = 'center',
}: {
  children: ReactNode;
  align?: 'center' | 'start' | 'end';
}) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        style={{ pointerEvents: 'all' }}
        autoFocus
        forceMount
        className="kl-outline-none kl-transform kl-overflow-hidden kl-rounded kl-bg-surface-basic-default kl-shadow-modal kl-border kl-border-border-default kl-w-[300px] kl-z-[999999999]"
        sideOffset={5}
      >
        <div className="kl-p-3xl">{children}</div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
};

export const Footer = ({ children }: ChildrenProps) => {
  return (
    <div className="kl-pt-3xl kl-flex kl-flex-row kl-justify-end kl-gap-lg">
      {children}
    </div>
  );
};
export const Button = (props: IButton) => {
  return (
    <PopoverPrimitive.Close asChild>
      <NativeButton {...props} />
    </PopoverPrimitive.Close>
  );
};

interface IPopover extends ChildrenProps {
  onOpenChange?: (val: boolean) => void;
  show?: boolean;
}

export const Root = ({ children, onOpenChange = () => {}, show }: IPopover) => (
  <PopoverPrimitive.Root open={show} onOpenChange={onOpenChange}>
    {children}
  </PopoverPrimitive.Root>
);

const Popover = {
  Root,
  Trigger,
  Content,
  Footer,
  Button,
};

export default Popover;
