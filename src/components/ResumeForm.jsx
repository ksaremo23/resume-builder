import React from 'react'
import PersonalInfoForm from './PersonalInfoForm'
import SummaryForm from './SummaryForm'
import ExperienceForm from './ExperienceForm'
import EducationForm from './EducationForm'
import SkillsForm from './SkillsForm'
import ProjectsForm from './ProjectsForm'
import './ResumeForm.css'

function ResumeForm({ resumeData, updateResumeData }) {
  return (
    <div className="resume-form">
      <PersonalInfoForm
        data={resumeData.personalInfo}
        updateData={(data) => updateResumeData('personalInfo', data)}
      />
      
      <SummaryForm
        data={resumeData.summary}
        updateData={(data) => updateResumeData('summary', data)}
      />
      
      <ExperienceForm
        data={resumeData.experience}
        updateData={(data) => updateResumeData('experience', data)}
      />
      
      <EducationForm
        data={resumeData.education}
        updateData={(data) => updateResumeData('education', data)}
      />
      
      <SkillsForm
        data={resumeData.skills}
        updateData={(data) => updateResumeData('skills', data)}
      />
      
      <ProjectsForm
        data={resumeData.projects}
        updateData={(data) => updateResumeData('projects', data)}
      />
    </div>
  )
}

export default ResumeForm

