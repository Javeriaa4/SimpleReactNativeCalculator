// App.js
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Calculator from './src/components/Calculator';

/**
 * Main App Component
 * Renders the calculator application with safe area view
 */
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Calculator />
    </SafeAreaView>
  );
};

export default App;