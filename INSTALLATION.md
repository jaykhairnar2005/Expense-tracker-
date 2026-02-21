# Complete Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Expo Go App** on your mobile device
   - iOS: Download from App Store
   - Android: Download from Google Play Store

## Step-by-Step Installation

### 1. Navigate to Project Directory

```bash
cd expense-tracker
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- expo (~54.0.0)
- react-native (0.76.5)
- react-navigation
- async-storage
- vector-icons
- TypeScript
- And more...

### 3. Start the Development Server

```bash
npx expo start
```

You should see:
- A QR code in the terminal
- A web interface opening in your browser (Metro bundler)
- Options to run on iOS, Android, or web

### 4. Run on Your Device

#### Option A: Physical Device (Recommended)

1. Open **Expo Go** app on your phone
2. Scan the QR code from the terminal
3. Wait for the app to load (first time may take a minute)
4. The app will open automatically

#### Option B: iOS Simulator (Mac only)

```bash
npx expo start --ios
```

Requirements:
- macOS
- Xcode installed
- iOS Simulator configured

#### Option C: Android Emulator

```bash
npx expo start --android
```

Requirements:
- Android Studio installed
- Android Virtual Device (AVD) configured
- Emulator running

## Verification

Once the app loads, you should see:
1. **Login Screen** with "Expense Tracker" title
2. Enter any name to proceed
3. **Dashboard** showing:
   - Total balance (initially $0.00)
   - Income/Expense cards
   - Empty transactions message
   - Floating + button

## Common Issues & Solutions

### Issue: "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### Issue: Metro bundler cache problems
```bash
npx expo start -c
```

### Issue: Port already in use
```bash
npx expo start --port 8082
```

### Issue: Expo Go not connecting
- Ensure phone and computer are on the same WiFi network
- Try using tunnel mode: `npx expo start --tunnel`

### Issue: TypeScript errors
```bash
npm install --save-dev typescript @types/react
```

## Development Commands

```bash
# Start development server
npx expo start

# Start with cache cleared
npx expo start -c

# Start in tunnel mode (for different networks)
npx expo start --tunnel

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on web browser
npx expo start --web
```

## Testing the App

### 1. Authentication
- Enter your name (e.g., "John Doe")
- Tap "Get Started"
- You'll be taken to the Dashboard

### 2. Add Your First Transaction
- Tap the floating + button (bottom right)
- Select "Expense" or "Income"
- Fill in:
  - Title: "Grocery Shopping"
  - Amount: "50.00"
  - Category: "Food"
  - Date: (auto-filled with today)
  - Notes: (optional)
- Tap "Save"

### 3. View Transactions
- Go to "Transactions" tab
- See your transaction listed
- Try searching or filtering
- Swipe or tap to edit/delete

### 4. Check Analytics
- Go to "Analytics" tab
- View pie chart (after adding expenses)
- See category breakdown
- Check savings rate

### 5. Configure Settings
- Go to "Settings" tab
- Update monthly budget
- Export data as JSON
- Reset data if needed
- Logout

## Project Features

✅ **Authentication**: Local mock authentication
✅ **Dashboard**: Financial overview with stats
✅ **Transactions**: Add, edit, delete, search, filter
✅ **Analytics**: Pie charts and category breakdowns
✅ **Budget Tracking**: Monthly budget with warnings
✅ **Data Persistence**: AsyncStorage (survives app restarts)
✅ **Export**: Download data as JSON
✅ **Theme**: Strict black & white design
✅ **Animations**: Smooth transitions
✅ **Pull to Refresh**: Update dashboard data

## File Structure Overview

```
expense-tracker/
├── App.tsx                    # Main entry point
├── package.json              # Dependencies
├── app.json                  # Expo config
├── tsconfig.json             # TypeScript config
├── babel.config.js           # Babel config
├── README.md                 # Project overview
├── SETUP.md                  # Quick setup guide
├── INSTALLATION.md           # This file
└── src/
    ├── components/           # Reusable components (10 files)
    ├── screens/              # Screen components (7 files)
    ├── navigation/           # Navigation setup (2 files)
    ├── context/              # State management (1 file)
    ├── utils/                # Helper functions (1 file)
    ├── types/                # TypeScript types (1 file)
    └── theme/                # Theme config (3 files)
```

## Next Steps

1. **Customize**: Modify colors, add features
2. **Deploy**: Build for production with `eas build`
3. **Publish**: Submit to App Store / Play Store
4. **Extend**: Add cloud sync, authentication, etc.

## Resources

- **Expo Docs**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **React Navigation**: https://reactnavigation.org
- **TypeScript**: https://www.typescriptlang.org

## Support

If you encounter issues:
1. Check this guide
2. Clear cache: `npx expo start -c`
3. Reinstall: `rm -rf node_modules && npm install`
4. Check Expo documentation
5. Verify all prerequisites are installed

Happy coding! 🚀
