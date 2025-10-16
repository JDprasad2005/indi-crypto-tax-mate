import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { CryptoTransaction, TaxSummary } from '@/types/transaction';
import { formatCurrency } from '@/utils/taxCalculations';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';

interface ReportGeneratorProps {
  transactions: CryptoTransaction[];
  summary: TaxSummary;
}

export const ReportGenerator = ({ transactions, summary }: ReportGeneratorProps) => {
  const { toast } = useToast();

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      let yPosition = 20;

      // Title
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Crypto Tax Report - Schedule VDA', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Generated as per Indian Income Tax Act, 1961', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 10;
      doc.setFontSize(10);
      doc.text(`Report Date: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, yPosition, { align: 'center' });
      
      // Tax Summary Section
      yPosition += 15;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Tax Summary', 14, yPosition);
      
      yPosition += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      const summaryData = [
        ['Total Gains (Profits)', formatCurrency(summary.totalGains)],
        ['Total Losses', formatCurrency(summary.totalLosses)],
        ['Net Taxable Gains', formatCurrency(summary.netGains)],
        ['Tax @ 30% (Section 115BBH)', formatCurrency(summary.taxAt30Percent)],
        ['TDS Deducted @ 1% (Section 194S)', formatCurrency(summary.totalTdsDeducted)],
        ['GST on Platform Fees @ 18%', formatCurrency(summary.totalGstOnFees)],
        ['Total Tax Liability', formatCurrency(summary.totalTaxLiability)],
        ['Net Tax Payable (after TDS credit)', formatCurrency(summary.netTaxPayable)],
      ];

      summaryData.forEach(([label, value]) => {
        doc.text(label, 14, yPosition);
        doc.text(value, pageWidth - 14, yPosition, { align: 'right' });
        yPosition += 7;
      });

      // Transaction Summary
      yPosition += 10;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Transaction Summary', 14, yPosition);
      
      yPosition += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Transactions: ${transactions.length}`, 14, yPosition);
      
      yPosition += 7;
      doc.text(`BUY Transactions: ${transactions.filter(t => t.type === 'BUY').length}`, 14, yPosition);
      
      yPosition += 7;
      doc.text(`SELL Transactions: ${transactions.filter(t => t.type === 'SELL').length}`, 14, yPosition);

      // Footer
      yPosition = doc.internal.pageSize.getHeight() - 20;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('This is a computer-generated report. Please verify all details before filing ITR.', pageWidth / 2, yPosition, { align: 'center' });
      doc.text('Consult a Chartered Accountant for personalized tax advice.', pageWidth / 2, yPosition + 5, { align: 'center' });

      // Save PDF
      doc.save(`Crypto-Tax-Report-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Report Generated",
        description: "Your tax report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateExcel = () => {
    try {
      // Create workbook
      const wb = XLSX.utils.book_new();

      // Tax Summary Sheet
      const summaryData = [
        ['Crypto Tax Report - Schedule VDA'],
        ['Generated as per Indian Income Tax Act, 1961'],
        [`Report Date: ${new Date().toLocaleDateString('en-IN')}`],
        [],
        ['Tax Summary'],
        ['Total Gains (Profits)', formatCurrency(summary.totalGains)],
        ['Total Losses', formatCurrency(summary.totalLosses)],
        ['Net Taxable Gains', formatCurrency(summary.netGains)],
        ['Tax @ 30% (Section 115BBH)', formatCurrency(summary.taxAt30Percent)],
        ['TDS Deducted @ 1% (Section 194S)', formatCurrency(summary.totalTdsDeducted)],
        ['GST on Platform Fees @ 18%', formatCurrency(summary.totalGstOnFees)],
        ['Total Tax Liability', formatCurrency(summary.totalTaxLiability)],
        ['Net Tax Payable (after TDS credit)', formatCurrency(summary.netTaxPayable)],
        [],
        ['Transaction Summary'],
        ['Total Transactions', transactions.length],
        ['BUY Transactions', transactions.filter(t => t.type === 'BUY').length],
        ['SELL Transactions', transactions.filter(t => t.type === 'SELL').length],
      ];
      const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Tax Summary');

      // Transactions Sheet
      const transactionData = [
        ['Date', 'Type', 'Cryptocurrency', 'Amount', 'Price per Unit', 'Total Value', 'Platform Fee', 'TDS Deducted'],
        ...transactions.map(t => [
          new Date(t.date).toLocaleDateString('en-IN'),
          t.type,
          t.cryptocurrency,
          t.amount,
          formatCurrency(t.pricePerUnit),
          formatCurrency(t.totalValue),
          formatCurrency(t.platformFee),
          formatCurrency(t.tdsDeducted),
        ])
      ];
      const wsTransactions = XLSX.utils.aoa_to_sheet(transactionData);
      XLSX.utils.book_append_sheet(wb, wsTransactions, 'Transactions');

      // Save file
      XLSX.writeFile(wb, `Crypto-Tax-Report-${new Date().toISOString().split('T')[0]}.xlsx`);

      toast({
        title: "Excel Report Generated",
        description: "Your tax report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate Excel report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Generate Tax Reports
        </CardTitle>
        <CardDescription>
          Download audit-ready reports formatted for Schedule VDA compliance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={generatePDF} 
            className="w-full"
            size="lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Download PDF
          </Button>

          <Button 
            onClick={generateExcel} 
            className="w-full"
            size="lg"
            variant="secondary"
          >
            <FileSpreadsheet className="mr-2 h-5 w-5" />
            Download Excel Sheet
          </Button>
        </div>
        
        <div className="rounded-md bg-muted p-4 text-sm">
          <p className="font-semibold mb-2">Report includes:</p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>Complete tax summary with 30% tax calculation</li>
            <li>TDS credit details (1% TDS deducted)</li>
            <li>GST on platform fees (18%)</li>
            <li>Net tax payable after all deductions</li>
            <li>Transaction breakdown for Schedule VDA</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
