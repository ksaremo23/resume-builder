# OpenAI API Integration Setup

## Prerequisites

1. Get your OpenAI API key from: https://platform.openai.com/api-keys
2. Create an account if you don't have one

## Local Development Setup

1. Create a `.env.local` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
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
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environment**: Production, Preview, and Development (select all)
4. Click **Save**
5. Redeploy your application for the changes to take effect

## How It Works

- The AI generation feature is available in:
  - **Professional Summary** section
  - **Work Experience Description** section

- Click the "✨ Generate from AI" button to automatically generate content
- The AI uses context from your resume data to generate relevant content
- Generated content is formatted as HTML and can be edited further

## API Route

The OpenAI API is called through a secure serverless function at `/api/generate-content` which:
- Keeps your API key secure (never exposed to the frontend)
- Handles CORS properly
- Provides error handling
- Uses GPT-3.5-turbo model for cost-effectiveness

## Cost Considerations

- OpenAI charges based on token usage
- GPT-3.5-turbo is cost-effective for this use case
- Monitor your usage at: https://platform.openai.com/usage

