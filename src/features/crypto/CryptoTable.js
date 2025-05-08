import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from './cryptoSelectors';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { mockWebSocket } from '../../services/mockWebSocket';

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);

  useEffect(() => {
    mockWebSocket.connect();
    return () => {
      mockWebSocket.disconnect();
    };
  }, []);

  const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatSupply = (num) => {
    if (num === null || num === undefined) return 'N/A';
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(2)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    }
    return num.toFixed(2);
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Real-Time Crypto Price Tracker</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">1h %</th>
              <th className="py-3 px-4 text-left">24h %</th>
              <th className="py-3 px-4 text-left">7d %</th>
              <th className="py-3 px-4 text-left">Market Cap</th>
              <th className="py-3 px-4 text-left">Volume (24h)</th>
              <th className="py-3 px-4 text-left">Circulating Supply</th>
              <th className="py-3 px-4 text-left">Max Supply</th>
              <th className="py-3 px-4 text-left">7D Chart</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assets.map((asset, index) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4 flex items-center">
                  <img 
                    src={asset.logo} 
                    alt={asset.name} 
                    className="w-8 h-8 mr-3 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/crypto-icons/generic.png';
                    }}
                  />
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-gray-500">{asset.symbol}</div>
                  </div>
                </td>
                <td className="py-4 px-4 font-medium">${asset.price.toLocaleString()}</td>
                <td className={`py-4 px-4 ${getChangeColor(asset.priceChange1h)}`}>
                  {asset.priceChange1h > 0 ? '+' : ''}{asset.priceChange1h}%
                </td>
                <td className={`py-4 px-4 ${getChangeColor(asset.priceChange24h)}`}>
                  {asset.priceChange24h > 0 ? '+' : ''}{asset.priceChange24h}%
                </td>
                <td className={`py-4 px-4 ${getChangeColor(asset.priceChange7d)}`}>
                  {asset.priceChange7d > 0 ? '+' : ''}{asset.priceChange7d}%
                </td>
                <td className="py-4 px-4">{formatNumber(asset.marketCap)}</td>
                <td className="py-4 px-4">{formatNumber(asset.volume24h)}</td>
                <td className="py-4 px-4">{formatSupply(asset.circulatingSupply)}</td>
                <td className="py-4 px-4">{asset.maxSupply ? formatSupply(asset.maxSupply) : '∞'}</td>
                <td className="py-4 px-4">
                  <div className="w-24 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={asset.sparkline.map((price, index) => ({ value: price }))}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={asset.priceChange7d >= 0 ? '#10B981' : '#EF4444'} 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;