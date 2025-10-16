import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CryptoTransaction } from '@/types/transaction';
import { formatCurrency, formatNumber } from '@/utils/taxCalculations';

interface TransactionTableProps {
  transactions: CryptoTransaction[];
}

export const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          Showing {transactions.length} transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Cryptocurrency</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Price/Unit</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead className="text-right">Platform Fee</TableHead>
                <TableHead className="text-right">TDS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={transaction.type === 'BUY' ? 'default' : transaction.type === 'SELL' ? 'secondary' : 'outline'}
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.cryptocurrency}</TableCell>
                  <TableCell className="text-right">{formatNumber(transaction.amount)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(transaction.pricePerUnit)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(transaction.totalValue)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{formatCurrency(transaction.platformFee)}</TableCell>
                  <TableCell className="text-right text-accent">{formatCurrency(transaction.tdsDeducted)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
