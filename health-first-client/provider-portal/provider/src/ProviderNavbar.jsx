import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

export default function ProviderNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `provider-navbar-link${isActive ? ' active' : ''}`;

  return (
    <nav className="provider-navbar">
      <div className="provider-navbar-container">
        {/* Left: Logo/Title */}
        <div className="provider-navbar-brand">
          <span className="provider-navbar-title">Sample EMR</span>
        </div>

        {/* Center: Menu */}
        <div className={`provider-navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/provider/home" className={linkClass} onClick={closeMenu} end>
            <span className="provider-navbar-text">Dashboard</span>
          </NavLink>
          <NavLink to="/provider/scheduling" className={linkClass} onClick={closeMenu}>
            <span className="provider-navbar-text">Scheduling</span>
          </NavLink>
          <NavLink to="/provider/patients" className={linkClass} onClick={closeMenu}>
            <span className="provider-navbar-text">Patients</span>
          </NavLink>
          <NavLink to="/provider/communications" className={linkClass} onClick={closeMenu}>
            <span className="provider-navbar-text">Communications</span>
          </NavLink>
          <NavLink to="/provider/billing" className={linkClass} onClick={closeMenu}>
            <span className="provider-navbar-text">Billing</span>
          </NavLink>
          <NavLink to="/provider/referral" className={linkClass} onClick={closeMenu}>
            <span className="provider-navbar-text">Referral</span>
          </NavLink>
          <NavLink to="/provider/reports" className={linkClass} onClick={closeMenu}>
            <span className="provider-navbar-text">Reports</span>
          </NavLink>
          <NavLink to="/provider/settings" className={linkClass} onClick={closeMenu}>
            <span className="provider-navbar-text">Settings</span>
          </NavLink>
        </div>

        {/* Right: Search + icons + avatar */}
        <div className="provider-navbar-right">
          <div className="provider-navbar-search">
            <span className="provider-navbar-search-icon">🔎</span>
            <input
              className="provider-navbar-search-input"
              type="text"
              placeholder="Search by patient name, DOB"
              aria-label="Search"
            />
          </div>

          <div className="provider-navbar-divider" />
          <button className="provider-navbar-iconbtn" title="Messages" aria-label="Messages">
            💬
          </button>
          <div className="provider-navbar-divider" />
          <button className="provider-navbar-iconbtn" title="Notifications" aria-label="Notifications">
            🔔
          </button>
          <div className="provider-navbar-divider" />

          <button className="provider-navbar-user" aria-label="Account menu">
            <span className="provider-navbar-avatar" />
            <span className="provider-navbar-caret">▾</span>
          </button>

          <button className="provider-navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`provider-navbar-hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}