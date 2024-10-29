import { Button } from '~/components/atoms/button';
import { Error404Icon, Error404IconDark } from './error-404';

interface IPage404 {
  heading?: string;
  content?: string;
  link?: string;
}

const Page404 = ({
  heading = 'Whoops (404)! Page not found',
  content = 'We’ll get to the bottom of it, no matter how many rabbit holes we must go down. In the meantime, feel free to browse other areas of our site.',
  link,
}: IPage404) => {
  return (
    <div className="kl-flex kl-flex-col kl-items-center kl-justify-center kl-h-screen kl-gap-8xl">
      <div className="dark-hidden">
        <Error404Icon />
      </div>
      <div className="kl-hidden dark-block">
        <Error404IconDark />
      </div>
      <div className="kl-flex kl-flex-col kl-items-center kl-justify-center kl-gap-5xl kl-max-w-md kl-text-center">
        <div className="kl-flex kl-flex-col kl-gap-3xl">
          <div className="kl-text-text-default kl-heading3xl">{heading}</div>
          <div className="kl-bodyMd kl-text-text-soft md:kl-w-[544px]">
            {content}
          </div>
        </div>
        <Button variant="basic" size="md" content="Go to homepage" to={link} />
      </div>
    </div>
  );
};

export default Page404;
