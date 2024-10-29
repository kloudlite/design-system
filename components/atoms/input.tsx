/* eslint-disable react/no-unused-prop-types */
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactNode,
  cloneElement,
  forwardRef,
  useId,
  useRef,
  useState,
} from 'react';
import {
  CaretDownFill,
  CaretUpFill,
  Eye,
  EyeSlash,
  X,
} from '~/components/icons';
import { cn } from '../utils';
import AnimateHide from './animate-hide';

type InputSizes = 'md' | 'lg' | 'xl' | (undefined & NonNullable<unknown>);

export interface IInputRow {
  value?: string | number;
  extra?: JSX.Element;
  className?: string;
  textFieldClassName?: string;
  containerClassName?: string;
  error?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  autoComplete?: 'off' | (undefined & NonNullable<unknown>);
  onChange?: ChangeEventHandler<HTMLInputElement>;
  message?: ReactNode;
  placeholder?: string;
  size?: InputSizes;
  name?: string;
  tabIndex?: number;
  shimmerLoading?: boolean;

  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLTextAreaElement>;
  onMouseDown?: MouseEventHandler<HTMLTextAreaElement>;
  onPointerDown?: PointerEventHandler<HTMLTextAreaElement>;
  autoFocus?: boolean;
  focusRing?: boolean;
}

interface INumberInput extends IInputRow {
  min?: number;
  max?: number;
  step?: number;
  suffix?: ReactNode;
}

export interface ITextInput extends IInputRow {
  prefix?: ReactNode;
  suffix?: ReactNode;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  showclear?: boolean;
}

interface ITextArea extends IInputRow {
  rows?: string;
  prefix?: ReactNode;
  prefixIcon?: JSX.Element;
  resize?: boolean;
  cols?: string;
}

export interface ITextInputBase extends IInputRow {
  type?: 'password' | 'number' | 'text' | (undefined & NonNullable<unknown>);
  component?: any;
  showclear?: boolean;
  resize?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  id: string;
}

export const TextInputBase = forwardRef<HTMLInputElement, ITextInputBase>(
  (props, ref) => {
    const {
      name,
      value,
      type,
      component = 'input',
      extra,
      className = '',
      containerClassName = '',
      error = false,
      disabled = false,
      label,
      onKeyDown,
      autoComplete = 'off',
      onBlur = () => {},
      onFocus = () => {},
      onChange = () => {},
      message = '',
      showclear,
      placeholder,
      size = 'md',
      resize = true,
      prefix,
      suffix,
      prefixIcon,
      suffixIcon,
      id,
      tabIndex,
      shimmerLoading,
      autoFocus,
      focusRing = true,
      textFieldClassName,
      ...extraProps
    } = props;
    const [t, setT] = useState(type || 'text');

    const Component = component;

    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div className={cn('kl-flex kl-flex-col', containerClassName)}>
        {(label || extra) && (
          <div
            className={cn(
              'kl-flex kl-items-center kl-justify-between kl-gap-md',
              {
                'kl-pb-md': !!label || !!extra,
              },
            )}
          >
            <label
              className="kl-select-none kl-bodyMd-medium kl-pulsable kl-min-w-[33%] kl-text-text-soft"
              htmlFor={id}
            >
              {label}
            </label>
            <div
              className={cn({
                'kl-h-4xl pulsable': !!label || !!extra,
              })}
            >
              {extra && cloneElement(extra)}
            </div>
          </div>
        )}
        <div
          ref={containerRef}
          className={cn(
            'kl-transition-all kl-rounded kl-border kl-flex kl-flex-row kl-items-center kl-relative kl-ring-offset-1 group-data-[theme=dark]/html:kl-ring-offset-0',
            {
              'kl-text-text-critical kl-bg-surface-critical-subdued kl-border-border-critical':
                error,
              'kl-text-text-default kl-border-border-default kl-bg-surface-basic-input':
                !error,
              'kl-text-text-disabled kl-border-border-disabled kl-bg-surface-basic-input':
                disabled,
              'kl-pr-0': component !== 'input',
            },
            {
              'kl-h-[38px]': size === 'md' && component === 'input',
              'kl-h-[48px]': size === 'lg' && component === 'input',
              'kl-h-[60px]': size === 'xl' && component === 'input',
            },
            size === 'xl' ? '!kl-px-2xl' : 'kl-px-lg',
            className,
          )}
        >
          {!!prefixIcon && (
            <div
              className={cn('kl-pr-lg kl-bodyMd', {
                'kl-text-text-strong': !error && !disabled,
                'kl-text-text-critical': error,
                'kl-text-text-disabled': disabled,
              })}
            >
              {cloneElement(prefixIcon, {
                size: 16,
                color: 'currentColor',
              })}
            </div>
          )}
          {!!prefix && <div className="kl-cursor-default">{prefix}</div>}
          <Component
            {...(type === 'number'
              ? {
                  pattern: '[0-9]',
                }
              : {})}
            name={name}
            autoFocus={autoFocus}
            type={t}
            placeholder={placeholder}
            id={id}
            tabIndex={tabIndex}
            className={cn(
              'kl-outline-none focus-within:kl-outline-none focus:kl-outline-none focus-visible:kl-outline-none kl-flex-1 kl-w-full kl-h-full',
              'kl-rounded kl-bg-transparent',
              {
                'kl-text-text-critical placeholder:kl-text-text-critical/70':
                  error && !disabled,
                'kl-text-text-default': !error && !disabled,
                'kl-text-text-disabled': disabled,
              },
              {
                'kl-py-xl': size === 'lg',
                'kl-py-lg': size === 'md',
              },
              {
                'kl-resize-none': !resize,
              },
              {
                'kl-no-spinner': type === 'number',
              },
              size === 'xl' ? '' : 'kl-bodyMd',
              textFieldClassName,
            )}
            value={value}
            onChange={(e: any) => {
              if (onChange) {
                onChange(e);
              }
            }}
            onFocus={(e: any) => {
              if (focusRing) {
                containerRef.current?.classList.add('kl-ring-2');
              }
              onFocus(e);
            }}
            disabled={disabled}
            ref={ref}
            onKeyDown={onKeyDown}
            autoComplete={autoComplete}
            onBlur={(e: any) => {
              containerRef.current?.classList.remove('kl-ring-2');

              onBlur(e);
            }}
            {...extraProps}
          />
          {!!suffix && <div className="kl-cursor-default">{suffix}</div>}
          {!!suffixIcon && (
            <div
              className={cn('kl-pl-lg kl-bodyMd', {
                'kl-text-text-critical': error,
                'kl-text-text-strong': !error && !disabled,
                'kl-text-text-disabled': disabled,
              })}
            >
              {cloneElement(suffixIcon, {
                color: 'currentColor',
                size: 16,
              })}
            </div>
          )}
          {showclear && !disabled && (
            <button
              aria-label="Clear"
              type="button"
              tabIndex={-1}
              onClick={(e: any) => {
                if (onChange) onChange({ ...e, target: { value: '' } });
              }}
              className={cn(
                'kl-outline-none kl-flex kl-items-center kl-rounded kl-justify-center',
                {
                  'kl-cursor-default': disabled,
                },
              )}
            >
              <X size={16} color="currentColor" />
            </button>
          )}
          {type === 'password' && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => {
                setT((prev) => (prev === 'text' ? 'password' : 'text'));
              }}
              className={cn(
                'kl-outline-none kl-flex kl-items-center kl-rounded kl-justify-center',
                {
                  'kl-cursor-default': disabled,
                },
              )}
            >
              {t === 'password' ? (
                <EyeSlash size={16} color="currentColor" />
              ) : (
                <Eye size={16} color="currentColor" />
              )}
            </button>
          )}
        </div>

        <AnimateHide show={!!message}>
          <div
            className={cn(
              'kl-bodySm pulsable',
              {
                'kl-text-text-critical': error,
                'kl-text-text-default': !error,
              },
              'kl-pt-md',
            )}
          >
            {message}
          </div>
        </AnimateHide>
      </div>
    );
  },
);

export const NumberInput = ({
  suffix,
  value,
  error = false,
  onChange = () => {},
  label,
  step = 1,
  ...etc
}: INumberInput) => {
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();
  return (
    <TextInputBase
      {...{
        ...etc,
        type: 'number',
        id,
        error,
        onChange,
        label,
        ref,
        value,
        step,
        suffix: (
          <div className="kl-flex kl-flex-row kl-items-center kl-gap-xl -kl-mr-lg">
            {suffix}
            <div
              className={cn(
                'kl-flex kl-flex-col kl-justify-center kl-items-center',
                {
                  'kl-bg-surface-critical-subdued kl-divide-border-critical kl-divide-y kl-rounded-r kl-border-l kl-border-border-critical kl-text-text-critical placeholder:kl-text-critical-400':
                    error,
                  'kl-text-text-default kl-border-l kl-border-border-default kl-divide-border-default kl-divide-y':
                    !error,
                },
              )}
              tabIndex={-1}
            >
              <button
                type="button"
                aria-controls={id}
                aria-label={`Increase ${label}`}
                tabIndex={-1}
                onClick={(e: any) => {
                  // setV((_v) => _v + step);

                  onChange({
                    ...e,
                    target: { value: `${Number(value) + step}` },
                  });

                  ref?.current?.focus();
                }}
                className={cn(
                  'kl-flex-1 kl-p-sm disabled:kl-text-icon-disabled hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed',
                )}
              >
                <CaretUpFill size={12} color="currentColor" />
              </button>
              <button
                type="button"
                aria-controls={id}
                aria-label={`Decrease ${label}`}
                tabIndex={-1}
                onClick={(e: any) => {
                  onChange({
                    ...e,
                    target: { value: `${Number(value) - step}` },
                  });
                  ref?.current?.focus();
                }}
                className={cn(
                  'kl-flex-1 kl-p-sm disabled:kl-text-icon-disabled hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed',
                )}
              >
                <CaretDownFill size={12} color="currentColor" />
              </button>
            </div>
          </div>
        ),
      }}
    />
  );
};

export const TextInput = forwardRef<HTMLInputElement, ITextInput>(
  (props, ref) => {
    const id = useId();

    return (
      <TextInputBase
        {...{ ...props, id, component: 'input', type: 'text', ref }}
      />
    );
  },
);

export const TextArea = forwardRef<HTMLInputElement, ITextArea>(
  (
    {
      autoComplete = 'off',
      onChange = (_) => {},
      resize = false,
      rows = '3',
      ...etc
    },
    ref,
  ) => {
    const id = useId();
    return (
      <TextInputBase
        {...{
          ...etc,
          id,
          rows,
          autoComplete,
          onChange,
          resize,
          component: 'textarea',
          ref,
          type: 'text',
        }}
      />
    );
  },
);

export const PasswordInput = (props: IInputRow) => {
  const ref = useRef(null);
  const id = useId();
  return (
    <TextInputBase
      {...{ ...props, id, component: 'input', ref, type: 'password' }}
    />
  );
};
