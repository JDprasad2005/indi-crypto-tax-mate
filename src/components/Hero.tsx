import { Button } from '@/components/ui/button';
import { Calculator, FileText, Shield, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-crypto-tax.jpg';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <img 
          src={heroImage} 
          alt="Crypto tax visualization" 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground lg:text-6xl">
            Simplify Your Crypto Tax Compliance
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/90 lg:text-xl">
            India's first comprehensive crypto tax calculator. Automate 30% gains tax, 
            track 1% TDS, calculate 18% GST, and generate audit-ready reports for Schedule VDA.
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Tax Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <FileText className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-card/10 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-secondary p-3">
                <TrendingUp className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-primary-foreground">
                30% Tax on Gains
              </h3>
              <p className="text-sm text-primary-foreground/80">
                Automatically calculated on net crypto profits
              </p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-card/10 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-accent p-3">
                <Shield className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-primary-foreground">
                1% TDS Tracking
              </h3>
              <p className="text-sm text-primary-foreground/80">
                Track TDS deductions and claim credits
              </p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-card/10 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-primary-light p-3">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-primary-foreground">
                Schedule VDA Ready
              </h3>
              <p className="text-sm text-primary-foreground/80">
                Audit-ready reports for Income Tax filing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
