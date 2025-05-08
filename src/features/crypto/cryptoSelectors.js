export const selectAllAssets = state => state.crypto.assets;

export const selectAssetById = (state, assetId) => state.crypto.assets.find(asset => asset.id === assetId);