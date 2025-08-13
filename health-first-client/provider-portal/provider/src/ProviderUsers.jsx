import React, { useState } from 'react';
import './App.css';

export default function ProviderUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('clinician');
  const [showAddClinicianModal, setShowAddClinicianModal] = useState(false);
  const [clinicianForm, setClinicianForm] = useState({
    firstName: '',
    lastName: '',
    role: '',
    emailId: '',
    contactNumber: '',
    npiNumber: '',
    workLocations: '',
    languagesSpoken: '',
    supervisingClinician: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  // Mock clinician data matching the image
  const clinicians = [
    { 
      id: 1, 
      name: 'Floyd Miles', 
      email: 'nathan.roberts@examp...',
      phone: '(270) 555-0117',
      role: 'Clinician',
      npiNumber: '5351022502',
      workLocation: 'Georgetown',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Kathryn Murphy', 
      email: 'jessica.hanson@examp...',
      phone: '(704) 555-0127',
      role: 'Clinician',
      npiNumber: '9501956750',
      workLocation: 'Georgetown',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Bessie Cooper', 
      email: 'debbie.baker@example...',
      phone: '(308) 555-0121',
      role: 'Clinician',
      npiNumber: '7111924081',
      workLocation: 'Georgetown',
      status: 'Active'
    },
    { 
      id: 4, 
      name: 'Marvin McKinney', 
      email: 'tanya.hill@example.com',
      phone: '(406) 555-0120',
      role: 'Clinician',
      npiNumber: '6842018413',
      workLocation: 'Georgetown',
      status: 'Inactive'
    },
    { 
      id: 5, 
      name: 'Dr. Sarah Johnson', 
      email: 'sarah.johnson@clinic.com',
      phone: '(415) 555-0101',
      role: 'Clinician',
      npiNumber: '1234567890',
      workLocation: 'Georgetown',
      status: 'Active'
    },
    { 
      id: 6, 
      name: 'Dr. Michael Chen', 
      email: 'michael.chen@clinic.com',
      phone: '(312) 555-0102',
      role: 'Clinician',
      npiNumber: '0987654321',
      workLocation: 'Georgetown',
      status: 'Active'
    },
    { 
      id: 7, 
      name: 'Dr. Emily Davis', 
      email: 'emily.davis@clinic.com',
      phone: '(404) 555-0103',
      role: 'Clinician',
      npiNumber: '1122334455',
      workLocation: 'Georgetown',
      status: 'Inactive'
    },
    { 
      id: 8, 
      name: 'Dr. Robert Wilson', 
      email: 'robert.wilson@clinic.com',
      phone: '(305) 555-0104',
      role: 'Clinician',
      npiNumber: '5566778899',
      workLocation: 'Georgetown',
      status: 'Active'
    }
  ];

  // Mock staff data
  const staff = [
    { 
      id: 1, 
      name: 'Nurse Lisa Martinez', 
      email: 'lisa.martinez@clinic.com',
      phone: '(555) 555-0105',
      role: 'Nurse',
      npiNumber: 'N/A',
      workLocation: 'Georgetown',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Admin John Smith', 
      email: 'john.smith@clinic.com',
      phone: '(555) 555-0106',
      role: 'Administrator',
      npiNumber: 'N/A',
      workLocation: 'Georgetown',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Receptionist Mary Brown', 
      email: 'mary.brown@clinic.com',
      phone: '(555) 555-0107',
      role: 'Receptionist',
      npiNumber: 'N/A',
      workLocation: 'Georgetown',
      status: 'Active'
    }
  ];

  const currentData = activeTab === 'clinician' ? clinicians : staff;
  
  const filteredData = currentData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.npiNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'active';
      case 'Inactive': return 'inactive';
      default: return 'active';
    }
  };

  const handleAddClinician = () => {
    setShowAddClinicianModal(true);
  };

  const handleCloseModal = () => {
    setShowAddClinicianModal(false);
    setClinicianForm({
      firstName: '',
      lastName: '',
      role: '',
      emailId: '',
      contactNumber: '',
      npiNumber: '',
      workLocations: '',
      languagesSpoken: '',
      supervisingClinician: ''
    });
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setClinicianForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!clinicianForm.firstName.trim()) errors.firstName = 'First name is required';
    if (!clinicianForm.lastName.trim()) errors.lastName = 'Last name is required';
    if (!clinicianForm.emailId.trim()) errors.emailId = 'Email ID is required';
    
    // Email validation
    if (clinicianForm.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clinicianForm.emailId)) {
      errors.emailId = 'Invalid email format';
    }
    
    // Phone validation if provided
    if (clinicianForm.contactNumber && !/^[\+]?[1-9][\d]{0,15}$/.test(clinicianForm.contactNumber.replace(/[\s\-\(\)]/g, ''))) {
      errors.contactNumber = 'Invalid phone number format';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      // Here you would typically send the data to your backend
      console.log('Clinician data:', clinicianForm);
      alert('Clinician added successfully!');
      handleCloseModal();
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="provider-page">
      <div className="provider-page-header">
        <div className="provider-users-header">
          <div className="provider-users-title">
            <h1>Users</h1>
          </div>
          <div className="provider-users-tabs">
            <button 
              className={`provider-tab ${activeTab === 'staff' ? 'active' : ''}`}
              onClick={() => setActiveTab('staff')}
            >
              Staff
            </button>
            <button 
              className={`provider-tab ${activeTab === 'clinician' ? 'active' : ''}`}
              onClick={() => setActiveTab('clinician')}
            >
              Clinician
            </button>
          </div>
          <div className="provider-users-actions">
            <button className="provider-add-clinician-btn" onClick={handleAddClinician}>
              <span>+</span>
              Add Clinician
            </button>
          </div>
        </div>
      </div>
      
      <div className="provider-patients-controls">
        <div className="provider-search-container">
          <input
            type="text"
            placeholder="Search by name, email, or NPI number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="provider-search-input"
          />
        </div>
      </div>
      
      <div className="provider-patients-table-container">
        <table className="provider-patients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Contact Number</th>
              <th>Role</th>
              <th>NPI Number</th>
              <th>Work Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="provider-user-name">
                    <span className="provider-user-avatar">
                      {user.role === 'Clinician' ? '👨‍⚕️' : user.role === 'Nurse' ? '👩‍⚕️' : '👤'}
                    </span>
                    <span className="provider-user-name-text">{user.name}</span>
                  </div>
                </td>
                <td className="provider-user-email">{user.email}</td>
                <td>{user.phone}</td>
                <td className="provider-user-role">{user.role}</td>
                <td className="provider-user-npi">{user.npiNumber}</td>
                <td>{user.workLocation}</td>
                <td>
                  <span className={`provider-user-status ${getStatusColor(user.status)}`}>
                    <span className="status-dot"></span>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="provider-action-menu">
                    ⋮
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredData.length === 0 && (
        <div className="provider-no-results">
          <p>No {activeTab === 'clinician' ? 'clinicians' : 'staff'} found matching your search criteria.</p>
        </div>
      )}

      {/* Add Clinician Modal */}
      {showAddClinicianModal && (
        <div className="add-clinician-modal">
          <div className="add-clinician-modal-content">
            <div className="add-clinician-modal-header">
              <h2>Add Clinician User</h2>
              <button className="add-clinician-modal-close" onClick={handleCloseModal}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="add-clinician-form">
              {/* Row 1: First Name, Last Name, Role */}
              <div className="clinician-form-row">
                <div className="clinician-form-field">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={clinicianForm.firstName}
                    onChange={handleFormChange}
                    placeholder="Enter First Name"
                    className={formErrors.firstName ? 'error' : ''}
                  />
                  {formErrors.firstName && <span className="field-error">{formErrors.firstName}</span>}
                </div>
                
                <div className="clinician-form-field">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={clinicianForm.lastName}
                    onChange={handleFormChange}
                    placeholder="Enter Last Name"
                    className={formErrors.lastName ? 'error' : ''}
                  />
                  {formErrors.lastName && <span className="field-error">{formErrors.lastName}</span>}
                </div>
                
                <div className="clinician-form-field">
                  <label>Role</label>
                  <select
                    name="role"
                    value={clinicianForm.role}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Physician">Physician</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Therapist">Therapist</option>
                    <option value="Specialist">Specialist</option>
                    <option value="Resident">Resident</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Email ID, Contact Number, NPI Number */}
              <div className="clinician-form-row">
                <div className="clinician-form-field">
                  <label>Email ID *</label>
                  <input
                    type="email"
                    name="emailId"
                    value={clinicianForm.emailId}
                    onChange={handleFormChange}
                    placeholder="Enter Email ID"
                    className={formErrors.emailId ? 'error' : ''}
                  />
                  {formErrors.emailId && <span className="field-error">{formErrors.emailId}</span>}
                </div>
                
                <div className="clinician-form-field">
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={clinicianForm.contactNumber}
                    onChange={handleFormChange}
                    placeholder="Enter Contact Number"
                    className={formErrors.contactNumber ? 'error' : ''}
                  />
                  {formErrors.contactNumber && <span className="field-error">{formErrors.contactNumber}</span>}
                </div>
                
                <div className="clinician-form-field">
                  <label>NPI Number</label>
                  <input
                    type="text"
                    name="npiNumber"
                    value={clinicianForm.npiNumber}
                    onChange={handleFormChange}
                    placeholder="Enter NPI Number"
                    maxLength="10"
                  />
                </div>
              </div>

              {/* Row 3: Work Locations, Languages Spoken, Supervising Clinician */}
              <div className="clinician-form-row">
                <div className="clinician-form-field">
                  <label>Work Locations</label>
                  <select
                    name="workLocations"
                    value={clinicianForm.workLocations}
                    onChange={handleFormChange}
                  >
                    <option value="">Select</option>
                    <option value="Georgetown">Georgetown</option>
                    <option value="Downtown">Downtown</option>
                    <option value="North Campus">North Campus</option>
                    <option value="South Campus">South Campus</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                
                <div className="clinician-form-field">
                  <label>Languages Spoken</label>
                  <select
                    name="languagesSpoken"
                    value={clinicianForm.languagesSpoken}
                    onChange={handleFormChange}
                  >
                    <option value="">Select</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Mandarin">Mandarin</option>
                    <option value="Multiple">Multiple Languages</option>
                  </select>
                </div>
                
                <div className="clinician-form-field">
                  <label>Supervising Clinician</label>
                  <select
                    name="supervisingClinician"
                    value={clinicianForm.supervisingClinician}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Supervising Clinician</option>
                    <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                    <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                    <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                    <option value="Dr. Robert Wilson">Dr. Robert Wilson</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>

              <div className="add-clinician-modal-actions">
                <button type="button" className="add-clinician-cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="add-clinician-save-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 