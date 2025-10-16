export interface CryptoTransaction {
  id: string;
  date: string;
  type: 'BUY' | 'SELL' | 'TRANSFER';
  cryptocurrency: string;
  amount: number;
  pricePerUnit: number;
  totalValue: number;
  platformFee: number;
  tdsDeducted: number;
  exchange?: string;
}

export interface TaxSummary {
  totalGains: number;
  totalLosses: number;
  netGains: number;
  taxAt30Percent: number;
  totalTdsDeducted: number;
  totalGstOnFees: number;
  totalTaxLiability: number;
  netTaxPayable: number;
}

export interface TransactionStats {
  totalTransactions: number;
  buyTransactions: number;
  sellTransactions: number;
  totalInvested: number;
  totalRealized: number;
  totalFees: number;
}
