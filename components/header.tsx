import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import { ChildrenProps } from './types';

interface IHeaderLink extends ChildrenProps {
  to?: string;
}

const HeaderLink = (props: IHeaderLink) => {
  const { to = '', children } = props;
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={classnames(
        'kl-flex kl-transition-all hover:kl-text-text-default kl-font-medium kl-headingSm kl-items-center',
        {
          'kl-text-text-default': isActive,
          'kl-text-text-soft': !isActive,
        },
        'kl-px-1',
      )}
    >
      {children}
    </Link>
  );
};

export const NavBar = () => {
  return (
    <div className="kl-flex kl-flex-row kl-justify-between kl-p-4">
      <Link className="kl-p-1" to="/">
        Kloudlite Draft
      </Link>
      <div className="kl-flex kl-gap-x-8">
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/features">Features</HeaderLink>
        <HeaderLink to="/pricing">Pricing</HeaderLink>
        <HeaderLink to="/resources">Resources</HeaderLink>
        {/* <HeaderLink to={"/"}>Blog</HeaderLink> */}
        {/* <HeaderLink to={"/"}>Support</HeaderLink> */}
        <HeaderLink to="/about">About Us</HeaderLink>
        <HeaderLink to="#">Login / Sign Up</HeaderLink>
      </div>
    </div>
  );
};
