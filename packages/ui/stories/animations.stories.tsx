/** @jsx jsx */

import { Meta } from "@storybook/react/types-6-0";
import { useState, Fragment } from "react";
import { jsx, Box, Button } from "theme-ui";
import { DisclosureAnimation } from "@commonknowledge/common-ui";

export const Disclosure = () => {
  const [disclosed, setDisclosed] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setDisclosed(!disclosed)}>
        {disclosed ? "Close" : "Open"}
      </Button>
      <DisclosureAnimation disclosed={disclosed}>
        <Box sx={{ height: "20em", width: "30em", bg: "hotpink" }} />
      </DisclosureAnimation>
    </Fragment>
  );
};

export default {
  title: "common-ui/Animations",
} as Meta;
