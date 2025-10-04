import React, { useState, useEffect } from 'react';
import { isAuthenticated, getCurrentClient } from './config/auth';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ClientDashboard from './components/ClientDashboard';
import { Toaster } from './components/ui/toaster';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on app load
    const authStatus = isAuthenticated();
    const client = getCurrentClient();
    setAuthenticated(authStatus);
    if (client) {
      setConfirmed(client.tier);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
    const client = getCurrentClient();
    if (client) {
      setConfirmed(client.tier);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setConfirmed(false);
  };

  const handleConfirmation = () => {
    setConfirmed(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="App">
      {authenticated ? (
        confirmed ? (
          <ClientDashboard onLogout={handleLogout} />
        ) : (
          <Dashboard onLogout={handleLogout} onConfirm={handleConfirmation} />
        )
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
      <Toaster />
    </div>
  );
};

export default App;
