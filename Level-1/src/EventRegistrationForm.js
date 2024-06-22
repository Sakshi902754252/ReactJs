import React, { useState } from 'react';
import './EventRegistrationForm.css'; // We'll create this CSS file

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid';
    }
    if (!formData.age) {
      tempErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      tempErrors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest && !formData.guestName) {
      tempErrors.guestName = 'Guest name is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="form-container">
      <h2>Event Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <div className="error-message">{errors.age}</div>}
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="attendingWithGuest"
              checked={formData.attendingWithGuest}
              onChange={handleChange}
            />
            Are you attending with a guest?
          </label>
        </div>

        {formData.attendingWithGuest && (
          <div className="form-group">
            <label htmlFor="guestName">Guest Name</label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              className={errors.guestName ? 'error' : ''}
            />
            {errors.guestName && <div className="error-message">{errors.guestName}</div>}
          </div>
        )}

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default EventRegistrationForm;