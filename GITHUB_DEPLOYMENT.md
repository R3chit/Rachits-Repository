# 🚀 SFITBot GitHub & Vercel Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button → **"New repository"**
3. Repository name: `sfit-chatbot`
4. Description: `AI-powered multilingual admission assistant for SFIT Mumbai`
5. Set to **Public** (required for free Vercel hosting)
6. **DO NOT** initialize with README (we already have files)
7. Click **"Create repository"**

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sfit-chatbot.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel (24/7 Hosting)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your **GitHub account**
3. Click **"New Project"**
4. Import your `sfit-chatbot` repository
5. Vercel will auto-detect it's a Vite project
6. Click **"Deploy"**

## Step 4: Add Environment Variable

1. In your Vercel dashboard, go to your project
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the sidebar
4. Add new variable:
   - **Name**: `VITE_OPENAI_API_KEY`
   - **Value**: `your_openai_api_key_here`
   - **Environment**: Production, Preview, Development (select all)
5. Click **"Save"**
6. Go back to **"Deployments"** tab
7. Click the **"⋯"** menu on the latest deployment
8. Click **"Redeploy"** to apply the environment variable

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard → **"Settings"** → **"Domains"**
2. Add your custom domain (e.g., `sfitbot.yourdomain.com`)
3. Follow DNS configuration instructions

## ✅ Your Bot Will Be Live At:

After deployment, you'll get a URL like:
- `https://sfit-chatbot-abc123.vercel.app` (default)
- Or your custom domain if configured

## 🔧 Troubleshooting

### If deployment fails:
1. Check environment variable is set correctly
2. Ensure repository is public
3. Verify all files are committed and pushed

### If bot doesn't respond:
1. Check Vercel function logs
2. Verify OpenAI API key is valid
3. Check browser console for errors

## 📱 Features Ready to Use:

- ✅ Voice input (Hindi/English/Hinglish)
- ✅ Text-to-speech responses
- ✅ Dark mode toggle
- ✅ Mobile responsive
- ✅ Chat history
- ✅ FAQ quick buttons
- ✅ SFIT branding
- ✅ 24/7 availability

## 🎯 Next Steps:

1. Share the live URL with SFIT admissions team
2. Test all features on mobile and desktop
3. Monitor usage in Vercel analytics
4. Update knowledge base as needed

---

**🎉 Your SFITBot will be live 24/7 on Vercel!**
