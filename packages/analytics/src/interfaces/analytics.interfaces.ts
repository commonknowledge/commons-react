export interface AnalyticsData<Metadata = {}> {
  category?: string;
  label?: string;
  value?: number;
  metadata?: Metadata;
}

export interface AnalyticsProvider<Metadata = {}> {
  trackUser: (userId: string) => void;
  trackEvent: (event: string, data?: AnalyticsData<Metadata>) => void;
  initialize: () => void;
}
