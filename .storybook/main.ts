import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  // Stories live next to their component, e.g. src/components/Button/Button.stories.tsx
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
