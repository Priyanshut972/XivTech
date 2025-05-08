import { updatePrice } from '../features/crypto/cryptoSlice';
import store from '../app/store'; // Now importing the default export

class MockWebSocket {
  constructor() {
    this.interval = null;
  }

  connect() {
    // Simulate WebSocket connection
    this.interval = setInterval(() => {
      this.generateRandomUpdates();
    }, 2000); // Update every 2 seconds
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  generateRandomUpdates() {
    const { assets } = store.getState().crypto;
    
    assets.forEach(asset => {
      // Generate random price changes
      const priceChangeFactor = (Math.random() * 0.02) - 0.01; // -1% to +1%
      const newPrice = asset.price * (1 + priceChangeFactor);
      
      // Generate correlated changes for other metrics
      const newPriceChange1h = asset.priceChange1h + (Math.random() * 0.2) - 0.1;
      const newPriceChange24h = asset.priceChange24h + (Math.random() * 0.1) - 0.05;
      const newPriceChange7d = asset.priceChange7d + (Math.random() * 0.05) - 0.025;
      
      // Volume changes more dramatically
      const volumeChangeFactor = (Math.random() * 0.1) - 0.05;
      const newVolume24h = asset.volume24h * (1 + volumeChangeFactor);
      
      store.dispatch(updatePrice({
        id: asset.id,
        price: parseFloat(newPrice.toFixed(2)),
        priceChange1h: parseFloat(newPriceChange1h.toFixed(2)),
        priceChange24h: parseFloat(newPriceChange24h.toFixed(2)),
        priceChange7d: parseFloat(newPriceChange7d.toFixed(2)),
        volume24h: parseFloat(newVolume24h.toFixed(0))
      }));
    });
  }
}

export const mockWebSocket = new MockWebSocket();