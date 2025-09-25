# AI Investment Agent - Indian Stock Analysis Platform

A comprehensive web-based Indian stock analysis platform with user authentication, real-time data integration, and interactive dashboards.

## 🚀 Features

- **Authentication**: Google OAuth with email whitelist system
- **Real-time Data**: Live stock prices and financial metrics
- **Comprehensive Analysis**: 8 key analysis modules
- **Interactive Dashboard**: Modern, responsive UI with shadcn/ui
- **Data Sources**: Alpha Vantage, Yahoo Finance, News API, Twitter API
- **Export**: PDF generation for analysis reports

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts + Chart.js
- **Icons**: Lucide React
- **State Management**: Zustand

### Backend
- **Framework**: Next.js API Routes (full-stack)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with Google OAuth
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google OAuth credentials
- API keys for data sources

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd ai-investment-agent
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp env.example .env.local
```

Fill in your environment variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# API Keys
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-key
NEWS_API_KEY=your-news-api-key
TWITTER_BEARER_TOKEN=your-twitter-bearer-token

# Email Whitelist
WHITELIST_EMAILS=rachitmore3304@gmail.com
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Update your Supabase credentials in `.env.local`

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
6. Copy Client ID and Secret to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Analysis Modules

### 1. Financial Overview
- Key financial ratios (P/E, ROE, D/E, etc.)
- Revenue/EBITDA/PAT growth charts
- Peer comparison tables
- Risk scoring system (1-5 scale)

### 2. Business & Sector Analysis
- Industry mapping and visualization
- Margin analysis across value chain
- Technology and operational challenges
- Interactive flowchart component

### 3. Competitive Position
- Direct and indirect competitors
- Market share analysis
- Positioning matrix visualization
- SWOT comparison

### 4. Management & Governance
- Promoter background analysis
- Insider trading data
- Corporate governance scores
- Management commentary analysis

### 5. Growth & Guidance
- Growth prospects analysis
- Management guidance tracking
- Industry growth trends
- Future outlook assessment

### 6. Regulatory & Risks
- Sector-specific policy tracking
- SEBI/legal case monitoring
- Compliance scoring
- Government scheme impact analysis

### 7. Market Sentiment
- Twitter hashtag monitoring
- News sentiment scoring
- Analyst recommendation aggregation
- Social media trend analysis

### 8. Key Research Questions
- Critical questions for analysis
- Actionable insights
- Research priorities
- Investment thesis validation

## 🔧 Development

### Project Structure

```
ai-investment-agent/
├── src/
│   ├── app/                 # Next.js 14 app directory
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── dashboard/      # Dashboard components
│   │   └── auth/           # Authentication components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── supabase-schema.sql     # Database schema
└── README.md
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in your Vercel project settings:

- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Generate a secure secret
- `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Your Google OAuth client secret
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- API keys for data sources
- `WHITELIST_EMAILS` - Comma-separated list of allowed emails

## 📈 Data Sources

- **Alpha Vantage**: Indian stock data and financials
- **Yahoo Finance**: Real-time price data
- **News API**: Company news and sentiment
- **Twitter API v2**: Social media sentiment
- **Open Government Data Platform India**: Regulatory data

## 🔒 Security

- Email whitelist system for access control
- Row Level Security (RLS) in Supabase
- JWT-based session management
- Secure API key management
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email rachitmore3304@gmail.com or create an issue in the repository.

## 🎯 Roadmap

- [ ] Real-time data integration
- [ ] Advanced charting capabilities
- [ ] PDF export functionality
- [ ] Mobile app development
- [ ] AI-powered insights
- [ ] Portfolio tracking
- [ ] Alert system
- [ ] API documentation

---

Built with ❤️ for Indian stock market analysis
