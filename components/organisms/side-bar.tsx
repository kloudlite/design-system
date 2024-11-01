import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useState,
} from 'react';
import { AnimatePresence, AnimationDefinition, motion } from 'framer-motion';
import { cn } from '../utils';

interface ISidebar {
  children?: ReactNode;
  onCollapseChange?: ({
    type,
    value,
  }: {
    type: 'start' | 'end';
    value: AnimationDefinition;
  }) => void;
  linkComponent?: any;
  toLabel?: string;
}

const Item = ({
  children,
  active,
  icon,
  to,
  ...props
}: {
  children?: ReactNode;
  active?: boolean;
  icon?: JSX.Element;
  to?: string;
}) => {
  const { linkComponent: LinkComponent = 'div', toLabel = 'href' } = props as {
    linkComponent?: any;
    toLabel?: string;
  };

  let p = {};

  if (LinkComponent !== 'div') {
    p = {
      [toLabel]: to,
    };
  }

  return (
    <LinkComponent
      {...p}
      className={cn(
        'kl-cursor-pointer kl-px-3xl kl-py-[10px] kl-min-h-[40px] kl-bodyMd kl-text-text-default hover:kl-bg-surface-basic-hovered kl-flex kl-flex-row kl-items-center kl-gap-lg kl-flex-shrink-0',
        active ? 'kl-bg-surface-basic-pressed' : '',
      )}
    >
      <span>
        {icon &&
          cloneElement(icon, {
            size: 16,
          })}
      </span>
      <motion.div className="kl-overflow-hidden">{children}</motion.div>
    </LinkComponent>
  );
};

const Separator = () => {
  return <div className="kl-bg-border-default kl-h-xs kl-w-full" />;
};

const Header = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="kl-h-[60px] kl-p-2xl kl-border-b kl-border-b-border-default kl-flex kl-flex-row kl-items-center kl-gap-lg">
      {children}
    </div>
  );
};

const Root = ({
  children,
  onCollapseChange,
  linkComponent = 'div',
  toLabel = 'href',
}: ISidebar) => {
  const topIcon = {
    open: {
      rotate: 20,
      height: 9,
      marginBottom: -1,
    },
    close: {
      rotate: -20,
      height: 9,
      marginBottom: -1,
    },
  };

  const bottomIcon = {
    open: {
      rotate: -20,
      height: 9,
      marginTop: -1,
    },
    close: {
      rotate: 20,
      height: 9,
      marginTop: -1,
    },
  };

  const panelVariants = {
    open: {
      width: 260,
    },
    close: {
      width: 57,
    },
  };

  const [open, setOpen] = useState(true);
  return (
    <AnimatePresence initial={false}>
      <motion.div
        animate={open ? 'open' : 'close'}
        variants={panelVariants}
        onAnimationComplete={(e) => {
          onCollapseChange?.({ type: 'end', value: e });
        }}
        onAnimationStart={(e) => {
          onCollapseChange?.({ type: 'start', value: e });
        }}
        className={cn(
          'kl-min-h-screen kl-max-h-screen kl-flex kl-flex-col kl-bg-surface-basic-active kl-border-r kl-border-r-border-default kl-sticky kl-top-0 kl-flex-shrink-0',
        )}
      >
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return child;
          const c = child as ReactElement;
          return cloneElement(c, { collapsed: open, linkComponent, toLabel });
        })}
        <div
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="kl-absolute -kl-right-4xl kl-top-1/2 kl-transform -kl-translate-y-1/2  kl-text-icon-soft kl-w-4xl kl-flex kl-items-center kl-justify-center kl-cursor-pointer"
        >
          <motion.div
            whileHover={open ? 'open' : 'close'}
            className="kl-flex kl-flex-col kl-h-2xl kl-w-full kl-items-center"
          >
            <motion.div
              variants={topIcon}
              className="kl-w-sm kl-bg-icon-soft kl-h-lg kl-rounded-full !kl-rounded-b-none"
            />
            <motion.div
              variants={bottomIcon}
              className="kl-w-sm kl-bg-icon-soft kl-h-lg kl-rounded-full !kl-rounded-t-none"
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Sidebar = {
  Root,
  Item,
  Header,
  Separator,
};
export default Sidebar;
