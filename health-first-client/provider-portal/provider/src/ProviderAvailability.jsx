import React, { useState } from 'react';
import './App.css';

const views = ['Month', 'Week', 'Day'];

export default function ProviderAvailability() {
  const [view, setView] = useState('Week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

  function handlePrev() {
    // Change date based on view
    const d = new Date(currentDate);
    if (view === 'Month') d.setMonth(d.getMonth() - 1);
    else if (view === 'Week') d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  }
  function handleNext() {
    const d = new Date(currentDate);
    if (view === 'Month') d.setMonth(d.getMonth() + 1);
    else if (view === 'Week') d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  }
  function handleToday() {
    setCurrentDate(new Date());
  }

  return (
    <div className="provider-availability-container">
      <div className="provider-availability-header">
        <div className="provider-availability-nav">
          <button onClick={handlePrev} aria-label="Previous" className="provider-availability-nav-btn">&#8592;</button>
          <span className="provider-availability-date-label">
            {currentDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: view === 'Day' ? 'numeric' : undefined })}
          </span>
          <button onClick={handleNext} aria-label="Next" className="provider-availability-nav-btn">&#8594;</button>
          <button onClick={handleToday} className="provider-availability-today-btn">Today</button>
        </div>
        <div className="provider-availability-views">
          {views.map(v => (
            <button
              key={v}
              className={`provider-availability-view-btn${view === v ? ' active' : ''}`}
              onClick={() => setView(v)}
            >
              {v}
            </button>
          ))}
        </div>
        <button className="provider-availability-add-btn" onClick={() => setShowForm(true)}>
          + Add Availability
        </button>
      </div>
      <div className="provider-availability-calendar">
        {/* Calendar view placeholder */}
        <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
          {view} view calendar coming soon...
        </div>
      </div>
      {showForm && (
        <div className="provider-availability-modal">
          <div className="provider-availability-modal-content">
            <button className="provider-availability-modal-close" onClick={() => setShowForm(false)}>&times;</button>
            <h3>Add/Edit Availability</h3>
            {/* Availability form placeholder */}
            <div style={{ color: '#888', margin: '2rem 0' }}>Form coming soon...</div>
          </div>
        </div>
      )}
    </div>
  );
} 