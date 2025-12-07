import OpenAI from 'openai';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse request body
    const body = req.body || {};
    const { prompt, type = 'summary', context = '' } = body;

    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid request',
        message: 'Prompt is required and must be a string'
      });
    }

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set');
      return res.status(500).json({ 
        error: 'Configuration error',
        message: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your Vercel environment variables.'
      });
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Build prompts based on type
    let systemPrompt = '';
    let userPrompt = prompt;

    if (type === 'summary') {
      systemPrompt = 'You are a professional resume writer. Generate a compelling professional summary for a resume. Keep it concise (2-3 sentences) and highlight key achievements, skills, and career objectives. Format it as HTML with proper paragraph tags (<p>). Do not use bullet points.';
      if (context) {
        userPrompt = `Generate a professional summary for someone with the following background: ${context}. ${prompt}`;
      }
    } else if (type === 'experience') {
      systemPrompt = 'You are a professional resume writer. Generate work experience bullet points for a resume. Format as an HTML unordered list with <ul> and <li> tags. Each bullet should start with a strong action verb and be achievement-focused with quantifiable results when possible. Create 4-6 bullet points.';
      if (context) {
        userPrompt = `Generate work experience bullet points for: ${context}. ${prompt}`;
      }
    } else {
      systemPrompt = 'You are a professional resume writer. Generate professional resume content. Format as HTML with appropriate tags.';
      if (context) {
        userPrompt = `Context: ${context}. ${prompt}`;
      }
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      return res.status(500).json({ 
        error: 'Invalid response',
        message: 'OpenAI API returned an empty response'
      });
    }

    return res.status(200).json({ 
      content: generatedContent,
      success: true
    });

  } catch (error) {
    console.error('OpenAI API Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      response: error.response?.data
    });

    // Provide more specific error messages
    let errorMessage = 'Failed to generate content';
    let statusCode = 500;

    if (error.response) {
      // OpenAI API error
      errorMessage = error.response.data?.error?.message || error.message;
      statusCode = error.response.status || 500;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return res.status(statusCode).json({ 
      error: 'Generation failed',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
