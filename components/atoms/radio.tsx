import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import React, { ReactElement, ReactNode, cloneElement, useId } from 'react';
import { BounceIt } from '../bounce-it';
import { cn } from '../utils';

type labelPlacements = 'left' | 'right' | (string & NonNullable<unknown>);

interface IRadioItem {
  disabled?: boolean;
  value: string;
  children: ReactNode;
  className?: string;
  withBounceEffect?: boolean;
  labelPlacement?: labelPlacements;
}

interface IRadioGroup {
  value: string;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  children: ReactElement | ReactElement[];
  className?: string;
  labelPlacement?: labelPlacements;
  withBounceEffect?: boolean;
  direction?: 'vertical' | 'horizontal';
}

export const Item = ({
  disabled = false,
  value = '',
  children,
  className = '',
  withBounceEffect = true,
  labelPlacement = 'right',
}: IRadioItem) => {
  const id = useId();
  const rend = () => {
    return (
      <label
        htmlFor={id}
        className={cn(
          'kl-flex kl-items-center kl-w-fit',
          {
            'kl-cursor-pointer': !disabled,
            'kl-flex-row-reverse': labelPlacement === 'left',
            'kl-flex-row': labelPlacement === 'right',
          },
          className,
        )}
        aria-label={value}
      >
        <RadioGroupPrimitive.Item
          className={cn(
            'kl-w-2xl kl-h-2xl kl-outline-none kl-rounded-full kl-border kl-pulsable kl-pulsable-hidden kl-ring-border-focus focus:kl-ring-2 kl-transition-all kl-flex kl-items-center kl-justify-center kl-border-border-default',
            {
              'hover:kl-bg-surface-basic-hovered': !disabled,
              'data-[state=checked]:kl-border-border-primary': !disabled,
              'data-[disabled]:kl-border-border-disabled': disabled,
            },
          )}
          value={value}
          id={id}
          disabled={disabled}
          aria-label={value}
        >
          <RadioGroupPrimitive.Indicator
            className={cn('kl-block kl-w-lg kl-h-lg kl-rounded-full', {
              'kl-bg-icon-disabled': disabled,
              'kl-bg-surface-primary-default': !disabled,
            })}
          />
        </RadioGroupPrimitive.Item>
        <div
          className={cn(
            {
              'kl-text-text-disabled': disabled,
              'kl-text-text-default kl-cursor-pointer': !disabled,
            },
            'kl-bodyMd-medium kl-pl-lg kl-select-none kl-flex-1',
          )}
        >
          {children}
        </div>
      </label>
    );
  };
  return withBounceEffect ? <BounceIt>{rend()}</BounceIt> : rend();
};

export const Root = ({
  value,
  onChange = () => {},
  label,
  disabled = false,
  children,
  className = '',
  labelPlacement = 'right',
  withBounceEffect = true,
  direction = 'vertical',
}: IRadioGroup) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        'flex ',
        {
          'kl-flex-row kl-gap-x-xl': direction === 'horizontal',
          'kl-flex-col kl-gap-y-xl': direction === 'vertical',
        },
        className,
      )}
      value={value}
      aria-label={label || 'Radio choice'}
      disabled={disabled}
      onValueChange={onChange}
    >
      {label && <span className="kl-bodyMd-medium">{label}</span>}
      {React.Children.map(children, (child) =>
        cloneElement(child, { labelPlacement, withBounceEffect }),
      )}
    </RadioGroupPrimitive.Root>
  );
};

const Radio = {
  Root,
  Item,
};

export default Radio;
