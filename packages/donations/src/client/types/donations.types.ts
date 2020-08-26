import Stripe from "stripe";
import { object, mixed, string, boolean, InferType } from "yup";

export type PayInterval = Stripe.PlanCreateParams.Interval | "one_time";

export interface DonationInterval {
  value: string;
  label: string;
}

export const DEFAULT_INTERVALS: DonationInterval[] = [
  {
    value: "one_time",
    label: "Just once",
  },
  {
    value: "month",
    label: "Every month",
    default: true,
  },
];

export interface DonationAmount {
  amount: string;
  default?: boolean;
}

export const DEFAULT_AMOUNTS: DonationAmount[] = [
  {
    amount: "3",
  },
  {
    amount: "5",
  },
  {
    amount: "10",
    default: true,
  },
  {
    amount: "25",
  },
  {
    amount: "50",
  },
  {
    amount: "100",
  },
];

export const DonationFormSchema = object().shape({
  INTERVAL: mixed<PayInterval>()
    .oneOf(["one_time", "month"])
    .label("Contribution frequency")
    .required(),
  AMOUNT: string()
    .test(
      "is-valid-number",
      "Donation amount must be a number",
      (v) => !!parseInt(v ?? "")
    )
    .test(
      "is-big-number",
      "Donation amount must be at least $1",
      (v) => parseFloat(v ?? "") >= 1
    )
    .test(
      "is-small-number",
      "Donation amount must be less than $999,999",
      (v) => parseFloat(v ?? "") < 999999
    )
    .label("Contribution amount")
    .required(),
  EMAIL: string().label("Your email").required().email(),
  optInToEmails: boolean().notRequired().label("Subscribe to the newsletter?"),
});

export type DonationFormData = NonNullable<
  ReturnType<typeof DonationFormSchema["cast"]>
>;
