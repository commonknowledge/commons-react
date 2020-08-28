/** @jsx jsx */

import { Meta } from "@storybook/react/types-6-0";
import { jsx } from "theme-ui";
import { DonateForm, DonateFormProps } from "@commonknowledge/common-donations";

export const Default = () => <DonateForm stripeApiKey="DUMMY" />;

export default {
  title: "common-donations/Donate Form",
  component: DonateForm,
} as Meta<DonateFormProps>;
