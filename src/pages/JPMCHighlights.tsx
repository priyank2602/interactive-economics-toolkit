import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { HighlightCard } from "@/components/HighlightCard";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const JPMCHighlights = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <Link to="/" className="inline-flex items-center text-secondary hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-6 animate-slide-in">
            <div className="p-6 bg-white rounded-lg border shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">CEO Commentary</h2>
              <div className="prose">
                <p className="text-secondary">
                  "Our firm delivered strong results in 2023, including a record revenue of $40.1 billion. 
                  We continue to make significant investments in technology, innovation and talent to better 
                  serve our clients and customers."
                </p>
                <p className="mt-4 text-sm text-secondary">
                  - Jamie Dimon, CEO JPMorgan Chase
                </p>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Next Best Action</h3>
              <SearchBar />
            </div>
          </section>
          
          <section className="space-y-6 animate-fade-in [animation-delay:200ms]">
            <h2 className="text-2xl font-semibold">Related Companies</h2>
            <div className="grid gap-4">
              <HighlightCard
                title="Goldman Sachs"
                description="Latest updates and market analysis"
                link="/goldman-sachs"
              />
              <HighlightCard
                title="Morgan Stanley"
                description="Investment strategies and insights"
                link="/morgan-stanley"
              />
              <HighlightCard
                title="Bank of America"
                description="Economic forecasts and trends"
                link="/bank-of-america"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default JPMCHighlights;