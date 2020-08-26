import * as qs from "querystring";

import { useAnalytics } from "@commonknowledge/common-analytics";
import { loadStripe } from "@stripe/stripe-js/pure";
import { RedirectToCheckoutClientOptions } from "@stripe/stripe-js";
import { useAsync } from "react-async-hook";

import {
  DonationFormData,
  PayInterval,
  DonationFormSchema,
} from "../types/donations.types";

export interface UseDonationsOpts {
  /** Url to redirect to on successful donation */
  successUrl?: string;

  /** Url to redirect to on cancelling donation */
  cancelUrl?: string;

  /** Stripe public API key. Defaults to process.env.STRIPE_PUBLISHABLE_KEY */
  stripeApiKey?: string;
}

export const useDonations = ({
  successUrl,
  cancelUrl,
  stripeApiKey = process.env.STRIPE_PUBLISHABLE_KEY,
}: UseDonationsOpts) => {
  if (!stripeApiKey) {
    throw Error(
      "stripeApiKey prop not provided and process.env.STRIPE_PUBLISHABLE_KEY not defined"
    );
  }

  const analytics = useAnalytics();
  // Preload any query strings from the URL into the form too
  const queryParams = qs.decode(
    typeof window === `undefined` ? "" : window.location.search
  );
  const formValuesFromURLQueryString = DonationFormSchema.cast(queryParams);

  return {
    defaultValues: formValuesFromURLQueryString,
    donate: async (data: DonationFormData) => {
      analytics.trackUser(data.EMAIL);
      analytics.trackEvent("attemptDonation", { category: "forms" });

      // Get the stripe payment data from the user options
      const stripeItems = await getStripePlan(
        Number(data!.AMOUNT),
        data.INTERVAL,
        DEFAULT_CURRENCY
      );

      // Prepare the stripe payment redirects
      const payload = qs.encode(data);
      const host = window.location.protocol + "//" + window.location.host;
      const successUrlFull = `${host}${
        successUrl || window.location.pathname
      }?${payload}`;
      const cancelUrlFull = `${host}${
        cancelUrl || window.location.pathname
      }?${payload}`;

      const stripe = await loadStripe(stripeApiKey);
      if (!stripe) throw new Error("Couldn't load our payment system, Stripe.");

      analytics.trackEvent(`donation-interval-${data.INTERVAL}`, {
        category: "forms",
        value: Number(data.AMOUNT),
      });
      analytics.trackEvent(`donation-amount-${data.AMOUNT}`, {
        category: "forms",
        value: Number(data.INTERVAL),
      });
      analytics.trackEvent("donation", {
        category: "forms",
        value: Number(data.AMOUNT),
      });

      await stripe.redirectToCheckout({
        customerEmail: data.EMAIL,
        ...stripeItems,
        successUrl: successUrlFull,
        cancelUrl: cancelUrlFull,
      });
    },
  };
};

export const getStripePlan = async (
  amount: number,
  interval: PayInterval,
  currency: string
): Promise<Exclude<RedirectToCheckoutClientOptions["items"], undefined>> => {
  if (cache[getCacheKey(amount, interval, currency)]) {
    return cache[getCacheKey(amount, interval, currency)];
  }

  const res = await fetch(`/api/getStripePlans`, {
    method: "POST",
    body: JSON.stringify({ amount, interval, currency }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const items = await res.json();
  cache[getCacheKey(amount, interval, currency)] = items;
  return items;
};

export const useStripePlan = (
  amount: number,
  interval: PayInterval | typeof NO_DONATION,
  currency: string
) => {
  return useAsync(async () => {
    if (interval === NO_DONATION) return [];
    return getStripePlan(amount, interval, currency);
  }, [amount, interval]);
};

export const NO_DONATION = "NO_DONATION";
const cache: any = {};
const getCacheKey = (...args: any[]) => args.join();

export const DEFAULT_CURRENCY = "gbp";
