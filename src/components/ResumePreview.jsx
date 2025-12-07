import React, { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import './ResumePreview.css'

function ResumePreview({ resumeData }) {
  const resumeRef = useRef(null)
  const themeColor = resumeData.themeColor || '#667eea'

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const downloadPDF = async () => {
    const element = resumeRef.current
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}-resume.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  return (
    <div className="resume-preview">
      <div className="preview-header">
        <h2>Preview</h2>
        <button className="btn btn-primary" onClick={downloadPDF}>
          📥 Download PDF
        </button>
      </div>

      <div className="resume-document" ref={resumeRef} style={{ '--theme-color': themeColor }}>
        <div className="resume-header" style={{ borderBottomColor: themeColor }}>
          <h1 className="resume-name" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="resume-contact">
            {resumeData.personalInfo.email && (
              <span>📧 {resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span>📱 {resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.address && (
              <span>📍 {resumeData.personalInfo.address}</span>
            )}
            {resumeData.personalInfo.linkedin && (
              <span>
                <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: themeColor }}>
                  LinkedIn
                </a>
              </span>
            )}
            {resumeData.personalInfo.github && (
              <span>
                <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" style={{ color: themeColor }}>
                  GitHub
                </a>
              </span>
            )}
            {resumeData.personalInfo.website && (
              <span>
                <a href={resumeData.personalInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: themeColor }}>
                  Website
                </a>
              </span>
            )}
          </div>
        </div>

        {resumeData.summary && (
          <div className="resume-section">
            <h2 className="section-title" style={{ color: themeColor, borderBottomColor: themeColor }}>Professional Summary</h2>
            <div 
              className="section-content" 
              dangerouslySetInnerHTML={{ __html: resumeData.summary }}
            />
          </div>
        )}

        {resumeData.experience.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title" style={{ color: themeColor, borderBottomColor: themeColor }}>Work Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="item-header-row">
                  <div>
                    <h3 className="item-title">{exp.position || 'Position'}</h3>
                    <p className="item-company">{exp.company || 'Company'}</p>
                  </div>
                  <div className="item-date">
                    {exp.startDate && formatDate(exp.startDate)} -{' '}
                    {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </div>
                </div>
                {exp.description && (
                  <div 
                    className="item-description" 
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {resumeData.education.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title" style={{ color: themeColor, borderBottomColor: themeColor }}>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="item-header-row">
                  <div>
                    <h3 className="item-title">
                      {edu.degree && edu.field
                        ? `${edu.degree} in ${edu.field}`
                        : edu.degree || edu.field || 'Degree'}
                    </h3>
                    <p className="item-company">{edu.institution || 'Institution'}</p>
                  </div>
                  <div className="item-date">
                    {edu.startDate && formatDate(edu.startDate)} -{' '}
                    {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : ''}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {resumeData.skills.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title" style={{ color: themeColor, borderBottomColor: themeColor }}>Skills</h2>
            <div className="skills-list">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="skill-tag" style={{ background: themeColor }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {resumeData.projects.length > 0 && (
          <div className="resume-section">
            <h2 className="section-title" style={{ color: themeColor, borderBottomColor: themeColor }}>Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="item-header-row">
                  <h3 className="item-title">
                    {project.name || 'Project Name'}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        🔗
                      </a>
                    )}
                  </h3>
                </div>
                {project.description && (
                  <p className="item-description">{project.description}</p>
                )}
                {project.technologies && (
                  <p className="project-tech">
                    <strong>Technologies:</strong> {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumePreview

