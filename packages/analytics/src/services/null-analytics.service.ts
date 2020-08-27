import { noop } from "lodash";

import { AnalyticsProvider } from "../interfaces/analytics.interfaces";

export const nullAnalyticsProvider = (): AnalyticsProvider => ({
  initialize: noop,
  trackUser: noop,
  trackEvent: noop,
});
