import React, { useMemo, useState } from 'react';

function ScheduleAppointmentModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    patient: '',
    type: 'Consultation',
    date: '',
    startTime: '',
    duration: 30,
    provider: 'John Doe',
    location: 'In-person',
    notes: '',
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || !form.date || !form.startTime) return;
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content scheduling-modal">
        <div className="modal-header">
          <h2>Schedule Appointment</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form className="modal-body scheduling-modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label>Patient</label>
              <input
                type="text"
                placeholder="Search or enter patient name"
                value={form.patient}
                onChange={(e) => update('patient', e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label>Appointment Type</label>
              <select value={form.type} onChange={(e) => update('type', e.target.value)}>
                <option>Consultation</option>
                <option>Follow-up</option>
                <option>Procedure</option>
                <option>Telehealth</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Date</label>
              <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} required />
            </div>
            <div className="form-field">
              <label>Start Time</label>
              <input type="time" value={form.startTime} onChange={(e) => update('startTime', e.target.value)} required />
            </div>
            <div className="form-field">
              <label>Duration (mins)</label>
              <input
                type="number"
                min="5"
                step="5"
                value={form.duration}
                onChange={(e) => update('duration', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Provider</label>
              <select value={form.provider} onChange={(e) => update('provider', e.target.value)}>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Dr. Johnson</option>
              </select>
            </div>
            <div className="form-field">
              <label>Location</label>
              <select value={form.location} onChange={(e) => update('location', e.target.value)}>
                <option>In-person</option>
                <option>Telehealth</option>
                <option>Home Visit</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full-width">
              <label>Notes</label>
              <textarea rows={3} placeholder="Add any notes..." value={form.notes} onChange={(e) => update('notes', e.target.value)} />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="add-clinician-cancel-btn" onClick={onClose}>Close</button>
            <button type="submit" className="add-patient-save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProviderScheduling() {
  const [selectedProvider, setSelectedProvider] = useState('John Doe');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'Alex Kim', date: '2025-06-19', startTime: '09:00', duration: 30, provider: 'John Doe', type: 'Consultation', location: 'In-person' },
    { id: 2, patient: 'Maria Lopez', date: '2025-06-19', startTime: '10:30', duration: 60, provider: 'John Doe', type: 'Telehealth', location: 'Telehealth' },
    { id: 3, patient: 'Sam Patel', date: '2025-06-20', startTime: '14:00', duration: 45, provider: 'Jane Smith', type: 'Follow-up', location: 'In-person' },
  ]);

  const weekDays = useMemo(() => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], []);

  const getDateLabel = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    if (selectedProvider && a.provider !== selectedProvider) return false;
    if (query && !a.patient.toLowerCase().includes(query.toLowerCase())) return false;
    const isAfterStart = !dateRange.start || a.date >= dateRange.start;
    const isBeforeEnd = !dateRange.end || a.date <= dateRange.end;
    return isAfterStart && isBeforeEnd;
  });

  const groupedByDate = filteredAppointments.reduce((acc, appt) => {
    (acc[appt.date] = acc[appt.date] || []).push(appt);
    return acc;
  }, {});

  const handleSaveAppointment = (form) => {
    const newAppt = {
      id: Date.now(),
      patient: form.patient,
      date: form.date,
      startTime: form.startTime,
      duration: form.duration,
      provider: form.provider,
      type: form.type,
      location: form.location,
    };
    setAppointments((prev) => [...prev, newAppt]);
    setIsModalOpen(false);
  };

  return (
    <div className="provider-page">
      <div className="provider-page-header">
        <h1>Scheduling</h1>
      </div>

      <div className="scheduling-controls">
        <div className="scheduling-filter">
          <label>Provider</label>
          <select value={selectedProvider} onChange={(e) => setSelectedProvider(e.target.value)}>
            <option>John Doe</option>
            <option>Jane Smith</option>
            <option>Dr. Johnson</option>
          </select>
        </div>

        <div className="scheduling-dates">
          <div className="scheduling-date-field">
            <label>From</label>
            <input type="date" value={dateRange.start} onChange={(e) => setDateRange((d) => ({ ...d, start: e.target.value }))} />
          </div>
          <span className="date-separator">to</span>
          <div className="scheduling-date-field">
            <label>Till</label>
            <input type="date" value={dateRange.end} onChange={(e) => setDateRange((d) => ({ ...d, end: e.target.value }))} />
          </div>
        </div>

        <div className="scheduling-search">
          <label>Search</label>
          <input type="text" placeholder="Search by patient name" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="scheduling-actions">
          <button className="add-patient-save-btn" onClick={() => setIsModalOpen(true)}>
            + Schedule appointment
          </button>
        </div>
      </div>

      <div className="scheduling-layout">
        <div className="schedule-board">
          <div className="schedule-board-header">
            <div className="schedule-colhead">Date</div>
            <div className="schedule-colhead">Appointments</div>
          </div>
          <div className="schedule-board-body">
            {Object.keys(groupedByDate).length === 0 && (
              <div className="schedule-empty">No appointments in the selected range.</div>
            )}
            {Object.entries(groupedByDate)
              .sort(([a], [b]) => (a < b ? -1 : 1))
              .map(([date, items]) => (
                <div key={date} className="schedule-row">
                  <div className="schedule-datecell">
                    <div className="date-main">{getDateLabel(date)}</div>
                    <div className="date-sub">{date}</div>
                  </div>
                  <div className="schedule-appts">
                    {items
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((a) => (
                        <div key={a.id} className="appt-card">
                          <div className="appt-time">
                            {a.startTime} • {a.duration}m
                          </div>
                          <div className="appt-title">{a.patient}</div>
                          <div className="appt-meta">
                            <span className="type-tag">{a.type}</span>
                            <span className="loc-tag">{a.location}</span>
                            <span className="prov-tag">{a.provider}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <aside className="schedule-sidebar">
          <div className="sidebar-section">
            <div className="availability-section-header"><h3>Upcoming</h3></div>
            <div className="sidebar-list">
              {filteredAppointments
                .slice()
                .sort((a, b) => (a.date + a.startTime < b.date + b.startTime ? -1 : 1))
                .slice(0, 6)
                .map((a) => (
                  <div key={a.id} className="sidebar-item">
                    <div className="sidebar-time">
                      {getDateLabel(a.date)} • {a.startTime}
                    </div>
                    <div className="sidebar-title">{a.patient}</div>
                    <div className="sidebar-meta">{a.type} • {a.provider}</div>
                  </div>
                ))}
            </div>
          </div>

          <button className="add-patient-save-btn sidebar-cta" onClick={() => setIsModalOpen(true)}>
            + Schedule appointment
          </button>
        </aside>
      </div>

      <ScheduleAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAppointment}
      />
    </div>
  );
}


