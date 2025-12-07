import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModal from '../components/AuthModal'
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleGetStarted = () => {
    setShowAuthModal(true)
  }

  const handleAuthSuccess = (user) => {
    setShowAuthModal(false)
    navigate('/dashboard')
  }

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo">Logo</div>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>

      <main className="landing-main">
        <div className="banner">
          <span className="banner-text">New Tubeguruji.com All new Apps &gt;</span>
        </div>

        <div className="hero-section">
          <h1 className="hero-title">
            Build Your Resume <span className="highlight">With AI</span>
          </h1>
          <p className="hero-subtitle">
            Effortlessly Craft a Standout Resume with Our AI-Powered Builder
          </p>

          <div className="cta-buttons">
            <button className="cta-primary" onClick={handleGetStarted}>
              Get Started →
            </button>
            <button className="cta-secondary">
              <span className="play-icon">▶</span> Watch video
            </button>
          </div>
        </div>

        <div className="featured-section">
          <h3 className="featured-title">FEATURED IN</h3>
          <div className="featured-logos">
            <div className="logo-item">
              <div className="logo-icon youtube">▶</div>
              <span>YouTube</span>
            </div>
            <div className="logo-item">
              <div className="logo-icon producthunt">P</div>
              <span>Product Hunt</span>
            </div>
            <div className="logo-item">
              <div className="logo-icon reddit">r</div>
              <span>reddit</span>
            </div>
          </div>
        </div>

        <div className="how-it-works">
          <h2 className="how-title">How it Works?</h2>
          <p className="how-subtitle">Give mock interview in just 3 simple easy steps</p>
        </div>
      </main>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  )
}

export default LandingPage

