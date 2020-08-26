import { SubscriptionInterface } from "../interfaces/subscriptions.interfaces";

export const useMailchimpSubscriptions = <
  T extends { email: string }
>(): SubscriptionInterface<T> => {
  return {
    subscribe: async ({ email, ...mergeProps }) => {
      const res = await fetch(`/api/signupUser`, {
        method: "POST",
        body: JSON.stringify({
          merge_fields: {
            EMAIL: email,
            ...mergeProps,
          },
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const body = await res.json();

      if (res.status !== 200) {
        throw body;
      }

      return body;
    },
  };
};
