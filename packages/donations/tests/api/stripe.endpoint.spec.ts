import { Stripe } from "stripe";
import { mocked } from "ts-jest/utils";

import { createStripeDonationEndpoint } from "@commonknowledge/common-donations/api";
import { getStripePlans } from "@commonknowledge/common-donations";
import { requestEndpoint } from "../../../test-utils/src";

jest.mock("stripe");
jest.mock("@stripe/stripe-js");

const PRODUCT_ID = "test-product-id";
const StripeMock = mocked(Stripe, true);

const endpoint = createStripeDonationEndpoint({
  stripeSecretKey: "dummy",
  stripeProductId: PRODUCT_ID,
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe("stripe product api", () => {
  it("when the requested stripe plan already exists, re-uses the existing plan", async () => {
    givenTheKnownStripePlans([
      {
        unit_amount: 10000,
        recurring: {
          interval: "month",
          interval_count: 1,
        } as Stripe.Price.Recurring,
        currency: "gbp",
      },
    ]);

    const { lineItems } = await getStripePlans(
      100,
      "month",
      "gbp",
      requestEndpoint(endpoint, "post", "/api/getStripePlans")
    );

    expect(lineItems).toHaveLength(1);
    expect(Stripe.prototype.prices.create).not.toHaveBeenCalled();
  });

  it("when the requested stripe plan already exists, creates a new plan", async () => {
    givenTheKnownStripePlans([
      {
        unit_amount: 10000,
        recurring: {
          interval: "month",
          interval_count: 1,
        } as Stripe.Price.Recurring,
        currency: "gbp",
      },
    ]);

    const { lineItems } = await getStripePlans(
      1,
      "month",
      "gbp",
      requestEndpoint(endpoint, "post", "/api/getStripePlans")
    );

    expect(lineItems).toHaveLength(1);
    expect(Stripe.prototype.prices.create).toHaveBeenCalled();
  });
});

const givenTheKnownStripePlans = (plans: Partial<Stripe.Price>[]) => {
  StripeMock.prototype.prices = {
    list: jest.fn(async () => ({ data: plans })),
    create: jest.fn(async (req: any) => ({ ...req })),
  } as any;
};
