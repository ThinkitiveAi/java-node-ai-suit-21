import { useState } from 'react';
import ProviderRegistration from './ProviderRegistration';
import ProviderLogin from './ProviderLogin';
import ProviderAvailability from './ProviderAvailability';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <ProviderAvailability />;
  }

  return (
    <div className="app-container">
      {showLogin ? (
        <ProviderLogin onSwitchToRegister={() => setShowLogin(false)} onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <ProviderRegistration onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;
