import React, { useState } from 'react';
import './App.css';

export default function ProviderAvailability() {
  const [clinician, setClinician] = useState('John Doe');
  const [startDate, setStartDate] = useState('2025-06-19');
  const [endDate, setEndDate] = useState('2025-06-25');
  const [timeZone, setTimeZone] = useState('');
  const [isAddAvailabilityOpen, setIsAddAvailabilityOpen] = useState(false);
  const [modalDay, setModalDay] = useState('Monday');
  const [modalFrom, setModalFrom] = useState('09:00');
  const [modalTill, setModalTill] = useState('18:00');
  const [dailySchedule, setDailySchedule] = useState([
    { day: 'Monday', from: '09:00', till: '18:00' },
    { day: 'Tuesday', from: '09:00', till: '18:00' },
    { day: 'Wednesday', from: '09:00', till: '18:00' },
    { day: 'Thursday', from: '09:00', till: '18:00' },
    { day: 'Friday', from: '09:00', till: '18:00' },
    { day: 'Saturday', from: '09:00', till: '18:00' }
  ]);
  const [blockDays, setBlockDays] = useState([
    { date: '', from: '', till: '' },
    { date: '', from: '', till: '' }
  ]);

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const handleAddDay = () => {
    setDailySchedule([...dailySchedule, { day: 'Monday', from: '09:00', till: '18:00' }]);
  };

  const handleRemoveDay = (index) => {
    const newSchedule = dailySchedule.filter((_, i) => i !== index);
    setDailySchedule(newSchedule);
  };

  const handleUpdateDay = (index, field, value) => {
    const newSchedule = [...dailySchedule];
    newSchedule[index][field] = value;
    setDailySchedule(newSchedule);
  };

  const handleAddBlockDay = () => {
    setBlockDays([...blockDays, { date: '', from: '', till: '' }]);
  };

  const handleRemoveBlockDay = (index) => {
    const newBlockDays = blockDays.filter((_, i) => i !== index);
    setBlockDays(newBlockDays);
  };

  const handleUpdateBlockDay = (index, field, value) => {
    const newBlockDays = [...blockDays];
    newBlockDays[index][field] = value;
    setBlockDays(newBlockDays);
  };

  const handleSave = () => {
    console.log('Saving availability settings...');
    alert('Availability settings saved successfully!');
  };

  const handleCancel = () => {
    console.log('Canceling changes...');
  };

  const handleOpenAddAvailability = () => {
    setModalDay('Monday');
    setModalFrom('09:00');
    setModalTill('18:00');
    setIsAddAvailabilityOpen(true);
  };

  const handleAddAvailabilityConfirm = () => {
    setDailySchedule([...dailySchedule, { day: modalDay, from: modalFrom, till: modalTill }]);
    setIsAddAvailabilityOpen(false);
  };

  const handleClearDates = () => {
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="provider-availability-page">
      <div className="availability-surface">
        <div className="availability-container">
        {/* Left Section - Day Wise Availability */}
        <div className="availability-left-section">
          <div className="availability-section-header">
            <h3>Day Wise Availability</h3>
          </div>
          
          <div className="clinician-selection">
            <label>Provider</label>
            <select 
              value={clinician} 
              onChange={(e) => setClinician(e.target.value)}
              className="clinician-select"
            >
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Dr. Johnson">Dr. Johnson</option>
            </select>
          </div>

          <div className="date-range-section">
            <div className="date-range-inputs">
              <div className="date-input-group">
                <label>Select Date Range</label>
                <div className="date-input-wrapper">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="date-range-input"
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>
              
              <span className="date-separator">to</span>
              
              <div className="date-input-group">
                <div className="date-input-wrapper">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="date-range-input"
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>
              
              <button className="clear-date-btn" title="Clear date range" onClick={handleClearDates}>
                🗑️
              </button>
              
              <button className="add-availability-btn" onClick={handleOpenAddAvailability}>
                <span>+</span>
                Add Availability
              </button>
            </div>
          </div>

          <div className="daily-schedule-section">
            <h4>Daily Schedule</h4>
            <div className="schedule-grid">
              <div className="schedule-header">
                <span>Day</span>
                <span>From</span>
                <span>Till</span>
                <span>Action</span>
              </div>
              
              {dailySchedule.map((schedule, index) => (
                <div key={index} className="schedule-row">
                  <span className="mobile-field-label">Day</span>
                  <select
                    value={schedule.day}
                    onChange={(e) => handleUpdateDay(index, 'day', e.target.value)}
                    className="day-select"
                  >
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  
                  <div className="time-input-wrapper">
                    <span className="mobile-field-label">From</span>
                    <input
                      type="time"
                      value={schedule.from}
                      onChange={(e) => handleUpdateDay(index, 'from', e.target.value)}
                      className="time-input"
                    />
                    <span className="clock-icon">🕐</span>
                  </div>
                  
                  <div className="time-input-wrapper">
                    <span className="mobile-field-label">Till</span>
                    <input
                      type="time"
                      value={schedule.till}
                      onChange={(e) => handleUpdateDay(index, 'till', e.target.value)}
                      className="time-input"
                    />
                    <span className="clock-icon">🕐</span>
                  </div>
                  
                  <button 
                    className="remove-day-btn"
                    onClick={() => handleRemoveDay(index)}
                    title="Remove day"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            
            <button className="add-more-btn" onClick={handleAddDay}>
              <span>+</span>
              Add More
            </button>
          </div>
        </div>

          {/* Right Section - Slot Creation Setting */}
          <div className="availability-right-section">
            <div className="slot-creation-section">
              <div className="availability-section-header">
                <h3>Slot Creation Setting</h3>
              </div>
              
              <div className="timezone-section">
                <label>Time Zone</label>
                <select 
                  value={timeZone} 
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="timezone-select"
                >
                  <option value="">Select Time Zone</option>
                  <option value="EST">Eastern Standard Time (EST)</option>
                  <option value="CST">Central Standard Time (CST)</option>
                  <option value="MST">Mountain Standard Time (MST)</option>
                  <option value="PST">Pacific Standard Time (PST)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>

            <div className="block-days-section">
              <div className="availability-section-header">
                <h3>Block Days</h3>
              </div>
              
              <div className="block-days-list">
                {blockDays.map((blockDay, index) => (
                  <div key={index} className="block-day-row">
                    <div className="date-input-wrapper">
                      <span className="mobile-field-label">Date</span>
                      <input
                        type="date"
                        value={blockDay.date}
                        onChange={(e) => handleUpdateBlockDay(index, 'date', e.target.value)}
                        placeholder="Select Date"
                        className="block-date-input"
                      />
                      <span className="calendar-icon">📅</span>
                    </div>
                    
                    <div className="time-input-wrapper">
                      <span className="mobile-field-label">From</span>
                      <input
                        type="time"
                        value={blockDay.from}
                        onChange={(e) => handleUpdateBlockDay(index, 'from', e.target.value)}
                        placeholder="Select Start Time"
                        className="block-time-input"
                      />
                      <span className="clock-icon">🕐</span>
                    </div>
                    
                    <div className="time-input-wrapper">
                      <span className="mobile-field-label">Till</span>
                      <input
                        type="time"
                        value={blockDay.till}
                        onChange={(e) => handleUpdateBlockDay(index, 'till', e.target.value)}
                        placeholder="Select End Time"
                        className="block-time-input"
                      />
                      <span className="clock-icon">🕐</span>
                    </div>
                    
                    <button 
                      className="remove-block-btn"
                      onClick={() => handleRemoveBlockDay(index)}
                      title="Remove block day"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              
              <button className="add-block-days-btn" onClick={handleAddBlockDay}>
                <span>+</span>
                Add Block Days
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions (inside surface per design) */}
        <div className="availability-footer">
          <button className="cancel-btn" onClick={handleCancel}>Close</button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      
      {isAddAvailabilityOpen && (
        <div className="modal-overlay" onClick={() => setIsAddAvailabilityOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Availability</h2>
              <button className="modal-close" aria-label="Close" onClick={() => setIsAddAvailabilityOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="scheduling-modal-form">
                <div className="form-row">
                  <div className="form-field">
                    <label>Day</label>
                    <select value={modalDay} onChange={(e) => setModalDay(e.target.value)}>
                      {daysOfWeek.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>From</label>
                    <input type="time" value={modalFrom} onChange={(e) => setModalFrom(e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label>Till</label>
                    <input type="time" value={modalTill} onChange={(e) => setModalTill(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="add-clinician-cancel-btn" onClick={() => setIsAddAvailabilityOpen(false)}>Cancel</button>
                <button className="add-clinician-save-btn" onClick={handleAddAvailabilityConfirm}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
} 