const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

module.exports = ({ config }) => ({
  ...config,
  name: 'Student Manager',
  slug: 'student-manager-expo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'student-manager-expo',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  extra: { apiUrl },
  ios: { supportsTablet: true },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  plugins: ['expo-router'],
});
