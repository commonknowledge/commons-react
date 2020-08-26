import { FC, forwardRef } from "react";
import { DonationInterval } from "../types/donations.types";
import { Box, jsx, GridProps } from "theme-ui";

interface DonationIntervalFieldProps extends GridProps {
  options: Array<DonationInterval>;
}

export const DonationIntervalField = 
