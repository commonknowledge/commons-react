import { create } from "@storybook/theming/create";
import { StandardTheme } from "@commonknowledge/common-themes";

export const storybookTheme = create({
  base: "light",

  colorPrimary: StandardTheme.colors?.secondary,
  colorSecondary: StandardTheme.colors?.primary,
  textColor: StandardTheme.colors.text,
  appBg: "white",
  appContentBg: "white",

  brandTitle: "Common Knowledge",
  brandUrl: "https://commonknowledge.coop",
  // @ts-ignore
  brandImage: require("./logo.png").default,
});
