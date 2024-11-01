import * as PrimitiveAlertDialog from '@radix-ui/react-alert-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { X } from '~/components/icons';
import { IButton, IconButton, Button as NativeButton } from '../atoms/button';
import { cn } from '../utils';

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="kl-bg-surface-basic-active kl-p-3xl kl-flex kl-flex-row kl-items-center kl-justify-between">
      <PrimitiveAlertDialog.Title className="kl-headingLg kl-text-text-strong">
        {children}
      </PrimitiveAlertDialog.Title>
      <PrimitiveAlertDialog.Cancel asChild>
        <IconButton variant="plain" icon={<X />} />
      </PrimitiveAlertDialog.Cancel>
    </div>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  return <div className="kl-p-3xl kl-bodyMd">{children}</div>;
};

const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="kl-p-3xl kl-flex kl-flex-row kl-justify-end kl-gap-lg">
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
        <PrimitiveAlertDialog.Cancel asChild>
          <NativeButton {...props} />
        </PrimitiveAlertDialog.Cancel>
      )}
      {!closable && <NativeButton {...props} />}
    </>
  );
};

interface IDialog {
  show: boolean;
  onOpenChange: (val: boolean) => void;
  children: ReactNode;
  backdrop?: boolean;
}

const Root = ({ show, onOpenChange, children, backdrop = true }: IDialog) => {
  return (
    <PrimitiveAlertDialog.Root
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
          <PrimitiveAlertDialog.Portal forceMount>
            <PrimitiveAlertDialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'anticipate' }}
                className={cn('kl-fixed kl-inset-0 kl-z-40', {
                  'kl-bg-text-default/60': backdrop,
                })}
              />
            </PrimitiveAlertDialog.Overlay>
            <PrimitiveAlertDialog.Content asChild forceMount>
              <motion.div
                initial={{ x: '-50%', y: '-47%', opacity: 0 }}
                animate={{ x: '-50%', y: '-50%', opacity: 1 }}
                exit={{ x: '-50%', y: '-47%', opacity: 0 }}
                transition={{ duration: 0.3, ease: 'anticipate' }}
                className="kl-z-50 kl-outline-none kl-transform kl-overflow-hidden kl-rounded kl-bg-surface-basic-default kl-shadow-modal kl-border kl-border-border-default kl-fixed kl-w-[612px] kl-max-w-[612px] kl-top-1/2 kl-left-1/2"
              >
                {children}
              </motion.div>
            </PrimitiveAlertDialog.Content>
          </PrimitiveAlertDialog.Portal>
        )}
      </AnimatePresence>
    </PrimitiveAlertDialog.Root>
  );
};

const AlertDialog = {
  Root,
  Content,
  Header,
  Footer,
  Button,
};

export default AlertDialog;
