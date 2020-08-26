import { Button, Input, jsx, BoxProps } from "theme-ui";
import { FC } from "react";
import {
  Form,
  FormItem,
  CheckboxFormItem,
  FormSubmit,
  ToggleGrid,
} from "@commonknowledge/common-forms";
import { SubscriptionInterface } from "@commonknowledge/common-subscriptions";

import {
  DonationInterval,
  DEFAULT_INTERVALS,
  DEFAULT_AMOUNTS,
  DonationFormSchema,
  DonationFormData,
} from "../types/donations.types";
import { useDonations, UseDonationsOpts } from "../services/donation.service";

export interface DonateFormProps
  extends UseDonationsOpts,
    Omit<BoxProps, "ref"> {
  /** Optional donation amounts to present to the user */
  amounts?: DonationInterval[];

  /** Optional donation interva;s to present to the user */
  intervals?: DonationInterval[];

  /** If provided, subscribes the user using the provided  */
  subscriptionProvider?: SubscriptionInterface<{ email: string }>;
}

/**
 * Bog standard donation form.
 *
 * Lightly customizable. Don't add too many configuration props to this.
 *
 * If you want something fancier, use the useDonations hook instead.
 */
export const DonateForm: FC<DonateFormProps> = ({
  intervals = DEFAULT_INTERVALS,
  subscriptionProvider,
  ...donationServiceOpts
}) => {
  const donations = useDonations(donationServiceOpts);

  return (
    <Form
      schema={DonationFormSchema}
      defaultValues={donations.defaultValues}
      onSubmit={async (data) => {
        if (subscriptionProvider) {
          await subscriptionProvider.subscribe({ email: data.EMAIL });
        }

        await donations.donate(data);
      }}
    >
      <FormItem name="INTERVAL" label="How often would you like to contribute?">
        <ToggleGrid options={intervals} />
      </FormItem>

      <FormItem name="AMOUNT" label="How much would you like to donate?">
        {/* <DonationAmountField options={intervals} /> */}
      </FormItem>

      <FormItem name="EMAIL" label="Your email">
        <Input type="email" />
      </FormItem>

      {subscriptionProvider && (
        <CheckboxFormItem name="optInToEmails" label="Join our mailing list?" />
      )}

      <FormSubmit variant="primary">Contribute</FormSubmit>
    </Form>
  );
};
