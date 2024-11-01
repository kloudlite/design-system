import {
  ReactNode,
  RefObject,
  createContext,
  createRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Container from '../atoms/container';
import { cn } from '../utils';

export const TopBarContext = createContext<{ isSticked?: boolean }>({});

const useSticky = (elementRef: RefObject<HTMLElement>, topLimit = 0) => {
  const [isStickey, setIsSticky] = useState(false);

  useEffect(() => {
    const getScroll = () => {
      if (elementRef && elementRef.current) {
        const { top } = elementRef.current.getBoundingClientRect();
        if (top < topLimit) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };
    document.addEventListener('scroll', getScroll);
    return () => {
      document.removeEventListener('scroll', getScroll);
    };
  }, [elementRef, topLimit]);

  return isStickey;
};

interface ITopbar {
  tabs?: ReactNode;
  actions?: ReactNode;
  logo: ReactNode;
  fixed?: boolean;
  breadcrum?: ReactNode;
}

export const TopBar = ({
  tabs,
  actions,
  logo,
  fixed = true,
  breadcrum,
}: ITopbar) => {
  const tabBarRef = createRef<HTMLDivElement>();
  const isTabBarSticked = useSticky(tabBarRef, 0);

  const headingRef = createRef<HTMLDivElement>();
  const isHeadingSticked = useSticky(headingRef, 0);

  return (
    <>
      <div
        ref={headingRef}
        className={cn(
          'kl-bg-surface-basic-default kl-z-40 kl-transition-all kl-overflow-hidden',
          {
            'kl-sticky -kl-top-xs kl-left-0 kl-right-0': !tabs && fixed,
            'kl-shadow-sm kl-pt-xs': !tabs && fixed && isHeadingSticked,
          },
        )}
      >
        <Container>
          <div className="kl-flex kl-flex-row kl-items-center kl-gap-3xl kl-py-xl">
            <div className="kl-flex kl-flex-row kl-gap-md kl-items-center">
              {!!logo && logo}
              {!!breadcrum && breadcrum}
            </div>
            <div className="kl-flex kl-flex-row kl-items-center kl-justify-end kl-flex-1">
              <div className="kl-flex kl-flex-row kl-items-center kl-justify-center">
                {!!actions && actions}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <TopBarContext.Provider
        value={useMemo(
          () => ({ isSticked: isTabBarSticked && fixed }),
          [isTabBarSticked],
        )}
      >
        {!!tabs && (
          <div
            ref={tabBarRef}
            className={cn(
              'kl-bg-surface-basic-default kl-z-40 kl-min-h-[40px]',
              {
                'kl-sticky -kl-top-xs kl-pt-xs kl-left-0 kl-right-0': fixed,
                'kl-shadow-sm': fixed && isTabBarSticked,
              },
            )}
          >
            <Container>{tabs}</Container>
          </div>
        )}
      </TopBarContext.Provider>
      <div className="kl-border-b kl-border-border-default" />
    </>
  );
};
