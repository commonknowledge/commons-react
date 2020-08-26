import { SxStyleProp } from "theme-ui";

export const rowSpacing = (spacing: string | number): SxStyleProp => ({
  "> *:not(:last-child)": {
    mb: spacing,
  },
});

export const fullBleed = () => ({
  width: "100vw",
  marginLeft: "50%",
  transform: "translateX(-50%)",
});
