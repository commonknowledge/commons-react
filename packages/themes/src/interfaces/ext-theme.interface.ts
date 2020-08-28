import { Theme, SxStyleProp } from "theme-ui";

export interface CommonTheme extends Theme {
  fontStack?: string[];
  animations?: Record<string, SxStyleProp>;
}
