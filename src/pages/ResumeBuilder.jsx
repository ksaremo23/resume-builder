import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ResumeForm from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'
import ThemeColorPicker from '../components/ThemeColorPicker'
import './ResumeBuilder.css'

function ResumeBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    themeColor: '#667eea',
  })
  const [activeTab, setActiveTab] = useState('home')
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (user) {
      setCurrentUser(user)
    }
    loadResume()
  }, [id])

  const loadResume = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!currentUser) {
      navigate('/')
      return
    }

    const allResumes = JSON.parse(localStorage.getItem('allResumes') || '{}')
    const userResumes = allResumes[currentUser.id] || []
    const resume = userResumes.find((r) => r.id === id)
    
    if (resume) {
      setResumeData({
        ...resume.data,
        themeColor: resume.data.themeColor || '#667eea',
      })
    }
  }

  const saveResume = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!currentUser) {
      navigate('/')
      return
    }

    const allResumes = JSON.parse(localStorage.getItem('allResumes') || '{}')
    const userResumes = allResumes[currentUser.id] || []
    const updatedResumes = userResumes.map((resume) =>
      resume.id === id
        ? { ...resume, data: resumeData }
        : resume
    )
    allResumes[currentUser.id] = updatedResumes
    localStorage.setItem('allResumes', JSON.stringify(allResumes))
    alert('Resume saved successfully!')
  }

  const updateResumeData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleThemeChange = (color) => {
    setResumeData((prev) => ({
      ...prev,
      themeColor: color,
    }))
    setShowThemePicker(false)
  }

  return (
    <div className="resume-builder-page">
      <header className="builder-header">
        <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          Logo
        </div>
        <div className="header-right">
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
          <div className="user-icon">
            {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'G'}
          </div>
        </div>
      </header>

      <div className="builder-container">
        <div className="builder-sidebar">
          <div className="sidebar-tabs">
            <button
              className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <span className="tab-icon">🏠</span>
              <span>Home</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'theme' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('theme')
                setShowThemePicker(true)
              }}
            >
              <span className="tab-icon">🎨</span>
              <span>Theme</span>
            </button>
          </div>

          {activeTab === 'home' && (
            <div className="form-section">
              <ResumeForm
                resumeData={resumeData}
                updateResumeData={updateResumeData}
              />
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="theme-section">
              <ThemeColorPicker
                selectedColor={resumeData.themeColor}
                onColorSelect={handleThemeChange}
              />
            </div>
          )}

          <div className="save-button-container">
            <button className="save-btn" onClick={saveResume}>
              💾 Save
            </button>
          </div>
        </div>

        <div className="preview-section">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder

