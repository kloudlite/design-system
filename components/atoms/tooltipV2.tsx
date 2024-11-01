import { ReactNode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { PlacesType, Tooltip } from 'react-tooltip';
import { cn } from '../utils';

const TooltipV2 = ({
  children,
  content,
  place = 'top-start',
  className,
  offset,
}: {
  children?: ReactNode;
  content?: ReactNode;
  place?: PlacesType;
  className?: string;
  offset?: number;
}) => {
  return (
    <a
      className="kl-flex kl-w-fit kl-max-w-full kl-truncate"
      data-tooltip-id="tooltip"
      data-tooltip-html={ReactDOMServer.renderToStaticMarkup(content)}
      data-tooltip-place={place}
      data-tooltip-class-name={className}
      data-tooltip-offset={offset}
    >
      {children}
    </a>
  );
};

export const TooltipContainer = () => {
  return (
    <Tooltip
      clickable
      id={'tooltip'}
      disableStyleInjection
      className={cn(
        'kl-z-[99999999999] kl-bodySm kl-text-text-default kl-px-lg kl-py-md kl-shadow-popover kl-bg-surface-basic-default kl-rounded kl-w-fit kl-overflow-hidden [pointer-events:all]',
      )}
      noArrow
      offset={0}
      opacity={1}
      place="top-start"
    />
  );
};

export default TooltipV2;
