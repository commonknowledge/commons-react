import { createContext, FC, createElement, useContext, useEffect } from "react";
import { AnalyticsProvider } from "../interfaces/analytics.interfaces";
import { nullAnalyticsProvider } from "./null-analytics.service";

const AnalyticsContext = createContext<AnalyticsProvider>(
  nullAnalyticsProvider()
);

export const ProvideAnalytics: FC<{ provider: AnalyticsProvider }> = ({
  provider,
  ...props
}) => {
  useEffect(() => {
    provider.initialize();
  }, []);

  return createElement(AnalyticsContext.Provider, {
    value: provider,
    ...props,
  });
};

export const useAnalytics = () => useContext(AnalyticsContext);
