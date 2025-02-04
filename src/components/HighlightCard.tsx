
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
          background: '#FFFFFF',
          borderColor: '#E5E7EB',
          boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
        }}
        className="h-full transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
      >
        <Title level={4} style={{ color: '#101828', marginBottom: '16px', fontWeight: '600' }}>{title}</Title>
        <Paragraph style={{ color: '#667085', marginBottom: '24px' }}>
          {description}
        </Paragraph>
        <div className="flex items-center text-[#7F56D9]">
          <span className="mr-2 font-medium">Learn more</span>
          <ArrowRightOutlined />
        </div>
      </Card>
    </Link>
  );
};
