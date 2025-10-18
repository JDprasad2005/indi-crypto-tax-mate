import { Button } from '@/components/ui/button';
import { Calculator, FileText, Shield, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-crypto-tax.jpg';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 opacity-5">
        <img 
          src={heroImage} 
          alt="Crypto tax visualization" 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-foreground lg:text-6xl">
            Simplify Your Crypto Tax Compliance
          </h1>
          <p className="mb-8 text-lg text-muted-foreground lg:text-xl">
            India's first comprehensive crypto tax calculator. Automate 30% gains tax, 
            track 1% TDS, calculate 18% GST, and generate audit-ready reports for Schedule VDA.
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              variant="outline"
              className="border-border hover:bg-muted transition-smooth"
            >
              <FileText className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="glass-card flex flex-col items-center rounded-lg p-6 transition-smooth hover:shadow-glow-cyan">
              <div className="mb-4 rounded-full bg-secondary/20 p-3 border border-secondary/30">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                30% Tax on Gains
              </h3>
              <p className="text-sm text-muted-foreground">
                Automatically calculated on net crypto profits
              </p>
            </div>

            <div className="glass-card flex flex-col items-center rounded-lg p-6 transition-smooth hover:shadow-glow-cyan">
              <div className="mb-4 rounded-full bg-primary/20 p-3 border border-primary/30">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                1% TDS Tracking
              </h3>
              <p className="text-sm text-muted-foreground">
                Track TDS deductions and claim credits
              </p>
            </div>

            <div className="glass-card flex flex-col items-center rounded-lg p-6 transition-smooth hover:shadow-glow-cyan">
              <div className="mb-4 rounded-full bg-accent/20 p-3 border border-accent/30">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Schedule VDA Ready
              </h3>
              <p className="text-sm text-muted-foreground">
                Audit-ready reports for Income Tax filing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
