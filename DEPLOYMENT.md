# SFITBot Deployment Guide

## Quick Deployment to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   cd sfit-chatbot
   git init
   git add .
   git commit -m "Initial SFITBot deployment"
   git branch -M main
   git remote add origin https://github.com/yourusername/sfit-chatbot.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `sfit-chatbot` repository
   - Add environment variable: `VITE_OPENAI_API_KEY`
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd sfit-chatbot
   vercel
   ```

3. **Add Environment Variables**
   ```bash
   vercel env add VITE_OPENAI_API_KEY
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Pre-deployment Checklist

- [ ] OpenAI API key configured
- [ ] All dependencies installed (`npm install`)
- [ ] Build successful (`npm run build`)
- [ ] Environment variables set
- [ ] Custom domain configured (optional)

## Post-deployment

1. **Test the chatbot**:
   - Voice input functionality
   - Text-to-speech
   - Dark mode toggle
   - Mobile responsiveness
   - FAQ buttons

2. **Monitor usage**:
   - OpenAI API usage
   - Vercel analytics
   - Error logs

## Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain
   - Update DNS records as instructed

2. **Update SFIT branding** if needed:
   - Modify logo in `public/sfit-logo.svg`
   - Update colors in `tailwind.config.js`
   - Customize knowledge base in `src/App.tsx`

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Verify the key is correctly set in environment variables
   - Check if the key has sufficient credits

2. **Build Failures**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors with `npm run build`

3. **Voice Features Not Working**
   - Ensure HTTPS is enabled (required for speech APIs)
   - Test in Chrome/Edge browsers

4. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check if custom colors are defined correctly

### Support

For deployment issues:
- Check Vercel deployment logs
- Review browser console for errors
- Verify environment variables are set correctly

## Performance Optimization

- **Bundle Analysis**: Run `npm run build` and check bundle size
- **Image Optimization**: Optimize any custom images
- **Caching**: Vercel automatically handles static asset caching
- **CDN**: Vercel provides global CDN distribution

---

**Ready to deploy SFITBot!** 🚀
