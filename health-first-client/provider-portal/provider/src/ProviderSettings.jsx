import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ProviderAvailability from './ProviderAvailability';
import './App.css';

export default function ProviderSettings() {
  const [activeTab, setActiveTab] = useState('availability');

  const tabs = [
    { id: 'availability', label: 'Availability', icon: '📅' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'forms', label: 'Forms', icon: '📋' },
    { id: 'fee-schedule', label: 'Fee Schedule', icon: '💰' },
    { id: 'group-settings', label: 'Group Settings', icon: '👥' },
    { id: 'agreements', label: 'Agreements', icon: '📄' },
    { id: 'audit-logs', label: 'Audit Logs', icon: '📊' }
  ];

  return (
    <div className="provider-page">
      <div className="provider-settings-header">
        <div className="provider-settings-back">
          <span className="back-arrow">←</span>
          <h1>Other Settings</h1>
        </div>
      </div>
      
      <div className="provider-settings-container">
        <div className="provider-settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`provider-settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="provider-settings-content">
          {activeTab === 'availability' && <ProviderAvailability />}
          {activeTab === 'profile' && (
            <div className="settings-placeholder">
              <h2>Profile Settings</h2>
              <p>Profile management settings will be implemented here.</p>
            </div>
          )}
          {activeTab === 'forms' && (
            <div className="settings-placeholder">
              <h2>Forms Management</h2>
              <p>Form templates and management will be implemented here.</p>
            </div>
          )}
          {activeTab === 'fee-schedule' && (
            <div className="settings-placeholder">
              <h2>Fee Schedule</h2>
              <p>Fee schedule and pricing management will be implemented here.</p>
            </div>
          )}
          {activeTab === 'group-settings' && (
            <div className="settings-placeholder">
              <h2>Group Settings</h2>
              <p>Group and team management settings will be implemented here.</p>
            </div>
          )}
          {activeTab === 'agreements' && (
            <div className="settings-placeholder">
              <h2>Agreements</h2>
              <p>Legal agreements and contracts will be managed here.</p>
            </div>
          )}
          {activeTab === 'audit-logs' && (
            <div className="settings-placeholder">
              <h2>Audit Logs</h2>
              <p>System activity and audit logs will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 