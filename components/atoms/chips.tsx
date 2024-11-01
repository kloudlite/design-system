import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { motion } from 'framer-motion';
import React, {
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Spinner, XFill } from '~/components/icons';
import { cn } from '../utils';

type ChipTypes =
  | 'BASIC'
  | 'REMOVABLE'
  | 'CLICKABLE'
  | 'SM'
  | (string & NonNullable<unknown>);

type ItemType = any;

interface IChipBase {
  item: ItemType;
  label: ReactNode;
  disabled?: boolean;
  compType?: ChipTypes;
  onRemove?: (item: ItemType, isKeyBoard?: boolean) => void;
  prefix?: JSX.Element | string | null;
  onClick?: (item: ItemType) => void;
  Component: any;
  loading?: boolean;
}

interface IChip {
  item: ItemType;
  label: ReactNode;
  disabled?: boolean;
  type?: ChipTypes;
  onRemove?: (item: ItemType, isKeyBoard?: boolean) => void;
  prefix?: JSX.Element | string | null;
  onClick?: (item: ItemType) => void;
  loading?: boolean;
  isInGroup?: boolean;
}

interface IChipGroup {
  onClick?: (item: ItemType) => void;
  onRemove?: (item: ItemType) => void;
  children: ReactElement | ReactElement[];
  className?: string;
}

const ChipBase = React.forwardRef<HTMLButtonElement, IChipBase>(
  (props, ref) => {
    const {
      item,
      label,
      disabled = false,
      compType = 'BASIC',
      onRemove = (_) => {},
      prefix = null,
      onClick = (_) => {},
      Component,
      loading = false,
      ...mprops
    } = props;
    let extraProps = {};
    if (compType === 'CLICKABLE') {
      extraProps = {
        initial: { scale: 1 },
        whileTap: { scale: 0.99 },
      };
    }

    return (
      <Component
        type="button"
        {...extraProps}
        {...mprops}
        className={cn(
          'kl-rounded kl-border kl-bodySm-medium kl-py-px kl-flex kl-items-center kl-transition-all kl-outline-none kl-flex-row kl-gap-md kl-ring-offset-1 kl-h-fit',
          'focus-within:kl-ring-2 focus-within:kl-ring-border-focus',
          'kl-w-fit kl-flex-shrink-0',
          {
            'kl-text-text-default': !disabled,
            'kl-text-text-disabled': disabled,
          },
          {
            'kl-pointer-events-none': disabled,
          },
          {
            'kl-border-border-default': !disabled,
            'kl-border-border-disabled': disabled,
          },
          {
            'kl-bg-surface-basic-default': !disabled,
          },
          {
            'kl-pr-md kl-pl-lg kl-py-md': compType === 'REMOVABLE',
            'kl-px-lg kl-py-md': compType !== 'REMOVABLE',
          },
          {
            'kl-pr-md kl-pl-md kl-py-sm': compType === 'SM',
            // 'px-lg py-md': compType !== 'SM',
          },
          {
            'hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed focus-visible:kl-ring-2 focus-visible:kl-ring-border-focus':
              compType === 'CLICKABLE',
          },
        )}
        onClick={() => {
          if (onClick) onClick(item);
        }}
        ref={ref}
      >
        {prefix &&
          !loading &&
          (typeof prefix === 'string' ? (
            <span className={cn('kl-bodySm kl-text-text-soft')}>{prefix}</span>
          ) : (
            React.cloneElement(prefix, {
              size: 12,
              color: 'currentColor',
            })
          ))}
        {loading && (
          <span className={cn('kl-animate-spin')}>
            <Spinner size={12} color="currentColor" />
          </span>
        )}
        <span
          className={
            compType === 'SM'
              ? 'kl-flex kl-items-center kl-text-text-default'
              : 'kl-flex kl-items-center'
          }
        >
          {label}
        </span>
        {compType === 'REMOVABLE' && (
          <RovingFocusGroup.Item asChild focusable>
            <button
              aria-label="close"
              type="button"
              disabled={disabled}
              onClick={(_e) => {
                if (onRemove) onRemove(item, false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  e.preventDefault();
                }
                if (e.key === 'Backspace' || e.key === 'Delete') {
                  if (onRemove) onRemove(item, true);
                }
              }}
              className={cn(
                'kl-outline-none kl-flex kl-items-center kl-rounded-sm kl-ring-offset-0 kl-justify-center hover:kl-bg-surface-basic-hovered active:kl-bg-surface-basic-pressed',
                {
                  'kl-cursor-default': disabled,
                },
              )}
            >
              <XFill size={12} color="currentColor" />
            </button>
          </RovingFocusGroup.Item>
        )}
      </Component>
    );
  },
);

export const Chip = forwardRef<HTMLButtonElement, IChip>(
  (
    {
      item,
      label,
      disabled = false,
      type = 'BASIC',
      prefix = null,
      onClick = (_) => _,
      onRemove = (_) => _,
      isInGroup = false,
      loading = false,
      ...props
    },
    ref,
  ) => {
    let Component: any = 'div';
    if (type === 'CLICKABLE') {
      Component = motion.button;
    }

    if (type === 'CLICKABLE' && isInGroup)
      return (
        <RovingFocusGroup.Item asChild focusable ref={ref}>
          <ChipBase
            item={item}
            label={label}
            disabled={disabled}
            compType={type}
            prefix={prefix}
            Component={Component}
            onClick={onClick}
            onRemove={onRemove}
            loading={loading}
            {...props}
          />
        </RovingFocusGroup.Item>
      );

    return (
      <ChipBase
        item={item}
        label={label}
        disabled={disabled}
        compType={type}
        prefix={prefix}
        Component={Component}
        onClick={onClick}
        onRemove={onRemove}
        loading={loading}
        ref={ref}
        {...props}
      />
    );
  },
);

export const ChipGroup = ({
  onClick = (_) => {},
  onRemove = (_) => {},
  children,
  className = '',
}: IChipGroup) => {
  const [keyRemovable, setKeyRemovable] = useState(false);
  const [lastRemovedIndex, setLastRemovedIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastRemovedIndex === null) {
      return;
    }

    const length = React.Children.count(children);
    if (keyRemovable && length > 0) {
      if (lastRemovedIndex === length) {
        const buttonElement: HTMLButtonElement = ref.current?.children.item(
          lastRemovedIndex - 1,
        )?.lastChild as HTMLButtonElement;

        buttonElement.focus();
      } else {
        const buttonElement: HTMLButtonElement = ref.current?.children.item(
          lastRemovedIndex,
        )?.lastChild as HTMLButtonElement;

        buttonElement.focus();
      }
    }
  }, [children]);
  return (
    <RovingFocusGroup.Root loop asChild>
      <div className={cn('kl-flex kl-flex-row kl-gap-lg', className)} ref={ref}>
        {React.Children.map(children, (child, index) => {
          if (!child) {
            return null;
          }

          return cloneElement(child, {
            onClick,
            isInGroup: true,
            onRemove: (
              e: any,
              iskey: boolean | ((prevState: boolean) => boolean),
            ) => {
              setKeyRemovable(iskey);
              setLastRemovedIndex(index);
              if (onRemove) {
                onRemove(e);
              }
            },
          });
        })}
      </div>
    </RovingFocusGroup.Root>
  );
};

const Chips = {
  ChipGroup,
  Chip,
};

export default Chips;
