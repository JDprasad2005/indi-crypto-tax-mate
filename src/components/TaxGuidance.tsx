import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Info, AlertTriangle, FileText } from 'lucide-react';

export const TaxGuidance = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Indian Crypto Tax Guide
        </CardTitle>
        <CardDescription>
          Understanding crypto taxation in India - As per Finance Act 2022
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <span>What is the 30% Tax on Crypto?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              <p>
                Under Section 115BBH of the Income Tax Act, all gains from the transfer of Virtual Digital Assets (VDAs) 
                including cryptocurrencies are taxed at a flat rate of <strong>30%</strong>.
              </p>
              <p className="text-muted-foreground">
                This tax applies to your net gains (profits after deducting losses within the same transaction, 
                but losses cannot be offset against other income).
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent" />
                <span>Understanding 1% TDS on Crypto</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              <p>
                Section 194S mandates a <strong>1% Tax Deducted at Source (TDS)</strong> on crypto transactions 
                exceeding ₹10,000 in a financial year (or ₹50,000 for specified persons).
              </p>
              <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
                <li>TDS is deducted by the crypto exchange at the time of transaction</li>
                <li>You can claim this TDS as a credit against your total tax liability</li>
                <li>Check Form 26AS to verify TDS deductions</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-secondary" />
                <span>18% GST on Platform Fees</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              <p>
                Crypto exchanges charge a service fee for facilitating transactions. As per GST regulations, 
                an <strong>18% Goods and Services Tax (GST)</strong> is applicable on these platform fees.
              </p>
              <p className="text-muted-foreground">
                This GST is separate from income tax and is included in your transaction cost. 
                Exchanges typically show this separately in your transaction statement.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span>How to File: Schedule VDA</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              <p>
                When filing your Income Tax Return (ITR), crypto transactions must be reported in <strong>Schedule VDA</strong> 
                (Virtual Digital Assets).
              </p>
              <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
                <li>Report all crypto transactions during the financial year</li>
                <li>Include details of acquisition cost and sale consideration</li>
                <li>Show TDS deducted separately for claiming credit</li>
                <li>Use ITR-2 or ITR-3 forms (ITR-1 cannot be used if you have crypto income)</li>
              </ul>
              <p className="mt-2 rounded-md bg-muted p-3">
                <strong>Pro Tip:</strong> Download our audit-ready PDF report to simplify your ITR filing. 
                It contains all necessary details formatted for Schedule VDA compliance.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span>Important Restrictions & Notes</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              <ul className="ml-4 list-disc space-y-1">
                <li><strong>No loss offset:</strong> Crypto losses cannot be set off against other income</li>
                <li><strong>No deductions:</strong> Only direct transaction costs can be deducted, not other expenses</li>
                <li><strong>No carry forward:</strong> Losses cannot be carried forward to future years</li>
                <li><strong>Gifting is taxable:</strong> Receiving crypto as a gift may be taxable under other provisions</li>
              </ul>
              <p className="mt-2 text-destructive">
                <strong>Disclaimer:</strong> This information is for educational purposes. Please consult a qualified 
                Chartered Accountant or tax professional for personalized advice.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
