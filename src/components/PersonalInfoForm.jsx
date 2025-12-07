import React from 'react'

function PersonalInfoForm({ data, updateData }) {
  const handleChange = (field, value) => {
    updateData({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="form-section-container">
      <h2 className="form-section-title">Personal Information</h2>
      
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          value={data.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="John Doe"
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john.doe@email.com"
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={data.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="City, State, Country"
        />
      </div>

      <div className="form-group">
        <label>LinkedIn</label>
        <input
          type="url"
          value={data.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>

      <div className="form-group">
        <label>GitHub</label>
        <input
          type="url"
          value={data.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
          placeholder="https://github.com/johndoe"
        />
      </div>

      <div className="form-group">
        <label>Website/Portfolio</label>
        <input
          type="url"
          value={data.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="https://johndoe.com"
        />
      </div>
    </div>
  )
}

export default PersonalInfoForm

