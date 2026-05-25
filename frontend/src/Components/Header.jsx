import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, message, Drawer } from 'antd';
import { NavLink } from 'react-router-dom';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import './css/Header.css';

const { Option } = Select;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/leads/calculate', values);
      message.success('Quote request sent successfully!');
      form.resetFields();
      setIsModalOpen(false);
      setDrawerOpen(false);
    } catch (err) {
      message.error('Failed to save lead. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '/kitchen', label: 'Modular Kitchen' },
    { to: '/bedroom', label: 'Bedroom' },
  ];

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header>
        <nav className="navbar" aria-label="Main navigation">
          <div className="logo">
            <NavLink to="/" aria-label="Space Interio Home">
              <img 
                src="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1779706583/Urbane-Living-05-25-2026_04_25_PM_blepmc.png"
                alt="Space Interio Logo" 
                width="120" 
                height="60px"
                fetchPriority="high"
                className="header-logo"
              />	
            </NavLink>
          </div>

          <ul className="nav-links desktop-only">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end}>{item.label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button 
              className="quote-btn desktop-only" 
              onClick={() => setIsModalOpen(true)}
              aria-label="Get free quote"
            >
              GET FREE QUOTE
            </button>
            <button 
              className="menu-btn mobile-only" 
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <MenuOutlined />
            </button>
          </div>
        </nav>
      </header>

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={drawerOpen}
        className="mobile-drawer"
        closeIcon={<CloseOutlined />}
      >
        <nav aria-label="Mobile navigation">
          <ul className="mobile-nav-links">
            {navItems.map(item => (
              <li key={item.to}>
                <NavLink 
                  to={item.to} 
                  end={item.end} 
                  onClick={closeDrawer}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button 
            className="quote-btn mobile-quote-btn" 
            onClick={() => {
              setIsModalOpen(true);
              closeDrawer();
            }}
            aria-label="Get free quote"
          >
            GET FREE QUOTE
          </button>
        </nav>
      </Drawer>

      <Modal 
        title="Get Your Free Quote" 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        footer={null}
        aria-labelledby="quote-modal-title"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="clientName" label="Full Name" rules={[{ required: true }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item name="clientPhone" label="Phone Number" rules={[{ required: true }]}>
            <Input placeholder="Enter your phone" maxLength={10} />
          </Form.Item>
          <Form.Item name="serviceType" label="Service Type" rules={[{ required: true }]}>
            <Select placeholder="Select Service">
              <Option value="full-home">Full Home</Option>
              <Option value="kitchen">Modular Kitchen</Option>
              <Option value="bedroom">Bedroom</Option>
              <Option value="living">Living Room</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block danger>
            Submit Request
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Header;