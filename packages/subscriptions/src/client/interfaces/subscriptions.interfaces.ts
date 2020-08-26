interface StandardSubscriptionProps {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface SubscriptionInterface<Props = StandardSubscriptionProps> {
  subscribe: (props: Props) => Promise<void>;
}
