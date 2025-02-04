import { ArrowRightOutlined } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

interface HighlightCardProps {
  title: string;
  description: string;
  link: string;
  className?: string;
}

export const HighlightCard = ({ title, description, link, className = "" }: HighlightCardProps) => {
  return (
    <Link to={link} className={`block ${className}`}>
      <Card 
        hoverable
        style={{ 
          background: '#141414',
          borderColor: '#333333',
        }}
        className="h-full transition-all duration-300 hover:translate-y-[-2px]"
      >
        <Title level={4} style={{ color: '#fff', marginBottom: '16px' }}>{title}</Title>
        <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)', marginBottom: '24px' }}>
          {description}
        </Paragraph>
        <div className="flex items-center text-blue-400">
          <span className="mr-2 font-medium">Learn more</span>
          <ArrowRightOutlined />
        </div>
      </Card>
    </Link>
  );
};