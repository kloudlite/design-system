import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, ReactNode } from 'react';
import { X } from '~/components/icons';
import { IButton, IconButton, Button as NativeButton } from '../atoms/button';
import { ChildrenProps } from '../types';
import { cn } from '../utils';

const Header = ({ children, showclose = true }: any) => {
  return (
    <div className="kl-border-b kl-border-border-default kl-p-3xl kl-flex kl-flex-row kl-items-center kl-min-h-[69px]">
      <Dialog.Title className="kl-headingLg kl-text-text-strong kl-flex-1">
        {children}
      </Dialog.Title>
      {showclose && (
        <Dialog.Close asChild>
          <IconButton variant="plain" icon={<X />} />
        </Dialog.Close>
      )}
    </div>
  );
};

const Content = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'kl-p-3xl kl-overscroll-y-auto kl-overflow-x-hidden kl-flex-1 md:kl-max-h-[65vh]',
        className,
      )}
    >
      {children}
    </div>
  );
};

const Form = (props: ComponentProps<'form'>) => {
  return <form {...props} className="kl-flex-1 kl-flex kl-flex-col" />;
};

const Footer = ({ children }: ChildrenProps) => {
  return (
    <div className="kl-p-3xl kl-flex kl-flex-row kl-justify-end kl-gap-lg kl-bg-surface-basic-active">
      {children}
    </div>
  );
};

interface IPopupButton extends IButton {
  closable?: boolean;
}

const Button = (props: IPopupButton) => {
  const { closable = false } = props;
  return (
    <>
      {closable && (
        <Dialog.Close asChild>
          <NativeButton {...props} />
        </Dialog.Close>
      )}
      {!closable && <NativeButton {...props} />}
    </>
  );
};

interface IPopup extends ChildrenProps {
  show?: boolean;
  onOpenChange?: (val: any) => void;
  backdrop?: boolean;
  className?: string;
}

const PopupRoot = ({
  show = false,
  onOpenChange = () => {},
  children,
  backdrop = true,
  className = '',
}: IPopup) => {
  return (
    <Dialog.Root
      open={show}
      onOpenChange={(e) => {
        if (e) {
          onOpenChange(show);
        } else {
          onOpenChange(false);
        }
      }}
    >
      <AnimatePresence>
        {show && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'anticipate' }}
                className={cn(
                  'kl-fixed kl-inset-0 kl-z-[9999999]',
                  backdrop ? 'kl-bg-surface-basic-overlay-bg/60' : '',
                )}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ x: '-50%', y: '-47%', opacity: 0 }}
                animate={{ x: '-50%', y: '-50%', opacity: 1 }}
                exit={{ x: '-50%', y: '-47%', opacity: 0 }}
                transition={{ duration: 0.3, ease: 'anticipate' }}
                className={cn(
                  'kl-flex kl-flex-col',
                  'kl-z-[99999999] kl-outline-none kl-transform kl-overflow-hidden md:kl-rounded kl-bg-surface-basic-default kl-shadow-modal',
                  'kl-fixed kl-top-1/2 kl-left-1/2',
                  'kl-w-full kl-h-full md:!kl-h-auto md:kl-w-[612px]',
                  'kl-border kl-border-border-default',
                  className,
                )}
              >
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

const Popup = {
  Root: PopupRoot,
  Header,
  Content,
  Footer,
  Button,
  Form,
};

export default Popup;
