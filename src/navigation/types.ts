export type RootStackParamList = {
  Auth: undefined;
  MainTabs: { screen?: string } | undefined;
  AddTransaction: undefined;
  EditTransaction: { transactionId: string };
};

export type TabParamList = {
  Dashboard: undefined;
  Transactions: undefined;
  Analytics: undefined;
  Settings: undefined;
};
