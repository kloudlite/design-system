import * as MenuPrimitive from '@radix-ui/react-menu';
import { motion } from 'framer-motion';
import React, {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../utils';
import * as OptionMenuPrimitive from './_dropdown-primitive';
import { ITextInput, TextInput } from './input';
import Tabs from './tabs';

type DropdownMenuContentElement = React.ElementRef<
  typeof MenuPrimitive.Content
>;

interface IBase {
  className?: string;
  onClick?: (e: Event) => void;
  children: ReactNode;
}

interface ITrigger {
  children: ReactNode;
  open?: boolean;
  props?: any;
}

interface IOptionMenuContent extends Omit<IBase, 'onClick'> {
  sideOffset?: number;
  open?: boolean;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  alignOffset?: number;
}

interface IOptionMenuItem extends IBase {
  active?: boolean;
}

interface IOptionMenuLink extends IBase {
  LinkComponent?: any;
  to: string;
  target?: string;
  rel?: string;
  toLabel?: string;
}

interface IOptionMenuTextInput
  extends Omit<ITextInput, 'onPointerDown' | 'onClick'> {
  compact?: boolean;
}

interface IOptionMenuCheckbox extends IBase {
  showIndicator?: boolean;
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
}

interface IOptionMenuRadio extends IBase {
  showIndicator?: boolean;
  value: string;
}

interface IOptionMenuSeparator extends Omit<IBase, 'onClick' | 'children'> {}

interface IOptionMenuTabs extends IBase {
  onChange?: (v: string) => void;
  value: string;
  size?: string;
  LinkComponent?: any;
  compact?: boolean;
}

const OptionMenu = OptionMenuPrimitive.Root;

const OptionMenuTriggerBase = OptionMenuPrimitive.Trigger;

const OptionMenuRadioGroup = OptionMenuPrimitive.RadioGroup;

const blurElement = (e: any) => {
  e.preventDefault();
  const element = e.target as HTMLButtonElement;
  element.blur();
};

const preventDefaultEvents = {
  onMouseMove: (e: any) => e.preventDefault(),
  onMouseEnter: (e: any) => e.preventDefault(),
  onMouseLeave: (e: any) => blurElement(e),
  onPointerLeave: (e: any) => e.preventDefault(),
  onPointerEnter: (e: any) => e.preventDefault(),
  onPointerMove: (e: any) => e.preventDefault(),
  // onClick: (e: any) => e.preventDefault(),
};

const OptionMenuTrigger = forwardRef<HTMLButtonElement, ITrigger>(
  ({ children, ...props }, ref) => {
    const { open } = props;
    return (
      <OptionMenuTriggerBase ref={ref} {...props} asChild is-menu-button="true">
        {cloneElement(children as ReactElement, {
          selected: open,
        })}
      </OptionMenuTriggerBase>
    );
  },
);

OptionMenuTrigger.displayName = 'OptionMenuTrigger';

const OptionMenuContent = forwardRef<
  DropdownMenuContentElement,
  IOptionMenuContent
>(
  (
    {
      className,
      sideOffset = 4,
      children,
      open,
      align = 'end',
      alignOffset,
      side,
      ...props
    },
    ref,
  ) => (
    <OptionMenuPrimitive.Portal>
      <OptionMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        side={side}
        alignOffset={alignOffset}
        loop
        asChild
        {...props}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            'kl-z-50 kl-border kl-border-border-default kl-shadow-popover kl-bg-surface-basic-default kl-rounded kl-min-w-[160px] kl-overflow-hidden kl-origin-top kl-py-lg kl-will-change-[opacity,transform] data-[side=bottom]:kl-animate-slideUpAndFade data-[side=left]:kl-animate-slideRightAndFade data-[side=right]:kl-animate-slideLeftAndFade data-[side=top]:kl-animate-slideDownAndFade',
            className,
          )}
        >
          {children}
        </div>
      </OptionMenuPrimitive.Content>
    </OptionMenuPrimitive.Portal>
  ),
);
OptionMenuContent.displayName = OptionMenuPrimitive.Content.displayName;

const OptionItemRaw = forwardRef(
  (
    {
      children,
      active,
      className,
    }: {
      children?: ReactNode;
      active?: boolean;
      className?: string;
    },
    ref,
  ) => {
    return (
      <div
        // @ts-ignore
        ref={ref}
        className={cn(
          'kl-group kl-relative kl-flex kl-flex-row kl-gap-xl kl-items-center kl-bodyMd kl-gap kl-cursor-pointer kl-select-none kl-py-lg kl-px-xl kl-text-text-default kl-outline-none kl-transition-colors focus:kl-bg-surface-basic-hovered hover:kl-bg-surface-basic-hovered data-[disabled]:kl-pointer-events-none data-[disabled]:kl-text-text-disabled',
          {
            'kl-bg-surface-basic-active': !!active,
          },
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

const OptionMenuItem = forwardRef<HTMLDivElement, IOptionMenuItem>(
  ({ className, ...props }, ref) => {
    return (
      <OptionMenuPrimitive.Item
        ref={ref}
        {...preventDefaultEvents}
        onSelect={props.onClick}
        asChild
      >
        <div
          className={cn(
            'kl-group kl-relative kl-flex kl-flex-row kl-gap-xl kl-items-center kl-bodyMd kl-gap kl-cursor-pointer kl-select-none kl-py-lg kl-px-xl kl-text-text-default kl-outline-none kl-transition-colors focus:kl-bg-surface-basic-hovered hover:kl-bg-surface-basic-hovered data-[disabled]:kl-pointer-events-none data-[disabled]:kl-text-text-disabled',
            {
              'kl-bg-surface-basic-active': !!props.active,
            },
            className,
          )}
        >
          {props.children}
        </div>
      </OptionMenuPrimitive.Item>
    );
  },
);
OptionMenuItem.displayName = OptionMenuPrimitive.Item.displayName;

const OptionMenuLink = forwardRef<HTMLDivElement, IOptionMenuLink>(
  (
    {
      className,
      LinkComponent = 'a',
      to = '',
      toLabel = 'to',
      target,
      rel,
      children,
    },
    ref,
  ) => {
    let tempToLabel = toLabel;
    let Component: any = LinkComponent;

    if (to) {
      if (LinkComponent === motion.button) {
        Component = 'a';
        tempToLabel = 'href';
      } else {
        Component = LinkComponent;
      }
    }

    return (
      <OptionMenuPrimitive.Item
        ref={ref}
        className={cn(
          'kl-group kl-relative kl-flex kl-flex-row kl-gap-xl kl-items-center kl-bodyMd kl-gap kl-cursor-pointer kl-select-none kl-py-lg kl-px-xl kl-text-text-default kl-outline-none kl-transition-colors focus:kl-bg-surface-basic-hovered hover:kl-bg-surface-basic-hovered data-[disabled]:kl-pointer-events-none data-[disabled]:kl-text-text-disabled',
          className,
        )}
        // {...preventDefaultEvents}
        asChild
      >
        <Component {...{ [tempToLabel]: to }} target={target} rel={rel}>
          {children}
        </Component>
      </OptionMenuPrimitive.Item>
    );
  },
);
OptionMenuLink.displayName = 'OptionMenuLink';

const OptionMenuTextInputItem = forwardRef<
  HTMLInputElement,
  IOptionMenuTextInput
>(({ onChange, compact = false, ...props }, ref) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const setSearchFocus = (e?: any) => {
    e?.preventDefault();
    searchRef.current?.focus();
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <div
      className={cn({
        'kl-py-lg kl-px-xl': !compact,
      })}
    >
      <OptionMenuPrimitive.Item
        ref={ref}
        onSelect={setSearchFocus}
        onClick={() => setSearchFocus()}
        onPointerUp={setSearchFocus}
        onPointerDown={() => setSearchFocus()}
        onMouseMove={(e) => e.preventDefault()}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseLeave={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
        onFocus={() => {
          searchRef.current?.focus();
        }}
        asChild
      >
        <TextInput
          {...props}
          ref={searchRef}
          autoComplete="off"
          onChange={onChange}
          onFocus={(event) => {
            if (props.focusRing) {
              event.target?.parentElement?.classList?.add(
                'kl-ring-2',
                'kl-ring-border-focus',
              );
            }
          }}
          onBlur={(e) => {
            e.target?.parentElement?.classList?.remove(
              'kl-ring-2',
              'kl-ring-border-focus',
            );
          }}
          onKeyDown={(e) => {
            if (e.key !== 'Escape') e.stopPropagation();
          }}
        />
      </OptionMenuPrimitive.Item>
    </div>
  );
});
OptionMenuTextInputItem.displayName = OptionMenuPrimitive.Item.displayName;

const OptionMenuCheckboxItem = forwardRef<HTMLDivElement, IOptionMenuCheckbox>(
  (
    {
      className,
      showIndicator = true,
      children,
      checked,
      onValueChange,
      ...props
    },
    ref,
  ) => (
    <OptionMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'kl-group kl-relative kl-flex kl-flex-row kl-gap-xl kl-items-center kl-bodyMd kl-gap kl-cursor-pointer kl-select-none kl-py-lg kl-px-xl kl-text-text-default kl-outline-none kl-transition-colors focus:kl-bg-surface-basic-hovered hover:kl-bg-surface-basic-hovered data-[disabled]:kl-pointer-events-none data-[disabled]:kl-text-text-disabled',
        {
          'data-[state=checked]:kl-bg-surface-primary-subdued data-[state=checked]:kl-text-text-primary data-[state=checked]:kl-text-text-darktheme-primary':
            !showIndicator,
        },
        className,
      )}
      checked={checked}
      {...preventDefaultEvents}
      onCheckedChange={onValueChange}
      onSelect={props.onClick}
    >
      {showIndicator && (
        <span className="kl-w-2xl kl-h-2xl kl-rounded kl-border kl-transition-all kl-flex kl-items-center kl-justify-center kl-border-border-default group-data-[state=checked]:kl-border-border-primary group-data-[state=checked]:kl-bg-surface-primary-default group-data-[disabled]:kl-border-border-disabled group-data-[disabled]:kl-bg-surface-basic-default">
          <OptionMenuPrimitive.ItemIndicator>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.25 3.50017L5.25 10.4999L1.75 7.00017"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  'kl-stroke-text-on-primary group-data-[disabled]:kl-stroke-text-disabled',
                )}
              />
            </svg>
          </OptionMenuPrimitive.ItemIndicator>
        </span>
      )}
      {children}
    </OptionMenuPrimitive.CheckboxItem>
  ),
);
OptionMenuCheckboxItem.displayName =
  OptionMenuPrimitive.CheckboxItem.displayName;

const OptionMenuRadioItem = forwardRef<HTMLDivElement, IOptionMenuRadio>(
  ({ className, showIndicator = true, children, value, ...props }, ref) => (
    <OptionMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'kl-group kl-relative kl-flex kl-flex-row kl-gap-xl kl-items-center kl-bodyMd kl-gap kl-cursor-pointer kl-select-none kl-py-lg kl-px-xl kl-text-text-default kl-outline-none kl-transition-colors focus:kl-bg-surface-basic-hovered hover:kl-bg-surface-basic-hovered data-[disabled]:kl-pointer-events-none data-[disabled]:kl-text-text-disabled',
        {
          'data-[state=checked]:kl-bg-surface-primary-subdued data-[state=checked]:kl-text-text-primary':
            !showIndicator,
        },
        className,
      )}
      onSelect={props.onClick}
      value={value}
      {...preventDefaultEvents}
    >
      {showIndicator && (
        <span
          className={cn(
            'kl-w-2xl kl-h-2xl kl-rounded-full kl-border kl-transition-all kl-flex kl-items-center kl-justify-center kl-border-border-default group-data-[state=checked]:kl-border-border-primary group-data-[disabled]:kl-border-border-disabled',
          )}
        >
          <OptionMenuPrimitive.ItemIndicator>
            <div
              className={cn(
                'kl-block kl-w-lg kl-h-lg kl-rounded-full kl-bg-surface-primary-default group-data-[disabled]:kl-bg-icon-disabled group-data-[disabled]:kl-bg-icon-darktheme-disabled',
              )}
            />
          </OptionMenuPrimitive.ItemIndicator>
        </span>
      )}
      {children}
    </OptionMenuPrimitive.RadioItem>
  ),
);
OptionMenuRadioItem.displayName = OptionMenuPrimitive.RadioItem.displayName;

const OptionMenuSeparator = forwardRef<HTMLDivElement, IOptionMenuSeparator>(
  ({ className, ...props }, ref) => (
    <OptionMenuPrimitive.Separator
      ref={ref}
      className={cn('kl-h-xs kl-bg-border-disabled kl-my-md', className)}
      {...props}
    />
  ),
);
OptionMenuSeparator.displayName = OptionMenuPrimitive.Separator.displayName;

// OptionMenuTabs
const focusElement = (element: any) => {
  element?.querySelector('[data-radix-collection-item]')?.focus();
};

const handleKeyNavigation = (
  e: KeyboardEvent,
  tabElement: HTMLDivElement | null,
) => {
  if (!(tabElement && tabElement.parentNode)) {
    return;
  }

  const tab = tabElement.parentNode.children;

  if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    e.preventDefault();
    e.stopPropagation();

    if (e.key === 'ArrowUp') {
      const childs = Array.from(tab).filter(
        (c) =>
          c.hasAttribute('data-radix-collection-item') ||
          c.querySelector('[data-radix-collection-item]'),
      );

      const currentIndex = childs.indexOf(tabElement);
      if (currentIndex > 0) {
        if (
          childs[currentIndex - 1].hasAttribute('data-radix-collection-item')
        ) {
          (childs[currentIndex - 1] as HTMLButtonElement).focus();
        } else {
          focusElement(childs[currentIndex - 1]);
        }
      } else if (
        childs[childs.length - 1].hasAttribute('data-radix-collection-item')
      ) {
        (childs[childs.length - 1] as HTMLButtonElement).focus();
      } else {
        focusElement(childs[childs.length - 1]);
      }
    }
    if (e.key === 'ArrowDown') {
      const childs = Array.from(tab).filter(
        (c) =>
          c.hasAttribute('data-radix-collection-item') ||
          c.querySelector('[data-radix-collection-item]'),
      );

      const currentIndex = childs.indexOf(tabElement);
      if (currentIndex < childs.length - 1) {
        if (
          childs[currentIndex + 1].hasAttribute('data-radix-collection-item')
        ) {
          (childs[currentIndex + 1] as HTMLButtonElement).focus();
        } else {
          focusElement(childs[currentIndex + 1]);
        }
      } else if (childs[0].hasAttribute('data-radix-collection-item')) {
        (childs[0] as HTMLButtonElement).focus();
      } else {
        focusElement(childs[0]);
      }
    }
  }
};

const OptionMenuTabs = forwardRef<HTMLDivElement, IOptionMenuTabs>(
  (
    {
      onChange,
      value,
      size,
      children,
      LinkComponent = 'div',
      className,
      compact,
      ...props
    },
    ref,
  ) => {
    const tabRef = useRef<HTMLDivElement>(null);

    return (
      <div
        className={cn({
          'kl-py-lg kl-px-xl': !compact,
        })}
        ref={tabRef}
        onFocus={(e) => {
          (e.target.querySelector(`.tab-item`) as HTMLButtonElement)?.focus();
        }}
      >
        <OptionMenuPrimitive.Item
          onSelect={(e) => e.preventDefault()}
          onPointerUp={(e) => e.preventDefault()}
          onPointerDown={(e) => e.preventDefault()}
          onMouseMove={(e) => e.preventDefault()}
          onMouseEnter={(e) => e.preventDefault()}
          onMouseLeave={(e) => e.preventDefault()}
          onPointerMove={(e) => e.preventDefault()}
          onPointerLeave={(e) => e.preventDefault()}
        >
          <Tabs.Root
            ref={ref}
            variant="filled"
            value={value}
            size={size}
            className={className}
            onChange={onChange}
            LinkComponent={LinkComponent}
            {...props}
          >
            {Children.map(children, (child) => {
              const childElement = child as ReactElement;
              return cloneElement(childElement, {
                onKeyDown: (e: KeyboardEvent) =>
                  handleKeyNavigation(e, tabRef.current),
              });
            })}
          </Tabs.Root>
        </OptionMenuPrimitive.Item>
      </div>
    );
  },
);

OptionMenuTextInputItem.displayName = OptionMenuPrimitive.Item.displayName;

interface IRoot {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}
const Root = ({ ...props }: IRoot) => {
  const { onOpenChange, open: openExt, children, modal = true } = props;
  const [open, setOpen] = useState(openExt);

  useEffect(() => {
    setOpen(openExt);
  }, [openExt]);

  return (
    <OptionMenu
      open={openExt}
      onOpenChange={(e) => {
        setOpen(e);

        onOpenChange?.(e);
      }}
      modal={modal}
    >
      {Children.map(children as ReactElement[], (child) =>
        cloneElement(child, {
          open,
        }),
      )}
    </OptionMenu>
  );
};

const OptionList = {
  Root,
  RadioGroup: OptionMenuRadioGroup,
  RadioGroupItem: OptionMenuRadioItem,
  CheckboxItem: OptionMenuCheckboxItem,
  Separator: OptionMenuSeparator,
  Content: OptionMenuContent,
  Trigger: OptionMenuTrigger,
  TextInput: OptionMenuTextInputItem,
  Item: OptionMenuItem,
  Tabs: {
    Root: OptionMenuTabs,
    Tab: Tabs.Tab,
  },
  Link: OptionMenuLink,
  OptionItemRaw,
};

export default OptionList;
