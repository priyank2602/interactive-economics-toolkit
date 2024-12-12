interface Tile {
  title: string;
  content: string;
}

interface InsightResult {
  showTiles?: boolean;
  tiles?: Tile[];
  text?: string;
}

export const getInsightText = (query: string | null): InsightResult => {
  if (!query) return { text: "" };
  
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('build story') && lowerQuery.includes('ceo')) {
    return {
      showTiles: true,
      tiles: [
        {
          title: "Strategic Vision",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "Financial Performance",
          content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          title: "Market Position",
          content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
          title: "Future Outlook",
          content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ]
    };
  }
  
  if (lowerQuery.includes('tesla')) {
    return {
      text: "Based on the analyzed market trends and financial indicators, we observe significant volatility in the stock price over the past month. The price movements suggest a general upward trend with notable resistance levels. Consider monitoring key support and resistance zones for potential trading opportunities."
    };
  }
  
  if (lowerQuery.includes('cib') || lowerQuery.includes('investment banking')) {
    return {
      text: "In the context provided, the query \"Are there any notable fluctuations in CIB (Corporate & Investment Banking) or IB (Investment Banking) performance metrics?\" is best addressed through financial commentary. The insights from the CEOs of JPMorgan Chase and Bank of America highlight notable positive fluctuations in performance metrics. JPMorgan Chase experienced a 21% increase in Investment Banking fees, driven by improved activity in Debt Capital Markets and Equity Capital Markets, indicating a significant positive fluctuation in IB performance. Additionally, there was strong growth in Payments fees within the CIB sector. Bank of America reported consistent positive performance in its Global Markets business, achieving its ninth consecutive quarter of year-over-year revenue growth in sales and trading, contributing to overall growth and profitability. These commentaries provide a comprehensive analysis of the positive trends in CIB and IB performance metrics for both banks."
    };
  }
  
  if (lowerQuery.includes('revenue')) {
    return {
      text: `The revenue composition analysis of Bank of America and JPMorgan Chase reveals distinct trends and strategic insights based on CEO commentaries and financial data.

Bank of America
CEO Brian Moynihan emphasizes the strength and earnings power of their Consumer Banking segment, complemented by growth in Global Markets, Global Banking, and Wealth Management. Notably, the Global Markets business has shown consistent year-over-year revenue growth in sales and trading, delivering double-digit returns. This reflects a strategic focus on diversifying revenue streams and investing in high-growth areas to enhance shareholder value.

Revenue Highlights:
Total Business Lending Revenue decreased slightly from $2,692 million in Q2 2023 to $2,565 million in Q2 2024.
Total Global Transaction Services Revenue declined from $2,923 million in Q2 2023 to $2,561 million in Q2 2024.
Advisory Revenue, however, experienced significant growth, increasing from $540 million in Q2 2023 to $785 million in Q2 2024.
This suggests a strategic pivot toward advisory services, likely driven by market demand and the bank's focus on high-margin business areas.

JPMorgan Chase
CEO Jamie Dimon highlights strong results underpinned by capital flexibility and growth initiatives. Despite a 4% sequential decline in Net Interest Income (NII), the bank demonstrated robust performance across its business lines.

Revenue Highlights:
The Corporate & Investment Bank (CIB) segment saw a 21% increase in investment banking fees, reflecting improvements in Debt Capital Markets (DCM) and Equity Capital Markets (ECM) activity.
The Commercial Banking (CB) segment achieved strong growth in payments fees and added new client relationships.
Asset & Wealth Management (AWM) reported a 14% increase in asset management fees, supported by continued strong net inflows.`
    };
  }
  
  return {
    text: "Based on the analyzed data and trends, we've identified key patterns and insights relevant to your query. The analysis suggests important developments that warrant attention and could influence decision-making processes."
  };
};