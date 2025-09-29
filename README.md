# SFITBot - AI Admission Assistant

A production-ready multilingual AI chatbot for St. Francis Institute of Technology (SFIT), Mumbai. Built with React, Vite, Tailwind CSS, and OpenAI GPT-3.5-turbo.

## Features

- 🤖 **AI-Powered**: Uses OpenAI GPT-3.5-turbo for intelligent responses
- 🎤 **Voice Input**: Supports Hindi, English, and Hinglish speech recognition
- 🔊 **Text-to-Speech**: Optional voice responses for accessibility
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Mobile Responsive**: Optimized for all device sizes
- 💾 **Chat History**: Session-based chat history with localStorage
- 🎨 **SFIT Branding**: Custom colors and branding (Red #E31E24, Green #2D8C3C)
- ⚡ **Fast Performance**: Built with Vite for lightning-fast builds
- 🚀 **Vercel Ready**: Configured for easy deployment

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: OpenAI GPT-3.5-turbo
- **Deployment**: Vercel

## Quick Start

1. **Clone and Install**
   ```bash
   cd sfit-chatbot
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   Add your OpenAI API key to `.env`:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Development**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variable: `VITE_OPENAI_API_KEY`
4. Deploy automatically

### Manual Deployment

```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

## SFIT Knowledge Base

The chatbot includes comprehensive information about:

- **Courses**: CE, IT, ECS, AI & DS
- **Eligibility**: 12th requirements, CET/JEE scores
- **Admissions**: CAP rounds, ILR process
- **Fees**: Annual fees (~₹1.75L), scholarships
- **Campus**: Location, facilities, hostels
- **Placements**: Statistics, recruiters
- **Activities**: Fests, clubs, events

## API Configuration

The app uses OpenAI's GPT-3.5-turbo model with:
- Max tokens: 500
- Temperature: 0.7
- Context window: Last 10 messages
- System prompt: SFIT knowledge base

## Browser Support

- **Speech Recognition**: Chrome, Edge, Safari
- **Text-to-Speech**: All modern browsers
- **General**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Customization

### Colors
Update `tailwind.config.js`:
```javascript
colors: {
  sfit: {
    red: '#E31E24',
    green: '#2D8C3C',
    white: '#FFFFFF',
  }
}
```

### Knowledge Base
Modify the `SFIT_KNOWLEDGE_BASE` constant in `src/App.tsx`

### FAQ Questions
Update the `faqQuestions` array in `src/components/FAQButtons.tsx`

## License

This project is created for St. Francis Institute of Technology, Mumbai.

## Support

For technical issues or feature requests, please contact the development team.

---

**Powered by SFIT** | St. Francis Institute of Technology, Borivali, Mumbai
