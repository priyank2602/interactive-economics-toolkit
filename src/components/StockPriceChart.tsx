import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

// Generate dummy data for JPMC stock price
const generateDummyData = () => {
  const data = [];
  const basePrice = 175; // JPMC's approximate stock price
  
  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const randomVariation = Math.random() * 10 - 5; // Random value between -5 and 5
    data.push({
      date: format(date, 'MMM dd'),
      price: +(basePrice + randomVariation).toFixed(2)
    });
  }
  
  return data;
};

const data = generateDummyData();

export const StockPriceChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-muted-foreground"
          />
          <YAxis 
            className="text-muted-foreground"
            domain={['auto', 'auto']}
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
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};