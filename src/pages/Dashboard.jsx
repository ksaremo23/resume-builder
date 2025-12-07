import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newResumeTitle, setNewResumeTitle] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!user) {
      navigate('/')
      return
    }
    setCurrentUser(user)
    loadResumes(user.id)
  }, [navigate])

  const loadResumes = (userId) => {
    const allResumes = JSON.parse(localStorage.getItem('allResumes') || '{}')
    const userResumes = allResumes[userId] || []
    setResumes(userResumes)
  }

  const saveResumes = (resumesList) => {
    if (!currentUser) return
    const allResumes = JSON.parse(localStorage.getItem('allResumes') || '{}')
    allResumes[currentUser.id] = resumesList
    localStorage.setItem('allResumes', JSON.stringify(allResumes))
    setResumes(resumesList)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    navigate('/')
  }

  const handleCreateResume = () => {
    if (!newResumeTitle.trim()) {
      alert('Please enter a resume title')
      return
    }

    const newResume = {
      id: Date.now().toString(),
      userId: currentUser.id,
      title: newResumeTitle.trim(),
      createdAt: new Date().toISOString(),
      data: {
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
      },
    }

    const updatedResumes = [...resumes, newResume]
    saveResumes(updatedResumes)
    setShowCreateModal(false)
    setNewResumeTitle('')
    navigate(`/resume/${newResume.id}`)
  }

  const handleDeleteResume = (id, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const updatedResumes = resumes.filter((resume) => resume.id !== id)
      saveResumes(updatedResumes)
    }
  }

  const handleResumeClick = (id) => {
    navigate(`/resume/${id}`)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">Logo</div>
        <div className="header-right">
          <button className="dashboard-btn" onClick={() => navigate('/')}>
            Home
          </button>
          {currentUser && (
            <span className="user-name">{currentUser.name}</span>
          )}
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            Logout
          </button>
          <div className="user-icon">
            {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'G'}
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <h1 className="dashboard-title">My Resume</h1>
        <p className="dashboard-subtitle">Start Creating AI resume to your next Job role</p>

        <div className="resume-cards">
          <div className="resume-card new-card" onClick={() => setShowCreateModal(true)}>
            <div className="plus-icon">+</div>
          </div>

          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="resume-card"
              onClick={() => handleResumeClick(resume.id)}
            >
              <div className="card-illustration">
                <div className="illustration-person"></div>
                <div className="illustration-doc"></div>
                <div className="illustration-pen"></div>
              </div>
              <div
                className="card-footer"
                style={{
                  background: resume.data.themeColor || '#667eea',
                }}
              >
                <span className="card-title">{resume.title}</span>
                <button
                  className="card-menu"
                  onClick={(e) => handleDeleteResume(resume.id, e)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowCreateModal(false)}
            >
              ×
            </button>
            <h2 className="modal-title">Create New Resume</h2>
            <p className="modal-subtitle">Add a title for your new resume.</p>
            <input
              type="text"
              className="modal-input"
              placeholder="Ex. Full Stack resume"
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateResume()
                }
              }}
              autoFocus
            />
            <div className="modal-buttons">
              <button
                className="modal-btn cancel"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button className="modal-btn create" onClick={handleCreateResume}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

