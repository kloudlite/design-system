import React from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import BounceIt from "../bounce-it.jsx";

const Anchor = ({href, children, ...props}) => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

const ButtonElement = ({type, children, ...props}) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  )
}

/**
 * Button component for user interaction
 */
export const Button = ({style, size="medium", onClick, href, label, type, disabled, Component, sharpLeft=false, sharpRight=false, nobounce}) => {
  const C = Component || (href ? Anchor : ButtonElement)
  return (
    <BounceIt disable={nobounce}>
      <C
        type={type}
        disabled={disabled}
        className={classnames(
          "bodyMd-medium",
          {
            "rounded-none":sharpLeft && sharpRight,
            "rounded-r":sharpLeft && !sharpRight,
            "rounded-l":!sharpLeft && sharpRight,
            "rounded":!sharpLeft && !sharpRight,
          },
          "border-t border-b",
          {
            "border-l border-r":(!sharpLeft && !sharpRight) ||(!sharpLeft && sharpRight),
            "border-r":(sharpLeft && sharpRight) || (sharpLeft && !sharpRight),
          },
          "transition-all",
          "disabled:pointer-events-none",
          {
            "shadow-button":style !== "plain" && style !== "outline" && style !== "primary-plain" && style !== "secondary-plain" && style !== "critical-plain",
          },
          {
            "border-zinc-300 disabled:border-zinc-200":style === "basic" || style === "outline",
            "border-primary-600 disabled:border-zinc-200":style === "primary"||style === "primary-outline",
            "border-secondary-600 disabled:border-zinc-200":style === "secondary"||style === "secondary-outline",
            "border-none":style === "plain" || style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
            "border-critical-600 disabled:border-zinc-200":style === "critical-outline" || style === "critical",
          },
          {
            "bg-zinc-50 hover:bg-zinc-200 active:bg-zinc-300":style === "basic",
            "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 disabled:bg-zinc-50":style === "primary",
            "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 disabled:bg-zinc-50":style === "secondary",
            "bg-critical-500 hover:bg-critical-600 active:bg-critical-700 disabled:bg-zinc-50":style === "critical",
            "bg-none hover:bg-critical-100 active:bg-critical-200":style === "critical-outline",
            "bg-none hover:bg-primary-100 active:bg-primary-200":style === "primary-outline",
            "bg-none hover:bg-secondary-100 active:bg-secondary-200":style === "secondary-outline",
            "bg-none hover:bg-zinc-200 active:bg-zinc-300":style === "outline",
            "bg-none active:bg-zinc-300":style === "plain",
            "bg-none active:bg-primary-700":style === "primary-plain",
            "bg-none active:bg-secondary-700":style === "secondary-plain",
            "bg-none active:bg-critical-700":style === "critical-plain",
          },
          {
            "text-grey-900 disabled:text-grey-400":style === "basic" || style==="plain" || style === "outline",
            "active:text-grey-50":style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
            "text-grey-50 disabled:text-grey-400":style === "primary" || style === "critical" || style === "secondary",
            "text-critical-700 active:text-grey-50 disabled:text-grey-400":style === "critical-outline" || style === "critical-plain",
            "text-primary-700 active:text-grey-50 disabled:text-grey-400":style === "primary-outline"|| style === "primary-plain",
            "text-secondary-700 active:text-grey-50 disabled:text-grey-400":style === "secondary-outline" || style === "secondary-plain",
          },
          {
            "underline":style === "plain"|| style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
          },
          {
            "px-6 py-3" : size === "large" && style !== "plain" && style!== "critical-plain" && style !== "primary-plain" && style !== "secondary-plain",
            "px-4 py-2" : size === "medium" && style !== "plain"&& style!== "critical-plain" && style !== "primary-plain" && style !== "secondary-plain",
            "px-2 py-1" : size === "small" && style !== "plain"&& style!== "critical-plain" && style !== "primary-plain" && style !== "secondary-plain",
            "px-1 py-0.5" : style === "plain"|| style === "primary-plain" || style === "critical-plain" || style === "secondary-plain",
          }
        )}
        onClick={onClick}
        href={href}
      >
        {label}
      </C>
    </BounceIt>
  );
};

Button.propTypes = {
  /**
   * How the button looks like?
   */
  style: PropTypes.oneOf([
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
  ]),
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
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
};

Button.defaultProps = {
  style: 'primary',
  size: 'medium',
  onClick: undefined,
  link: false,
};