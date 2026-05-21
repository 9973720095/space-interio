import React from 'react';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './css/Hero.css';

const { Title, Paragraph, Text } = Typography;

const Hero = () => {
  const [form] = Form.useForm();

  const onFormSubmit = (values) => {
    console.log('SEO Dynamic Lead Captured:', values);
    form.resetFields();
  };

  return (
    <section className="hero-section-container" aria-label="Introduction and Quote Form">
      <div className="hero-background-overlay">
        <Row 
          gutter={[32, 40]} 
          align="middle" 
          className="hero-content-wrapper"
        >
          {/* LEFT SIDE: SEO-Optimized Typography H1 Headings */}
          <Col xs={24} sm={24} md={24} lg={13} xl={14} className="hero-text-block">
            <header>
              <Title level={1} className="hero-main-title">
                Create the home <br />
                <span className="hero-title-break">you love,</span> 
                <span className="hero-highlight-accent"> that fit your budget</span>
              </Title>
            </header>
            <Paragraph className="hero-description-text">
              Expect nothing but the best quality materials, transparent pricing, and absolute on-time service implementation with Space Interio.
            </Paragraph>
          </Col>

          {/* RIGHT SIDE: Highly Interactive Dynamic Lead Form Card */}
          <Col xs={24} sm={24} md={24} lg={11} xl={10} className="hero-form-block">
            <article className="hero-lead-card">
              <div className="card-header-group">
                <Title level={2} className="hero-card-title">
                  Beautiful Designs That Fit Your Budget
                </Title>
                <Text type="secondary" className="hero-card-tagline">
                  Beauty That Works, Function That Inspires! Guaranteed.
                </Text>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFormSubmit}
                className="hero-dynamic-form"
                requiredMark={false}
              >
                {/* Full Name Input */}
                <Form.Item
                  name="fullName"
                  rules={[{ required: true, message: 'Please enter your full name' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="form-input-icon" />} 
                    placeholder="First Name" 
                    className="hero-input-field"
                    aria-label="First Name"
                  />
                </Form.Item>

                {/* Indian Mobile Number Input */}
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    { required: true, message: 'Please enter your contact number' },
                    { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
                  ]}
                >
                  <Input 
                    prefix={<span className="form-country-code">+91</span>} 
                    placeholder="81234 56789" 
                    className="hero-input-field"
                    maxLength={10}
                    aria-label="Phone Number"
                  />
                </Form.Item>

                {/* Email Address Input */}
                <Form.Item
                  name="emailAddress"
                  rules={[
                    { required: true, message: 'Please enter your email address' },
                    { type: 'email', message: 'Please introduce a valid email format' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined className="form-input-icon" />} 
                    placeholder="Enter Your Email" 
                    className="hero-input-field"
                    aria-label="Email Address"
                  />
                </Form.Item>

                {/* Dynamic Submission CTA Button */}
                <Form.Item className="m-0">
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    block 
                    className="hero-submit-cta"
                  >
                    Get Free Quote
                  </Button>
                </Form.Item>
              </Form>
            </article>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;