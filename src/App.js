import React from 'react';
import Dashboard from './components/Dashboard';
import AMCPlans from './components/AMCPlans';
import MPLPlans from './components/MPLPlans';

function App() {
  const [currentView, setCurrentView] = React.useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'amc':
        return <AMCPlans onNavigate={setCurrentView} />;
      case 'mpl':
        return <MPLPlans onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div style={styles.app}>
      {renderView()}
    </div>
  );
}

const styles = {
  app: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: '20px'
  }
};

export default App;