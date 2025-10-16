import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const SampleDownload = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/sample-transactions.csv';
    link.download = 'sample-crypto-transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm text-muted-foreground">Need a sample?</span>
      <Button 
        variant="link" 
        size="sm" 
        onClick={handleDownload}
        className="h-auto p-0 text-primary"
      >
        <Download className="mr-1 h-3 w-3" />
        Download template CSV
      </Button>
    </div>
  );
};
