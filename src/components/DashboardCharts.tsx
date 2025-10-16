import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CryptoTransaction, TaxSummary } from '@/types/transaction';
import { formatCurrency } from '@/utils/taxCalculations';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

interface DashboardChartsProps {
  transactions: CryptoTransaction[];
  summary: TaxSummary;
}

export const DashboardCharts = ({ transactions, summary }: DashboardChartsProps) => {
  // Cryptocurrency-wise breakdown
  const cryptoBreakdown = transactions.reduce((acc, transaction) => {
    const crypto = transaction.cryptocurrency;
    if (!acc[crypto]) {
      acc[crypto] = { name: crypto, volume: 0, transactions: 0 };
    }
    acc[crypto].volume += transaction.totalValue;
    acc[crypto].transactions += 1;
    return acc;
  }, {} as Record<string, { name: string; volume: number; transactions: number }>);

  const cryptoData = Object.values(cryptoBreakdown);

  // Transaction type breakdown
  const typeBreakdown = [
    { name: 'BUY', value: transactions.filter(t => t.type === 'BUY').length, fill: 'hsl(var(--primary))' },
    { name: 'SELL', value: transactions.filter(t => t.type === 'SELL').length, fill: 'hsl(var(--secondary))' },
  ];

  // Monthly trend data
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('en-IN', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { month, buyVolume: 0, sellVolume: 0, taxLiability: 0 };
    }
    if (transaction.type === 'BUY') {
      acc[month].buyVolume += transaction.totalValue;
    } else {
      acc[month].sellVolume += transaction.totalValue;
      // Simplified tax calculation per transaction
      const gain = transaction.totalValue - (transaction.amount * transaction.pricePerUnit * 0.7);
      acc[month].taxLiability += Math.max(0, gain * 0.30);
    }
    return acc;
  }, {} as Record<string, { month: string; buyVolume: number; sellVolume: number; taxLiability: number }>);

  const trendData = Object.values(monthlyData);

  // Tax components breakdown
  const taxComponents = [
    { name: 'Tax @ 30%', value: summary.taxAt30Percent, fill: 'hsl(var(--primary))' },
    { name: 'GST @ 18%', value: summary.totalGstOnFees, fill: 'hsl(var(--accent))' },
    { name: 'TDS Credit', value: summary.totalTdsDeducted, fill: 'hsl(var(--secondary))' },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

  return (
    <div className="space-y-6">
      {/* Cryptocurrency Portfolio Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Portfolio Breakdown by Cryptocurrency
          </CardTitle>
          <CardDescription>
            Trading volume and transaction count per cryptocurrency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cryptoData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
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
              <Bar dataKey="volume" fill="hsl(var(--primary))" name="Total Volume" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction Type Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Transaction Distribution
            </CardTitle>
            <CardDescription>
              BUY vs SELL transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={typeBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tax Components Breakdown */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Tax Components
            </CardTitle>
            <CardDescription>
              Breakdown of tax liability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={taxComponents}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${formatCurrency(Number(value))}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taxComponents.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Tax Trend */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Monthly Trading & Tax Trends
          </CardTitle>
          <CardDescription>
            Track your trading volume and tax liability over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
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
              <Line type="monotone" dataKey="buyVolume" stroke="hsl(var(--primary))" name="Buy Volume" strokeWidth={2} />
              <Line type="monotone" dataKey="sellVolume" stroke="hsl(var(--secondary))" name="Sell Volume" strokeWidth={2} />
              <Line type="monotone" dataKey="taxLiability" stroke="hsl(var(--accent))" name="Tax Liability" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
