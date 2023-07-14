import PropTypes from 'prop-types';
import {
  useRef,
  cloneElement,
  forwardRef,
  useEffect,
  useId,
  useState,
} from 'react';
import {
  CaretUpFill,
  CaretDownFill,
  XCircleFill,
  EyeSlash,
  Eye,
} from '@jengaicons/react';
import { cn } from '../utils';

export const NumberInput = (props) => {
  const {
    value,
    min,
    onChange,
    label,
    extra,
    error,
    disabled,
    max,
    message,
    step = 1,
  } = props;
  const [v, setV] = useState(value || min || 0);
  const ref = useRef();
  const id = useId();

  useEffect(() => {
    if (onChange) {
      onChange({
        target: {
          ...ref.current,
          value: v,
        },
      });
    }
  }, [v]);

  return (
    <div
      className={cn('flex flex-col', {
        'gap-md': label || extra,
      })}
    >
      <div className="flex">
        <label className="flex-1 select-none bodyMd-medium" htmlFor={id}>
          {label}
        </label>
        {extra && <div className="bodyMd">{cloneElement(extra)}</div>}
      </div>
      <div
        className={cn(
          'transition-all flex relative',
          'ring-offset-1 focus-within:ring-2 focus-within:ring-border-focus rounded border overflow-hidden',
          {
            'bg-surface-critical-subdued border-border-critical text-text-critical placeholder:text-critical-400':
              error,
            'text-text-default border-border-default': !error,
          }
        )}
      >
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          type="number"
          autoComplete="off"
          inputMode="numeric"
          className={cn(
            'outline-none flex-1',
            'outline-none disabled:bg-surface-basic-input disabled:text-text-disabled',
            'rounded px-xl py-lg bodyMd ',
            'no-spinner'
          )}
          value={v}
          onChange={(e) => {
            setV(e.target.value);
          }}
          min={min}
          max={max}
        />
        <div
          className={cn(
            'flex flex-col absolute right-0 top-0 bottom-0 justify-center items-center',
            {
              'bg-surface-critical-subdued divide-border-critical divide-y rounded-r border-l border-border-critical text-text-critical placeholder:text-critical-400':
                error,
              'text-text-default border-l border-border-default divide-border-default divide-y':
                !error,
            }
          )}
          tabIndex={-1}
        >
          <button
            aria-controls={id}
            aria-label={`Increase ${label}`}
            tabIndex={-1}
            onClick={() => {
              setV((_v) => _v + step);
              ref.current.focus();
            }}
            className={cn(
              'flex-1 p-sm disabled:text-icon-disabled hover:bg-surface-basic-hovered active:bg-surface-basic-pressed'
            )}
          >
            <CaretUpFill size={16} color="currentColor" />
          </button>
          <button
            aria-controls={id}
            aria-label={`Decrease ${label}`}
            tabIndex={-1}
            onClick={() => {
              setV((_v) => _v - step);
            }}
            className={cn(
              'flex-1 p-sm disabled:text-icon-disabled hover:bg-surface-basic-hovered active:bg-surface-basic-pressed'
            )}
          >
            <CaretDownFill size={16} color="currentColor" />
          </button>
        </div>
      </div>

      {message && (
        <span
          className={cn('bodySm', {
            'text-text-critical': error,
            'text-text-default': !error,
          })}
        >
          {message}
        </span>
      )}
    </div>
  );
};

export const TextInputBase = forwardRef((props, ref) => {
  const {
    value,
    type,
    component,
    extra,
    className,
    error,
    disabled,
    label,
    onKeyDown,
    autoComplete,
    onChange,
    message,
    showclear,
    placeholder,
  } = props;
  const [val, setVal] = useState(value || '');
  const [t, setT] = useState(type || 'text');

  const id = useId();

  let { prefix: Prefix, suffix: Suffix } = props;
  const { prefixIcon: PrefixIcon, suffixIcon: SuffixIcon } = props;
  if (PrefixIcon) {
    Prefix = <PrefixIcon size={16} color="currentColor" />;
  }
  if (SuffixIcon) {
    Suffix = <SuffixIcon size={16} color="currentColor" />;
  }

  const Component = component || 'input';

  return (
    <div
      className={cn(
        'flex flex-col',
        {
          'gap-md': label || extra,
        },
        className
      )}
    >
      <div className="flex items-center">
        <label className="flex-1 select-none bodyMd-medium" htmlFor={id}>
          {label}
        </label>
        <div
          className={cn({
            'h-4xl': label || extra,
          })}
        >
          {extra && cloneElement(extra)}
        </div>
      </div>
      <div
        className={cn(
          'transition-all px-xl rounded border flex flex-row items-center relative ring-offset-1 focus-within:ring-2 focus-within:ring-border-focus ',
          {
            'text-text-critical bg-surface-critical-subdued border-border-critical':
              error,
            'text-text-default border-border-default bg-surface-basic-input':
              !error,
            'text-text-disabled border-border-disabled bg-surface-basic-input':
              disabled,
            'pr-0': component !== 'input',
          }
        )}
      >
        {Prefix && (
          <div
            className={cn('pr-lg bodyMd', {
              'text-text-strong':
                typeof Prefix !== 'object' && !error && !disabled,
              'text-text-critical': error,
              'text-text-disabled': disabled,
            })}
          >
            {Prefix}
          </div>
        )}
        <Component
          type={t}
          placeholder={placeholder}
          id={id}
          className={cn(
            'outline-none disabled:bg-surface-basic-input disabled:text-text-disabled flex-1',
            'rounded py-lg bodyMd ',
            {
              'text-text-critical bg-surface-critical-subdued placeholder:text-critical-400':
                error,
              'text-text-default bg-surface-basic-input': !error,
            }
          )}
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            if (onChange) {
              onChange(e);
            }
          }}
          disabled={disabled}
          ref={ref}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
        />
        {Suffix && (
          <div
            className={cn('pl-lg bodyMd', {
              'text-text-critical': error,
              'text-text-strong': !error && !disabled,
              'text-text-disabled': disabled,
            })}
          >
            {Suffix}
          </div>
        )}
        {showclear && !disabled && (
          <button
            tabIndex={-1}
            onClick={() => {
              setVal('');
            }}
            className={cn(
              'outline-none flex items-center rounded justify-center',
              {
                'cursor-default': disabled,
              }
            )}
          >
            <XCircleFill size={16} color="currentColor" />
          </button>
        )}
        {type === 'password' && !disabled && (
          <button
            tabIndex={-1}
            onClick={() => {
              setT((prev) => (prev === 'text' ? 'password' : 'text'));
            }}
            className={cn(
              'outline-none flex items-center rounded justify-center',
              {
                'cursor-default': disabled,
              }
            )}
          >
            {type === 'password' ? (
              <EyeSlash size={16} color="currentColor" />
            ) : (
              <Eye size={16} color="currentColor" />
            )}
          </button>
        )}
      </div>

      {message && (
        <div
          className={cn('bodySm', {
            'text-text-critical': error,
            'text-text-default': !error,
          })}
        >
          {message}
        </div>
      )}
    </div>
  );
});

TextInputBase.displayName = 'TextInputBase';

export const TextInput = forwardRef((props, ref) => {
  return <TextInputBase {...props} component="input" type="text" ref={ref} />;
});

TextInput.displayName = 'TextInput';

export const TextArea = (props) => {
  const ref = useRef(null);
  return (
    <TextInputBase {...props} component="textarea" ref={ref} type="text" />
  );
};

export const PasswordInput = (props) => {
  const ref = useRef(null);
  return (
    <TextInputBase {...props} component="input" ref={ref} type="password" />
  );
};

const BaseInputProps = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  message: PropTypes.object,
  extra: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};

TextArea.propTypes = {
  ...BaseInputProps,
};

NumberInput.propTypes = {
  ...BaseInputProps,
};

TextInput.defaultProps = {
  placeholder: '',
  value: '',
  disabled: false,
  prefix: null,
  suffix: null,
  error: false,
};
