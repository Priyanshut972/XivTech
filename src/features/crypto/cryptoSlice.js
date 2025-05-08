import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '/crypto-icons/btc.png',
      price: 50000,
      priceChange1h: 0.5,
      priceChange24h: -1.2,
      priceChange7d: 5.3,
      marketCap: 950000000000,
      volume24h: 25000000000,
      circulatingSupply: 19000000,
      maxSupply: 21000000,
      sparkline: [49000, 49500, 50200, 49800, 50500, 51000, 50000]
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '/crypto-icons/eth.png',
      price: 3000,
      priceChange1h: 1.2,
      priceChange24h: 3.5,
      priceChange7d: 8.1,
      marketCap: 350000000000,
      volume24h: 15000000000,
      circulatingSupply: 120000000,
      maxSupply: null,
      sparkline: [2900, 2950, 3020, 2980, 3050, 3100, 3000]
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: '/crypto-icons/usdt.png',
      price: 1.0,
      priceChange1h: 0.0,
      priceChange24h: 0.0,
      priceChange7d: 0.0,
      marketCap: 80000000000,
      volume24h: 50000000000,
      circulatingSupply: 80000000000,
      maxSupply: null,
      sparkline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
    },
    {
      id: 4,
      name: 'Cardano',
      symbol: 'ADA',
      logo: '/crypto-icons/ada.png',
      price: 1.5,
      priceChange1h: -0.3,
      priceChange24h: 2.1,
      priceChange7d: 4.7,
      marketCap: 50000000000,
      volume24h: 3000000000,
      circulatingSupply: 33000000000,
      maxSupply: 45000000000,
      sparkline: [1.45, 1.47, 1.52, 1.48, 1.53, 1.55, 1.5]
    },
    {
      id: 5,
      name: 'Solana',
      symbol: 'SOL',
      logo: '/crypto-icons/sol.png',
      price: 150,
      priceChange1h: 2.1,
      priceChange24h: -0.5,
      priceChange7d: 12.3,
      marketCap: 45000000000,
      volume24h: 2000000000,
      circulatingSupply: 300000000,
      maxSupply: null,
      sparkline: [140, 145, 152, 148, 155, 160, 150]
    }
  ]
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      const { id, price, priceChange1h, priceChange24h, priceChange7d, volume24h } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.price = price;
        asset.priceChange1h = priceChange1h;
        asset.priceChange24h = priceChange24h;
        asset.priceChange7d = priceChange7d;
        asset.volume24h = volume24h;
        
        // Update sparkline (shift and add new price)
        asset.sparkline.shift();
        asset.sparkline.push(price);
      }
    }
  }
});

export const { updatePrice } = cryptoSlice.actions;

export default cryptoSlice.reducer;