import * as React from "react";
import type { Decorator, Preview } from "@storybook/react-vite";

// Pull in the exact stylesheets the app loads, so components render with the
// real Forma 36 tokens, fonts, dark mode, and the demo Iris brand override.
import "@fontsource-variable/inter";
import "@fontsource-variable/geist-mono";
import "../src/styles/style.css";
import "../src/styles/iris-brand.css";
// Shiki code-block overrides (dark mode var swap + line numbers).
// This file is Storybook-only — it is never imported from src/index.ts.
import "./shiki.css";

/**
 * Reflects the toolbar's theme/brand globals onto <html>, mirroring how the
 * showcase app toggles `.dark` and `data-brand`. This makes every story
 * respond to the toolbar switchers below. The hook lives in a real component
 * (uppercase) so it satisfies the rules-of-hooks lint.
 */
function ThemeBrandFrame({
  theme,
  brand,
  children,
}: {
  theme: string;
  brand: string;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.brand = brand;
  }, [theme, brand]);

  return <div className="p-large">{children}</div>;
}

const withThemeAndBrand: Decorator = (Story, context) => (
  <ThemeBrandFrame theme={context.globals.theme} brand={context.globals.brand}>
    <Story />
  </ThemeBrandFrame>
);

const preview: Preview = {
  decorators: [withThemeAndBrand],
  globalTypes: {
    theme: {
      description: "Light / dark surface",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      description: "Primary brand palette",
      defaultValue: "forma",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "forma", title: "Forma" },
          { value: "iris", title: "Iris" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Keep the narrative "Getting Started" page pinned to the top of the
    // sidebar, ahead of the component and block sections.
    options: {
      storySort: {
        order: [
          "Getting Started",
          ["Color", "Spacing", "Radius", "Shadow"],
          "Components",
          "Blocks",
        ],
      },
    },
  },
};

export default preview;
