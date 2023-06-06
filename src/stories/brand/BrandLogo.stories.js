import "../../index.css"
import {Avatar} from "../../components/atoms/avatar.jsx";
import {BrandLogo} from "../../components/branding/brand-logo.jsx";

export default {
  title: 'Branding/BrandLogo',
  component: BrandLogo,
  tags: ['autodocs'],
  argTypes: {},
};

export const BasicLogo = {
  args:{

  }
}

export const DetailedLogo = {
  args: {
    detailed: true
  },
};

