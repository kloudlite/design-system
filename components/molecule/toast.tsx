import {
  ToastContainer as Container,
  ToastPosition,
  toast as t,
} from 'react-toastify';
import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
  X,
} from '~/components/icons';

export const toast = {
  info: t.info,
  success: t.success,
  error: t.error,
  warn: t.warn,
  isActive: t.isActive,
  update: t.update,
};

const classes = {
  info: 'kl-bg-surface-basic-default dark:kl-bg-surface-darktheme-basic-default kl-text-text-default dark:kl-text-text-darktheme-default kl-bodyMd kl-border-border-disabled dark:kl-border-border-darktheme-disabled',
  error:
    'kl-bg-surface-basic-default dark:kl-bg-surface-darktheme-basic-default kl-text-text-default dark:kl-text-text-darktheme-default kl-bodyMd kl-border-border-disabled dark:kl-border-border-darktheme-disabled',
  success:
    'kl-bg-surface-basic-default dark:kl-bg-surface-darktheme-basic-default kl-text-text-default dark:kl-text-text-darktheme-default kl-bodyMd kl-border-border-disabled dark:kl-border-border-darktheme-disabled',
  warning:
    'kl-bg-surface-basic-default dark:kl-bg-surface-darktheme-basic-default kl-text-text-default dark:kl-text-text-darktheme-default kl-bodyMd kl-border-border-disabled dark:kl-border-border-darktheme-disabled',
  default:
    'kl-bg-surface-basic-default dark:kl-bg-surface-darktheme-basic-default kl-text-text-default dark:kl-text-text-darktheme-default kl-bodyMd kl-border-border-disabled dark:kl-border-border-darktheme-disabled',
};

const icons = {
  info: <Info size={14} />,
  error: <WarningCircle size={14} />,
  success: <CheckCircle size={14} />,
  warning: <Warning size={14} />,
  default: null,
};

const CloseButton = () => (
  <span className="kl-text-text-default dark:kl-text-text-darktheme-default hover:kl-text-text-default/50 dark:kl-hover:text-text-darktheme-default/50 kl-h-[24px] kl-flex kl-items-center">
    <X color="currentColor" size={12} />
  </span>
);

interface IToastContainer {
  autoClose?: number | false | undefined;
  position?: ToastPosition;
}
export const ToastContainer = ({ autoClose, position }: IToastContainer) => {
  return (
    <Container
      toastClassName={({ type }: any) =>
        `kl-z-[9999999999] kl-shadow-popover kl-relative kl-flex kl-items-start kl-gap-xl kl-p-xl kl-mb-xl kl-rounded-md kl-justify-between kl-overflow-hidden kl-cursor-pointer kl-border 
        ${classes[(type || 'default') as keyof typeof classes]}`
      }
      bodyClassName={() =>
        'kl-text-text-default dark:kl-text-text-darktheme-default kl-py-sm kl-bodyMd-medium kl-flex kl-flex-row kl-items-center [&>*]:!kl-w-auto [&>*]:kl-break-all [&>*]:kl-whitespace-break-spaces'
      }
      hideProgressBar
      icon={({ type }) => icons[type]}
      closeButton={<CloseButton />}
      position={position || 'top-right'}
      autoClose={autoClose}
    />
  );
};
