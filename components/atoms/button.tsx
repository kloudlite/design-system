/* eslint-disable no-nested-ternary */
import { AnimatePresence, motion } from 'framer-motion';
import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import { Spinner } from '~/components/icons';
import { cn } from '../utils';

type ButtonTypes = 'submit' | 'button';

export type ButtonVariants =
  | 'outline'
  | 'basic'
  | 'plain'
  | 'primary'
  | 'primary-outline'
  | 'secondary'
  | 'secondary-outline'
  | 'critical'
  | 'critical-outline'
  | 'primary-plain'
  | 'secondary-plain'
  | 'critical-plain'
  | 'purple'
  | 'tertiary'
  | 'warning'
  | (undefined & NonNullable<unknown>);

type IconButtonVariants =
  | 'outline'
  | 'basic'
  | 'plain'
  | (undefined & NonNullable<unknown>);

type IconButtonSizes =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | (undefined & NonNullable<unknown>);

type ButtonSizes =
  | 'md'
  | 'sm'
  | 'lg'
  | 'xl'
  | '2xl'
  | (undefined & NonNullable<unknown>);

interface IBaseButton {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onPointerDown?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  to?: string;
  linkComponent?: any;
  disabled?: boolean;
  block?: boolean;
  type?: ButtonTypes;
  selected?: boolean;
  className?: string;
  value?: any;
  toLabel?: string;
  target?: string;
  iconSize?: number;
}

export interface IIconButton extends IBaseButton {
  icon: JSX.Element;
  variant?: IconButtonVariants;
  size?: IconButtonSizes;
}

export interface IButton extends IBaseButton {
  suffix?: JSX.Element;
  prefix?: JSX.Element;
  noRounded?: boolean;
  noBorder?: boolean;
  sharpLeft?: boolean;
  sharpRight?: boolean;
  iconOnly?: boolean;
  content: React.ReactNode;
  loading?: boolean;
  variant?: ButtonVariants | IconButtonVariants;
  size?: ButtonSizes;
  tabIndex?: number;
}
export const ButtonBase = React.forwardRef<
  HTMLButtonElement,
  Omit<IButton, 'size'> & { size?: ButtonSizes | IconButtonSizes }
>((props, ref) => {
  const {
    onClick = () => {},
    to = '',
    linkComponent = motion.button,
    disabled = false,
    suffix,
    prefix,
    block = false,
    type = 'button',
    variant = 'primary',
    // noRing,
    noRounded = false,
    noBorder = false,
    sharpLeft = false,
    sharpRight = false,
    selected = false,
    iconOnly = false,
    className = '',
    content,
    size = 'md',
    loading = false,
    tabIndex,
    toLabel = 'to',
    target,
    iconSize,
    ...mprops
  } = props;

  let Component: any = linkComponent;

  let tempToLabel = toLabel;

  let extraProps = {} as any;
  if (to) {
    if (linkComponent === motion.button) {
      Component = motion.a;
      tempToLabel = 'href';
    } else {
      Component = linkComponent;
    }
  }

  if (Component === motion.button || Component === motion.a) {
    extraProps = {
      initial: { scale: 1 },
      whileTap: { scale: 0.99 },
    };
  }

  const noRing = false;

  return (
    <Component
      {...mprops}
      {...{ [tempToLabel]: to }}
      disabled={disabled}
      onClick={onClick}
      {...extraProps}
      ref={ref}
      type={type}
      tabIndex={tabIndex}
      target={target}
      className={cn(
        'pulsable kl-flex-nowrap',
        {
          'kl-w-full': !!block,
          'kl-w-fit': !block,
          selected,
        },
        {
          'kl-pointer-events-none': loading,
        },
        {
          'kl-bodyMd-medium': !variant?.includes('plain'),
          'kl-bodyMd': variant?.includes('plain'),
        },
        {
          'kl-pointer-events-none !kl-text-text-disabled kl-bg-surface-basic-disabled':
            disabled,
          '!kl-border-border-disabled':
            disabled &&
            ![
              'plain',
              'primary-plain',
              'critical-plain',
              'secondary-plain',
            ].includes(variant),
        },
        'kl-relative kl-ring-offset-1',
        'kl-outline-none',
        'kl-flex kl-flex-row kl-gap-lg kl-items-center kl-justify-center',
        'disabled:kl-text-text-disabled disabled:kl-bg-surface-basic-disabled',
        {
          // noRing
          'focus-visible:kl-ring-2 focus:kl-ring-border-focus focus:kl-z-10':
            !noRing,
        },
        {
          ...(!noRounded && {
            'kl-rounded-none': sharpLeft && sharpRight,
            'kl-rounded-r': sharpLeft && !sharpRight,
            'kl-rounded-l': !sharpLeft && sharpRight,
            'kl-rounded': !sharpLeft && !sharpRight,
          }),
        },
        'disabled:kl-pointer-events-none',
        {
          'kl-border-none': noBorder,
          ...(!noBorder && {
            'kl-border-border-default disabled:kl-border-border-disabled':
              variant === 'basic' ||
              variant === 'outline' ||
              variant === 'secondary-outline',
            'kl-border-border-primary disabled:kl-border-border-disabled':
              variant === 'primary' || variant === 'primary-outline',
            'kl-border-border-secondary disabled:kl-border-border-disabled':
              variant === 'secondary',
            'kl-border-border-critical disabled:kl-border-border-disabled':
              variant === 'critical-outline' || variant === 'critical',
            'kl-border-border-purple': variant === 'purple',
            'kl-border-border-warning': variant === 'warning',
            'kl-border-border-tertiary': variant === 'tertiary',
            'kl-border-none':
              variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain',
            'kl-border': !(
              variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain'
            ),
          }),
        },
        !disabled
          ? {
              'kl-bg-surface-basic-default hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed disabled:kl-bg-surface-basic-default':
                variant === 'basic' && !selected,
              'kl-bg-surface-basic-pressed hover:kl-bg-surface-basic-pressed active:kl-bg-surface-basic-pressed disabled:kl-bg-surface-basic-default':
                variant === 'basic' && selected,
              'kl-bg-surface-primary-default hover:kl-bg-surface-primary-hovered active:kl-bg-surface-primary-pressed disabled:kl-bg-surface-basic-default':
                variant === 'primary',
              'kl-bg-surface-secondary-default hover:kl-bg-surface-secondary-hovered active:kl-bg-surface-secondary-pressed disabled:kl-bg-surface-basic-default':
                variant === 'secondary',
              'kl-bg-surface-critical-default hover:kl-bg-surface-critical-hovered active:kl-bg-surface-critical-pressed disabled:kl-bg-surface-basic-default':
                variant === 'critical',
              'kl-bg-none hover:kl-bg-surface-critical-subdued active:kl-bg-surface-critical-subdued':
                variant === 'critical-outline',
              'kl-bg-none hover:kl-bg-surface-primary-subdued active:kl-bg-surface-primary-subdued':
                variant === 'primary-outline',
              'kl-bg-none hover:kl-bg-surface-secondary-subdued active:kl-bg-surface-secondary-subdued':
                variant === 'secondary-outline',
              'kl-bg-none hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed':
                variant === 'outline',
              'kl-bg-surface-basic-pressed kl-shadow-none hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed hover:kl-shadow-button':
                variant === 'outline' && selected,
              'kl-bg-none kl-shadow-none':
                (variant === 'plain' ||
                  variant === 'primary-plain' ||
                  variant === 'secondary-plain' ||
                  variant === 'critical-plain') &&
                !iconOnly,
              'kl-shadow-none active:kl-shadow-button kl-bg-surface-basic-pressed':
                variant === 'plain' && !iconOnly && selected,
              'kl-bg-none kl-shadow-none hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed active:kl-shadow-button active:kl-shadow-button':
                variant === 'plain' && iconOnly,
              'kl-bg-surface-basic-pressed kl-shadow-none hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed active:kl-shadow-button':
                variant === 'plain' && iconOnly && selected,
              'kl-bg-surface-purple-default hover:kl-bg-surface-purple-hovered active:kl-bg-surface-purple-pressed':
                variant === 'purple',
              'kl-bg-surface-tertiary-default hover:kl-bg-surface-tertiary-hovered active:kl-bg-surface-tertiary-pressed':
                variant === 'tertiary',
              'kl-bg-surface-warning-default hover:kl-bg-surface-warning-hovered active:kl-bg-surface-warning-pressed':
                variant === 'warning',
            }
          : {},
        {
          'kl-text-text-default':
            variant === 'basic' || variant === 'plain' || variant === 'outline',
          'kl-text-text-on-primary':
            variant === 'primary' ||
            variant === 'critical' ||
            variant === 'secondary' ||
            variant === 'secondary-outline' ||
            variant === 'purple' ||
            variant === 'warning',
          'kl-text-text-critical':
            variant === 'critical-outline' || variant === 'critical-plain',
          'kl-text-text-primary':
            variant === 'primary-outline' || variant === 'primary-plain',
          'kl-text-text-secondary': variant === 'secondary-plain',
          'kl-text-text-on-secondary': variant === 'tertiary',
        },
        {
          'focus:kl-underline': noRing,
        },
        {
          'hover:kl-underline':
            variant === 'plain' ||
            variant === 'primary-plain' ||
            variant === 'critical-plain' ||
            variant === 'secondary-plain',
        },
        {
          // icon
          ...(!iconOnly &&
            !(
              variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain'
            ) && {
              'kl-py-md kl-px-lg': size === 'sm',
              'kl-py-lg kl-px-2xl': size === 'md',
              'kl-py-xl kl-px-4xl': size === 'lg',
              'kl-py-2xl kl-px-6xl': size === 'xl',
              'kl-py-2xl kl-px-9xl': size === '2xl',
            }),
        },
        {
          ...(!iconOnly &&
            (variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain') && {
              'kl-px-md kl-py-sm': size === 'sm',
              'kl-py-sm kl-px-md': size === 'md',
              'kl-py-md kl-px-lg': size === 'lg',
            }),
        },
        {
          'kl-p-lg !kl-h-[36px] !kl-w-[36px]':
            iconOnly && (size === 'md' || size === 'lg'),
          'kl-p-md': iconOnly && size === 'sm',
          'kl-p-sm': iconOnly && size === 'xs',
        },
        className,
      )}
    >
      <AnimatePresence>
        {loading && (
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 'auto', paddingRight: 0 }}
            exit={{ width: 0 }}
            className={cn(
              'kl-flex kl-items-center kl-justify-center kl-aspect-square kl-overflow-hidden',
            )}
          >
            <span className={cn('kl-animate-spin')}>
              <Spinner color="currentColor" weight={2} size={18} />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
      {!!prefix &&
        React.cloneElement(prefix, {
          size: iconSize || (iconOnly && size === 'lg' ? 20 : 16),
          color: 'currentColor',
        })}
      {!iconOnly && (
        <span className={cn('kl-block kl-truncate')}>{content}</span>
      )}
      {!!suffix &&
        React.cloneElement(suffix, {
          size: iconSize || 16,
          color: 'currentColor',
        })}
    </Component>
  );
});

export const IconButton = React.forwardRef<HTMLButtonElement, IIconButton>(
  (props, ref) => {
    const { icon, block } = props;
    return (
      <ButtonBase
        {...props}
        ref={ref}
        iconOnly
        content={null}
        prefix={icon}
        block={!!block}
      />
    );
  },
);

export const Button = React.forwardRef<HTMLButtonElement, IButton>(
  (props: any, ref) => {
    const { block } = props;
    return <ButtonBase {...props} iconOnly={false} ref={ref} block={!!block} />;
  },
);
