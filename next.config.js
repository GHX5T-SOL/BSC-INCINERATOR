/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Ignore optional React Native dependencies
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
      };
    }
    
    // Ignore optional dependencies in externals
    config.externals = config.externals || [];
    config.externals.push({
      '@react-native-async-storage/async-storage': 'commonjs @react-native-async-storage/async-storage',
      'pino-pretty': 'commonjs pino-pretty',
    });
    
    return config;
  },
  images: {
    unoptimized: true, // Allow base64 images (data URIs)
  },
}

module.exports = nextConfig

