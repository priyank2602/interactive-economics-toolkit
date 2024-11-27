import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { HighlightCard } from "@/components/HighlightCard";
import { Footer } from "@/components/Footer";
import { Typography, Space } from "antd";

const { Title, Paragraph } = Typography;

const Index = () => {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 space-y-12 flex-grow">
        <div className="text-center mb-8 space-y-4">
          <Title style={{ color: '#fff', fontSize: '48px', marginBottom: '16px' }}>
            Interactive Economic Analysis Tool
          </Title>
          <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '18px' }}>
            A self-improving analysis layer for LLM applications, enabling personalized
            AI experiences that save costs and delight users.
          </Paragraph>
        </div>

        <Space direction="vertical" size="large" className="w-full">
          <SearchBar />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        </Space>
      </main>

      <Footer />
    </div>
  );
};

export default Index;