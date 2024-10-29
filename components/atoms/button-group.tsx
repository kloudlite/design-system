import React, { ReactElement, cloneElement, forwardRef } from 'react';
import * as ButtonGroupPrimitive from '@radix-ui/react-toggle-group';
import { ButtonBase, IButton, IIconButton } from './button';
import { cn } from '../utils';

export interface IButtonGroupButton extends IButton {
  value: string;
}

const Button = forwardRef<HTMLButtonElement, IButtonGroupButton>(
  (props, ref) => {
    return (
      <ButtonGroupPrimitive.Item value={props.value} asChild ref={ref}>
        <ButtonBase
          {...props}
          variant={props.variant}
          noRounded
          className={cn(
            '-kl-ml-xs first:kl-rounded-l last:kl-rounded-r first:kl-ml-0',
          )}
        />
      </ButtonGroupPrimitive.Item>
    );
  },
);

export interface IButtonGroupIconButton extends IIconButton {
  value: string;
}

const IconButton = forwardRef<HTMLButtonElement, IButtonGroupIconButton>(
  (props, ref) => {
    return (
      <ButtonGroupPrimitive.Item value={props.value} asChild ref={ref}>
        <ButtonBase
          {...props}
          content=""
          variant={props.variant}
          iconOnly
          prefix={props.icon}
          noRounded
          className={cn(
            '-kl-ml-xs first:kl-rounded-l last:kl-rounded-r first:kl-ml-0',
          )}
        />
      </ButtonGroupPrimitive.Item>
    );
  },
);

interface IButtonGroup {
  children: ReactElement | ReactElement[];
  value: string;
  selectable?: boolean;
  onValueChange?: (value: string) => void;
  onClick?: (value: string) => void;
  variant?: 'outline' | 'basic';
}

const Root = ({
  children,
  value = '',
  selectable = false,
  onValueChange,
  variant = 'basic',
  onClick,
}: IButtonGroup) => {
  return (
    <ButtonGroupPrimitive.Root
      className={cn(
        'kl-bg-surface-basic-default kl-rounded kl-shadow-button kl-flex kl-flex-row kl-w-fit',
      )}
      onClick={(_e) => {
        // if (onClick) onClick(e);
      }}
      onValueChange={(e) => {
        if (onValueChange && e) onValueChange(e);
      }}
      value={value}
      type="single"
    >
      {React.Children.map(children, (child) => {
        return cloneElement(child, {
          selected: child.props.value === value && !!selectable,
          variant,
        });
      })}
    </ButtonGroupPrimitive.Root>
  );
};

Root.Button = Button;
Root.IconButton = IconButton;

const ButtonGroup = {
  Root,
  Button,
  IconButton,
};

export default ButtonGroup;
