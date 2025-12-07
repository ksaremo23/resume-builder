import React from 'react'

function ProjectsForm({ data, updateData }) {
  const addProject = () => {
    updateData([
      ...data,
      {
        name: '',
        description: '',
        technologies: '',
        link: '',
      },
    ])
  }

  const updateProject = (index, field, value) => {
    const updated = [...data]
    updated[index] = {
      ...updated[index],
      [field]: value,
    }
    updateData(updated)
  }

  const removeProject = (index) => {
    updateData(data.filter((_, i) => i !== index))
  }

  return (
    <div className="form-section-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 className="form-section-title" style={{ marginBottom: 0 }}>Projects</h2>
        <button className="btn btn-primary" onClick={addProject}>
          + Add Project
        </button>
      </div>

      {data.map((project, index) => (
        <div key={index} className="item-card">
          <div className="item-header">
            <span className="item-title">Project #{index + 1}</span>
            <button
              className="btn btn-danger"
              onClick={() => removeProject(index)}
              style={{ padding: '5px 10px', fontSize: '0.85rem' }}
            >
              Remove
            </button>
          </div>

          <div className="form-group">
            <label>Project Name *</label>
            <input
              type="text"
              value={project.name || ''}
              onChange={(e) => updateProject(index, 'name', e.target.value)}
              placeholder="Project Name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={project.description || ''}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              placeholder="Describe your project..."
            />
          </div>

          <div className="form-group">
            <label>Technologies</label>
            <input
              type="text"
              value={project.technologies || ''}
              onChange={(e) => updateProject(index, 'technologies', e.target.value)}
              placeholder="React, Node.js, MongoDB, etc."
            />
          </div>

          <div className="form-group">
            <label>Project Link</label>
            <input
              type="url"
              value={project.link || ''}
              onChange={(e) => updateProject(index, 'link', e.target.value)}
              placeholder="https://project-link.com"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsForm

