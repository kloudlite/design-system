import { useId, ReactNode } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../utils';

interface ISwitch {
  checked?: boolean;
  onChange?: (check: boolean) => void;
  disabled?: boolean;
  label: ReactNode;
}

export const Switch = ({
  checked: c = false,
  onChange = () => {},
  disabled = false,
  label,
}: ISwitch) => {
  const id = useId();

  return (
    <div className="kl-flex kl-gap-lg kl-items-center kl-w-fit">
      <SwitchPrimitive.Root
        className={cn(
          'kl-transition-all kl-w-7xl kl-rounded-full kl-border kl-flex kl-items-center kl-p-sm kl-cursor-pointer',
          'kl-ring-border-focus kl-ring-offset-1 focus:kl-ring-2 kl-outline-none',
          {
            'data-[state=unchecked]:kl-bg-surface-basic-default data-[state=unchecked]:kl-border-border-default':
              !disabled,
          },
          {
            'data-[state=checked]:kl-bg-surface-primary-default data-[state=checked]:kl-border-border-primary':
              !disabled,
          },
          {
            'data-[disabled]:kl-bg-surface-basic-default data-[disabled]:kl-border-border-disabled data-[disabled]:!kl-cursor-default':
              disabled,
          },
        )}
        id={id}
        disabled={disabled}
        checked={c}
        onCheckedChange={onChange}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'kl-group kl-rounded-full kl-translate-x-0 kl-transition-all kl-duration-200 data-[state=checked]:kl-translate-x-full',
          )}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              {
                'group-data-[disabled]:kl-fill-icon-disabled': disabled,
              },
              {
                'group-data-[state=unchecked]:kl-fill-surface-primary-default group-data-[state=checked]:kl-fill-surface-basic-default':
                  !disabled,
              },
            )}
          >
            <circle cx="11" cy="11" r="10.5" />
          </svg>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      {label && (
        <label
          className={cn(
            {
              'kl-text-text-disabled': disabled,
              'kl-text-text-default kl-cursor-pointer': !disabled,
            },
            'kl-bodyMd-medium kl-select-none',
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};
