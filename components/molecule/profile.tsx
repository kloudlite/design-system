import { ComponentProps, ReactNode, forwardRef } from 'react';
import { AvatarBase, IAvatar } from '../atoms/avatar';
import { BounceIt } from '../bounce-it';
import { cn } from '../utils';

interface IProfile
  extends IAvatar,
    Omit<ComponentProps<'button'>, 'color' | 'name'> {
  name?: ReactNode;
  subtitle?: ReactNode;
  responsive?: boolean;
  noImage?: boolean;
}

const Profile = forwardRef<HTMLButtonElement, IProfile>(
  (
    { name, subtitle, color, responsive = true, size, noImage, ...props },
    ref,
  ) => {
    return (
      <BounceIt className="kl-w-fit">
        <button
          {...props}
          ref={ref}
          className={cn(
            'kl-flex kl-py-sm kl-px-md kl-gap-lg kl-items-center kl-ring-offset-1 dark:kl-ring-offset-0 kl-outline-none kl-transition-all kl-rounded focus-visible:kl-ring-2 focus-visible:kl-ring-border-focus dark:focus-visible:kl-ring-border-darktheme-focus',
          )}
        >
          {!noImage && (
            <AvatarBase color={color} size={size} image={props.image} />
          )}
          {(name || subtitle) && (
            <div
              className={cn(
                'kl-flex-col kl-items-start',
                responsive ? 'kl-hidden md:kl-flex' : 'kl-hidden md:kl-flex',
              )}
            >
              {name && (
                <div className="kl-bodyMd-medium kl-gap-y-md kl-pulsable kl-text-text-default dark:kl-text-text-darktheme-default">
                  {name}
                </div>
              )}

              {subtitle && (
                <div className="kl-text-start kl-bodySm kl-text-text-soft dark:kl-text-text-darktheme-soft kl-pulsable">
                  {subtitle}
                </div>
              )}
            </div>
          )}
        </button>
      </BounceIt>
    );
  },
);

export default Profile;
