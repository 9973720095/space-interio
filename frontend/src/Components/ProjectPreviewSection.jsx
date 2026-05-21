import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { SafetyCertificateOutlined, AppstoreOutlined, ThunderboltOutlined } from '@ant-design/icons';
import './css/ProjectPreview.css'; // Naya CSS file

const { Title, Text } = Typography;

const features = [
  { icon: <AppstoreOutlined />, title: 'Design Library', desc: 'Choose from 500+ curated layouts' },
  { icon: <SafetyCertificateOutlined />, title: 'Verified Materials', desc: '10-year warranty on modular units' },
  { icon: <ThunderboltOutlined />, title: 'Fast Execution', desc: 'Pre-fabricated off-site for speed' }
];

const ProjectPreviewSection = () => {
  return (
    <section className="project-preview-section">
      <div className="preview-container">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '50px', color: '#fff' }}>
          Why Space Interio ?
        </Title>
        
        <Row gutter={[40, 40]}>
          {features.map((item, index) => (
            <Col xs={24} md={8} key={index}>
              <Card className="preview-card" hoverable>
                <div className="icon-wrapper">{item.icon}</div>
                <Title level={4}>{item.title}</Title>
                <Text type="secondary">{item.desc}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ProjectPreviewSection;