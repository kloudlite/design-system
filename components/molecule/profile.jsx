import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { AvatarBase } from '../atoms/avatar.jsx';
import { BounceIt } from '../bounce-it.jsx';
import { cn } from '../utils.jsx';

export const Profile = forwardRef(
  ({ name, subtitle, color, size, ...props }, ref) => {
    return (
      <BounceIt className="w-fit">
        <button
          {...props}
          ref={ref}
          className={cn(
            'flex py-sm px-md gap-lg items-center ring-offset-1 outline-none transition-all rounded focus-visible:ring-2 focus-visible:ring-border-focus'
          )}
        >
          <AvatarBase label={name} color={color} size={size} />
          <div className=" flex-col items-start hidden md:flex">
            <div className="bodyMd-medium gap-y-md">{name}</div>
            {subtitle && (
              <div className="bodySm text-text-soft">{subtitle}</div>
            )}
          </div>
        </button>
      </BounceIt>
    );
  }
);

Profile.displayName = 'Profile';

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  color: PropTypes.oneOf(['one', 'two', 'three', 'four', 'five']),
  size: PropTypes.oneOf(['large', 'medium', 'small', 'extra-small']),
};

Profile.defaultProps = {
  subtitle: 'subtitle',
  color: 'one',
  size: 'medium',
};
