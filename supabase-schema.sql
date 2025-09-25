-- AI Investment Agent Database Schema
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image TEXT,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  symbol VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  sector VARCHAR(100),
  market_cap BIGINT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial data table
CREATE TABLE IF NOT EXISTS financial_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  period VARCHAR(20) NOT NULL, -- e.g., '2024-Q1', '2023-Annual'
  revenue BIGINT,
  ebitda BIGINT,
  net_profit BIGINT,
  total_assets BIGINT,
  total_liabilities BIGINT,
  equity BIGINT,
  pe_ratio DECIMAL(10,2),
  pb_ratio DECIMAL(10,2),
  roe DECIMAL(10,2),
  roa DECIMAL(10,2),
  debt_to_equity DECIMAL(10,2),
  current_ratio DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analysis reports table
CREATE TABLE IF NOT EXISTS analysis_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  report_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sentiment data table
CREATE TABLE IF NOT EXISTS sentiment_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  source VARCHAR(20) NOT NULL CHECK (source IN ('twitter', 'news', 'analyst')),
  sentiment_score DECIMAL(3,2) NOT NULL CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
  content TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Whitelist emails table
CREATE TABLE IF NOT EXISTS whitelist_emails (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  added_by UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News items table
CREATE TABLE IF NOT EXISTS news_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT UNIQUE NOT NULL,
  source VARCHAR(100),
  published_at TIMESTAMP WITH TIME ZONE,
  sentiment_score DECIMAL(3,2) CHECK (sentiment_score >= -1 AND sentiment_score <= 1),
  company_symbols TEXT[], -- Array of company symbols mentioned
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stock prices table (for caching real-time data)
CREATE TABLE IF NOT EXISTS stock_prices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  symbol VARCHAR(20) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  change DECIMAL(10,2),
  change_percent DECIMAL(5,2),
  volume BIGINT,
  market_cap BIGINT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_companies_symbol ON companies(symbol);
CREATE INDEX IF NOT EXISTS idx_financial_data_company_id ON financial_data(company_id);
CREATE INDEX IF NOT EXISTS idx_financial_data_period ON financial_data(period);
CREATE INDEX IF NOT EXISTS idx_analysis_reports_company_id ON analysis_reports(company_id);
CREATE INDEX IF NOT EXISTS idx_sentiment_data_company_id ON sentiment_data(company_id);
CREATE INDEX IF NOT EXISTS idx_sentiment_data_date ON sentiment_data(date);
CREATE INDEX IF NOT EXISTS idx_news_items_company_symbols ON news_items USING GIN(company_symbols);
CREATE INDEX IF NOT EXISTS idx_news_items_published_at ON news_items(published_at);
CREATE INDEX IF NOT EXISTS idx_stock_prices_symbol ON stock_prices(symbol);
CREATE INDEX IF NOT EXISTS idx_stock_prices_timestamp ON stock_prices(timestamp);

-- Insert initial whitelist email
INSERT INTO whitelist_emails (email, added_by, status) 
VALUES ('rachitmore3304@gmail.com', NULL, 'active')
ON CONFLICT (email) DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analysis_reports_updated_at BEFORE UPDATE ON analysis_reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE sentiment_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE whitelist_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_prices ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (adjust based on your auth requirements)
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can view all companies" ON companies
    FOR SELECT USING (true);

CREATE POLICY "Users can view all financial data" ON financial_data
    FOR SELECT USING (true);

CREATE POLICY "Users can view all analysis reports" ON analysis_reports
    FOR SELECT USING (true);

CREATE POLICY "Users can view all sentiment data" ON sentiment_data
    FOR SELECT USING (true);

CREATE POLICY "Users can view all news items" ON news_items
    FOR SELECT USING (true);

CREATE POLICY "Users can view all stock prices" ON stock_prices
    FOR SELECT USING (true);

-- Admin policies for whitelist management
CREATE POLICY "Admins can manage whitelist" ON whitelist_emails
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid()::uuid 
            AND users.role = 'admin'
        )
    );
