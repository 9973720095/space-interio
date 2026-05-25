import React from 'react';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import './css/Hero.css';

const { Title, Paragraph, Text } = Typography;

const Hero = () => {
  const [form] = Form.useForm();

  const onFormSubmit = async (values) => {
  try {
    // ✅ CHANGE 1: Localhost URL use kiya
    const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    const res = await axios.post(`${baseURL}/api/leads/calculate`, {
      clientName: values.fullName,        
      clientPhone: values.phoneNumber, 
      clientEmail: values.emailAddress, // ✅ Email field mapped to backend schema   
      serviceType: 'kitchen',
      layoutSize: '',                     
      materialFinish: '',                
      urgencyScope: '',              
      source: 'Hero Form'
    });

    if (res.status === 200 || res.status === 201) {
      if (window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Kitchen Calculator Hero Form",
          value: 0.0,
          currency: "INR",
        });
      }

      message.success("Success! We will contact you soon.");
      console.log("SEO Dynamic Lead Captured:", values);
      form.resetFields();
    }
  } catch (error) {
    console.error('Error submitting lead:', error.response?.data || error.message);
    message.error(error.response?.data?.error || 'Something went wrong. Please try again.');
  }
};

  return (
    <section className="hero-section-container" aria-label="Introduction and Quote Form">
      <div className="hero-background-overlay">
        <Row
          gutter={[32, 40]}
          align="middle"
          className="hero-content-wrapper"
        >
          <Col xs={24} sm={24} md={24} lg={13} xl={14} className="hero-text-block">
            <header>
              <Title level={1} className="hero-main-title">
                <span className="hero-highlight-accent">Create The Home</span>
                 <br />
                <span className="hero-title-break">You Love,</span>
                <span className=""> That Fit Your Budget</span>
              </Title>
            </header>
            <Paragraph className="hero-description-text">
              Expect nothing but the best quality materials, transparent pricing, and absolute on-time service implementation with Space Interio.
            </Paragraph>
          </Col>

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
                <Form.Item className="mview"
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

                <Form.Item className="mview"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: 'Please enter your contact number' },
                    { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
                  ]}
                >
                  <Input
                    prefix={
                      // ✅ CHANGE 2: India Flag add kiya
                      <span className="form-country-code" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <img 
                          src="https://flagcdn.com/w20/in.png" 
                          alt="IN" 
                          width="20" 
                          height="14"
                          style={{ objectFit: 'cover', borderRadius: '2px' }}
                        />
                        +91
                      </span>
                    }
                    placeholder="81234 56789"
                    className="hero-input-field"
                    maxLength={10}
                    aria-label="Phone Number"
                  />
                </Form.Item>

                <Form.Item className="mview"
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