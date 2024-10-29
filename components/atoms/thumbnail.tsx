import classNames from 'classnames';

type thumbnailSizes =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | (string & NonNullable<unknown>);

interface IThumbnail {
  src: string;
  size?: thumbnailSizes;
  rounded?: boolean;
}

export const Thumbnail = ({
  src,
  size = 'md',
  rounded = false,
}: IThumbnail) => {
  return (
    <div
      className={classNames(
        'kl-rounded kl-border kl-border-border-default kl-overflow-clip',
        {
          'kl-w-5xl kl-h-5xl': size === 'xs',
          'kl-w-6xl kl-h-6xl': size === 'sm',
          'kl-w-8xl kl-h-8xl': size === 'md',
          'kl-w-9xl kl-h-w-9xl': size === 'lg',
        },
        {
          'kl-rounded-full': rounded,
          'kl-rounded-md': !rounded,
        },
      )}
    >
      <img
        src={src}
        alt="thumbnail"
        className="kl-w-full kl-h-full kl-object-cover"
      />
    </div>
  );
};
