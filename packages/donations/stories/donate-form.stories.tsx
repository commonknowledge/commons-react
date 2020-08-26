/** @jsx jsx */

import { jsx } from "theme-ui";
import { DonateForm } from "@commonknowledge/common-donations";

export const Default = () => <DonateForm stripeApiKey="DUMMY" />;

export default {
  title: "Donations/Donate Form",
  component: DonateForm,
};
