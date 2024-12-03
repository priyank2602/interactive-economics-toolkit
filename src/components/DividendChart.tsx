import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={showAnnual ? annualData : quarterlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey={showAnnual ? 'year' : 'quarter'} 
              className="text-muted-foreground"
            />
            <YAxis 
              className="text-muted-foreground"
              domain={[0, 'auto']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar 
              dataKey="dividend" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};