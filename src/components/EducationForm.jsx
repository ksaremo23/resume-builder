import React from 'react'

function EducationForm({ data, updateData }) {
  const addEducation = () => {
    updateData([
      ...data,
      {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: '',
      },
    ])
  }

  const updateEducation = (index, field, value) => {
    const updated = [...data]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    updateData(updated)
  }

  const removeEducation = (index) => {
    updateData(data.filter((_, i) => i !== index))
  }

  return (
    <div className="form-section-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 className="form-section-title" style={{ marginBottom: 0 }}>Education</h2>
        <button className="btn btn-primary" onClick={addEducation}>
          + Add Education
        </button>
      </div>

      {data.map((edu, index) => (
        <div key={index} className="item-card">
          <div className="item-header">
            <span className="item-title">Education #{index + 1}</span>
            <button
              className="btn btn-danger"
              onClick={() => removeEducation(index)}
              style={{ padding: '5px 10px', fontSize: '0.85rem' }}
            >
              Remove
            </button>
          </div>

          <div className="form-group">
            <label>Institution *</label>
            <input
              type="text"
              value={edu.institution || ''}
              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
              placeholder="University Name"
            />
          </div>

          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              value={edu.degree || ''}
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              placeholder="Bachelor's, Master's, etc."
            />
          </div>

          <div className="form-group">
            <label>Field of Study</label>
            <input
              type="text"
              value={edu.field || ''}
              onChange={(e) => updateEducation(index, 'field', e.target.value)}
              placeholder="Computer Science, Business, etc."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={edu.startDate || ''}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={edu.endDate || ''}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                disabled={edu.current}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={edu.current || false}
                onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              Currently studying
            </label>
          </div>

          <div className="form-group">
            <label>GPA (Optional)</label>
            <input
              type="text"
              value={edu.gpa || ''}
              onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
              placeholder="3.8/4.0"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default EducationForm

