import { merge } from "lodash";
import { toTheme } from "@theme-ui/typography";
import { transitions } from "polished";

import { CommonTheme } from "../interfaces/ext-theme.interface";
import {
  NeueHaasGroteskFontStack,
  NeueHaasGrotesk,
} from "../fonts/neue-haas/neue-hass.font";
import { themeMixins } from "../util/theme.util";

const typography = {
  baseFontSize: "18px",
  baseLineHeight: 1.45,
  headerFontFamily: [NeueHaasGrotesk, "Helvetica", "Arial", "sans-serif"],
  bodyFontFamily: [NeueHaasGrotesk, "Helvetica", "Arial", "sans-serif"],
};

const theme: CommonTheme = {
  useBodyStyles: true,
  breakpoints: ["40em", "52em", "72em"],
  colors: {
    text: "#111",
    background: "#F0F0F0",
    backgroundTranslucent: "rgba(240,240,240,0.95)",
    muted: "#ACACAC",
    primary: "#444",
    secondary: "#00E8A2",
    accent: "#00E8A2",
    control: "#666",
    error: "red",
  },
  text: {
    helpText: {
      fontSize: 1,
      color: "muted",
    },
    error: themeMixins([
      "text.helpText",
      {
        color: "error",
      },
    ]),
  },
  links: {
    default: {
      opacity: 0.7,
      color: "inherit",
      textDecoration: "inherit",
      "body.hasHover &:hover": {
        opacity: 0.4,
      },
    },
    accent: {
      color: "accent",
      textDecoration: "inherit",
      "body.hasHover &:hover": {
        opacity: 0.7,
      },
    },
  },
  styles: {
    root: {
      color: "text",
      backgroundColor: "background",
      fontFamily: "body",
    },
  },
  animations: {
    disclosure: {
      opacity: 0,
      ...transitions(["opacity", "max-height"], "350ms ease-in-out"),
    },
    disclosureActive: themeMixins([
      "animations.disclosure",
      {
        opacity: 1,
      },
    ]),
  },
  fontStack: [NeueHaasGroteskFontStack],
};

const components = {
  buttons: {
    button: {
      py: 1,
      px: 3,
      cursor: "pointer",
      fontFamily: "body",
      userSelect: "none",
      outline: "none",
      borderRadius: 6,
      bg: "control",
      color: "white",
      width: "100%",
      transition: "opacity 250ms ease-in-out",
      "&:hover": {
        opacity: 0.7,
      },
      "&:disabled": {
        opacity: 0.5,
        cursor: "default",
      },
    },
    outline: themeMixins([
      "buttons.button",
      {
        textAlign: "center",
        backgroundColor: "white",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "control",
        color: "text",
      },
    ]),
    primary: themeMixins([
      "buttons.button",
      {
        backgroundColor: "primary",
      },
    ]),
    secondary: themeMixins([
      "buttons.button",
      {
        backgroundColor: "secondary",
      },
    ]),
    toggle: themeMixins(["buttons.outline"]),
    toggleActive: themeMixins([
      "buttons.outline",
      {
        borderColor: "accent",
      },
    ]),
  },
  forms: {
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: ["stretch", "flex-start"],
    },
    label: {
      fontSize: 1,
      fontWeight: 500,
    },
    item: {
      alignItems: ["stretch", "flex-start"],
    },
    fullWidth: {
      alignSelf: "stretch",
      alignItems: "stretch",
    },
    input: {
      color: "control",
      p: 1,
      width: "20em",
      borderRadius: 6,
      transition: "border-color 250ms ease-in-out",
      border: "2px solid rgba(0,0,0,0)",
      borderColor: "control",
      "&:focus": {
        borderColor: "secondary",
        outline: "none",
      },
    },
  },
};

export const StandardTheme: CommonTheme = merge(
  {},
  toTheme(typography),
  components,
  theme
);
