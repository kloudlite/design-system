/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Spinner } from '@jengaicons/react';
import { cn } from '../utils';

export const ButtonStyles = [
  'outline',
  'basic',
  'plain',
  'primary',
  'primary-outline',
  'secondary',
  'secondary-outline',
  'critical',
  'critical-outline',
  'primary-plain',
  'secondary-plain',
  'critical-plain',
  'purple',
  'tertiary',
  'warning',
];
export const IconButtonStyles = ['outline', 'basic', 'plain'];

export const AriaButton = 'button';

export const ButtonBase = forwardRef((props, ref) => {
  const {
    onClick,
    href,
    LinkComponent,
    disabled,
    suffix,
    prefix,
    block,
    type,
    variant,
    noRing,
    noRounded,
    noBorder,
    sharpLeft,
    sharpRight,
    selected,
    iconOnly,
    className,
    content,
    size = 'md',
    loading = false,
    ...mprops
  } = props;

  const extraProps = {};
  extraProps.onClick = onClick;

  let Component = motion.button;

  if (href) {
    Component = motion(LinkComponent);
    extraProps.to = href;
  } else {
    extraProps.disabled = disabled;
  }

  const Suffix = suffix;
  const Prefix = prefix;

  return (
    <Component
      {...mprops}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.99 }}
      ref={ref}
      type={type}
      className={cn(
        {
          'w-full': !!block,
          'w-fit': !block,
        },
        {
          'bodyMd-medium':
            variant !== 'primary-plain' &&
            variant !== 'secondary-plain' &&
            variant !== 'critical-plain' &&
            variant !== 'plain',
          bodyMd:
            variant === 'primary-plain' ||
            variant === 'secondary-plain' ||
            variant !== 'critical-plain' ||
            variant !== 'plain',
        },
        'relative ring-offset-1',
        'outline-none shadow-button',
        'flex flex-row gap-lg items-center justify-center',
        'disabled:text-text-disabled',
        {
          ...(noRing
            ? {}
            : {
                'focus-visible:ring-2 focus:ring-border-focus focus:z-10': true,
              }),
        },
        {
          ...(noRounded
            ? {}
            : {
                'rounded-none': sharpLeft && sharpRight,
                'rounded-r': sharpLeft && !sharpRight,
                'rounded-l': !sharpLeft && sharpRight,
                rounded: !sharpLeft && !sharpRight,
              }),
        },
        'transition-all',
        'disabled:pointer-events-none',
        {
          ...(noBorder
            ? { 'border-none': true }
            : {
                'border-border-default disabled:border-border-disabled':
                  variant === 'basic' ||
                  variant === 'outline' ||
                  variant === 'secondary-outline',
                'border-border-primary disabled:border-border-disabled':
                  variant === 'primary' || variant === 'primary-outline',
                'border-border-secondary disabled:border-border-disabled':
                  variant === 'secondary',
                'border-border-critical disabled:border-border-disabled':
                  variant === 'critical-outline' || variant === 'critical',
                'border-border-purple': variant === 'purple',
                'border-border-warning': variant === 'warning',
                'border-border-tertiary': variant === 'tertiary',
                'border-none':
                  variant === 'plain' ||
                  variant === 'primary-plain' ||
                  variant === 'critical-plain' ||
                  variant === 'secondary-plain',
                border: !(
                  variant === 'plain' ||
                  variant === 'primary-plain' ||
                  variant === 'critical-plain' ||
                  variant === 'secondary-plain'
                ),
              }),
        },
        {
          'bg-surface-basic-default hover:bg-surface-basic-hovered active:bg-surface-basic-pressed disabled:bg-surface-basic-default':
            variant === 'basic',
          'bg-surface-basic-pressed hover:bg-surface-basic-pressed active:bg-surface-basic-pressed disabled:bg-surface-basic-default':
            variant === 'basic' && selected,
          'bg-surface-primary-default hover:bg-surface-primary-hovered active:bg-surface-primary-pressed disabled:bg-surface-basic-default':
            variant === 'primary',
          'bg-surface-secondary-default hover:bg-surface-secondary-hovered active:bg-surface-secondary-pressed disabled:bg-surface-basic-default':
            variant === 'secondary',
          'bg-surface-critical-default hover:bg-surface-critical-hovered active:bg-surface-critical-pressed disabled:bg-surface-basic-default':
            variant === 'critical',
          'bg-none hover:bg-surface-critical-subdued active:bg-surface-critical-subdued':
            variant === 'critical-outline',
          'bg-none hover:bg-surface-primary-subdued active:bg-surface-primary-subdued':
            variant === 'primary-outline',
          'bg-none hover:bg-surface-secondary-subdued active:bg-surface-secondary-subdued':
            variant === 'secondary-outline',
          'bg-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed':
            variant === 'outline',
          'bg-surface-basic-pressed shadow-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed hover:shadow-button active:shadow-button':
            variant === 'outline' && selected,
          'bg-none shadow-none':
            (variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'secondary-plain' ||
              variant === 'critical-plain') &&
            !iconOnly,
          'bg-surface-basic-pressed shadow-none active:shadow-button':
            variant === 'plain' && !iconOnly && selected,
          'bg-none shadow-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed active:shadow-button':
            variant === 'plain' && iconOnly,
          'bg-surface-basic-pressed shadow-none hover:bg-surface-basic-hovered active:bg-surface-basic-pressed active:shadow-button':
            variant === 'plain' && iconOnly && selected,
          'bg-surface-purple-default hover:bg-surface-purple-hovered active:bg-surface-purple-pressed':
            variant === 'purple',
          'bg-surface-tertiary-default hover:bg-surface-tertiary-hovered active:bg-surface-tertiary-pressed':
            variant === 'tertiary',
          'bg-surface-warning-default hover:bg-surface-warning-hovered active:bg-surface-warning-pressed':
            variant === 'warning',
        },
        {
          'text-text-default':
            variant === 'basic' || variant === 'plain' || variant === 'outline',
          'text-text-on-primary':
            variant === 'primary' ||
            variant === 'critical' ||
            variant === 'secondary' ||
            variant === 'secondary-outline' ||
            variant === 'tertiary' ||
            variant === 'purple' ||
            variant === 'warning',
          'text-text-critical':
            variant === 'critical-outline' || variant === 'critical-plain',
          'text-text-primary':
            variant === 'primary-outline' || variant === 'primary-plain',
          'text-text-secondary': variant === 'secondary-plain',
        },
        {
          'focus:underline': noRing,
        },
        {
          'hover:underline':
            variant === 'plain' ||
            variant === 'primary-plain' ||
            variant === 'critical-plain' ||
            variant === 'secondary-plain',
        },
        {
          underline: selected && !iconOnly && variant === 'plain',
        },
        {
          ...(!iconOnly &&
            !(
              variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain'
            ) && {
              'py-md px-lg': size === 'sm',
              'py-lg px-2xl': size === 'md',
              'py-xl px-4xl': size === 'lg',
              'py-2xl px-6xl': size === 'xl',
              'py-2xl px-9xl': size === '2xl',
            }),
        },
        {
          ...(!iconOnly &&
            (variant === 'plain' ||
              variant === 'primary-plain' ||
              variant === 'critical-plain' ||
              variant === 'secondary-plain') && {
              'py-sm px-md': size === 'md',
              'py-md px-lg': size === 'lg',
            }),
        },
        {
          'p-lg': iconOnly,
        },
        className
      )}
      {...extraProps}
    >
      <AnimatePresence>
        {loading && (
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 'auto', paddingRight: 0 }}
            exit={{ width: 0 }}
            className="flex items-center justify-center aspect-square overflow-hidden"
          >
            <span className="animate-spin">
              <Spinner color="currentColor" weight={2} size={18} />
            </span>
          </motion.span>
        )}
      </AnimatePresence>
      {prefix && <Prefix size={iconOnly ? 20 : 16} color="currentColor" />}
      {!iconOnly && content}
      {suffix && !iconOnly && <Suffix size={16} color="currentColor" />}
    </Component>
  );
});

ButtonBase.displayName = 'ButtonBase';

const _false = false;
export const IconButton =
  (_false
    ? ({
        icon = null,
        variant = '',
        disabled = false,
        ref = null,
        iconOnly = null,
        label = null,
        prefix = null,
        block = false,
        onClick = (_) => _,
      } = {}) => null
    : _false) ||
  forwardRef((props, ref) => {
    const { icon, block } = props;
    return (
      <ButtonBase
        {...props}
        ref={ref}
        iconOnly
        label={null}
        prefix={icon}
        block={!!block}
      />
    );
  });

IconButton.displayName = 'IconButton';

export const Button =
  (_false
    ? ({
        content = '',
        size = '',
        icon = null,
        variant = '',
        disabled = false,
        ref = null,
        iconOnly = null,
        label = null,
        prefix = null,
        block = false,
        onClick = (_) => _,
        loading = false,
        suffix = null,
        type = 'button',
      } = {}) => null
    : _false) ||
  forwardRef((props, ref) => {
    const { block } = props;
    return <ButtonBase {...props} iconOnly={false} ref={ref} block={!!block} />;
  });

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(ButtonStyles),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  variant: 'primary',
  onClick: undefined,
  type: 'button',
  content: 'button',
  href: null,
  block: false,
  disabled: false,
  size: 'md',
};

IconButton.propTypes = {
  /**
   * How the button looks like?
   */
  variant: PropTypes.oneOf(IconButtonStyles),
  /**
   * Button contents
   */
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Href for link
   */
  href: PropTypes.string,
  /**
   * Disable button
   */
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
};

IconButton.defaultProps = {
  variant: 'basic',
  onClick: undefined,
  type: 'button',
  href: null,
  disabled: false,
};
