import React from 'react';
import './App.css';

export default function ProviderHome() {
  return (
    <div className="provider-page">
      <div className="provider-page-header">
        <h1>Welcome, Dr. Provider!</h1>
        <p>Manage your healthcare practice efficiently</p>
      </div>
      
      <div className="provider-dashboard-grid">
        <div className="provider-dashboard-card">
          <div className="provider-dashboard-card-icon">📊</div>
          <h3>Today's Appointments</h3>
          <p className="provider-dashboard-card-number">12</p>
          <p className="provider-dashboard-card-subtitle">Upcoming today</p>
        </div>
        
        <div className="provider-dashboard-card">
          <div className="provider-dashboard-card-icon">👥</div>
          <h3>Total Patients</h3>
          <p className="provider-dashboard-card-number">1,247</p>
          <p className="provider-dashboard-card-subtitle">Active patients</p>
        </div>
        
        <div className="provider-dashboard-card">
          <div className="provider-dashboard-card-icon">📅</div>
          <h3>Available Slots</h3>
          <p className="provider-dashboard-card-number">8</p>
          <p className="provider-dashboard-card-subtitle">Open appointments</p>
        </div>
        
        <div className="provider-dashboard-card">
          <div className="provider-dashboard-card-icon">📈</div>
          <h3>Monthly Revenue</h3>
          <p className="provider-dashboard-card-number">$45,230</p>
          <p className="provider-dashboard-card-subtitle">This month</p>
        </div>
      </div>
      
      <div className="provider-quick-actions">
        <h2>Quick Actions</h2>
        <div className="provider-actions-grid">
          <button className="provider-action-btn">
            <span className="provider-action-icon">📅</span>
            <span>Schedule Appointment</span>
          </button>
          <button className="provider-action-btn">
            <span className="provider-action-icon">👤</span>
            <span>Add New Patient</span>
          </button>
          <button className="provider-action-btn">
            <span className="provider-action-icon">📋</span>
            <span>View Reports</span>
          </button>
          <button className="provider-action-btn">
            <span className="provider-action-icon">⚙️</span>
            <span>Manage Availability</span>
          </button>
        </div>
      </div>
    </div>
  );
} 