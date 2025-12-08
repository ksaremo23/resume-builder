# Groq API Integration Setup

## Prerequisites

1. Get your Groq API key from: https://console.groq.com/keys
2. Create an account if you don't have one (it's free!)

## Local Development Setup

1. Create a `.env.local` file in the root directory:
```
GROQ_API_KEY=your_groq_api_key_here
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. For local development with Vercel, install Vercel CLI:
```bash
npm i -g vercel
```

4. Run the development server:
```bash
npm run dev
```

## Vercel Deployment Setup

1. After deploying to Vercel, go to your project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your Groq API key (starts with `gsk_`)
   - **Environment**: Production, Preview, and Development (select all)
4. Click **Save**
5. **Redeploy** your application for the changes to take effect

## How It Works

- The AI generation feature is available in:
  - **Professional Summary** section
  - **Work Experience Description** section

- Click the "✨ Generate from AI" button to automatically generate content
- The AI uses context from your resume data to generate relevant content
- Generated content is formatted as HTML and can be edited further

## API Route

The Groq API is called through a secure serverless function at `/api/generate-content` which:
- Keeps your API key secure (never exposed to the frontend)
- Handles CORS properly
- Provides error handling
- Uses Groq's fast `llama-3.1-70b-versatile` model

## Why Groq?

- **Free**: Groq offers free API access with generous rate limits
- **Fast**: Ultra-fast inference speeds
- **OpenAI-Compatible**: Uses the same API format, making integration easy
- **Powerful**: Uses state-of-the-art Llama models

## Cost Considerations

- Groq offers free tier with generous limits
- No credit card required for basic usage
- Monitor your usage at: https://console.groq.com/

