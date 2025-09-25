'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Building2, 
  Users, 
  Shield,
  MessageSquare,
  AlertTriangle,
  HelpCircle
} from 'lucide-react'

export default function Dashboard() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // TODO: Implement data refresh logic
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  const dashboardSections = [
    {
      id: 'financial',
      title: 'Financial Overview',
      icon: BarChart3,
      description: 'Key financial metrics and ratios',
      color: 'bg-blue-500',
    },
    {
      id: 'business',
      title: 'Business & Sector Analysis',
      icon: Building2,
      description: 'Industry analysis and value chain',
      color: 'bg-green-500',
    },
    {
      id: 'competitive',
      title: 'Competitive Position',
      icon: TrendingUp,
      description: 'Market positioning and competitors',
      color: 'bg-purple-500',
    },
    {
      id: 'management',
      title: 'Management & Governance',
      icon: Users,
      description: 'Leadership and corporate governance',
      color: 'bg-orange-500',
    },
    {
      id: 'growth',
      title: 'Growth & Guidance',
      icon: TrendingUp,
      description: 'Growth prospects and guidance',
      color: 'bg-teal-500',
    },
    {
      id: 'regulatory',
      title: 'Regulatory & Risks',
      icon: Shield,
      description: 'Compliance and risk factors',
      color: 'bg-red-500',
    },
    {
      id: 'sentiment',
      title: 'Market Sentiment',
      icon: MessageSquare,
      description: 'News and social media sentiment',
      color: 'bg-pink-500',
    },
    {
      id: 'research',
      title: 'Key Research Questions',
      icon: HelpCircle,
      description: 'Critical questions for analysis',
      color: 'bg-indigo-500',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">AI Investment Agent</h1>
              <Badge variant="secondary">Indian Stock Analysis</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search companies (e.g., TCS, Reliance, HDFC Bank)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              
              <Button 
                onClick={handleRefresh} 
                disabled={isRefreshing}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium">{session?.user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!selectedCompany ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Welcome to AI Investment Agent</h2>
              <p className="text-muted-foreground text-lg">
                Search for an Indian company to begin comprehensive analysis
              </p>
            </div>

            {/* Quick Summary Card Placeholder */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>No Company Selected</span>
                </CardTitle>
                <CardDescription>
                  Use the search bar above to find and analyze a company
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Dashboard Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardSections.map((section) => (
                <Card 
                  key={section.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    // TODO: Implement section expansion
                    console.log(`Expand ${section.id} section`)
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${section.color}`}>
                        <section.icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{section.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Analysis for {selectedCompany}</h2>
              <Button variant="outline" onClick={() => setSelectedCompany(null)}>
                Back to Search
              </Button>
            </div>
            
            {/* Company Analysis Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Company Analysis</CardTitle>
                <CardDescription>
                  Detailed analysis will be displayed here once a company is selected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This is where the comprehensive analysis will be shown, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Financial ratios and metrics</li>
                  <li>Peer comparison</li>
                  <li>Risk assessment</li>
                  <li>Investment thesis</li>
                  <li>Market sentiment analysis</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
