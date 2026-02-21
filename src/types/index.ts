export type TransactionType = "income" | "expense";

export type CategoryType = "Food" | "Travel" | "Bills" | "Shopping" | "Health" | "Other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: CategoryType;
  date: string;
  notes?: string;
}

export interface User {
  name: string;
  isAuthenticated: boolean;
}

export interface AppState {
  user: User | null;
  transactions: Transaction[];
  monthlyBudget: number;
}

export interface FilterOptions {
  dateRange?: { start: string; end: string };
  category?: CategoryType;
  type?: TransactionType;
  searchQuery?: string;
}
