import { RedirectToCheckoutClientOptions } from "@stripe/stripe-js";
import request from "superagent";

import { PayInterval } from "../types/donations.types";

export const getStripePlans = async (
  amount: number,
  interval: PayInterval,
  currency: string,
  api = request.post(`/api/getStripePlans`)
): Promise<Partial<RedirectToCheckoutClientOptions>> => {
  if (cache[getCacheKey(amount, interval, currency)]) {
    return cache[getCacheKey(amount, interval, currency)];
  }

  const res = await api.send({ amount, interval, currency });
  const items = res.body;

  cache[getCacheKey(amount, interval, currency)] = res.body;
  return items;
};

const cache: Record<string, Partial<RedirectToCheckoutClientOptions>> = {};
const getCacheKey = (...args: unknown[]) => args.join();
