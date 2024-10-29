import { ReactNode } from 'react';

interface ILabel {
  children?: ReactNode;
  label: ReactNode;
}
const Label = ({ children, label }: ILabel) => {
  return (
    <div className="kl-flex kl-flex-col kl-gap-md">
      <span>{label}</span>
      {children}
    </div>
  );
};

export default Label;
