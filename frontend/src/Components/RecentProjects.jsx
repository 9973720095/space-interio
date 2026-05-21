import React from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import './css/RecentProjects.css';

const { Title, Text } = Typography;

const projects = [
  { id: 1, title: 'Modern Minimalism', desc: '3BHK, Gurugram', img: 'project1.jpg' },
  { id: 2, title: 'Classic Luxury', desc: '4BHK, Delhi', img: 'project2.jpg' },
  { id: 3, title: 'Smart Modular Kitchen', desc: 'Indore, MP', img: 'project3.jpg' }
];

const RecentProjects = () => {
  return (
    <section className="projects-section">
      <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
        Our Recent Transformations
      </Title>
      <Row gutter={[24, 24]}>
        {projects.map((proj) => (
          <Col xs={24} md={8} key={proj.id}>
            <Card 
              className="project-card"
              cover={<div className="project-img-placeholder">Image Here</div>}
            >
              <Title level={4}>{proj.title}</Title>
              <Text type="secondary">{proj.desc}</Text>
              <br /><br />
              <Button type="link">View Gallery →</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};
export default RecentProjects;