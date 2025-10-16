import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { parseFile } from '@/utils/fileParser';
import { CryptoTransaction } from '@/types/transaction';
import { useToast } from '@/hooks/use-toast';
import { SampleDownload } from './SampleDownload';

interface FileUploadProps {
  onTransactionsLoaded: (transactions: CryptoTransaction[]) => void;
}

export const FileUpload = ({ onTransactionsLoaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    try {
      const transactions = await parseFile(file);
      if (transactions.length === 0) {
        toast({
          title: "No transactions found",
          description: "The file appears to be empty or incorrectly formatted.",
          variant: "destructive",
        });
        return;
      }
      
      onTransactionsLoaded(transactions);
      toast({
        title: "Success!",
        description: `Loaded ${transactions.length} transactions successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error parsing file",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [onTransactionsLoaded, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
          Upload Transaction Data
        </CardTitle>
        <CardDescription>
          Upload your crypto transaction history in CSV or Excel format
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-smooth ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          
          <h3 className="mb-2 text-lg font-semibold">
            {isProcessing ? 'Processing file...' : 'Drop your file here'}
          </h3>
          
          <p className="mb-4 text-sm text-muted-foreground">
            or click the button below to browse
          </p>
          
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
            disabled={isProcessing}
          />
          
          <Button asChild variant="outline" disabled={isProcessing}>
            <label htmlFor="file-upload" className="cursor-pointer">
              Choose File
            </label>
          </Button>

          <div className="mt-6 space-y-3">
            <div className="flex items-start justify-center gap-2 text-xs text-muted-foreground">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="text-left">
                Supported formats: CSV, Excel (.xlsx, .xls)<br/>
                Required columns: date, type, cryptocurrency, amount, pricePerUnit, totalValue, platformFee, tdsDeducted
              </p>
            </div>
            <SampleDownload />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
