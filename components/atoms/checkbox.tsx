import { useId } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { BounceIt } from '../bounce-it';
import { cn } from '../utils';

type checkedType = boolean | string | undefined;

interface ICheckbox {
  checked?: checkedType;
  onChange?: (check: checkedType) => void;
  disabled?: boolean;
  error?: boolean;
  indeterminate?: boolean;
  withBounceEffect?: boolean;
  label: string;
}

export const Checkbox = ({
  checked,
  onChange = () => {},
  disabled = false,
  error = false,
  indeterminate = false,
  label,
  withBounceEffect,
}: ICheckbox) => {
  const id = useId();
  const rend = () => {
    return (
      <div className={cn('kl-flex kl-items-center kl-justify-center kl-w-fit')}>
        <CheckboxPrimitive.Root
          className={cn(
            'kl-rounded kl-flex kl-flex-row kl-items-center kl-justify-center kl-border kl-w-2xl kl-h-2xl kl-outline-none kl-transition-all kl-cursor-pointer',
            'kl-ring-border-focus kl-ring-offset-1 focus:kl-ring-2',
            {
              'kl-border-border-disabled !kl-cursor-default': disabled,
            },
            {
              'kl-bg-surface-basic-default kl-border-border-default':
                !checked && !disabled && !error,
              'kl-bg-surface-critical-subdued kl-border-border-critical':
                !checked && !disabled && error,
              'kl-bg-surface-primary-default kl-border-border-primary':
                !!checked && !error && !disabled,
              'kl-bg-surface-critical-default kl-border-border-critical':
                !!checked && error && !disabled,
              'hover:kl-bg-surface-basic-hovered': !checked && !disabled,
            },
          )}
          defaultChecked
          id={id}
          checked={!!checked}
          onCheckedChange={(e) => {
            let c = checked;
            if (indeterminate) {
              if (checked === 'indeterminate') c = false;
              c = 'indeterminate';
            }
            c = e;
            onChange?.(c);
          }}
          disabled={disabled}
        >
          <CheckboxPrimitive.Indicator>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {checked === true && (
                <path
                  d="M12.25 3.50017L5.25 10.4999L1.75 7.00017"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn({
                    'kl-stroke-text-disabled': disabled,
                    'kl-stroke-text-on-primary': !disabled,
                  })}
                />
              )}
              {checked === 'indeterminate' && (
                <path
                  d="M1.75 7H12.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn({
                    'kl-stroke-text-disabled': disabled,
                    'kl-stroke-text-on-primary': !disabled,
                  })}
                />
              )}
            </svg>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label
            className={cn(
              {
                'kl-text-text-disabled': disabled,
                'kl-text-text-default kl-cursor-pointer': !disabled && !error,
                'kl-text-text-critical kl-cursor-pointer': !disabled && error,
              },
              'kl-bodyMd kl-pl-lg kl-select-none',
            )}
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
    );
  };
  return withBounceEffect ? <BounceIt>{rend()}</BounceIt> : rend();
};
