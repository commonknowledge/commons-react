/** @jsx jsx */
import { jsx, BoxProps, Box } from "theme-ui";
import { useState, Fragment, ComponentType } from "react";

export interface DisclosureAnimationProps extends BoxProps {
  disclosed?: boolean;
}

export const DisclosureAnimation: ComponentType<DisclosureAnimationProps> = ({
  variant = "disclosure",
  disclosed,
  children,
  ...props
}) => {
  const [innerContent, setInnerContent] = useState<HTMLDivElement | null>(null);

  return (
    <Fragment>
      <Box
        variant={"animations." + (disclosed ? variant + "Active" : variant)}
        sx={{
          position: "relative",
          overflow: "hidden",
          maxHeight: innerContent && disclosed ? innerContent.clientHeight : 0,
        }}
        {...props}
      >
        <div
          ref={setInnerContent}
          sx={{
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </Box>
    </Fragment>
  );
};
