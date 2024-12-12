import { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

const annualData = [
  { year: '2020', dividend: 3.60 },
  { year: '2021', dividend: 3.80 },
  { year: '2022', dividend: 4.20 },
  { year: '2023', dividend: 4.60 },
  { year: '2024', dividend: 5.00 },
];

const quarterlyData = [
  { quarter: 'Q1 2024', dividend: 1.25 },
  { quarter: 'Q2 2024', dividend: 1.25 },
  { quarter: 'Q3 2024', dividend: 1.25 },
  { quarter: 'Q4 2024', dividend: 1.25 },
];

export const DividendChart = () => {
  const [showAnnual, setShowAnnual] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">JPMC Dividend History</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAnnual(true)}
            className={`px-3 py-1 rounded text-sm ${
              showAnnual 
                ? 'bg-primary text-white' 
                : 'bg-[#1e1e1e] text-gray-400 hover:text-white'
            }`}
          >
            Annual
          </button>
          <button
            onClick={() => setShowAnnual(false)}
            className={`px-3 py-1 rounded text-sm ${
              !showAnnual 
                ? 'bg-primary text-white' 
                : 'bg-[#1e1e1e] text-gray-400 hover:text-white'
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>
      
      <div className="h-[300px]">
        <VictoryChart
          height={300}
          width={undefined}
          padding={{ top: 20, bottom: 40, left: 50, right: 30 }}
          domainPadding={{ x: 25 }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => 
                `${showAnnual ? datum.year : datum.quarter}: $${datum.dividend}`
              }
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
              tickLabels: { 
                fill: 'rgba(255,255,255,0.65)', 
                fontSize: 10,
                angle: -45,
                textAnchor: 'end'
              }
            }}
            tickCount={8}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => `$${t}`}
            style={{
              axis: { stroke: '#e2e8f0' },
              ticks: { stroke: '#e2e8f0' },
              tickLabels: { 
                fill: 'rgba(255,255,255,0.65)', 
                fontSize: 10 
              }
            }}
          />
          <VictoryBar
            data={showAnnual ? annualData : quarterlyData}
            x={showAnnual ? "year" : "quarter"}
            y="dividend"
            style={{
              data: { 
                fill: '#9b87f5',
                width: 25
              }
            }}
            animate={{
              duration: 500,
              onLoad: { duration: 500 }
            }}
            cornerRadius={{ top: 4 }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};