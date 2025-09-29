# ⚡ Quick Deploy Instructions

## 🎯 Your API Key is Already Set!

✅ OpenAI API key has been added to the project

## 🚀 Deploy in 3 Steps:

### 1. Create GitHub Repository
- Go to [github.com/new](https://github.com/new)
- Name: `sfit-chatbot`
- Make it **Public**
- **Don't** add README (we have files already)
- Click **"Create repository"**

### 2. Push Code to GitHub
Copy these commands (replace YOUR_USERNAME):

```bash
git remote add origin https://github.com/YOUR_USERNAME/sfit-chatbot.git
git push -u origin main
```

### 3. Deploy to Vercel
- Go to [vercel.com](https://vercel.com)
- Sign in with GitHub
- Click **"New Project"**
- Import `sfit-chatbot` repository
- Add environment variable:
  - Name: `VITE_OPENAI_API_KEY`
  - Value: `your_openai_api_key_here`
- Click **"Deploy"**

## 🎉 Done! Your Bot Will Be Live At:
`https://sfit-chatbot-[random].vercel.app`

## 📱 Features Ready:
- Voice input (Hindi/English/Hinglish)
- Text-to-speech
- Dark mode
- Mobile responsive
- SFIT knowledge base
- 24/7 availability

**Total time: ~5 minutes!** 🚀
