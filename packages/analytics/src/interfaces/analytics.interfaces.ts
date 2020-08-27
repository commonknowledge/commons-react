export interface AnalyticsData<Metadata = Record<string, unknown>> {
  category?: string;
  label?: string;
  value?: number;
  metadata?: Metadata;
}

export interface AnalyticsProvider<Metadata = Record<string, unknown>> {
  trackUser: (userId: string) => void;
  trackEvent: (event: string, data?: AnalyticsData<Metadata>) => void;
  initialize: () => void;
}
