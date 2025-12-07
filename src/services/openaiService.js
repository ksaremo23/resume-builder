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
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate content');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating AI content:', error);
    throw error;
  }
};

