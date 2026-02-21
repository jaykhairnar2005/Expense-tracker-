# Expense Tracker - Setup Guide

## Quick Start

Follow these steps to get the app running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npx expo start
```

### 3. Run on Your Device

- Install **Expo Go** app on your phone (iOS or Android)
- Scan the QR code shown in the terminal
- The app will load on your device

## Alternative: Run on Emulator

### iOS Simulator (Mac only)
```bash
npx expo start --ios
```

### Android Emulator
```bash
npx expo start --android
```

## Project Structure

```
expense-tracker/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── babel.config.js        # Babel configuration
└── src/
    ├── components/        # Reusable UI components
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   ├── CategoryPicker.tsx
    │   ├── CategoryBreakdown.tsx
    │   ├── FloatingActionButton.tsx
    │   ├── Input.tsx
    │   ├── PieChart.tsx
    │   ├── ProgressBar.tsx
    │   ├── StatCard.tsx
    │   └── TransactionItem.tsx
    ├── screens/           # Screen components
    │   ├── AuthScreen.tsx
    │   ├── DashboardScreen.tsx
    │   ├── TransactionsScreen.tsx
    │   ├── AddTransactionScreen.tsx
    │   ├── EditTransactionScreen.tsx
    │   ├── AnalyticsScreen.tsx
    │   └── SettingsScreen.tsx
    ├── navigation/        # Navigation setup
    │   ├── AppNavigator.tsx
    │   └── types.ts
    ├── context/          # State management
    │   └── AppContext.tsx
    ├── utils/            # Helper functions
    │   └── helpers.ts
    ├── types/            # TypeScript types
    │   └── index.ts
    └── theme/            # Theme configuration
        ├── colors.ts
        ├── spacing.ts
        └── index.ts
```

## Features Checklist

✅ Authentication (local mock)
✅ Dashboard with financial overview
✅ Add/Edit/Delete transactions
✅ Income and expense tracking
✅ Category-based organization
✅ Search and filter transactions
✅ Analytics with pie charts
✅ Monthly budget tracking with warnings
✅ Data persistence with AsyncStorage
✅ Export data as JSON
✅ Black & white theme
✅ Smooth animations
✅ Pull to refresh
✅ Floating action button

## Troubleshooting

### Metro bundler issues
```bash
npx expo start -c
```

### Clear cache
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### iOS Simulator not opening
Make sure Xcode is installed and command line tools are configured:
```bash
xcode-select --install
```

### Android Emulator not opening
Make sure Android Studio is installed with an AVD configured.

## Testing the App

1. **Login**: Enter any name to get started
2. **Add Transaction**: Tap the + button to add income or expense
3. **View Dashboard**: See your financial overview
4. **Browse Transactions**: View all transactions with search/filter
5. **Check Analytics**: View pie charts and category breakdowns
6. **Settings**: Configure budget, export data, or reset

## Notes

- All data is stored locally using AsyncStorage
- No backend or internet connection required
- Data persists between app restarts
- Export feature allows backing up data as JSON

## Support

For issues or questions, check:
- Expo documentation: https://docs.expo.dev
- React Navigation: https://reactnavigation.org
- React Native: https://reactnative.dev
