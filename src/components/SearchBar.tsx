import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Tag } from 'antd';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [recentSearches] = useState([
    "Build Story of the bank using CEO's opening statements",
    "Fluctuations in CIB (Corporate & Investment Banking) or IB (Investment Banking) performance metrics?",
    "Revenue composition changed compared to the last few quarters?",
    "Last 30 days stock price for Tesla"
  ]);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Input.Search
        placeholder="Ask about economic insights..."
        allowClear
        enterButton
        size="large"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
        prefix={<SearchOutlined />}
        style={{ 
          background: '#141414',
          borderColor: '#333333',
        }}
      />
      
      {recentSearches.length > 0 && (
        <Space direction="vertical" size="small" className="w-full">
          <div className="text-sm text-gray-400">Suggested Queries</div>
          <Space wrap>
            {recentSearches.map((search, index) => (
              <Tag
                key={index}
                onClick={() => setQuery(search)}
                style={{ 
                  background: '#141414',
                  borderColor: '#333333',
                  color: 'rgba(255, 255, 255, 0.85)',
                  cursor: 'pointer'
                }}
              >
                {search}
              </Tag>
            ))}
          </Space>
        </Space>
      )}
    </div>
  );
};