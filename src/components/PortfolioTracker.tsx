import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Wallet, Activity } from 'lucide-react';
import { formatCurrency } from '@/utils/taxCalculations';

// Sample portfolio tracking data for demonstration
const portfolioTrendData = [
  { month: 'Jan 2024', portfolioValue: 125000, invested: 100000, taxLiability: 4500, gainLoss: 25000 },
  { month: 'Feb 2024', portfolioValue: 138000, invested: 110000, taxLiability: 5200, gainLoss: 28000 },
  { month: 'Mar 2024', portfolioValue: 142000, invested: 115000, taxLiability: 5800, gainLoss: 27000 },
  { month: 'Apr 2024', portfolioValue: 156000, invested: 120000, taxLiability: 6400, gainLoss: 36000 },
  { month: 'May 2024', portfolioValue: 148000, invested: 125000, taxLiability: 5900, gainLoss: 23000 },
  { month: 'Jun 2024', portfolioValue: 165000, invested: 130000, taxLiability: 7200, gainLoss: 35000 },
  { month: 'Jul 2024', portfolioValue: 178000, invested: 135000, taxLiability: 8100, gainLoss: 43000 },
  { month: 'Aug 2024', portfolioValue: 185000, invested: 140000, taxLiability: 8800, gainLoss: 45000 },
  { month: 'Sep 2024', portfolioValue: 192000, invested: 145000, taxLiability: 9400, gainLoss: 47000 },
  { month: 'Oct 2024', portfolioValue: 205000, invested: 150000, taxLiability: 10500, gainLoss: 55000 },
];

const taxTrendData = [
  { quarter: 'Q1 2024', capitalGainsTax: 15000, tdsPaid: 3500, gstOnFees: 1200, netTax: 12700 },
  { quarter: 'Q2 2024', capitalGainsTax: 18500, tdsPaid: 4200, gstOnFees: 1450, netTax: 15750 },
  { quarter: 'Q3 2024', capitalGainsTax: 22000, tdsPaid: 5100, gstOnFees: 1680, netTax: 18580 },
  { quarter: 'Q4 2024', capitalGainsTax: 25500, tdsPaid: 5800, gstOnFees: 1920, netTax: 21620 },
];

export const PortfolioTracker = () => {
  const currentValue = portfolioTrendData[portfolioTrendData.length - 1].portfolioValue;
  const totalInvested = portfolioTrendData[portfolioTrendData.length - 1].invested;
  const totalGainLoss = currentValue - totalInvested;
  const percentageChange = ((totalGainLoss / totalInvested) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Portfolio Tracker</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your crypto portfolio performance and tax trends over time
        </p>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Current Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total invested: {formatCurrency(totalInvested)}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-accent/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Gain/Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalGainLoss >= 0 ? '+' : ''}{formatCurrency(totalGainLoss)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {percentageChange}% {totalGainLoss >= 0 ? 'gain' : 'loss'}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-secondary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Estimated Tax Liability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(portfolioTrendData[portfolioTrendData.length - 1].taxLiability)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on current gains
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Value Trend */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Portfolio Value Trend
          </CardTitle>
          <CardDescription>
            Track your portfolio growth and invested capital over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={portfolioTrendData}>
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="portfolioValue" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1}
                fill="url(#colorPortfolio)" 
                name="Portfolio Value"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="invested" 
                stroke="hsl(var(--secondary))" 
                fillOpacity={1}
                fill="url(#colorInvested)" 
                name="Invested Amount"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tax Trend Over Time */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Quarterly Tax Trend Analysis
          </CardTitle>
          <CardDescription>
            Breakdown of tax components and net tax payable by quarter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={taxTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="capitalGainsTax" 
                stroke="hsl(var(--primary))" 
                name="Capital Gains Tax (30%)" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="tdsPaid" 
                stroke="hsl(var(--accent))" 
                name="TDS Deducted" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="gstOnFees" 
                stroke="hsl(var(--secondary))" 
                name="GST on Fees" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="netTax" 
                stroke="hsl(var(--chart-1))" 
                name="Net Tax Payable" 
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="pt-6">
          <p className="text-xs text-center text-muted-foreground">
            <strong>Note:</strong> This is a sample portfolio tracker for demonstration purposes. 
            Upload your actual transaction data above to see your personalized portfolio analysis and tax calculations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
