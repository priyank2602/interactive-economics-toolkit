import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { HighlightCard } from "@/components/HighlightCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 space-y-12">
        <SearchBar />
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HighlightCard
            title="JPMC Highlights"
            description="Latest insights and analysis from JPMorgan Chase"
            link="/jpmc-highlights"
            className="animate-fade-in"
          />
          <HighlightCard
            title="Barclays Highlights"
            description="Key market updates and forecasts from Barclays"
            link="/barclays-highlights"
            className="animate-fade-in [animation-delay:100ms]"
          />
          <HighlightCard
            title="Did you know?"
            description="Interesting facts and insights about the global economy"
            link="/facts"
            className="animate-fade-in [animation-delay:200ms]"
          />
        </section>
      </main>
    </div>
  );
};

export default Index;