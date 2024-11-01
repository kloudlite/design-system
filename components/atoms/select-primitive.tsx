/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEventHandler, ReactNode, useId, useMemo } from 'react';
import { cn } from '../utils';

interface IOption {
  children?: ReactNode;
  value: string;
  disabled?: boolean;
}
const Option = ({ children, value = '', disabled, ...props }: IOption) => {
  return (
    <option value={value} disabled={disabled} {...props}>
      {children}
    </option>
  );
};

interface IRoot {
  disabled?: boolean;
  value: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  children: ReactNode;
  label?: ReactNode;
  size?: 'md' | 'lg';
  block?: boolean;
  error?: boolean;
  message?: ReactNode;
}

export const Root = (props: IRoot) => {
  const {
    disabled,
    value,
    onChange,
    className,
    children,
    label,
    size = 'md',
    block = true,
    error,
    ...extraProps
  } = props;

  const tempId = useId();
  const id = useMemo(() => tempId, []);
  return (
    <div className="kl-flex kl-flex-col">
      <div
        className={cn('kl-flex kl-items-center', {
          'kl-pb-md': !!label,
        })}
      >
        <label
          className="kl-flex-1 kl-select-none kl-bodyMd-medium kl-text-text-default"
          htmlFor={id}
        >
          {label}
        </label>
        <div
          className={cn({
            'kl-h-4xl': !!label,
          })}
        />
      </div>
      <select
        {...extraProps}
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={cn(
          'kl-bodyMd kl-py-lg kl-pl-lg kl-pr-5xl kl-text-text-default kl-border-border-default kl-bg-surface-basic-input kl-transition-all kl-rounded kl-border kl-flex kl-flex-row kl-items-center kl-relative kl-outline-none disabled:kl-bg-surface-basic-input disabled:kl-text-text-disabled disabled:kl-border-border-disabled kl-ring-offset-1 focus-within:kl-ring-2 focus-within:kl-ring-border-focus kl-appearance-none',
          {
            'kl-w-full': block,
            'kl-py-lg': size === 'md',
            'kl-py-xl': size === 'lg',
          },
          className,
        )}
      >
        {children}
      </select>
    </div>
  );
};

const SelectPrimitive = {
  Root,
  Option,
};

export default SelectPrimitive;
