import { addons } from '@storybook/manager-api';
import { create as createTheme } from '@storybook/theming';

addons.setConfig({
  theme: createTheme({
    base: "light",
    brandTitle: 'LBCamden Frontend Library',
    brandImage: '/assets/images/camden-logo--full.png',
    brandTarget: '_self',
  }),
});
