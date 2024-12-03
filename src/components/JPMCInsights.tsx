import { useState, useEffect } from "react";
import { Card } from "./ui/card";

const insightText = `
JPMorgan Chase (JPMC) demonstrates strong potential for continued growth and market leadership:

Forecasting:
• Expected revenue growth of 8-10% in the next fiscal year
• Digital transformation initiatives projected to drive 15% efficiency improvements
• Market share expected to expand in key emerging markets

Future Performance:
• Strategic investments in AI and blockchain technology position JPMC for long-term success
• Continued expansion in wealth management services expected to drive fee income growth
• Strong capital position enables strategic acquisitions and market expansion

Cost Management:
• Operational efficiency program targeting $2B in annual savings
• Technology modernization expected to reduce infrastructure costs by 20%
• Branch optimization strategy to improve cost-to-serve metrics
`;

export const JPMCInsights = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setInsights(insightText);
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Generating Insights for JPMC</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">JPMC Insights</h2>
      <Card className="p-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {insights.split('\n').map((line, index) => (
            <p key={index} className="my-2">{line}</p>
          ))}
        </div>
      </Card>
    </div>
  );
};