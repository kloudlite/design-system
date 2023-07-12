import * as React from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';
import { createContextScope } from '@radix-ui/react-context';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';
import { createRovingFocusGroupScope } from '@radix-ui/react-roving-focus';
import { Primitive } from '@radix-ui/react-primitive';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { createToggleGroupScope } from '@radix-ui/react-toggle-group';
import { useDirection } from '@radix-ui/react-direction';
import { TextInput } from "./input.jsx";
import { Button, IconButton } from './button.jsx';
import { cn } from '../utils.jsx';


const TOOLBAR_NAME = 'Toolbar';

const [createToolbarContext, createToolbarScope] = createContextScope(TOOLBAR_NAME, [
    createRovingFocusGroupScope,
    createToggleGroupScope,
]);
const useRovingFocusGroupScope = createRovingFocusGroupScope();
const useToggleGroupScope = createToggleGroupScope();


const [ToolbarProvider, useToolbarContext] = createToolbarContext(TOOLBAR_NAME);


const Toolbar = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, orientation = 'horizontal', dir, loop = true, ...toolbarProps } = props;
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
        const direction = useDirection(dir);
        return (
            <ToolbarProvider scope={__scopeToolbar} orientation={orientation} dir={direction}>
                <RovingFocusGroup.Root
                    asChild
                    {...rovingFocusGroupScope}
                    orientation={orientation}
                    dir={direction}
                    loop={loop}
                >
                    <Primitive.div
                        role="toolbar"
                        aria-orientation={orientation}
                        dir={direction}
                        {...toolbarProps}
                        ref={forwardedRef}
                        className={cn("flex flex-row gap-2")}
                    />
                </RovingFocusGroup.Root>
            </ToolbarProvider>
        );
    }
);

Toolbar.displayName = TOOLBAR_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarSeparator
 * -----------------------------------------------------------------------------------------------*/

const SEPARATOR_NAME = 'ToolbarSeparator';


const ToolbarSeparator = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...separatorProps } = props;
        const context = useToolbarContext(SEPARATOR_NAME, __scopeToolbar);
        return (
            <SeparatorPrimitive.Root
                orientation={context.orientation === 'horizontal' ? 'vertical' : 'horizontal'}
                {...separatorProps}
                ref={forwardedRef}
            />
        );
    }
);

ToolbarSeparator.displayName = SEPARATOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarButtonBase
 * -----------------------------------------------------------------------------------------------*/

const BUTTON_NAME = 'ToolbarButtonBase';

const ToolbarButtonBase = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...buttonProps } = props;
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
        return (
            <RovingFocusGroup.Item asChild {...rovingFocusGroupScope} focusable={!props.disabled}>
                <Primitive.button type="button" {...buttonProps} ref={forwardedRef} />
            </RovingFocusGroup.Item>
        );
    }
);

ToolbarButtonBase.displayName = BUTTON_NAME;



/* -------------------------------------------------------------------------------------------------
 * ToolbarButton
 * -----------------------------------------------------------------------------------------------*/
const TOOLBAR_BUTTON_NAME = 'ToolbarButton';

const ToolbarButton = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...buttonProps } = props;
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
        return (
            <RovingFocusGroup.Item asChild {...rovingFocusGroupScope} focusable={!props.disabled}>
                <Button {...buttonProps} ref={forwardedRef} />
            </RovingFocusGroup.Item>
        );
    }
);

ToolbarButton.displayName = TOOLBAR_BUTTON_NAME;

const LINK_NAME = 'ToolbarLink';

const ToolbarTextField = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...inputProps } = props;
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
        return (
            <RovingFocusGroup.Item asChild {...rovingFocusGroupScope} focusable>
                <TextInput
                    {...inputProps}
                    ref={forwardedRef}
                />
            </RovingFocusGroup.Item>
        );
    }
);


const ToolbarLink = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...linkProps } = props;
        const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToolbar);
        return (
            <RovingFocusGroup.Item asChild {...rovingFocusGroupScope} focusable>
                <Primitive.a
                    {...linkProps}
                    ref={forwardedRef}
                    onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
                        if (event.key === ' ') event.currentTarget.click();
                    })}
                />
            </RovingFocusGroup.Item>
        );
    }
);

ToolbarLink.displayName = LINK_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarButtonGroup
 * -----------------------------------------------------------------------------------------------*/

const BUTTON_GROUP_NAME = 'ToolbarButtonGroup';

const ToolbarButtonGroup = React.forwardRef(
    (
        { selectable, ...props },
        forwardedRef
    ) => {
        const { __scopeToolbar, ...toggleGroupProps } = props;
        const context = useToolbarContext(BUTTON_GROUP_NAME, __scopeToolbar);
        const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
        const [value, setValue] = React.useState(props.value)
        return (
            <ToggleGroupPrimitive.Root
                data-orientation={context.orientation}
                dir={context.dir}
                {...toggleGroupScope}
                {...toggleGroupProps}
                ref={forwardedRef}
                rovingFocus={false}
                className={cn("flex flex-row")}
                onClick={(e) => {
                    if (props.onClick)
                        props.onClick(value)
                }}
                onValueChange={(e) => {
                    if (e) setValue(e);
                    if (props.onValueChange && e)
                        props.onValueChange(e)
                }}
                value={value}

                children={Array.isArray(props.children) ? props.children.map((child, index) => {
                    return React.cloneElement(child, {
                        selected: (child.props.value == value && !!selectable),
                        key: `toggle-group-item-${index}`
                    })
                }) : React.cloneElement(props.children, {
                    selected: props.children.props.value == value && !!selectable,
                    key: `toggle-group-item-${0}`
                })}
                type='single'
            />
        );
    }
);

ToolbarButtonGroup.displayName = BUTTON_GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * ToolbarToggleItem
 * -----------------------------------------------------------------------------------------------*/

const BUTTON_GROUP_BUTTON_NAME = 'ButtonGroupButton';

const ToolbarButtonGroupButton = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...toggleItemProps } = props;
        const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
        const scope = { __scopeToolbar: props.__scopeToolbar };
        let extraProps = {}
        if (props['is-menu-button']) {
            extraProps['selected'] = props['data-state'] === 'open'
        }
        return (
            <ToolbarButtonBase asChild {...scope}>
                <ToggleGroupPrimitive.Item {...toggleGroupScope} {...toggleItemProps} ref={forwardedRef} asChild>
                    <Button variant={"basic"} {...props} noRounded className={cn("-ml-px first:rounded-l last:rounded-r first:ml-0")} {...extraProps} />
                </ToggleGroupPrimitive.Item>
            </ToolbarButtonBase>
        );
    }
);

const BUTTON_GROUP_ICON_BUTTON_NAME = 'ToolbarButtonGroupIconButton';
const ToolbarButtonGroupIconButton = React.forwardRef(
    (props, forwardedRef) => {
        const { __scopeToolbar, ...toggleItemProps } = props;
        const toggleGroupScope = useToggleGroupScope(__scopeToolbar);
        const scope = { __scopeToolbar: props.__scopeToolbar };
        let extraProps = {}
        if (props['is-menu-button']) {
            extraProps['selected'] = props['data-state'] === 'open'
        }
        return (
            <ToolbarButtonBase asChild {...scope}>
                <ToggleGroupPrimitive.Item {...toggleGroupScope} {...toggleItemProps} ref={forwardedRef} asChild>
                    <IconButton variant={"basic"} {...props} noRounded className={cn("-ml-px first:rounded-l last:rounded-r first:ml-0")} {...extraProps} />
                </ToggleGroupPrimitive.Item>
            </ToolbarButtonBase>
        );
    }
);

ToolbarButtonGroupButton.displayName = BUTTON_GROUP_BUTTON_NAME;
ToolbarButtonGroupIconButton.displayName = BUTTON_GROUP_ICON_BUTTON_NAME;

ToolbarButtonGroup.Button = ToolbarButtonGroupButton
ToolbarButtonGroup.IconButton = ToolbarButtonGroupIconButton
Toolbar.ButtonGroup = ToolbarButtonGroup
Toolbar.Button = ToolbarButton
Toolbar.TextInput = ToolbarTextField
Toolbar.Separator = ToolbarSeparator

export default Toolbar


