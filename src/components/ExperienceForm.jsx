import React from 'react'
import RichTextEditor from './RichTextEditor'

function ExperienceForm({ data, updateData }) {
  const addExperience = () => {
    updateData([
      ...data,
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ])
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    updateData(updated)
  }

  const removeExperience = (index) => {
    updateData(data.filter((_, i) => i !== index))
  }

  return (
    <div className="form-section-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 className="form-section-title" style={{ marginBottom: 0 }}>Work Experience</h2>
        <button className="btn btn-primary" onClick={addExperience}>
          + Add Experience
        </button>
      </div>

      {data.map((exp, index) => (
        <div key={index} className="item-card">
          <div className="item-header">
            <span className="item-title">Experience #{index + 1}</span>
            <button
              className="btn btn-danger"
              onClick={() => removeExperience(index)}
              style={{ padding: '5px 10px', fontSize: '0.85rem' }}
            >
              Remove
            </button>
          </div>

          <div className="form-group">
            <label>Company *</label>
            <input
              type="text"
              value={exp.company || ''}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
              placeholder="Company Name"
            />
          </div>

          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              value={exp.position || ''}
              onChange={(e) => updateExperience(index, 'position', e.target.value)}
              placeholder="Job Title"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.startDate || ''}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={exp.endDate || ''}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                disabled={exp.current}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={exp.current || false}
                onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                style={{ marginRight: '5px' }}
              />
              Currently working here
            </label>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <label>Description</label>
            </div>
            <RichTextEditor
              value={exp.description || ''}
              onChange={(html) => updateExperience(index, 'description', html)}
              placeholder="Describe your responsibilities and achievements..."
              showAIGenerate={true}
              aiType="experience"
              aiContext={exp.position && exp.company ? `${exp.position} at ${exp.company}` : exp.position || exp.company || ''}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExperienceForm

