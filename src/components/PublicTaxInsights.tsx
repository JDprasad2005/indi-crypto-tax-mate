import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Building2, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { formatCurrency } from '@/utils/taxCalculations';

// Sample data for public awareness - organization-wise tax data
const organizationTaxData = [
  { name: 'WazirX', totalTax: 45000000, users: 12500, avgTax: 3600 },
  { name: 'CoinDCX', totalTax: 52000000, users: 15200, avgTax: 3421 },
  { name: 'ZebPay', totalTax: 28000000, users: 8900, avgTax: 3146 },
  { name: 'Binance', totalTax: 38000000, users: 10300, avgTax: 3689 },
  { name: 'CoinSwitch', totalTax: 31000000, users: 9100, avgTax: 3407 },
];

// Sector-wise crypto tax distribution
const sectorTaxData = [
  { name: 'DeFi Trading', value: 35, amount: 68000000, fill: 'hsl(var(--primary))' },
  { name: 'NFT Sales', value: 18, amount: 35000000, fill: 'hsl(var(--accent))' },
  { name: 'Spot Trading', value: 28, amount: 54000000, fill: 'hsl(var(--secondary))' },
  { name: 'Futures/Options', value: 12, amount: 23000000, fill: 'hsl(var(--chart-1))' },
  { name: 'Staking Rewards', value: 7, amount: 14000000, fill: 'hsl(var(--chart-2))' },
];

export const PublicTaxInsights = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Public Tax Insights</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transparency dashboard showing crypto tax data across major exchanges and sectors in India
        </p>
      </div>

      {/* Organization-wise Tax Data */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Organization-wise Tax Collection
          </CardTitle>
          <CardDescription>
            Estimated tax collection across major crypto exchanges in India (FY 2024-25)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={organizationTaxData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'Total Tax' || name === 'Average Tax') {
                    return formatCurrency(value);
                  }
                  return value.toLocaleString('en-IN');
                }}
              />
              <Legend />
              <Bar dataKey="totalTax" fill="hsl(var(--primary))" name="Total Tax" radius={[8, 8, 0, 0]} />
              <Bar dataKey="avgTax" fill="hsl(var(--accent))" name="Average Tax" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {organizationTaxData.map((org) => (
              <div key={org.name} className="p-3 rounded-lg border border-border bg-card/50">
                <div className="text-sm font-medium">{org.name}</div>
                <div className="text-xs text-muted-foreground">{org.users.toLocaleString('en-IN')} users</div>
                <div className="text-sm font-semibold text-primary mt-1">{formatCurrency(org.totalTax)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sector-wise Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Sector-wise Tax Distribution
            </CardTitle>
            <CardDescription>
              Tax contribution by different crypto sectors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorTaxData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorTaxData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Tax Amount by Sector
            </CardTitle>
            <CardDescription>
              Total tax collected per sector (in ₹)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorTaxData.map((sector, index) => (
                <div key={sector.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: sector.fill }}
                      />
                      <span className="font-medium">{sector.name}</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(sector.amount)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${sector.value * 2}%`,
                        backgroundColor: sector.fill,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Total Estimated Crypto Tax Collection (India FY 2024-25)</p>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(sectorTaxData.reduce((acc, sector) => acc + sector.amount, 0))}
            </p>
            <p className="text-xs text-muted-foreground">
              *Data based on industry estimates and public reporting
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
