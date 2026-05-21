import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Typography, Tabs, Card, Button } from 'antd';
import { 
  SmileOutlined, 
  ExperimentOutlined, 
  HomeOutlined, 
  CheckCircleOutlined, 
  ArrowRightOutlined 
} from '@ant-design/icons';
import './css/StatsAndGallery.css';

const { Title, Paragraph, Text } = Typography;

// High-Performance SEO Friendly Count-Up Component
const DynamicSEOUpCounter = ({ targetValue, duration = 1800 }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const containerRef = useRef(null);
  const isTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTriggered.current) {
          isTriggered.current = true;
          let startTimestamp = null;
          const finalTarget = parseInt(targetValue, 10);

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const progressPercentage = Math.min(progress / duration, 1);
            
            // Easing function for premium buttery feel
            const easeOutQuad = (t) => t * (2 - t);
            const currentComputedNumber = Math.floor(easeOutQuad(progressPercentage) * finalTarget);
            
            setCurrentCount(currentComputedNumber);

            if (progressPercentage < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCurrentCount(finalTarget);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 } // Triggers early when 15% of box is inside window view
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [targetValue, duration]);

  return (
    <span ref={containerRef} className="animated-counter-digit">
      {currentCount}
      {targetValue.includes('+') ? '+' : targetValue.includes('%') ? '%' : ''}
    </span>
  );
};

const statsMetricsData = [
  { icon: <SmileOutlined />, target: "566+", label: "Happy Customers" },
  { icon: <ExperimentOutlined />, target: "10+", label: "Years Experience" },
  { icon: <HomeOutlined />, target: "39+", label: "Design Experts" },
  { icon: <CheckCircleOutlined />, target: "100%", label: "Material Safety" }
];

const galleryProjectsData = {
  living: [
    { title: "Modern Minimalist Living Room", location: "Gurugram, HR", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600" },
    { title: "Premium Wooden Textured Lounge", location: "Noida, UP", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600" }
  ],
  kitchen: [
    { title: "Sleek Modular L-Shaped Kitchen", location: "South Delhi", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600" },
    { title: "Matte Charcoal Luxury Kitchen", location: "Dwarka, Delhi", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" }
  ],
  wardrobe: [
    { title: "Walk-in Glass Wardrobe Setup", location: "Vasant Kunj, Delhi", img: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1778583851/Gemini_Generated_Image_bmac1hbmac1hbmac_ttyyij.png" }
  ]
};

const StatsAndGallery = () => {
  const buildGalleryGrid = (items) => (
    <Row gutter={[24, 24]} justify="center">
      {items.map((project, idx) => (
        <Col xs={24} sm={12} lg={8} key={idx}>
          <Card
            className="premium-seo-card"
            hoverable
            cover={
              <div className="zoom-img-container">
                <img 
                  loading="lazy" 
                  alt={`${project.title} architectural design structure by Space Interio`} 
                  src={project.img} 
                  className="fluid-gallery-img"
                />
              </div>
            }
          >
            <Card.Meta 
              title={<span className="premium-card-title">{project.title}</span>}
              description={
                <div className="premium-card-footer">
                  <Text type="secondary" className="geo-tag-text">{project.location}</Text>
                  <Button type="link" icon={<ArrowRightOutlined />} className="red-link-arrow" aria-label={`Learn more about ${project.title}`} />
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );

  const parsedTabPanels = [
    { key: '1', label: 'Living Rooms Area', children: buildGalleryGrid(galleryProjectsData.living) },
    { key: '2', label: 'Modular Kitchens', children: buildGalleryGrid(galleryProjectsData.kitchen) },
    { key: '3', label: 'Luxury Wardrobes', children: buildGalleryGrid(galleryProjectsData.wardrobe) }
  ];

  return (
    <section className="global-activity-container" aria-label="Remarkable Results and Live Showcase">
      
      {/* VIDEO MID-SECTION INTRO TEXT (No Sections Left Out) */}
      <div className="workspace-intro-block">
        <div className="fluid-layout-bounds">
          <Text className="red-uppercase-tag">YOUR SPACE, YOUR STORY</Text>
          <Title level={2} className="dark-block-heading">
            Remarkable Results, Handcrafted Interior Perfection
          </Title>
          <Paragraph className="dark-block-paragraph">
            We convert empty structures into livable spaces using high-grade components, personalized design planning blueprints, and custom manufacturing.
          </Paragraph>
        </div>
      </div>

      {/* DYNAMIC COUNT-UP COUNTER MATRIX */}
      <div className="black-counter-strip-wrapper">
        <div className="fluid-layout-bounds">
          <Row gutter={[16, 32]} justify="center" align="middle">
            {statsMetricsData.map((metric, index) => (
              <Col xs={12} sm={12} md={6} key={index} className="flex-center-col">
                <article className="glass-metric-card">
                  <div className="metric-icon-element">{metric.icon}</div>
                  <Title level={2} className="metric-numerical-display">
                    <DynamicSEOUpCounter targetValue={metric.target} />
                  </Title>
                  <Text className="metric-label-display">{metric.label}</Text>
                </article>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* LIVE PROJECTS FILTER WORKSPACE */}
      <div className="live-portfolio-showcase section-container fluid-layout-bounds">
        <header className="portfolio-centered-header">
          <Text className="red-uppercase-tag">OUR LIVE WORKSPACE HUB</Text>
          <Title level={2} className="portfolio-main-title-text">
            Explore Actual Homes Executed Across Delhi NCR Regions
          </Title>
          <Paragraph className="portfolio-subtext-explain">
            No mockups. Dive straight into original site handovers categorized cleanly by architectural modules.
          </Paragraph>
        </header>

        <Tabs 
          defaultActiveKey="1" 
          items={parsedTabPanels}
          centered
          className="premium-seo-tabbar"
          animated={{ inkBar: true, tabPane: true }}
        />
      </div>
    </section>
  );
};

export default StatsAndGallery;