import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProviderRegistration from './ProviderRegistration';
import ProviderLogin from './ProviderLogin';
import ProviderAvailability from './ProviderAvailability';
import ProviderNavbar from './ProviderNavbar';
import ProviderHome from './ProviderHome';
import ProviderPatients from './ProviderPatients';
import ProviderUsers from './ProviderUsers';
import ProviderSettings from './ProviderSettings';
import ProviderScheduling from './ProviderScheduling';
import ProviderCommunications from './ProviderCommunications';
import ProviderBilling from './ProviderBilling';
import ProviderReferral from './ProviderReferral';
import ProviderReports from './ProviderReports';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login/Registration Routes */}
        <Route path="/login" element={
          <div className="app-container">
            {showLogin ? (
              <ProviderLogin onSwitchToRegister={() => setShowLogin(false)} onLoginSuccess={() => setIsLoggedIn(true)} />
            ) : (
              <ProviderRegistration onSwitchToLogin={() => setShowLogin(true)} />
            )}
          </div>
        } />
        
        {/* Main App Routes - Always accessible for development */}
        <Route path="/provider/*" element={
          <div className="provider-app">
            <ProviderNavbar />
            <main className="provider-main">
              <Routes>
                <Route path="home" element={<ProviderHome />} />
                <Route path="patients" element={<ProviderPatients />} />
                <Route path="users" element={<ProviderUsers />} />
                <Route path="settings" element={<ProviderSettings />} />
                <Route path="availability" element={<ProviderAvailability />} />
                <Route path="scheduling" element={<ProviderScheduling />} />
                <Route path="communications" element={<ProviderCommunications />} />
                <Route path="billing" element={<ProviderBilling />} />
                <Route path="referral" element={<ProviderReferral />} />
                <Route path="reports" element={<ProviderReports />} />
                <Route path="" element={<Navigate to="home" replace />} />
                <Route path="*" element={<Navigate to="home" replace />} />
              </Routes>
            </main>
          </div>
        } />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/provider/home" replace />} />
        <Route path="*" element={<Navigate to="/provider/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
