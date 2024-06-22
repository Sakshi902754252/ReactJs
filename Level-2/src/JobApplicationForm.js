import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './JobApplicationForm.css';

const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(values => ({
      ...values,
      [name]: type === 'checkbox' ? {
        ...values[name],
        [value]: checked
      } : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      console.log("Form Submitted Successfully", values);
    } else {
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, values]);

  return { values, errors, isSubmitting, handleChange, handleSubmit, setValues };
};

const JobApplicationForm = () => {
  const initialState = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    preferredInterviewTime: null,
  };

  const validate = (values) => {
    let errors = {};
    if (!values.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if (!values.position) errors.position = 'Position is required';
    if ((values.position === 'Developer' || values.position === 'Designer') && (!values.relevantExperience || parseFloat(values.relevantExperience) <= 0)) {
      errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
    }
    if (values.position === 'Designer' && (!values.portfolioURL || !/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioURL))) {
      errors.portfolioURL = 'Portfolio URL must be a valid URL';
    }
    if (values.position === 'Manager' && !values.managementExperience.trim()) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (!Object.values(values.additionalSkills).some(skill => skill)) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }
    return errors;
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit, setValues } = useForm(initialState, validate);

  const handleDateChange = (date) => {
    setValues({ ...values, preferredInterviewTime: date });
  };

  return (
    <div className="job-application-container">
      <h1>Job Application Form</h1>
      {isSubmitting && Object.keys(errors).length === 0 ? (
        <div className="summary">
          <h2>Application Submitted Successfully</h2>
          <h3>Summary of your application:</h3>
          <p><strong>Full Name:</strong> {values.fullName}</p>
          <p><strong>Email:</strong> {values.email}</p>
          <p><strong>Phone Number:</strong> {values.phoneNumber}</p>
          <p><strong>Position:</strong> {values.position}</p>
          {(values.position === 'Developer' || values.position === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {values.relevantExperience} years</p>
          )}
          {values.position === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {values.portfolioURL}</p>
          )}
          {values.position === 'Manager' && (
            <p><strong>Management Experience:</strong> {values.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {Object.entries(values.additionalSkills)
            .filter(([, value]) => value)
            .map(([key]) => key)
            .join(', ')}
          </p>
          <p><strong>Preferred Interview Time:</strong> {values.preferredInterviewTime.toLocaleString()}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="position">Applying for Position</label>
            <select 
              id="position"
              name="position" 
              value={values.position} 
              onChange={handleChange}
              className={errors.position ? 'error' : ''}
            >
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.position && <div className="error-message">{errors.position}</div>}
          </div>

          {(values.position === 'Developer' || values.position === 'Designer') && (
            <div className="form-group">
              <label htmlFor="relevantExperience">Relevant Experience (years)</label>
              <input
                type="number"
                id="relevantExperience"
                name="relevantExperience"
                value={values.relevantExperience}
                onChange={handleChange}
                className={errors.relevantExperience ? 'error' : ''}
              />
              {errors.relevantExperience && (
                <div className="error-message">{errors.relevantExperience}</div>
              )}
            </div>
          )}

          {values.position === 'Designer' && (
            <div className="form-group">
              <label htmlFor="portfolioURL">Portfolio URL</label>
              <input
                type="url"
                id="portfolioURL"
                name="portfolioURL"
                value={values.portfolioURL}
                onChange={handleChange}
                className={errors.portfolioURL ? 'error' : ''}
              />
              {errors.portfolioURL && <div className="error-message">{errors.portfolioURL}</div>}
            </div>
          )}

          {values.position === 'Manager' && (
            <div className="form-group">
              <label htmlFor="managementExperience">Management Experience</label>
              <textarea
                id="managementExperience"
                name="managementExperience"
                value={values.managementExperience}
                onChange={handleChange}
                className={errors.managementExperience ? 'error' : ''}
              />
              {errors.managementExperience && (
                <div className="error-message">{errors.managementExperience}</div>
              )}
            </div>
          )}

          <div className="form-group">
            <label>Additional Skills</label>
            <div className="checkbox-group">
              {Object.keys(values.additionalSkills).map((skill) => (
                <label key={skill} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="additionalSkills"
                    value={skill}
                    checked={values.additionalSkills[skill]}
                    onChange={handleChange}
                  />
                  {skill}
                </label>
              ))}
            </div>
            {errors.additionalSkills && <div className="error-message">{errors.additionalSkills}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="preferredInterviewTime">Preferred Interview Time</label>
            <DatePicker
              id="preferredInterviewTime"
              selected={values.preferredInterviewTime}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className={errors.preferredInterviewTime ? 'error' : ''}
            />
            {errors.preferredInterviewTime && (
              <div className="error-message">{errors.preferredInterviewTime}</div>
            )}
          </div>

          <button type="submit" className="submit-btn">Submit Application</button>
        </form>
      )}
    </div>
  );
};

export default JobApplicationForm;
