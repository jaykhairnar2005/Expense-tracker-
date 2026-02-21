import { Transaction, CategoryType } from '../types';

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getCategoryIcon = (category: CategoryType): string => {
  const icons: Record<CategoryType, string> = {
    Food: 'fast-food-outline',
    Travel: 'airplane-outline',
    Bills: 'receipt-outline',
    Shopping: 'cart-outline',
    Health: 'fitness-outline',
    Other: 'ellipsis-horizontal-outline',
  };
  return icons[category];
};

export const calculateTotals = (transactions: Transaction[]) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

export const getMonthlyTransactions = (transactions: Transaction[]): Transaction[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
};

export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const breakdown: Record<CategoryType, number> = {
    Food: 0,
    Travel: 0,
    Bills: 0,
    Shopping: 0,
    Health: 0,
    Other: 0,
  };

  expenses.forEach(t => {
    breakdown[t.category] += t.amount;
  });

  return breakdown;
};

export const filterTransactions = (
  transactions: Transaction[],
  filters: {
    dateRange?: { start: string; end: string };
    category?: CategoryType;
    type?: 'income' | 'expense';
    searchQuery?: string;
  }
): Transaction[] => {
  return transactions.filter(t => {
    if (filters.dateRange) {
      const date = new Date(t.date);
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      if (date < start || date > end) return false;
    }

    if (filters.category && t.category !== filters.category) return false;
    if (filters.type && t.type !== filters.type) return false;

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        (t.notes && t.notes.toLowerCase().includes(query))
      );
    }

    return true;
  });
};
