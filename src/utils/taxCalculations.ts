import { CryptoTransaction, TaxSummary, TransactionStats } from '@/types/transaction';

export const calculateTaxSummary = (transactions: CryptoTransaction[]): TaxSummary => {
  let totalGains = 0;
  let totalLosses = 0;
  let totalTdsDeducted = 0;
  let totalGstOnFees = 0;

  transactions.forEach(transaction => {
    if (transaction.type === 'SELL') {
      // For simplicity, we'll calculate gains/losses on sell transactions
      // In a real app, you'd match buy/sell pairs using FIFO or other methods
      const gain = transaction.totalValue - (transaction.amount * transaction.pricePerUnit * 0.7); // Simplified
      if (gain > 0) {
        totalGains += gain;
      } else {
        totalLosses += Math.abs(gain);
      }
    }
    
    totalTdsDeducted += transaction.tdsDeducted;
    // 18% GST on platform fees
    totalGstOnFees += transaction.platformFee * 0.18;
  });

  const netGains = Math.max(0, totalGains - totalLosses);
  const taxAt30Percent = netGains * 0.30;
  const totalTaxLiability = taxAt30Percent + totalGstOnFees;
  const netTaxPayable = Math.max(0, totalTaxLiability - totalTdsDeducted);

  return {
    totalGains,
    totalLosses,
    netGains,
    taxAt30Percent,
    totalTdsDeducted,
    totalGstOnFees,
    totalTaxLiability,
    netTaxPayable,
  };
};

export const calculateTransactionStats = (transactions: CryptoTransaction[]): TransactionStats => {
  const buyTransactions = transactions.filter(t => t.type === 'BUY').length;
  const sellTransactions = transactions.filter(t => t.type === 'SELL').length;
  
  const totalInvested = transactions
    .filter(t => t.type === 'BUY')
    .reduce((sum, t) => sum + t.totalValue, 0);
  
  const totalRealized = transactions
    .filter(t => t.type === 'SELL')
    .reduce((sum, t) => sum + t.totalValue, 0);
  
  const totalFees = transactions.reduce((sum, t) => sum + t.platformFee, 0);

  return {
    totalTransactions: transactions.length,
    buyTransactions,
    sellTransactions,
    totalInvested,
    totalRealized,
    totalFees,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(num);
};
