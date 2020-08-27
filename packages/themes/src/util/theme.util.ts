import { merge, get } from "lodash";
import { SxStyleProp } from "theme-ui";

import { CommonTheme } from "../interfaces/ext-theme.interface";

type ThemeMixin = string | SxStyleProp;

export const themeMixins = (mixins: ThemeMixin[]) => (
  theme: CommonTheme
): SxStyleProp => {
  return merge(
    {},
    ...mixins.map((m) => {
      return unwrap(m, theme);
    })
  );
};

const unwrap = (m: ThemeMixin, theme: CommonTheme): SxStyleProp => {
  if (typeof m === "function") {
    return unwrap(m(theme), theme);
  }

  if (typeof m === "string") {
    return unwrap(get(theme, m), theme);
  }

  return m;
};
