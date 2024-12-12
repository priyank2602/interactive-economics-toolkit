import { VictoryLine, VictoryChart, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory';
import { format, subDays } from 'date-fns';

// Generate dummy data for JPMC stock price
const generateDummyData = (days: number) => {
  const data = [];
  const basePrice = 175; // JPMC's approximate stock price
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const randomVariation = Math.random() * 10 - 5; // Random value between -5 and 5
    data.push({
      x: format(date, 'MMM dd'),
      y: +(basePrice + randomVariation).toFixed(2)
    });
  }
  
  return data;
};

interface StockPriceChartProps {
  days?: number;
  isLoading?: boolean;
}

export const StockPriceChart = ({ days = 30, isLoading = false }: StockPriceChartProps) => {
  const data = generateDummyData(days);

  if (isLoading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-[rgba(255,255,255,0.65)]">Loading stock price data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <VictoryChart
        height={300}
        width={undefined}
        padding={{ top: 20, bottom: 40, left: 50, right: 30 }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${datum.x}: $${datum.y}`}
            labelComponent={
              <VictoryTooltip
                style={{ fill: '#0f172a' }}
                flyoutStyle={{
                  stroke: '#e2e8f0',
                  fill: 'white',
                }}
              />
            }
          />
        }
      >
        <VictoryAxis
          tickFormat={(t) => t}
          style={{
            axis: { stroke: '#e2e8f0' },
            ticks: { stroke: '#e2e8f0' },
            tickLabels: { fill: 'rgba(255,255,255,0.65)', fontSize: 10, angle: -45, textAnchor: 'end' }
          }}
          tickCount={8}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `$${t}`}
          style={{
            axis: { stroke: '#e2e8f0' },
            ticks: { stroke: '#e2e8f0' },
            tickLabels: { fill: 'rgba(255,255,255,0.65)', fontSize: 10 }
          }}
        />
        <VictoryLine
          data={data}
          style={{
            data: { stroke: '#9b87f5', strokeWidth: 2 }
          }}
          animate={{
            duration: 500,
            onLoad: { duration: 500 }
          }}
        />
      </VictoryChart>
    </div>
  );
};