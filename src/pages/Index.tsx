import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { FileUpload } from '@/components/FileUpload';
import { TaxSummaryCard } from '@/components/TaxSummaryCard';
import { TransactionTable } from '@/components/TransactionTable';
import { TaxGuidance } from '@/components/TaxGuidance';
import { ReportGenerator } from '@/components/ReportGenerator';
import { DashboardCharts } from '@/components/DashboardCharts';
import { CryptoTransaction } from '@/types/transaction';
import { calculateTaxSummary } from '@/utils/taxCalculations';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

const Index = () => {
  const [transactions, setTransactions] = useState<CryptoTransaction[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleTransactionsLoaded = (loadedTransactions: CryptoTransaction[]) => {
    setTransactions(loadedTransactions);
    setIsCalculated(false);
    localStorage.setItem('cryptoTransactions', JSON.stringify(loadedTransactions));
  };

  const handleCalculateTax = () => {
    setIsCalculated(true);
  };

  const taxSummary = transactions.length > 0 ? calculateTaxSummary(transactions) : null;

  return (
    <div className="min-h-screen">
      <Hero />
      
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Upload Section */}
        <section id="upload" className="space-y-6">
          <FileUpload onTransactionsLoaded={handleTransactionsLoaded} />
          
          {transactions.length > 0 && !isCalculated && (
            <div className="flex justify-center">
              <Button 
                onClick={handleCalculateTax}
                size="lg"
                className="shadow-elegant"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Tax Now
              </Button>
            </div>
          )}
        </section>

        {/* Tax Summary Section */}
        {taxSummary && isCalculated && (
          <>
            <Separator className="my-12" />
            <section id="summary" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Your Tax Summary</h2>
                <p className="text-muted-foreground">
                  Comprehensive breakdown of your crypto tax liability for FY 2024-25
                </p>
              </div>
              <TaxSummaryCard summary={taxSummary} />
            </section>
          </>
        )}

        {/* Transactions Table */}
        {transactions.length > 0 && isCalculated && (
          <>
            <Separator className="my-12" />
            <section id="transactions" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Transaction Details</h2>
                <p className="text-muted-foreground">
                  Complete list of all your crypto transactions
                </p>
              </div>
              <TransactionTable transactions={transactions} />
            </section>
          </>
        )}

        {/* Report Generation */}
        {taxSummary && isCalculated && (
          <>
            <Separator className="my-12" />
            <section id="reports" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Download Reports</h2>
                <p className="text-muted-foreground">
                  Generate audit-ready reports for Income Tax filing
                </p>
              </div>
              <ReportGenerator transactions={transactions} summary={taxSummary} />
            </section>
          </>
        )}

        {/* Transparency Dashboard */}
        {taxSummary && isCalculated && (
          <>
            <Separator className="my-12" />
            <section id="dashboard" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Transparency Dashboard</h2>
                <p className="text-muted-foreground">
                  Visual insights into your crypto portfolio and tax trends
                </p>
              </div>
              <DashboardCharts transactions={transactions} summary={taxSummary} />
            </section>
          </>
        )}

        {/* Tax Guidance */}
        <Separator className="my-12" />
        <section id="guidance" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Tax Education Center</h2>
            <p className="text-muted-foreground">
              Learn everything about crypto taxation in India
            </p>
          </div>
          <TaxGuidance />
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t pt-8 pb-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool is for educational and informational purposes only. 
              Tax calculations are estimates based on Indian crypto tax laws as of 2024.
            </p>
            <p>
              Please consult a qualified Chartered Accountant or tax professional for personalized advice. 
              All data is stored locally in your browser and is not sent to any server.
            </p>
            <p className="mt-4 text-xs">
              © 2024 Indian Crypto Tax Calculator. Built for compliance with Finance Act 2022.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
