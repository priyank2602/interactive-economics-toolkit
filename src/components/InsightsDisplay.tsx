import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockPriceChart } from "./StockPriceChart";
import { Link } from "react-router-dom";

interface InsightsDisplayProps {
  query: string | null;
  insights: any;
  showChart: boolean;
}

export const InsightsDisplay = ({ query, insights, showChart }: InsightsDisplayProps) => {
  const showTiles = typeof insights === 'object' && insights.showTiles;

  return (
    <div className="mt-8 animate-fade-in">
      {showChart && (
        <div className="mt-8">
          <div className="bg-[#141414] border border-[#333333] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Stock Price Trend</h3>
            <StockPriceChart />
          </div>
        </div>
      )}

      {showTiles ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.tiles.map((tile: { title: string; content: string }, index: number) => (
            index === 0 ? (
              <Link to="/jpmc-highlights" key={index}>
                <Card className="bg-[#141414] border-[#333333] text-white transition-all duration-300 hover:translate-y-[-2px]">
                  <CardHeader>
                    <CardTitle className="text-xl">{tile.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary">{tile.content}</p>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card key={index} className="bg-[#141414] border-[#333333] text-white">
                <CardHeader>
                  <CardTitle className="text-xl">{tile.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary">{tile.content}</p>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      ) : (
        <div className="bg-[#141414] border border-[#333333] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-white">Insights</h3>
          <p className="text-secondary text-sm mb-4">
            Data collection completed → Market trends analyzed → Actionable insights generated
          </p>
          <p className="text-secondary whitespace-pre-line">
            {insights.text}
          </p>
        </div>
      )}
    </div>
  );
};