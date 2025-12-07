export const generateAIContent = async (prompt, type = 'summary', context = '') => {
  try {
    const response = await fetch('/api/generate-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, type, context }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const errorMessage = errorData.message || errorData.error || 'Failed to generate content';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.content) {
      throw new Error('No content received from API');
    }
    
    return data.content;
  } catch (error) {
    console.error('Error generating AI content:', error);
    
    // Provide more helpful error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Network error: Please check your internet connection and try again');
    }
    
    throw error;
  }
};

