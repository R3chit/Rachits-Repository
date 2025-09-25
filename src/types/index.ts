export interface User {
  id: string
  email: string
  name: string
  image?: string
  role: 'user' | 'admin'
  created_at: string
}

export interface Company {
  id: string
  symbol: string
  name: string
  sector: string
  market_cap?: number
  last_updated: string
}

export interface FinancialData {
  id: string
  company_id: string
  period: string
  revenue: number
  ebitda: number
  net_profit: number
  total_assets: number
  total_liabilities: number
  equity: number
  pe_ratio?: number
  pb_ratio?: number
  roe?: number
  roa?: number
  debt_to_equity?: number
  current_ratio?: number
  created_at: string
}

export interface AnalysisReport {
  id: string
  company_id: string
  report_data: {
    investment_thesis: string
    risk_rating: number
    price_target?: number
    financial_overview: any
    business_analysis: any
    competitive_position: any
    management_governance: any
    growth_guidance: any
    regulatory_risks: any
    market_sentiment: any
    research_questions: string[]
  }
  created_at: string
}

export interface SentimentData {
  id: string
  company_id: string
  source: 'twitter' | 'news' | 'analyst'
  sentiment_score: number
  content: string
  date: string
}

export interface WhitelistEmail {
  id: string
  email: string
  added_by: string
  status: 'active' | 'inactive'
  created_at: string
}

export interface StockPrice {
  symbol: string
  price: number
  change: number
  change_percent: number
  volume: number
  market_cap: number
  timestamp: string
}

export interface NewsItem {
  id: string
  title: string
  description: string
  url: string
  source: string
  published_at: string
  sentiment_score: number
  company_symbols: string[]
}

export interface Competitor {
  symbol: string
  name: string
  market_cap: number
  pe_ratio?: number
  revenue: number
  market_share?: number
}
