import { ReactNode } from 'react';
import SelectZener from '@oshq/react-select';
import type {
  IGroupRender,
  IMenuItemRender,
  ISelect,
} from '@oshq/react-select';
import { ChevronUpDown, CircleNotch, X } from '~/components/icons';
import { cn } from '../utils';
import AnimateHide from './animate-hide';

const menuItemRender = (props: IMenuItemRender) => {
  const { innerProps, render, active, focused, disabled } = props;
  return (
    <div
      {...innerProps}
      className={cn('kl-px-xl kl-py-lg kl-select-none', {
        'kl-bg-surface-basic-hovered': !!focused && !active && !disabled,
        'kl-bg-surface-basic-active': !!active,
        'kl-text-text-default': !disabled,
        'kl-text-text-disabled': !!disabled,
      })}
    >
      {typeof render === 'string'
        ? render
        : render?.({ active: !!active, focused: !!focused, disabled })}
    </div>
  );
};

const groupRender = ({ label }: IGroupRender) => {
  return (
    <div className="kl-bodySm-medium kl-text-text-disabled kl-px-lg kl-py-md">
      {label}
    </div>
  );
};

const suffixRender = ({
  loading,
  showclear,
  clear,
  error,
  disabled,
}: {
  loading: boolean;
  clear: (() => void) | undefined;
  showclear: boolean | undefined;
  error: boolean;
  disabled: boolean;
}) => {
  const iconSize = 16;
  return (
    <div
      className={cn(
        'kl-px-lg kl-flex kl-flex-row kl-items-center kl-gap-lg',
        error && !disabled ? 'kl-text-text-critical' : '',
      )}
    >
      {loading && (
        <span className="kl-animate-spin">
          <CircleNotch size={iconSize} />
        </span>
      )}
      <ChevronUpDown size={iconSize} color="currentColor" />
      {showclear && (
        <span onClick={clear} className="kl-cursor-pointer">
          <X size={iconSize} color="currentColor" />
        </span>
      )}
    </div>
  );
};

const Select = <T, U extends boolean | undefined = undefined>(
  props: ISelect<T, U> & {
    label?: ReactNode;
    size?: 'md' | 'lg';
    message?: ReactNode;
    loading?: boolean;
    error?: boolean;
  },
) => {
  const {
    value,
    options,
    label,
    size = 'md',
    placeholder,
    message,
    error = false,
    onChange,
    disabled,
    valueRender,
    creatable,
    multiple,
    loading,
    onSearch,
    searchable,
    showclear,
    noOptionMessage,
    open,
    disableWhileLoading,
    createLabel,
    className,
    portalClass,
    tabIndex,
  } = props;

  return (
    <div className="kl-flex kl-flex-col">
      <div className="kl-flex kl-flex-col kl-gap-md">
        {label && (
          <div className="kl-bodyMd-medium kl-text-text-default kl-h-4xl">
            {label}
          </div>
        )}
        <div className="pulsable">
          <div className="pulsable pulsable-hidden">
            <SelectZener
              className={
                className ||
                (() => {
                  const c = cn(
                    'kl-rounded kl-flex kl-flex-row kl-items-center kl-border kl-bodyMd kl-outline-none kl-cursor-default',
                    {
                      'kl-py-[10px] kl-px-lg kl-h-[48px]': size === 'lg',
                      'kl-py-[6px] kl-px-lg kl-h-[36px]': size === 'md',
                    },
                    error && !disabled
                      ? 'kl-bg-surface-critical-subdued kl-border-text-critical kl-text-text-critical'
                      : '',
                  );
                  return {
                    default: `${c} kl-border-border-default kl-bg-surface-basic-input kl-text-text-default`,
                    disabled: `${c} kl-border-border-disabled kl-text-text-disabled`,
                    focus: `${c} kl-bg-surface-basic-default kl-border-border-input kl-text-text-default kl-ring-offset-1 kl-ring-2 kl-ring-border-focus`,
                  };
                })
              }
              tabIndex={tabIndex}
              open={open}
              menuClass="kl-shadow-popover kl-bg-surface-basic-default kl-border kl-border-border-default kl-rounded kl-py-lg"
              portalClass={portalClass}
              menuItemRender={menuItemRender}
              value={value}
              options={options}
              placeholder={
                <div
                  className={cn(
                    error && !disabled
                      ? 'kl-text-text-critical/70'
                      : 'kl-text-text-disabled',
                  )}
                >
                  {placeholder}
                </div>
              }
              showclear={showclear}
              suffixRender={({ clear, showclear }) =>
                suffixRender({
                  loading: loading || false,
                  clear,
                  showclear,
                  error,
                  disabled: !!disabled,
                })
              }
              onChange={onChange}
              groupRender={groupRender}
              disabled={disabled}
              valueRender={valueRender}
              creatable={creatable}
              multiple={multiple}
              onSearch={onSearch}
              searchable={searchable}
              noOptionMessage={
                noOptionMessage || (
                  <div className="kl-flex kl-items-center kl-justify-center kl-text-text-default kl-bodyLg kl-p-2xl">
                    No options
                  </div>
                )
              }
              disableWhileLoading={disableWhileLoading}
              createLabel={createLabel}
              onWheel={(e) => {
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        </div>
      </div>
      <AnimateHide show={!!message}>
        <div
          className={cn(
            'kl-bodySm pulsable',
            {
              'kl-text-text-critical': !!error,
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
};

export default Select;
