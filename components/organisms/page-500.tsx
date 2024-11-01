import { Button } from '~/components/atoms/button';
import {
  Error500Icon,
  Error500IconDark,
} from '~/components/organisms/error-500';

interface IPage404 {
  heading?: string;
  content?: string;
  link?: string;
}

const Page500 = ({
  heading = 'Internal server error',
  content = 'The server encountered an error and could not complete your requests.',
  link,
}: IPage404) => {
  return (
    <div className="kl-flex kl-flex-col kl-items-center kl-justify-center kl-h-screen kl-gap-8xl">
      <div className="dark-hidden">
        <Error500Icon />
      </div>
      <div className="kl-hidden dark-block">
        <Error500IconDark />
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

export default Page500;
