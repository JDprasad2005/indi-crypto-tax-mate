import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TaxSummary } from '@/types/transaction';
import { formatCurrency } from '@/utils/taxCalculations';
import { TrendingUp, TrendingDown, DollarSign, Receipt, CreditCard, Calculator } from 'lucide-react';

interface TaxSummaryCardProps {
  summary: TaxSummary;
}

export const TaxSummaryCard = ({ summary }: TaxSummaryCardProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Gains</CardTitle>
          <TrendingUp className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">
            {formatCurrency(summary.totalGains)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            From profitable transactions
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Losses</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(summary.totalLosses)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            From loss-making transactions
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Net Gains</CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(summary.netGains)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Taxable income (Gains - Losses)
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-primary/20 bg-gradient-primary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-primary-foreground">Tax @ 30%</CardTitle>
          <Calculator className="h-4 w-4 text-primary-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary-foreground">
            {formatCurrency(summary.taxAt30Percent)}
          </div>
          <p className="text-xs text-primary-foreground/80 mt-1">
            30% tax on net gains
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">TDS Deducted</CardTitle>
          <CreditCard className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">
            {formatCurrency(summary.totalTdsDeducted)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            1% TDS already paid (credit available)
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">GST on Fees</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary.totalGstOnFees)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            18% GST on platform fees
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-elevated border-secondary/20 bg-gradient-success md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-secondary-foreground">Net Tax Payable</CardTitle>
          <CardDescription className="text-secondary-foreground/80">
            Total tax liability after TDS credit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-bold text-secondary-foreground">
              {formatCurrency(summary.netTaxPayable)}
            </div>
            <div className="text-sm text-secondary-foreground/80">
              (Tax: {formatCurrency(summary.taxAt30Percent)} + GST: {formatCurrency(summary.totalGstOnFees)} - TDS: {formatCurrency(summary.totalTdsDeducted)})
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
