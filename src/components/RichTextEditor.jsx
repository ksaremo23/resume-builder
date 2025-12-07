import React, { useRef, useEffect, useState } from 'react'
import './RichTextEditor.css'
import { generateAIContent } from '../services/openaiService'

function RichTextEditor({ value, onChange, placeholder, showAIGenerate = false, onAIGenerate, aiType = 'summary', aiContext = '' }) {
  const editorRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
  }

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const isActive = (command) => {
    return document.queryCommandState(command)
  }

  const handleAIGenerate = async () => {
    if (onAIGenerate) {
      onAIGenerate()
      return
    }

    setIsGenerating(true)
    try {
      // Create a prompt based on the placeholder and context
      let prompt = placeholder || 'Generate professional resume content'
      
      // If there's existing content, use it as context
      if (value && value.trim()) {
        prompt = `Based on this existing content, enhance or expand it: ${value}. ${prompt}`
      }

      const generatedContent = await generateAIContent(prompt, aiType, aiContext)
      
      // Update the editor with generated content
      if (editorRef.current) {
        editorRef.current.innerHTML = generatedContent
        onChange(generatedContent)
      }
    } catch (error) {
      console.error('AI generation error:', error)
      alert(`Failed to generate content: ${error.message || 'Please check your OpenAI API key configuration'}`)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            className={`toolbar-btn ${isActive('bold') ? 'active' : ''}`}
            onClick={() => execCommand('bold')}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className={`toolbar-btn ${isActive('italic') ? 'active' : ''}`}
            onClick={() => execCommand('italic')}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className={`toolbar-btn ${isActive('underline') ? 'active' : ''}`}
            onClick={() => execCommand('underline')}
            title="Underline"
          >
            <u>U</u>
          </button>
        </div>
        
        <div className="toolbar-group">
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => execCommand('insertUnorderedList')}
            title="Bullet List"
          >
            <span className="icon-bullet">•</span>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => execCommand('insertOrderedList')}
            title="Numbered List"
          >
            <span className="icon-numbered">1.</span>
          </button>
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => {
              const url = prompt('Enter URL:')
              if (url) execCommand('createLink', url)
            }}
            title="Insert Link"
          >
            <span className="icon-link">🔗</span>
          </button>
        </div>

        {showAIGenerate && (
          <div className="toolbar-group ai-group">
            <button
              type="button"
              className={`toolbar-btn ai-btn ${isGenerating ? 'loading' : ''}`}
              onClick={handleAIGenerate}
              disabled={isGenerating}
              title="Generate from AI"
            >
              <span className="ai-icon">
                {isGenerating ? '⏳' : '✨'}
              </span>
              {isGenerating ? 'Generating...' : 'Generate from AI'}
            </button>
          </div>
        )}
      </div>
      
      <div
        ref={editorRef}
        className={`editor-content ${isFocused ? 'focused' : ''}`}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
    </div>
  )
}

export default RichTextEditor

