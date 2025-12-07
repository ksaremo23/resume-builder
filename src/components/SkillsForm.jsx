import React, { useState } from 'react'

function SkillsForm({ data, updateData }) {
  const [skillInput, setSkillInput] = useState('')

  const addSkill = () => {
    if (skillInput.trim()) {
      updateData([...data, skillInput.trim()])
      setSkillInput('')
    }
  }

  const removeSkill = (index) => {
    updateData(data.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="form-section-container">
      <h2 className="form-section-title">Skills</h2>
      
      <div className="form-group">
        <label>Add Skill</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, Python, React"
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" onClick={addSkill}>
            Add
          </button>
        </div>
      </div>

      {data.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
          {data.map((skill, index) => (
            <div
              key={index}
              style={{
                background: '#667eea',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
              }}
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SkillsForm

