import PropTypes from 'prop-types';
import { cn } from '../utils';

const ProgressTrackerItem = ({ label, active }) => {
  return (
    <div
      className={cn('flex flex-row gap-x-xl items-center', {
        'bodyMd-semibold text-text-default': active,
        'bodyMd text-text-disabled': !active,
      })}
    >
      <div
        className={cn(
          'w-[10px] h-[10px] rounded-full flex items-center justify-center'
        )}
      >
        {active && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-icon-primary"
          >
            <circle cx="5" cy="5" r="5" />
          </svg>
        )}
        {!active && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-border-default"
          >
            <circle cx="5" cy="5" r="2.5" />
          </svg>
        )}
      </div>
      <div className="py-lg">{label}</div>
    </div>
  );
};

export const ProgressTracker = ({ items }) => {
  return (
    <div className="flex flex-col gap-y-lg">
      {items &&
        items.map((item, index) => {
          return (
            <div className="flex flex-col" key={item.key}>
              <ProgressTrackerItem active={item.active} label={item.label} />
              {index !== items.length - 1 && (
                <div className="flex items-center justify-center w-[10px]">
                  <svg
                    width="10"
                    height="35"
                    className="-mt-[13px] -mb-[22px] stroke-border-default"
                  >
                    <line
                      x1="5"
                      y1="1"
                      x2="5"
                      y2="34"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeDasharray="3, 4"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

ProgressTracker.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      active: PropTypes.bool,
    })
  ).isRequired,
};

ProgressTracker.defaultProps = {};
