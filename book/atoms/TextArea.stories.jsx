import { Info } from '~/components/icons';
import { Button } from '../../components/atoms/button';
import { TextArea } from '../../components/atoms/input';

export default {
  title: 'Atoms/Textarea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {},
};

export const DefaultTextArea = {
  args: {
    label: 'Default',
    value: 'Hello',
    className: 'kl-w-full',
  },
};

export const ErrorTextArea = {
  args: {
    label: 'Default',
    value: 'Hello',
    error: true,
    extra: <Button content="Link" variant="primary-plain" />,
    message: (
      <span className="kl-flex kl-flex-row kl-items-center kl-gap-x-1">
        <Info size={16} color="currentColor" /> Required
      </span>
    ),
  },
};

export const DisabledTextArea = {
  args: {
    label: 'Default',
    value: 'Hello',
    disabled: true,
  },
};
