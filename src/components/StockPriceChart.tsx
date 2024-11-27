import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

// Generate dummy data for the last 30 days
const generateDummyData = () => {
  const data = [];
  const basePrice = 150;
  
  for (let i = 30; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const randomVariation = Math.random() * 20 - 10; // Random value between -10 and 10
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
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="date" 
            stroke="#8E9196"
            tick={{ fill: '#8E9196' }}
          />
          <YAxis 
            stroke="#8E9196"
            tick={{ fill: '#8E9196' }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#141414',
              border: '1px solid #333',
              borderRadius: '4px'
            }}
            labelStyle={{ color: '#8E9196' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#9b87f5"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#9b87f5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};