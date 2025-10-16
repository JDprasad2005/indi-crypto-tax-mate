import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { CryptoTransaction } from '@/types/transaction';

export const parseCSVFile = (file: File): Promise<CryptoTransaction[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const transactions = results.data
            .filter((row: any) => row.date && row.type)
            .map((row: any, index: number) => ({
              id: `txn-${Date.now()}-${index}`,
              date: row.date,
              type: row.type.toUpperCase(),
              cryptocurrency: row.cryptocurrency || row.crypto || 'BTC',
              amount: parseFloat(row.amount) || 0,
              pricePerUnit: parseFloat(row.pricePerUnit || row.price) || 0,
              totalValue: parseFloat(row.totalValue || row.total) || 0,
              platformFee: parseFloat(row.platformFee || row.fee) || 0,
              tdsDeducted: parseFloat(row.tdsDeducted || row.tds) || 0,
              exchange: row.exchange || '',
            }));
          resolve(transactions);
        } catch (error) {
          reject(new Error('Failed to parse CSV file'));
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const parseExcelFile = (file: File): Promise<CryptoTransaction[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        const transactions = jsonData
          .filter((row: any) => row.date && row.type)
          .map((row: any, index: number) => ({
            id: `txn-${Date.now()}-${index}`,
            date: row.date,
            type: row.type.toUpperCase(),
            cryptocurrency: row.cryptocurrency || row.crypto || 'BTC',
            amount: parseFloat(row.amount) || 0,
            pricePerUnit: parseFloat(row.pricePerUnit || row.price) || 0,
            totalValue: parseFloat(row.totalValue || row.total) || 0,
            platformFee: parseFloat(row.platformFee || row.fee) || 0,
            tdsDeducted: parseFloat(row.tdsDeducted || row.tds) || 0,
            exchange: row.exchange || '',
          }));
        
        resolve(transactions);
      } catch (error) {
        reject(new Error('Failed to parse Excel file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

export const parseFile = async (file: File): Promise<CryptoTransaction[]> => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  if (fileExtension === 'csv') {
    return parseCSVFile(file);
  } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
    return parseExcelFile(file);
  } else {
    throw new Error('Unsupported file format. Please upload CSV or Excel files.');
  }
};
