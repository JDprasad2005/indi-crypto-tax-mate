# Indian Crypto Tax Calculator

A comprehensive React web application designed to simplify cryptocurrency taxation compliance for Indian users based on Indian crypto tax laws.

## 🎯 Features

### Core Functionality
- **Transaction Upload**: Support for CSV and Excel file uploads, plus manual entry
- **Automated Tax Calculations**:
  - 30% capital gains tax on net profits (Section 115BBH)
  - 1% TDS tracking and credit (Section 194S)
  - 18% GST calculation on platform fees
- **Interactive Tax Guidance**: Step-by-step educational modules about Indian crypto tax laws
- **Audit-Ready Reports**: Downloadable PDF reports formatted for Schedule VDA compliance
- **Visual Dashboard**: Charts and analytics for transaction insights
- **Secure Local Storage**: All data processed client-side using browser localStorage

### Tax Components Calculated
1. **30% Tax on Gains**: Flat tax rate on net crypto profits
2. **1% TDS Credit**: Track TDS already deducted by exchanges
3. **18% GST**: Calculated on platform service fees
4. **Net Tax Payable**: Final liability after all deductions

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm installed
- Modern web browser

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd indian-crypto-tax-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 📊 How to Use

1. **Upload Transactions**: 
   - Click "Upload Transaction Data" 
   - Upload CSV/Excel file or download the sample template
   - Required columns: date, type, cryptocurrency, amount, pricePerUnit, totalValue, platformFee, tdsDeducted

2. **Review Tax Summary**:
   - View comprehensive breakdown of gains, losses, and tax liability
   - See TDS credits and GST calculations
   - Check net tax payable amount

3. **Generate Reports**:
   - Download PDF report formatted for Schedule VDA
   - Use for Income Tax Return (ITR) filing

4. **Learn About Crypto Tax**:
   - Read interactive guidance on Indian crypto tax laws
   - Understand 30% tax, TDS, and GST requirements

## 🛠️ Technologies Used

- **Frontend**: React 18 with TypeScript
- **UI Framework**: shadcn-ui components
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **File Parsing**: PapaParse (CSV), SheetJS (Excel)
- **PDF Generation**: jsPDF
- **Build Tool**: Vite
- **State Management**: React hooks

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx                 # Landing hero section
│   ├── FileUpload.tsx          # File upload interface
│   ├── TaxSummaryCard.tsx      # Tax breakdown display
│   ├── TransactionTable.tsx    # Transaction history table
│   ├── TaxGuidance.tsx         # Educational content
│   ├── ReportGenerator.tsx     # PDF report generation
│   └── ui/                     # shadcn-ui components
├── types/
│   └── transaction.ts          # TypeScript interfaces
├── utils/
│   ├── taxCalculations.ts      # Tax computation logic
│   └── fileParser.ts           # CSV/Excel parsing
├── pages/
│   └── Index.tsx               # Main application page
└── index.css                   # Design system & tokens
```

## 🎨 Design System

The app uses a professional fintech design system with:
- **Primary Color**: Deep blue (#0A2351) - Trust and finance
- **Secondary Color**: Vibrant green (#22C55E) - Growth and profits  
- **Accent Color**: Saffron (#FF9933) - Indian market identity
- **Semantic Tokens**: All colors, gradients, and styles defined in design system
- **Responsive Design**: Mobile-first approach

## 🔒 Security & Privacy

- **Client-Side Processing**: All calculations performed in browser
- **No Backend**: No data sent to external servers
- **Local Storage**: Transactions stored in browser localStorage
- **Data Privacy**: Users maintain complete control of their data

## ⚖️ Legal Compliance

This application is designed based on:
- Finance Act 2022
- Section 115BBH (30% tax on VDA gains)
- Section 194S (1% TDS on crypto transactions)
- Schedule VDA reporting requirements

**Disclaimer**: This tool is for educational and informational purposes only. Tax calculations are estimates. Users should consult a qualified Chartered Accountant for personalized tax advice.

## 📝 Sample Data Format

CSV/Excel files should include these columns:
```
date,type,cryptocurrency,amount,pricePerUnit,totalValue,platformFee,tdsDeducted,exchange
2024-01-15,BUY,BTC,0.5,4200000,2100000,2100,0,WazirX
2024-03-05,SELL,BTC,0.3,4500000,1350000,1350,13500,WazirX
```

Download the sample template from the app for reference.

## 🚀 Deployment

Deploy via [Lovable](https://lovable.dev/projects/4dc2582a-6013-46ee-9875-7d22d3ebf525):
- Click Share → Publish
- Optional: Connect custom domain in Project Settings

## 🤝 Contributing

Contributions welcome! This is an open-source educational project.

## 📄 License

This project is provided as-is for educational purposes.

## 🔗 Resources

- [Indian Income Tax Act](https://incometaxindia.gov.in/)
- [Finance Act 2022](https://www.incometax.gov.in/iec/foportal/)
- [Crypto Tax Guidelines](https://www.incometax.gov.in/)

---

Built with ❤️ for Indian crypto taxpayers
