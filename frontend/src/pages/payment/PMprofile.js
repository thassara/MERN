import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../compoments/Payment/Sidebar'; // Corrected 'compoments' to 'components'
import '../../style/payment/Profile.css'; 
import backgroundImage from '../../images/Pmangbackground.jpg'; // Ensure this path is correct



const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    id: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8070/PMprofiles/all');
        const profileData = response.data[0];
        setFormData({ ...profileData, id: profileData._id });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile data.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) {
      errors.name = 'Name is required.';
    }

    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format.';
    }

    if (!formData.phone) {
      errors.phone = 'Phone number is required.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:8070/PMprofiles/update/${formData.id}`, formData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/PMprofiles/delete/${formData.id}`);
      setFormData({ name: '', email: '', phone: '', password: '', id: '' });
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile.');
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.profileContent}>
        {error && <div style={styles.error}>{error}</div>}
        <h1 style={styles.profileTitle}>Profile</h1>

        <div style={styles.profileImageContainer}>
          <div style={styles.imagePlaceholder}>Profile Image</div>
        </div>

        <div style={styles.profileDetails}>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.editButton} onClick={() => setIsModalOpen(true)}>Edit Profile</button>
          <button style={{ ...styles.button, ...styles.deleteButton }} onClick={handleDelete}>Delete Profile</button>
        </div>

        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2 style={styles.modalTitle}>Edit Profile</h2>
              <form onSubmit={handleUpdate} style={styles.form}>
                <label style={styles.label}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                {validationErrors.name && <div style={styles.error}>{validationErrors.name}</div>}

                <label style={styles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                {validationErrors.email && <div style={styles.error}>{validationErrors.email}</div>}

                <label style={styles.label}>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                {validationErrors.phone && <div style={styles.error}>{validationErrors.phone}</div>}

                <label style={styles.label}>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                {validationErrors.password && <div style={styles.error}>{validationErrors.password}</div>}

                <div style={styles.buttonContainer}>
                  <button type="submit" style={{ ...styles.button, ...styles.saveButton }}>Save Changes</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={styles.cancelButton}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles for the Profile component
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  profileContent: {
    flex: 1,
    padding: '40px',
    marginLeft: '250px',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    color: '#333', // Set text color
  },
  profileTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '20px',
    textAlign: 'center',
  },
  profileImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  imagePlaceholder: {
    width: '150px',
    height: '150px',
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#777',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: '2px dashed #ccc',
  },
  profileDetails: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'transparent', // Keep background transparent
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    color: 'white', // Set text color to white
  },
  profileText: {
    color: '#fff', // Ensure profile text is white
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  editButton: {
    backgroundColor: '#007bff', // Blue for edit button
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
  },
  saveButton: {
    backgroundColor: '#388e3c',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#333',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)', // Optional: Apply blur effect to modal content as well
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for modal content
  },
  modalTitle: {
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginBottom: '10px',
  },
};

export default Profile;
