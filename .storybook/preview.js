import React from "react";
import { ThemeProvider } from "theme-ui";
import { StandardTheme } from "@commonknowledge/common-themes";
import { StorybookPageConfig } from "@commonknowledge/common-ui";

export const decorators = [
  (children) => (
    <ThemeProvider theme={StandardTheme}>
      <StorybookPageConfig>{children()}</StorybookPageConfig>
    </ThemeProvider>
  ),
];
