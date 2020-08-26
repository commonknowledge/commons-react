import { AnalyticsProvider } from "../interfaces/analytics.interfaces";

export const nullAnalyticsProvider = (): AnalyticsProvider => ({
  initialize: () => {},
  trackUser: () => {},
  trackEvent: () => {},
});
