import { CalendarCheckFill, CaretDownFill } from '@jengaicons/react';
import { Button } from '../../components/atoms/button.jsx';

export default {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
};

export const BaseButton = {
  args: {
    variant: 'basic',
    label: 'Button',
    prefix: CalendarCheckFill,
    suffix: CaretDownFill,
  },
};

export const OutlineButton = {
  args: {
    variant: 'outline',
    label: 'Button',
  },
};

export const PlainButton = {
  args: {
    variant: 'plain',
    label: 'Button',
  },
};
