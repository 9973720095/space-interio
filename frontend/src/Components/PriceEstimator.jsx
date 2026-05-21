import React, { useState } from 'react';
import { Row, Col, Typography, Form, Select, Button, Input, message } from 'antd';
import { HomeOutlined, BuildOutlined, LayoutOutlined, CalculatorOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import './css/PriceEstimator.css';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const serviceTypes = [
  { id: 'full-home', title: 'Full Home Interior', icon: <HomeOutlined />, subtitle: 'Turnkey Luxury Solutions' },
  { id: 'kitchen', title: 'Modular Kitchen', icon: <BuildOutlined />, subtitle: 'Ergonomic Space Engineering' },
  { id: 'wardrobe', title: 'Luxury Wardrobes', icon: <LayoutOutlined />, subtitle: 'Custom Premium Storage' }
];

const PriceEstimator = () => {
  const [selectedService, setSelectedService] = useState('full-home');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    form.setFieldsValue({ layoutSize: undefined });
  };

  // Live Lead Saving Integration to MongoDB via API Route using Axios
  const calculateAndSaveLead = async (values) => {
    setLoading(true);
    
    // FIXED: Form field matching accurately mapped with Backend model schema layers
    const leadPayload = {
      serviceType: selectedService,
      layoutSize: values.layoutSize,
      materialFinish: values.materialFinish,
      urgencyScope: values.urgencyScope, // Form component name matches backend schema key now
      clientName: values.clientName,     // Mapped to match clientName schema variable
      clientPhone: values.clientPhone    // Mapped to match clientPhone schema variable
    };

    try {
      console.log('Sending lead configuration payload...', leadPayload);

      // Post Request Pipeline hitting server execution port
      const response = await axios.post('http://localhost:5000/api/leads/calculate', leadPayload);

      if (response.data.success) {
        message.success('Quote generated! Design estimate saved securely in MongoDB.');
        form.resetFields();
      } else {
        console.warn('Backend custom error fallback tracked:', leadPayload);
        message.error('Database dropped transmission. Please check schema handling.');
      }
    } catch (error) {
      console.error('Frontend API Integration Error:', error);
      message.error(error.response?.data?.error || 'Server error occurred while processing lead documentation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="premium-estimator-section" aria-labelledby="luxury-estimator-heading">
      <div className="fluid-layout-bounds">
        
        {/* HEADER AREA */}
        <header className="luxury-estimator-header">
          <Text className="gold-accent-tag">COST CONFIGURATOR</Text>
          <Title level={2} id="luxury-estimator-heading" className="luxury-estimator-title">
            Calculate Your Interior Budget Estimate
          </Title>
          <Paragraph className="luxury-estimator-sub">
            Select your project workspace domain, configure your raw material standards, and save your instant breakdown quote directly to our technical consultancy pipeline.
          </Paragraph>
        </header>

        {/* STEP 1: PREMIUM COMPACT CARDS */}
        <div className="luxury-card-row-wrapper">
          <Row gutter={[20, 20]} justify="center">
            {serviceTypes.map((service) => (
              <Col xs={24} sm={8} key={service.id}>
                <div 
                  className={`luxury-selector-card ${selectedService === service.id ? 'luxury-active-lock' : ''}`}
                  onClick={() => handleServiceSelect(service.id)}
                  role="radio"
                  aria-checked={selectedService === service.id}
                >
                  <div className="luxury-icon-box">{service.icon}</div>
                  <div className="luxury-text-content">
                    <Title level={4} className="luxury-card-title">{service.title}</Title>
                    <Text className="luxury-card-sub">{service.subtitle}</Text>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* STEP 2: SPLIT-VIEW PREMIUM FORM SYSTEM */}
        <div className="luxury-form-architecture">
          <Form
            form={form}
            layout="vertical"
            onFinish={calculateAndSaveLead}
            className="luxury-embedded-form"
          >
            <Row gutter={[32, 20]}>
              {/* Dynamic Design Configurations */}
              <Col xs={24} md={12}>
                <Form.Item 
                  name="layoutSize" 
                  label="Project Layout Scale" 
                  rules={[{ required: true, message: 'Please specify layout dimensions' }]}
                >
                  <Select placeholder="Choose layout parameters" size="large" className="luxury-input-field">
                    {selectedService === 'full-home' && [
                      <Option key="2bhk" value="2bhk">Standard 2 BHK Apartment</Option>,
                      <Option key="3bhk" value="3bhk">Premium 3 BHK Apartment</Option>,
                      <Option key="4bhk" value="4bhk">Luxury 4 BHK / Villa Layout</Option>
                    ]}
                    {selectedService === 'kitchen' && [
                      <Option key="lshape" value="lshape">L-Shaped Modular Setup</Option>,
                      <Option key="ushape" value="ushape">U-Shaped Island Layout</Option>,
                      <Option key="parallel" value="parallel">Parallel Premium Counter</Option>
                    ]}
                    {selectedService === 'wardrobe' && [
                      <Option key="sliding" value="sliding">Premium Sliding Mechanism</Option>,
                      <Option key="walkin" value="walkin">Luxury Walk-In Closet Architecture</Option>
                    ]}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item 
                  name="materialFinish" 
                  label="Material Core Finish" 
                  rules={[{ required: true, message: 'Please select core material finishing' }]}
                >
                  <Select placeholder="Select material finishing benchmarks" size="large" className="luxury-input-field">
                    <Option value="essential">Essential (High-Grade Matte Laminate)</Option>
                    <Option value="premium">Premium (Anti-Scratch Seamless Acrylic)</Option>
                    <Option value="luxury">Luxury Elite (High-Gloss Polyurethane PU Finish)</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={24}>
                <Form.Item 
                  name="urgencyScope" // FIXED: Component name matched to schema variable payload
                  label="Execution Timeline Urgency" 
                  rules={[{ required: true, message: 'Please specify project urgency scope' }]}
                >
                  <Select placeholder="Select intended timeline phase" size="large" className="luxury-input-field">
                    <Option value="immediate">Immediate Handover Setup (Within 30 Days)</Option>
                    <Option value="flexible">Standard Delivery Optimization Tracking (45-60 Days)</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* CRITICAL STEP: Lead Capture Inputs (Saving Credentials to MongoDB) */}
              <Col xs={24} md={12}>
                <Form.Item
                  name="clientName" // FIXED: Component name matched to schema variable payload
                  label="Full Name"
                  rules={[{ required: true, message: 'Please provide name to map the generated quotation record' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Enter your full name" size="large" className="luxury-input-field" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="clientPhone" // FIXED: Component name matched to schema variable payload
                  label="Contact Mobile Number"
                  rules={[
                    { required: true, message: 'Please provide mobile number for quote verification' },
                    { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
                  ]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Enter 10-digit mobile number" size="large" className="luxury-input-field" />
                </Form.Item>
              </Col>

              {/* ACTION CALL BUTTON */}
              <Col xs={24} className="action-button-alignment">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  icon={<CalculatorOutlined />} 
                  className="luxury-submit-cta"
                >
                  Calculate Pricing & Save Configuration
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

      </div>
    </section>
  );
};

export default PriceEstimator;