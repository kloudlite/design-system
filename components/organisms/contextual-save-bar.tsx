import classNames from 'classnames';
import { Link } from '@remix-run/react';
import { ReactNode } from 'react';
import { Button } from '../atoms/button';
import Container from '../atoms/container';

interface IContextualSaveBar {
  logo?: ReactNode;
  logoWidth?: number;
  message?: string;
  saveAction?: () => void;
  discardAction?: () => void;
  fixed?: boolean;
}

export const ContextualSaveBar = ({
  logo = null,
  logoWidth = 124,
  message = '',
  saveAction,
  discardAction,
  fixed = false,
}: IContextualSaveBar) => {
  return (
    <div
      className={classNames(
        'kl-transition-all kl-bg-surface-secondary-pressed kl-py-xl',
        {
          'kl-sticky kl-top-0 kl-left-0 kl-right-0 kl-z-40': fixed,
        },
      )}
    >
      <Container>
        <div className="kl-flex kl-flex-row kl-items-center kl-justify-between kl-gap-lg md:kl-gap-0">
          {logo && (
            <Link
              to="/"
              className="kl-hidden md:kl-block lg:kl-block xl:kl-block"
              // width={logoWidth}
              style={{ width: `${logoWidth}px` }}
            >
              {logo}
            </Link>
          )}
          {message && (
            <div className="kl-headingMd kl-text-text-on-primary kl-font-sans-serif kl-truncate">
              {message}
            </div>
          )}
          {logo && (
            <>
              <div className="kl-hidden md:kl-block" />
              <div className="kl-hidden md:kl-block" />
              <div className="kl-hidden md:kl-block" />
            </>
          )}
          <div className="kl-gap-x-lg kl-flex kl-flex-row kl-items-center">
            {discardAction && (
              <Button
                content="Discard"
                onClick={discardAction}
                variant="secondary-outline"
              />
            )}
            {saveAction && (
              <Button content="Publish" onClick={saveAction} variant="basic" />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
