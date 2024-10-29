import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftFill } from '~/components/icons';
import { IconButton } from '../atoms/button';

interface ISubHeader {
  title: ReactNode;
  actions: ReactNode;
  backUrl?: string;
  LinkComponent?: any;
}

export const SubHeader = ({
  title = '',
  actions = null,
  backUrl = '',
  LinkComponent = null,
}: ISubHeader) => {
  return (
    <div className="kl-flex kl-flex-row kl-items-center kl-justify-between kl-py-6xl kl-gap-xl">
      <div className="kl-flex kl-flex-row kl-items-center kl-gap-xl">
        {backUrl && (
          <IconButton
            variant="basic"
            icon={<ArrowLeftFill />}
            to={backUrl}
            linkComponent={LinkComponent}
          />
        )}
        <motion.div className="kl-text-text-strong kl-heading2xl">
          {title}
        </motion.div>
      </div>
      <div className="kl-flex kl-flex-row kl-items-center kl-justify-center kl-min-h-[38px]">
        {actions && actions}
      </div>
    </div>
  );
};
