import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import React, {
  KeyboardEvent,
  ReactElement,
  ReactNode,
  forwardRef,
  useId,
  useState,
} from 'react';
import { cn } from '../utils';

type TabSizes = 'md' | 'sm' | (string & NonNullable<unknown>);
type TabVariant = 'filled' | 'plain' | (string & NonNullable<unknown>);

interface IBase {
  to?: string;
  fitted?: boolean;
  LinkComponent?: any;
  variant?: TabVariant;
  size?: TabSizes;
}

interface ITabBase extends IBase {
  label: ReactNode | ((active: boolean) => ReactNode);
  active?: boolean;
  onClick?: (e: KeyboardEvent<HTMLSpanElement>) => void;
  prefix?: JSX.Element;
  layoutId: string;
  toLabel?: string;
}

interface ITabs<T = string> extends Omit<IBase, 'to'> {
  onChange?: (item: T) => void;
  value: T;
  className?: string;
  basePath?: string;
  children: ReactNode;
  toLabel?: string;
}

export interface ITab<T = string> {
  to?: string;
  label: ReactNode | ((active: boolean) => ReactNode);
  prefix?: JSX.Element;
  value: T;
}

const TabBase = ({
  to = '',
  label,
  active = false,
  fitted = false,
  onClick = () => {},
  LinkComponent = 'div',
  variant = 'plain',
  size = 'md',
  prefix,
  layoutId,
  toLabel = 'to',
}: ITabBase) => {
  let Component: any = LinkComponent;

  let tempToLabel = toLabel;

  let extraProps = {} as any;
  if (to) {
    if (LinkComponent === 'div') {
      Component = motion.a;
      tempToLabel = 'href';
    } else {
      Component = LinkComponent;
    }
  } else {
    extraProps = {
      role: 'button',
    };
  }

  const [hoverd, setHoverd] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHoverd(true);
      }}
      onMouseLeave={() => {
        setHoverd(false);
      }}
      className={cn(
        'kl-outline-none kl-flex kl-flex-col kl-relative kl-group kl-bodyMd-medium kl-transition-all kl-cursor-pointer hover:kl-text-text-default active:kl-text-text-default',
        {
          'kl-text-text-default': active,
          'kl-text-text-soft': !active,
          'kl-rounded-lg hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed':
            variant === 'filled',
          // 'border border-transparent': variant === 'filled' && !active,
        },
      )}
    >
      <RovingFocusGroup.Item
        asChild
        focusable
        onKeyDown={(e) => {
          if (['Enter', ' '].includes(e.key)) {
            onClick(e);
          }
        }}
        // value={value}
      >
        <Component
          // eslint-disable-next-line no-nested-ternary
          {...{ [tempToLabel]: to }}
          {...extraProps}
          onClick={onClick}
          className={cn(
            'kl-relative kl-z-10 kl-tab-item kl-outline-none',
            'kl-ring-offset-0 focus-visible:kl-ring-border-focus focus-visible:kl-ring-2',
            // 'focus-visible:shadow-focus',
            {
              ...((!fitted || variant === 'filled') && {
                'kl-px-2xl kl-py-lg': size === 'md',
                'kl-px-lg kl-py-md': size === 'sm',
                'kl-rounded-lg': true,
              }),
              ...(fitted && {
                'kl-py-md': variant !== 'filled',
              }),
            },
          )}
        >
          {variant === 'plain' && (
            <div className="kl-h-md kl-bg-none kl-w-full kl-z-0" />
          )}
          <div className="kl-flex kl-flex-row kl-items-center kl-gap-lg">
            {!!prefix &&
              React.cloneElement(prefix, { size: 16, color: 'currentColor' })}
            {typeof label === 'function' ? label(active) : label}
          </div>
          {active && variant === 'plain' && (
            <motion.div
              layoutId="underline"
              className={cn(
                'kl-h-md kl-z-10 kl-absolute kl-left-0 kl-bottom-0 kl-w-full kl-bg-border-primary',
              )}
            />
          )}
          {variant === 'plain' && hoverd && (
            <motion.div
              layoutId="hoverd-underline"
              className="kl-h-md kl-bg-none kl-absolute kl-bottom-0 kl-w-full kl-z-0 kl-left-0 kl-bg-border-default group-active:kl-bg-border-tertiary"
            />
          )}
          {variant === 'plain' && (
            <div className="kl-h-md kl-bg-none kl-w-full kl-z-0" />
          )}
        </Component>
      </RovingFocusGroup.Item>
      <AnimatePresence>
        {variant === 'filled' && active && (
          <motion.div
            layoutId={layoutId}
            className="kl-absolute kl-inset-0 kl-rounded-lg kl-shadow-button kl-border kl-border-border-default kl-bg-surface-basic-default"
            transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Tab = <T,>({ to, label, prefix, value: _ }: ITab<T>) => (
  <TabBase to={to} label={label} prefix={prefix} layoutId="" />
);

const Root = forwardRef<HTMLDivElement, ITabs<any>>(
  (
    {
      variant = 'plain',
      size = 'md',
      fitted = false,
      onChange = () => {},
      value,
      LinkComponent,
      className = '',
      basePath = '',
      children,
      toLabel,
    },
    ref,
  ) => {
    const id = useId();
    // id = useMemo(() => id, [children, value, basePath, size, variant]);
    return (
      <RovingFocusGroup.Root
        orientation="horizontal"
        loop
        className={cn(
          'kl-flex kl-flex-row kl-items-center kl-transition-all',
          'kl-snap-x',
          {
            'md:kl-gap-4xl': size === 'md' && variant !== 'filled',
            'kl-gap-lg': size === 'sm' || variant === 'filled',
          },
          className,
        )}
        ref={ref}
        asChild
      >
        <motion.div layout layoutRoot>
          <LayoutGroup id={id}>
            {React.Children.map(children, (child) => {
              if (!child) {
                throw Error('Tab child is required');
              }
              const tabChild = child as ReactElement;
              const tabChildProps: ITab = tabChild.props;

              return (
                <div
                  className={cn('kl-snap-start', {
                    'kl-px-xl md:kl-px-0': variant === 'plain',
                  })}
                >
                  <TabBase
                    {...tabChildProps}
                    onClick={() => {
                      onChange?.(tabChildProps.value);
                    }}
                    layoutId={id}
                    fitted={fitted}
                    to={basePath + (tabChildProps.to || '')}
                    active={value === tabChildProps.value}
                    LinkComponent={LinkComponent}
                    variant={variant}
                    size={size}
                    toLabel={toLabel}
                  />
                </div>
              );
            })}
          </LayoutGroup>
        </motion.div>
      </RovingFocusGroup.Root>
    );
  },
);

const Tabs = {
  Tab,
  Root,
};

export default Tabs;
