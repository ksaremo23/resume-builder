# Troubleshooting OpenAI API Integration

## Current Error: 500 Internal Server Error

If you're getting a 500 error when clicking "Generate from AI", follow these steps:

## Step 1: Verify API Route is Working

1. After Vercel redeploys, test the API endpoint:
   - Go to: `https://resume-builder-psi-sandy.vercel.app/api/test`
   - You should see a JSON response with `"message": "API is working!"`
   - Check if `hasOpenAIKey` is `true` or `false`

## Step 2: Check Environment Variable in Vercel

1. Go to your Vercel Dashboard
2. Select your project: `resume-builder`
3. Go to **Settings** → **Environment Variables**
4. Verify `OPENAI_API_KEY` exists:
   - ✅ Name: `OPENAI_API_KEY`
   - ✅ Value: Your OpenAI API key (starts with `sk-`)
   - ✅ Environments: All three checked (Production, Preview, Development)

## Step 3: Check Vercel Function Logs

1. In Vercel Dashboard, go to your project
2. Click on **Functions** tab (or **Logs** tab)
3. Look for `generate-content` function
4. Click on it to see recent invocations
5. Check for error messages - they will show:
   - If API key is missing
   - If OpenAI API is failing
   - Any other errors

## Step 4: Verify OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Make sure your API key is active
3. Check if you have credits/billing set up
4. Try creating a new API key if needed

## Step 5: Test Locally (Optional)

1. Create `.env.local` file in project root:
   ```
   OPENAI_API_KEY=your_key_here
   ```

2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

3. Run locally:
   ```bash
   vercel dev
   ```

4. Test the API at: `http://localhost:3000/api/test`

## Common Issues

### Issue: "OpenAI API key not configured"
**Solution**: Add `OPENAI_API_KEY` in Vercel environment variables and redeploy

### Issue: "Failed to fetch" or Network Error
**Solution**: 
- Check if API route is accessible: `/api/test`
- Check browser console for CORS errors
- Verify Vercel deployment is successful

### Issue: "Invalid API key" or "Incorrect API key"
**Solution**:
- Verify the API key in Vercel matches your OpenAI key
- Make sure there are no extra spaces
- Regenerate the key in OpenAI if needed

### Issue: "Rate limit exceeded"
**Solution**:
- Check your OpenAI usage limits
- Wait a few minutes and try again
- Upgrade your OpenAI plan if needed

## Debugging Steps

1. **Check Test Endpoint**: Visit `/api/test` to verify API routes work
2. **Check Function Logs**: Look at Vercel function logs for detailed errors
3. **Check Browser Console**: Look for network errors in DevTools
4. **Verify Environment**: Make sure env var is set in all environments

## After Fixing

1. **Redeploy**: After adding/changing environment variables, redeploy:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   
2. **Wait**: Wait 1-2 minutes for deployment to complete

3. **Test**: Try the "Generate from AI" button again

## Still Not Working?

If after all these steps it still doesn't work:

1. Share the error message from Vercel Function Logs
2. Share the response from `/api/test` endpoint
3. Check if `hasOpenAIKey` is `true` in the test response

