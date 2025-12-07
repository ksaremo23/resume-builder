import React from 'react'
import RichTextEditor from './RichTextEditor'

function SummaryForm({ data, updateData }) {
  return (
    <div className="form-section-container">
      <h2 className="form-section-title">Professional Summary</h2>
      <div className="form-group">
        <label>Summary</label>
        <RichTextEditor
          value={data || ''}
          onChange={updateData}
          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          showAIGenerate={true}
          aiType="summary"
        />
      </div>
    </div>
  )
}

export default SummaryForm

