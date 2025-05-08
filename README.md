# Real-Time Crypto Price Tracker

A responsive React application that tracks cryptocurrency prices with simulated real-time updates using Redux Toolkit for state management.

## Features

- Real-time price updates (simulated with mock WebSocket)
- Color-coded percentage changes
- Interactive 7-day sparkline charts
- Responsive design that works on mobile and desktop
- Redux Toolkit for efficient state management
- Optimized re-renders with selectors

## Technologies Used

- React
- Redux Toolkit
- Recharts for sparkline visualization
- Tailwind CSS for styling
- Mock WebSocket implementation

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Enhancements Implemented

1. **Interactive Sparkline Charts**: Used Recharts to create dynamic 7-day price charts for each cryptocurrency.
2. **Responsive Design**: The table is fully responsive and works on mobile devices with horizontal scrolling.
3. **Optimized Performance**: Implemented Redux selectors to prevent unnecessary re-renders.
4. **Realistic Data Simulation**: The mock WebSocket generates correlated price changes that mimic real market behavior.
5. **Error Handling**: Added fallback images for cryptocurrency logos.
6. **Formatted Numbers**: Large numbers are formatted with suffixes (B for billion, M for million).
7. **Type Safety**: While not using TypeScript, the code is structured to make type inference clear.

## Future Improvements

- Integrate with real WebSocket API (Binance, CoinGecko, etc.)
- Add sorting and filtering functionality
- Implement localStorage for persisting favorite coins
- Add unit tests with Jest and React Testing Library
- Convert to TypeScript for better type safety
