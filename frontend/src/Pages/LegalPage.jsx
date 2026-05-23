import React from 'react';
import { Card, Row, Col, Typography, Breadcrumb, Divider } from 'antd';
import { 
  SafetyCertificateOutlined, 
  BookOutlined, 
  CreditCardOutlined,
  HomeOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const LegalPage = ({ type = "LEGAL INFORMATION" }) => {

  const pageData = {
    'Privacy Policy': {
      icon: <SafetyCertificateOutlined />,
      content: (
        <>
          <Title level={3}>Privacy Policy</Title>
          <Paragraph>
            At <Text strong>Urbane Living</Text>, we value your privacy and are committed to protecting your personal data.
          </Paragraph>
          <Title level={4}>Information We Collect</Title>
          <ul>
            <li>Name, contact number, and email address</li>
            <li>Project requirements submitted through our online estimator</li>
            <li>Site location and preferences for design consultation</li>
          </ul>
          <Title level={4}>How We Use Your Data</Title>
          <Paragraph>
            We use your information only to provide services, improve our offerings, and communicate with you. 
            We do not sell, trade, or rent your personal data to third parties. All data is stored securely and 
            processed in accordance with applicable data protection laws.
          </Paragraph>
          <Title level={4}>Data Security</Title>
          <Paragraph>
            We implement industry-standard security measures including encryption, secure servers, and restricted 
            access to protect your personal information from unauthorized access, alteration, or disclosure.
          </Paragraph>
        </>
      )
    },
    'Disclaimer': {
      icon: <FileTextOutlined />,
      content: (
        <>
          <Title level={3}>Disclaimer</Title>
          <Paragraph>
            The budget estimates provided by our online tool are indicative and based on standard market rates as of May 2026.
          </Paragraph>
          <Title level={4}>Important Notes</Title>
          <ul>
            <li>Final project costs may vary depending on site conditions and structural requirements</li>
            <li>Material selection, brand preferences, and availability can impact final pricing</li>
            <li>Labor costs differ by location, complexity, and project timeline</li>
            <li>GST, transportation, and other applicable taxes are calculated separately</li>
            <li>Designs shown are for reference; actual execution may vary based on space constraints</li>
          </ul>
          <Paragraph type="secondary">
            For exact quotations and detailed BOQ, please schedule a site visit with our design team. 
            All prices are subject to change without prior notice based on market conditions.
          </Paragraph>
        </>
      )
    },
    'Terms & Conditions': {
      icon: <BookOutlined />,
      content: (
        <>
          <Title level={3}>Terms & Conditions</Title>
          <Title level={4}>1. Consultation & Estimates</Title>
          <Paragraph>
            Estimates provided are for initial planning purposes only and do not constitute a binding contract. 
            A detailed quotation will be provided after site measurement and design finalization.
          </Paragraph>
          
          <Title level={4}>2. Intellectual Property Rights</Title>
          <Paragraph>
            All designs, 3D renders, 2D layouts, and images shared by Urbane Living remain our intellectual 
            property unless specified otherwise in writing. Clients may not reproduce or share without permission.
          </Paragraph>
          
          <Title level={4}>3. Project Timeline</Title>
          <Paragraph>
            Delivery timelines mentioned are estimates and may vary based on material procurement, site readiness, 
            client approvals, and unforeseen circumstances. We strive to complete projects within committed timelines.
          </Paragraph>

          <Title level={4}>4. Payment Terms</Title>
          <Paragraph>
            Payment schedules will be defined in the project agreement. Typically: 50% advance, 40% during execution, 
            10% on handover. Delayed payments may result in project suspension.
          </Paragraph>

          <Title level={4}>5. Warranty</Title>
          <Paragraph>
            We provide warranty on modular units and workmanship as specified in the agreement. 
            Warranty does not cover damages due to misuse, natural wear, or third-party modifications.
          </Paragraph>
        </>
      )
    },
    'Refund Policy': {
      icon: <CreditCardOutlined />,
      content: (
        <>
          <Title level={3}>Refund Policy</Title>
          <Paragraph>
            We follow a transparent refund structure to ensure fairness for both clients and our team.
          </Paragraph>
          
          <Title level={4}>Non-Refundable Items</Title>
          <ul>
            <li>Booking or mobilization advance once material procurement has commenced</li>
            <li>Custom furniture or modular units that have entered production</li>
            <li>Site measurement, design consultation, and 3D visualization fees</li>
            <li>Materials already purchased or cut to size for your project</li>
          </ul>
          
          <Title level={4}>Refundable Cases</Title>
          <Paragraph>
            100% refund if project is cancelled before any material purchase or design finalization. 
            Partial refund may be applicable based on work completed stage.
          </Paragraph>

          <Title level={4}>Processing Time</Title>
          <Paragraph>
            Approved refunds will be processed within 7-10 business days to the original payment method. 
            Bank processing may take additional 3-5 days.
          </Paragraph>
        </>
      )
    }
  };

  const currentPage = pageData[type] || pageData['Disclaimer'];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #001529 0%, #003366 100%)', 
        padding: 'clamp(60px, 10vw, 80px) 24px 60px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 'clamp(36px, 6vw, 48px)', color: '#fff', marginBottom: '16px' }}>
          {currentPage.icon}
        </div>
        <Title level={1} style={{ 
          color: '#fff', 
          margin: 0, 
          letterSpacing: '1px',
          fontSize: 'clamp(24px, 5vw, 40px)'
        }}>
          {type.toUpperCase()}
        </Title>
        <div style={{ width: '80px', height: '4px', background: '#006699', margin: '16px auto' }}></div>
      </div>

      {/* Breadcrumb - Hero ke just niche */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
          <Breadcrumb
            items={[
              { 
                title: (
                  <Link to="/">
                    <HomeOutlined /> <span className="breadcrumb-home">Home</span>
                  </Link>
                )
              },
              { title: type },
            ]}
          />
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 16px' }}>
        <Row gutter={[16, 16]} justify="center">
          {[
            { icon: <SafetyCertificateOutlined />, title: "Data Security", desc: "100% confidential" },
            { icon: <BookOutlined />, title: "Transparency", desc: "No hidden terms" },
            { icon: <CreditCardOutlined />, title: "Secure Process", desc: "Trusted payments" }
          ].map((item, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card 
                hoverable 
                style={{ 
                  textAlign: 'center', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: 'none',
                  height: '100%'
                }}
                bodyStyle={{ padding: '24px 16px' }}
              >
                <div style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: '#006699', marginBottom: '12px' }}>
                  {item.icon}
                </div>
                <Title level={5} style={{ margin: '8px 0 4px', fontSize: '16px' }}>{item.title}</Title>
                <Text type="secondary" style={{ fontSize: '14px' }}>{item.desc}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Main Content */}
      <Row justify="center" style={{ padding: '0 16px 60px' }}>
        <Col xs={24} lg={18} xl={16}>
          <Card 
            style={{ 
              borderRadius: '16px', 
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              border: '1px solid #e5e7eb'
            }}
            bodyStyle={{ padding: 'clamp(24px, 5vw, 40px)' }}
          >
            <div style={{ fontSize: '16px', color: '#374151', lineHeight: '1.8' }}>
              {currentPage.content}
            </div>
            
            <Divider />
            
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Last updated: May 23, 2026 | For queries: urbaneofficial@gmail.com
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LegalPage;