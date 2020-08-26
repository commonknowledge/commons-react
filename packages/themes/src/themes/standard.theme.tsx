import { Theme } from "theme-ui";
import { memoize, times } from "lodash";

const fib = memoize((x: number): number => (x === 0 ? x : x + fib(x - 1)));

export const StandardTheme: Theme = {
  fonts: {
    body: "'IBM Plex Sans', system-ui, sans-serif",
    heading: "'IBM Plex Sans', system-ui, sans-serif",
    monospace: "'Space Mono', Menlo, monospace",
  },
  breakpoints: ["40em", "52em", "72em"],
  space: times(10, (x) => 2.5 * fib(x)),
  fontSizes: [8, 10, 14, 15, 18, 24, 32, 38, 54],
  lineHeights: {
    body: 1.45,
    heading: 1.125,
  },
  colors: {
    text: "#111",
    background: "#F0F0F0",
    backgroundTranslucent: "rgba(240,240,240,0.95)",
    muted: "#ACACAC",
    primary: "#111",
    secondary: "#00E8A2",
    accent: "#00E8A2",
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
  buttons: {
    primary: {
      p: "1em",
      fontFamily: "body",
      userSelect: "none",
      outline: "none",
      borderRadius: 6,
      bg: "#767676",
      color: "white",
      width: "100%",
      transition: "opacity 250ms ease-in-out",
      cursor: "pointer",
      "body.hasHover &:hover": {
        opacity: 0.8,
      },
    },
  },
  forms: {
    label: {},
    input: {
      color: "black",
      p: "1em",
      borderRadius: 6,
      transition: "border-color 250ms ease-in-out",
      border: "2px solid rgba(0,0,0,0)",
      "&:focus": {
        borderColor: "secondary",
        outline: "none",
      },
    },
  },
  styles: {
    a: {
      color: "primary",
      textDecoration: "none",
      borderBottom: (theme) => "1px solid " + theme.colors.accent,
      "body.hasHover &:hover": {
        color: "accent",
      },
    },
    blockquote: {
      fontStyle: "italic",
      ml: 0,
      pl: 4,
      color: "#767676",
      borderLeft: (theme) => "1px solid " + theme.colors.accent,
    },
    p: {
      lineHeight: "body",
      mb: "0.5em",
      mt: "0.5em",
    },
    h1: {},
    h2: { fontWeight: 500, mb: 3, "&:not(:first-of-type)": { mt: 5 } },
    h3: { mt: 4, mb: 2 },
    h4: {},
  },
};
