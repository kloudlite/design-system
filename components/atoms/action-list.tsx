import { LayoutGroup, motion } from 'framer-motion';
import React, { ReactElement, ReactNode, useId, useMemo } from 'react';
import { cn } from '../utils';

interface IActionList {
  children: ReactNode;
  value: string;
  onChange?: (value: string) => void;
  onClick?: (e: Event, route: string) => void;
  LinkComponent?: any;
  showIndicator?: boolean;
  className?: string;
}

export interface IActionItem {
  children?: ReactNode;
  disabled?: boolean;
  critical?: boolean;
  to?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  value: string;
}

export interface IActionItemBase extends IActionItem {
  LinkComponent?: any;
  active?: boolean;
  onClick?: (e: Event) => void;
  showIndicator?: boolean;
}

export const Item = ({
  children,
  disabled = false,
  critical = false,
  active = false,
  onClick = () => {},
  to = '',
  prefix,
  suffix,
  LinkComponent = 'div',
  // eslint-disable-next-line no-unused-vars
  showIndicator = true,
}: IActionItemBase) => {
  let Component: any = LinkComponent;
  if (to) {
    if (LinkComponent === 'div') {
      Component = 'a';
    } else {
      Component = LinkComponent;
    }
  }

  return (
    <div className={cn('kl-w-full kl-flex kl-flex-row kl-gap-x-md')}>
      {active && showIndicator && (
        <motion.div
          layoutId="line"
          className="kl-w-sm kl-bg-icon-primary kl-rounded"
        />
      )}
      {!active && showIndicator && (
        <motion.div
          layoutId="line_1"
          className="kl-w-sm kl-bg-transparent kl-rounded"
        />
      )}
      <Component
        {...(Component === 'a' ? { href: to } : { to })}
        className={cn(
          'kl-transition-all kl-w-[inherit] kl-rounded kl-border kl-flex kl-gap-lg kl-items-center kl-justify-between kl-cursor-pointer kl-outline-none kl-border-none kl-py-lg kl-ring-offset-1 focus-visible:kl-ring-2 focus:kl-ring-border-focus',
          {
            'kl-px-2xl': showIndicator,
            'kl-text-text-soft hover:kl-text-text-default':
              !active && !disabled && !critical && showIndicator,
            'kl-text-text-primary kl-bodyMd-medium': active && showIndicator,
            bodyMd: !active || !showIndicator,
            'kl-text-text-default kl-px-xl': !showIndicator,
            'kl-text-text-disabled': disabled,
            'kl-text-text-critical hover:kl-text-text-on-primary active:kl-text-text-on-primary':
              critical,
          },
          {
            'kl-pointer-events-none': disabled,
          },
          {
            'kl-bg-none hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed':
              !active && !disabled && !critical,
            'kl-bg-none hover:kl-bg-surface-critical-hovered active:kl-bg-surface-critical-pressed':
              !active && !disabled && critical,
            'kl-bg-none': disabled,
            'kl-bg-surface-basic-active': !critical && active,
          }
        )}
        onClick={!critical ? onClick : null}
      >
        <div className="kl-flex kl-flex-row kl-items-center kl-gap-lg">
          {!!prefix &&
            React.cloneElement(prefix, { size: 16, color: 'currentColor' })}
          {children}
        </div>
        {suffix &&
          React.cloneElement(suffix, { size: 16, color: 'currentColor' })}
      </Component>
    </div>
  );
};

const ItemBase = ({
  children,
  prefix,
  suffix,
  value,
  to,
  disabled,
  critical,
}: IActionItem) => {
  return (
    <Item
      prefix={prefix}
      suffix={suffix}
      value={value}
      to={to}
      disabled={disabled}
      critical={critical}
    >
      {children}
    </Item>
  );
};

export const Root = ({
  children,
  value,
  onChange = () => {},
  LinkComponent,
  showIndicator = true,
  onClick,
  className,
}: IActionList) => {
  const props = { children, value, onChange, LinkComponent };

  let id = useId();
  id = useMemo(() => id, [props]);

  return (
    <div className={cn('kl-flex kl-flex-col kl-gap-y-md', className)}>
      <LayoutGroup id={id}>
        {React.Children.map(children as ReactElement[], (child) => (
          <Item
            {...child.props}
            LinkComponent={LinkComponent}
            onClick={(e) => {
              if (onChange) onChange(child.props?.value);
              onClick?.(e, child.props.to);
            }}
            active={child.props.value === value}
            showIndicator={showIndicator}
          />
        ))}
      </LayoutGroup>
    </div>
  );
};

const ActionList = {
  Root,
  Item: ItemBase,
};

export default ActionList;
