import { ReactNode } from 'react';
import {
  CheckCircleFill,
  InfoFill,
  WarningFill,
  WarningOctagonFill,
  X,
} from '~/components/icons';
import { cn } from '../utils';
import { IconButton } from '../atoms/button';

interface IBanner {
  type: 'default' | 'info' | 'success' | 'warning' | 'critical';
  title?: ReactNode;
  body?: ReactNode;
  showclose?: boolean;
  onClose?: () => void;
}

const getStyle = (type: IBanner['type']) => {
  switch (type) {
    case 'info':
      return 'kl-bg-surface-primary-subdued kl-border-border-primary';
    case 'success':
      return 'kl-bg-surface-success-subdued kl-border-border-success';
    case 'warning':
      return 'kl-bg-surface-warning-subdued kl-border-border-warning';
    case 'critical':
      return 'kl-bg-surface-critical-subdued kl-border-border-critical';
    case 'default':
    default:
      return 'kl-bg-surface-basic-subdued kl-border-border-default';
  }
};

const Icon = ({ type }: { type: IBanner['type'] }) => {
  const iconSize = 20;
  switch (type) {
    case 'info':
      return (
        <span className="kl-text-text-primary">
          <InfoFill size={iconSize} />
        </span>
      );
    case 'success':
      return (
        <span className="kl-text-text-success">
          <CheckCircleFill size={iconSize} />
        </span>
      );
    case 'warning':
      return (
        <span className="kl-text-text-warning">
          <WarningFill size={iconSize} />
        </span>
      );
    case 'critical':
      return (
        <span className="kl-text-text-critical">
          {' '}
          <WarningOctagonFill size={iconSize} />
        </span>
      );
    case 'default':
    default:
      return (
        <span className="kl-text-text-default">
          <InfoFill size={iconSize} />
        </span>
      );
  }
};
const Banner = (props: IBanner) => {
  const { type, title, body, onClose, showclose } = props;
  return (
    <div
      className={cn(
        'kl-p-2xl kl-flex kl-flex-row kl-gap-2xl kl-border kl-rounded-lg kl-text-text-default kl-items-start',
        getStyle(type),
      )}
    >
      <span className={cn(!!title && !!body ? 'kl-pt-md' : '')}>
        <Icon type={type} />
      </span>
      <div className="kl-flex-1 kl-flex kl-flex-col kl-gap-sm">
        {title && <div className="kl-headingMd">{title}</div>}
        {body && <div className="kl-bodyMd">{body}</div>}
      </div>
      {showclose && (
        <span>
          <IconButton icon={<X />} variant="plain" onClick={onClose} />
        </span>
      )}
    </div>
  );
};

export default Banner;
