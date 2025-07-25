import { useState } from 'react';
import PatientRegistration from './PatientRegistration';
import PatientLogin from './PatientLogin';

function App() {
  // By default, show registration. Only show login if user clicks 'Login' from registration.
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app-container">
      {showLogin ? (
        <PatientLogin onSwitchToRegister={() => setShowLogin(false)} />
      ) : (
        <PatientRegistration onSwitchToLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;
