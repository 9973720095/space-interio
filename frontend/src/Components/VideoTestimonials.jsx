import React, { useState } from 'react';
import { Row, Col, Typography, Card, Button, Modal } from 'antd';
import { StarFilled, EnvironmentOutlined, CloseOutlined } from '@ant-design/icons';
import './css/VideoTestimonials.css';

const { Title, Paragraph, Text } = Typography;

const testimonialData = [
  {
    id: 1,
    clientName: "Rohan & Sakshi Sharma",
    location: "DLF Phase 3, Gurugram",
    rating: 5,
    reviewTitle: "Absolute Value for Money Implementation",
    reviewSnippet: "Space Interio completely transformed our 3BHK flat into a premium luxury lounge well within our target budget constraints. Their absolute on-time site execution and material finishing benchmarks were highly commendable. Every single corner reflects pure structural excellence, and the execution phase was seamlessly handled without a single operational delay.",
    videoUrl: "https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846976/AQNl0l9C63jqUOa2q-v6aF-PSRn7X7uY9Z4AQCv9otpr5xqW0RVdnHWMIVvYM8IPicSmaoxBZwcurCuizf__QIgs77o5CLINA7jnru4_kcmhdw.webm"
  },
  {
    id: 2,
    clientName: "Amit Kumar",
    location: "Sector 75, Noida",
    rating: 5,
    reviewTitle: "Highly Transparent Pricing Structure",
    reviewSnippet: "The absolute transparency in pricing models coupled with their signature 10-year reliable material coverage options set them far apart. There were no hidden costs from the estimation phase to handover. The interior designer team accommodated our architectural modifications multiple times while ensuring structural integrity and deadline parameters remained untouched.",
    videoUrl: "https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846971/AQNqIaCU_-L4b5BOQTJLKgQS--Dum1Q4v5A_VsmLok7fcxrt0B7m8mnjduJVZOBeoKRQV_evQOl-oh-CAhZy26yyijtUaXsydmb4uoM_olmkpr.mp4"
  },
  {
    id: 3,
    clientName: "Meenakshi Iyer",
    location: "Vasant Kunj, New Delhi",
    rating: 5,
    reviewTitle: "Exceptional Modular Kitchen Space Optimization",
    reviewSnippet: "Their space-saving interior optimization blueprints engineered our compact kitchen layout into an incredibly organized, highly functional workspace. Excellent modular accessories implementation! From soft-close heavy hydraulic drawers to anti-scratch micro-textures, they configured a perfect premium cooking environment that elevated our lifestyle standards.",
    videoUrl: "https://res.cloudinary.com/diosq0s7w/video/upload/q_auto/f_auto/v1778846976/AQNl0l9C63jqUOa2q-v6aF-PSRn7X7uY9Z4AQCv9otpr5xqW0RVdnHWMIVvYM8IPicSmaoxBZwcurCuizf__QIgs77o5CLINA7jnru4_kcmhdw.webm"
  }
];

const VideoTestimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActiveItem, setSelectedActiveItem] = useState(null);

  const triggerPopupTrigger = (item) => {
    setSelectedActiveItem(item);
    setIsModalOpen(true);
  };

  const handleClosePopup = () => {
    setIsModalOpen(false);
    setSelectedActiveItem(null);
  };

  return (
    <section className="testimonials-section-wrapper" aria-labelledby="testimonials-main-heading">
      <div className="fluid-layout-bounds">
        
        {/* SEO STRUCTURAL HEADER GROUP */}
        <header className="testimonials-header">
          <Text className="red-uppercase-tag">REAL CLIENT HANDOVERS</Text>
          <Title level={2} id="testimonials-main-heading" className="testimonials-main-title">
            Verified Customer Transformations Across Delhi NCR
          </Title>
          <Paragraph className="testimonials-subtext">
            Don't just take our word for it. Watch native site walkthroughs and experiential feedback shared directly by our certified property owners.
          </Paragraph>
        </header>

        {/* 100% RESPONSIVE DYNAMIC FEEDBACK MATRIX */}
        <Row gutter={[32, 32]} justify="center">
          {testimonialData.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.id}>
              <Card className="testimonial-video-card" hoverable bordered={false}>
                
                {/* Native Autoplay Video Sub-Frame Container */}
                <div className="video-viewport-frame">
                  <video 
                    src={item.videoUrl}
                    className="autoplay-card-video"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    preload="metadata"
                  />
                  <span className="live-handover-badge">VERIFIED LIVE HANDOVER</span>
                </div>

                {/* Structured Body Content */}
                <blockquote className="testimonial-content-card-body">
                  <div className="rating-stars-row">
                    {[...Array(item.rating)].map((_, idx) => (
                      <StarFilled key={idx} className="star-gold" />
                    ))}
                  </div>
                  
                  <Title level={4} className="review-inner-headline">
                    {item.reviewTitle}
                  </Title>
                  
                  {/* Clean CSS Truncated Paragraph Description */}
                  <Paragraph className="testimonial-quote-text line-clamp-3">
                    "{item.reviewSnippet}"
                  </Paragraph>
                  
                  <Button 
                    type="link" 
                    className="read-more-popup-btn" 
                    onClick={() => triggerPopupTrigger(item)}
                  >
                    Read More...
                  </Button>
                  
                  <footer className="testimonial-client-footer">
                    <Title level={5} className="client-meta-name">{item.clientName}</Title>
                    <Text type="secondary" className="client-meta-geo">
                      <EnvironmentOutlined style={{ marginRight: '4px' }} />
                      {item.location}
                    </Text>
                  </footer>
                </blockquote>

              </Card>
            </Col>
          ))}
        </Row>

        {/* HIGH-FIDELITY CENTER ALIGNED RESPONSIVE POPUP MODAL */}
        <Modal
          open={isModalOpen}
          onCancel={handleClosePopup}
          footer={null}
          centered
          width={700}
          closeIcon={<CloseOutlined className="modal-close-icon-custom" />}
          className="premium-testimonial-popup"
        >
          {selectedActiveItem && (
            <article className="popup-layout-split-view">
              <div className="popup-video-container">
                <video 
                  src={selectedActiveItem.videoUrl} 
                  controls 
                  autoPlay 
                  className="popup-native-video"
                />
              </div>
              <div className="popup-meta-description-details">
                <div className="rating-stars-row">
                  {[...Array(selectedActiveItem.rating)].map((_, idx) => (
                    <StarFilled key={idx} className="star-gold" />
                  ))}
                </div>
                <Title level={3} className="popup-main-review-heading">
                  {selectedActiveItem.reviewTitle}
                </Title>
                <Paragraph className="popup-full-scrollable-quote">
                  "{selectedActiveItem.reviewSnippet}"
                </Paragraph>
                <div className="popup-client-footer-node">
                  <Title level={4} className="popup-client-headline-name">{selectedActiveItem.clientName}</Title>
                  <Text type="secondary" className="popup-client-sub-geo">
                    <EnvironmentOutlined style={{ marginRight: '6px' }} />
                    {selectedActiveItem.location}
                  </Text>
                </div>
              </div>
            </article>
          )}
        </Modal>

      </div>
    </section>
  );
};

export default VideoTestimonials;