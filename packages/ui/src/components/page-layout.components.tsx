import { jsx, Theme, useThemeUI } from "theme-ui";
import { Global, Interpolation, InterpolationWithTheme } from "@emotion/core";
import { FC, Fragment, createContext, useContext } from "react";
import { CommonTheme } from "@commonknowledge/common-themes";

export interface PageWrapperProps {
  /** Styles to apply to the root app element */
  rootSx?: InterpolationWithTheme<Theme>;

  /** Styles to apply to the html element (page background color, etc) */
  htmlSx?: InterpolationWithTheme<Theme>;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  htmlSx,
  rootSx,
  children,
}) => {
  const { rootId } = useContext(PageConfigContext);

  return (
    <Fragment>
      <Global
        styles={{
          [`html, body`]: {
            height: "100%",
          },
          [rootId]: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
          },
          html: htmlSx as Interpolation,
          [rootId]: rootSx as Interpolation,
        }}
      />

      {children}
    </Fragment>
  );
};

interface PageConfigProps {
  rootId: string;
}

const PageConfigContext = createContext<PageConfigProps>({
  rootId: "app",
});

/** Provides some general framework-dependent settings for use by page components */
export const PageConfig: FC<PageConfigProps> = ({ children }) => {
  const theme: CommonTheme = useThemeUI().theme;

  return (
    <Fragment>
      {theme.fontStack && <Global styles={theme.fontStack.join("\n")} />}
      {children}
    </Fragment>
  );
};

export const StorybookPageConfig: FC = (props) =>
  PageConfig({ ...props, rootId: "storybook" });

export const NextJsPageConfig: FC = (props) =>
  PageConfig({ ...props, rootId: "__next" });
