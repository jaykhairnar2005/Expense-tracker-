# Expense Tracker

A modern, minimalist expense tracking mobile application built with React Native and Expo.

## Features

- 📊 Dashboard with financial overview
- 💰 Track income and expenses
- 📈 Analytics with pie charts and category breakdowns
- 🎯 Monthly budget tracking with warnings
- 🔍 Search and filter transactions
- 💾 Local data persistence with AsyncStorage
- 🎨 Strict black & white theme
- ⚡ Smooth animations and transitions

## Tech Stack

- Expo SDK 54
- React Native
- TypeScript
- React Navigation (Native Stack + Bottom Tabs)
- AsyncStorage for local persistence
- Context API for state management
- Expo Vector Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start
```

4. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## Project Structure

```
src/
├── components/       # Reusable UI components
├── screens/         # Screen components
├── navigation/      # Navigation configuration
├── context/         # Context API for state management
├── utils/           # Helper functions
├── types/           # TypeScript type definitions
└── theme/           # Theme configuration (colors, spacing)
```

## Features Overview

### Authentication
- Simple local authentication with name input
- Data persisted across sessions

### Dashboard
- Total balance display
- Monthly income and expenses
- Budget usage progress bar
- Recent transactions list
- Pull to refresh

### Transactions
- Add new income/expense
- Edit existing transactions
- Delete transactions with confirmation
- Search and filter by type/category
- Category icons and visual indicators

### Analytics
- Monthly expense distribution pie chart
- Category breakdown with percentages
- Savings rate calculation
- Income vs expenses comparison

### Settings
- Monthly budget configuration
- Export data as JSON
- Reset all data
- User profile
- Logout functionality

## Data Structure

Transactions are stored with the following structure:

```typescript
{
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: "Food" | "Travel" | "Bills" | "Shopping" | "Health" | "Other";
  date: string;
  notes?: string;
}
```

## Theme

The app uses a strict black and white color scheme:
- Background: #000000
- Cards: #111111 / #1a1a1a
- Text: #ffffff
- Secondary text: #aaaaaa
- Borders: #333333

## License

MIT
