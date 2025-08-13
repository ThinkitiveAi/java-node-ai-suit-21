import React, { useState } from 'react';
import './App.css';

export default function ProviderPatients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [patientForm, setPatientForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    preferredName: '',
    dateOfBirth: '',
    legalSex: '',
    genderIdentity: '',
    emailId: '',
    phoneNumber: '',
    ethnicity: '',
    race: '',
    preferredLanguage: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipcode: '',
    profilePicture: null
  });
  const [formErrors, setFormErrors] = useState({});
  
  // Mock patient data matching the image design
  const patients = [
    { 
      id: 1, 
      mrn: 'AS2456',
      name: 'Robert Fox', 
      dob: '1/31/14',
      email: 'tg03@example.com',
      phone: '(603) 555-0123',
      clinician: 'Theresa Webb (Psychiatrist)',
      memberSince: '6/21/19',
      paymentMethod: 'Self Pay',
      status: 'New'
    },
    { 
      id: 2, 
      mrn: 'SF5132',
      name: 'Eleanor Pena', 
      dob: '8/2/19',
      email: 'js02@example.com',
      phone: '(217) 555-0113',
      clinician: 'Kathryn Murphy (Custodian)',
      memberSince: '1/31/14',
      paymentMethod: 'United Healthcare',
      status: 'Active'
    },
    { 
      id: 3, 
      mrn: 'DF5686',
      name: 'Marvin McKinney', 
      dob: '1/28/17',
      email: 'js02@example.com',
      phone: '(208) 555-0112',
      clinician: 'Jacob Jones (Supervisor)',
      memberSince: '9/4/12',
      paymentMethod: 'United Healthcare',
      status: 'Discharged'
    },
    { 
      id: 4, 
      mrn: 'RT4521',
      name: 'Eleanor Pena', 
      dob: '8/16/13',
      email: 'sf08@example.com',
      phone: '(239) 555-0108',
      clinician: 'Eleanor Pena (Psychiatrist)',
      memberSince: '7/11/19',
      paymentMethod: 'Self Pay',
      status: 'Active'
    },
    { 
      id: 5, 
      mrn: 'HJ4586',
      name: 'Ralph Edwards', 
      dob: '7/11/19',
      email: 'tg03@example.com',
      phone: '(629) 555-0129',
      clinician: 'Marvin McKinney (Custodian)',
      memberSince: '7/27/13',
      paymentMethod: 'United Healthcare',
      status: 'Discharged'
    },
    { 
      id: 6, 
      mrn: 'KL7890',
      name: 'Sarah Johnson', 
      dob: '3/15/16',
      email: 'sj01@example.com',
      phone: '(415) 555-0101',
      clinician: 'Dr. Michael Chen (Cardiologist)',
      memberSince: '2/14/20',
      paymentMethod: 'Blue Cross Blue Shield',
      status: 'Active'
    },
    { 
      id: 7, 
      mrn: 'MN2345',
      name: 'David Wilson', 
      dob: '11/8/18',
      email: 'dw02@example.com',
      phone: '(312) 555-0102',
      clinician: 'Nurse Emily Davis (General)',
      memberSince: '5/3/21',
      paymentMethod: 'Aetna',
      status: 'New'
    },
    { 
      id: 8, 
      mrn: 'PQ6789',
      name: 'Lisa Anderson', 
      dob: '4/22/15',
      email: 'la03@example.com',
      phone: '(404) 555-0103',
      clinician: 'Dr. Sarah Johnson (Pediatrician)',
      memberSince: '8/12/19',
      paymentMethod: 'Cigna',
      status: 'Active'
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'new';
      case 'Active': return 'active';
      case 'Discharged': return 'discharged';
      default: return 'active';
    }
  };

  const handleAddPatient = () => {
    setShowAddPatientModal(true);
  };

  const handleCloseModal = () => {
    setShowAddPatientModal(false);
    setPatientForm({
      firstName: '',
      middleName: '',
      lastName: '',
      preferredName: '',
      dateOfBirth: '',
      legalSex: '',
      genderIdentity: '',
      emailId: '',
      phoneNumber: '',
      ethnicity: '',
      race: '',
      preferredLanguage: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipcode: '',
      profilePicture: null
    });
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPatientForm(prev => ({
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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPatientForm(prev => ({
        ...prev,
        profilePicture: file
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!patientForm.firstName.trim()) errors.firstName = 'First name is required';
    if (!patientForm.lastName.trim()) errors.lastName = 'Last name is required';
    if (!patientForm.dateOfBirth) errors.dateOfBirth = 'Date of birth is required';
    if (!patientForm.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    
    // Email validation if provided
    if (patientForm.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientForm.emailId)) {
      errors.emailId = 'Invalid email format';
    }
    
    // Phone validation
    if (patientForm.phoneNumber && !/^[\+]?[1-9][\d]{0,15}$/.test(patientForm.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      errors.phoneNumber = 'Invalid phone number format';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      // Here you would typically send the data to your backend
      console.log('Patient data:', patientForm);
      alert('Patient added successfully!');
      handleCloseModal();
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="provider-page">
      <div className="provider-page-header">
        <div className="provider-patients-header">
          <div className="provider-patients-title">
            <h1>Patients</h1>
            <span className="provider-patients-count">{patients.length}</span>
          </div>
          <div className="provider-patients-filters">
            <div className="provider-filter-dropdown">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="provider-filter-select"
              >
                <option value="name">Name</option>
                <option value="mrn">MRN</option>
                <option value="status">Status</option>
                <option value="memberSince">Member Since</option>
              </select>
            </div>
            <div className="provider-search-container">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="provider-search-input"
              />
            </div>
            <button className="provider-import-btn">
              <span>↑</span>
              Import Clients
            </button>
            <button className="provider-add-patient-btn" onClick={handleAddPatient}>
              <span>+</span>
              Add New Patient
            </button>
          </div>
        </div>
      </div>
      
      <div className="provider-patients-table-container">
        <table className="provider-patients-table">
          <thead>
            <tr>
              <th>MRN</th>
              <th>Patient Name</th>
              <th>DOB</th>
              <th>Email ID</th>
              <th>Contact Number</th>
              <th>Clinician</th>
              <th>Member Since</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td className="provider-mrn">{patient.mrn}</td>
                <td>
                  <div className="provider-patient-name">
                    <span className="provider-patient-name-text">{patient.name}</span>
                    <span className="provider-patient-info-icon">i</span>
                  </div>
                </td>
                <td>{patient.dob}</td>
                <td className="provider-patient-email">{patient.email}</td>
                <td>{patient.phone}</td>
                <td className="provider-clinician">{patient.clinician}</td>
                <td>{patient.memberSince}</td>
                <td className="provider-payment-method">{patient.paymentMethod}</td>
                <td>
                  <span className={`provider-patient-status ${getStatusColor(patient.status)}`}>
                    {patient.status}
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
      
      {filteredPatients.length === 0 && (
        <div className="provider-no-results">
          <p>No patients found matching your search criteria.</p>
        </div>
      )}

      {/* Add New Patient Modal */}
      {showAddPatientModal && (
        <div className="add-patient-modal">
          <div className="add-patient-modal-content">
            <div className="add-patient-modal-header">
              <h2>Patient Information</h2>
              <button className="add-patient-modal-close" onClick={handleCloseModal}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="add-patient-form">
              <div className="add-patient-profile-section">
                <div className="add-patient-profile-picture">
                  <div className="profile-picture-placeholder">
                    {patientForm.profilePicture ? (
                      <img 
                        src={URL.createObjectURL(patientForm.profilePicture)} 
                        alt="Profile" 
                        className="profile-picture-preview"
                      />
                    ) : (
                      <div className="profile-picture-icon">👤</div>
                    )}
                    <label className="profile-picture-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ display: 'none' }}
                      />
                      <span className="camera-icon">📷</span>
                    </label>
                  </div>
                </div>
                
                <div className="add-patient-form-fields">
                  {/* Row 1: Name Information */}
                  <div className="form-row">
                    <div className="form-field">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={patientForm.firstName}
                        onChange={handleFormChange}
                        placeholder="Enter First Name"
                        className={formErrors.firstName ? 'error' : ''}
                      />
                      {formErrors.firstName && <span className="field-error">{formErrors.firstName}</span>}
                    </div>
                    
                    <div className="form-field">
                      <label>Middle Name</label>
                      <input
                        type="text"
                        name="middleName"
                        value={patientForm.middleName}
                        onChange={handleFormChange}
                        placeholder="Enter Middle Name"
                      />
                    </div>
                    
                    <div className="form-field">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={patientForm.lastName}
                        onChange={handleFormChange}
                        placeholder="Enter Last Name"
                        className={formErrors.lastName ? 'error' : ''}
                      />
                      {formErrors.lastName && <span className="field-error">{formErrors.lastName}</span>}
                    </div>
                    
                    <div className="form-field">
                      <label>Preferred Name</label>
                      <input
                        type="text"
                        name="preferredName"
                        value={patientForm.preferredName}
                        onChange={handleFormChange}
                        placeholder="Enter Preferred Name"
                      />
                    </div>
                  </div>

                  {/* Row 2: Demographics & Contact */}
                  <div className="form-row">
                    <div className="form-field">
                      <label>Date Of Birth *</label>
                      <div className="date-input-wrapper">
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={patientForm.dateOfBirth}
                          onChange={handleFormChange}
                          className={formErrors.dateOfBirth ? 'error' : ''}
                        />
                        <span className="calendar-icon">📅</span>
                      </div>
                      {formErrors.dateOfBirth && <span className="field-error">{formErrors.dateOfBirth}</span>}
                    </div>
                    
                    <div className="form-field">
                      <label>Legal Sex</label>
                      <select
                        name="legalSex"
                        value={patientForm.legalSex}
                        onChange={handleFormChange}
                      >
                        <option value="">Select Legal Sex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-field">
                      <label>Gender Identity</label>
                      <select
                        name="genderIdentity"
                        value={patientForm.genderIdentity}
                        onChange={handleFormChange}
                      >
                        <option value="">Select Gender Identity</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-field">
                      <label>Email ID</label>
                      <input
                        type="email"
                        name="emailId"
                        value={patientForm.emailId}
                        onChange={handleFormChange}
                        placeholder="Enter Email ID"
                        className={formErrors.emailId ? 'error' : ''}
                      />
                      {formErrors.emailId && <span className="field-error">{formErrors.emailId}</span>}
                    </div>
                  </div>

                  {/* Row 3: More Demographics & Contact */}
                  <div className="form-row">
                    <div className="form-field">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={patientForm.phoneNumber}
                        onChange={handleFormChange}
                        placeholder="Enter Phone Number"
                        className={formErrors.phoneNumber ? 'error' : ''}
                      />
                      {formErrors.phoneNumber && <span className="field-error">{formErrors.phoneNumber}</span>}
                    </div>
                    
                    <div className="form-field">
                      <label>Ethnicity</label>
                      <select
                        name="ethnicity"
                        value={patientForm.ethnicity}
                        onChange={handleFormChange}
                      >
                        <option value="">Select Ethnicity</option>
                        <option value="hispanic">Hispanic or Latino</option>
                        <option value="not-hispanic">Not Hispanic or Latino</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    </div>
                    
                    <div className="form-field">
                      <label>Race</label>
                      <select
                        name="race"
                        value={patientForm.race}
                        onChange={handleFormChange}
                      >
                        <option value="">Select Race</option>
                        <option value="white">White</option>
                        <option value="black">Black or African American</option>
                        <option value="asian">Asian</option>
                        <option value="native">Native American</option>
                        <option value="pacific">Pacific Islander</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-field">
                      <label>Preferred Language</label>
                      <select
                        name="preferredLanguage"
                        value={patientForm.preferredLanguage}
                        onChange={handleFormChange}
                      >
                        <option value="">Select Preferred Language</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Address Line 1 & 2 */}
                  <div className="form-row">
                    <div className="form-field full-width">
                      <label>Address Line 1</label>
                      <input
                        type="text"
                        name="addressLine1"
                        value={patientForm.addressLine1}
                        onChange={handleFormChange}
                        placeholder="Enter Address Line 1"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-field full-width">
                      <label>Address Line 2</label>
                      <input
                        type="text"
                        name="addressLine2"
                        value={patientForm.addressLine2}
                        onChange={handleFormChange}
                        placeholder="Enter Address Line 2"
                      />
                    </div>
                  </div>

                  {/* Row 5: City, State, Zipcode */}
                  <div className="form-row">
                    <div className="form-field">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={patientForm.city}
                        onChange={handleFormChange}
                        placeholder="Enter City"
                      />
                    </div>
                    
                    <div className="form-field">
                      <label>State</label>
                      <select
                        name="state"
                        value={patientForm.state}
                        onChange={handleFormChange}
                      >
                        <option value="">Select State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>
                    
                    <div className="form-field">
                      <label>Zipcode</label>
                      <input
                        type="text"
                        name="zipcode"
                        value={patientForm.zipcode}
                        onChange={handleFormChange}
                        placeholder="Enter Zipcode"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="add-patient-modal-actions">
                <button type="button" className="add-patient-cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="add-patient-save-btn">
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 