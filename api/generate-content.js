import OpenAI from 'openai';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (parseError) {
      return res.status(400).json({ error: 'Invalid JSON in request body' });
    }

    const { prompt, type, context } = body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required', message: 'Prompt is required' });
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return res.status(500).json({ 
        error: 'OpenAI API key not configured',
        message: 'Please configure OPENAI_API_KEY environment variable in Vercel settings'
      });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create different prompts based on type
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

    const generatedContent = completion.choices[0].message.content;

    return res.status(200).json({ content: generatedContent });
  } catch (error) {
    console.error('OpenAI API error:', error);
    const errorMessage = error.message || 'Unknown error occurred';
    return res.status(500).json({ 
      error: 'Failed to generate content',
      message: errorMessage,
      details: error.response?.data || null
    });
  }
}

