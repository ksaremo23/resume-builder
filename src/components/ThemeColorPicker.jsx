import React from 'react'
import './ThemeColorPicker.css'

function ThemeColorPicker({ selectedColor, onColorSelect }) {
  const colors = [
    '#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a',
    '#fee140', '#30cfd0', '#330867', '#ff6b6b', '#4ecdc4',
    '#45b7d1', '#f093fb', '#4facfe', '#00f2fe', '#fa709a',
    '#fee140', '#a8edea', '#fed6e3', '#ff9a9e', '#fecfef',
    '#ffecd2', '#fcb69f', '#ff8a80', '#ea4c89', '#0066cc'
  ]

  return (
    <div className="theme-color-picker">
      <h3 className="picker-title">Select Theme Color</h3>
      <div className="color-grid">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
            style={{ background: color }}
            onClick={() => onColorSelect(color)}
            title={color}
          />
        ))}
      </div>
    </div>
  )
}

export default ThemeColorPicker

