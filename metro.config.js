// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  // Allow Metro bundler to recognize .cjs files
  defaultConfig.resolver.assetExts = [
    ...defaultConfig.resolver.assetExts,
    'cjs'
  ];

  return defaultConfig;
})();
