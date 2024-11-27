import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchResultsBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`, { replace: true });
    }
  };

  return (
    <div className="w-full">
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
    </div>
  );
};