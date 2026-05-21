import React, { useState, useEffect } from 'react';
import { Modal, Tabs, message } from 'antd';
import '../Components/css/productDetailModal.css';

const ProductDetailModal = ({ open, onClose, product, onLeadSubmit }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    whatsapp: true
  });

  useEffect(() => {
    if (open) setActiveImage(0);
  }, [open, product]);

  if (!product) return null;

  const images = [
    product.image,
    `https://picsum.photos/800/600?random=${product.id + 10}`,
    `https://picsum.photos/800/600?random=${product.id + 20}`,
    `https://picsum.photos/800/600?random=${product.id + 30}`
  ];

  const specs = [
    { label: 'Room Type', value: product.category },
    { label: 'Size', value: product.size },
    { label: 'Style', value: 'Modern Contemporary' },
    { label: 'Warranty', value: '10 Years' },
    { label: 'Delivery', value: '45 Days' }
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.city) {
      message.error('Please fill all required fields');
      return;
    }
    onLeadSubmit({ ...formData, productId: product.id, productTitle: product.title });
    message.success('Our designer will call you in 24 hours');
    onClose();
    setFormData({ name: '', phone: '', city: '', whatsapp: true });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="95%"
      className="product-detail-modal"
      style={{ maxWidth: '1200px', top: 20 }}
    >
      <div className="detail-wrapper" itemScope itemType="https://schema.org/Product">
        <div className="detail-grid">
          <div className="gallery-section">
            <div className="main-image">
              <img 
                src={images[activeImage]} 
                alt={product.alt}
                itemProp="image"
              />
              <span className="image-count">{activeImage + 1} / {images.length}</span>
            </div>
            <div className="thumb-list">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumb ${activeImage === idx ? 'active' : ''}`}
                  onClick={() => setActiveImage(idx)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt={`${product.title} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="details-section">
            <div className="breadcrumb-detail">
              <a href="/">Home</a> / <a href="/bedroom">Bedroom</a> / <span>{product.category}</span>
            </div>

            <h1 itemProp="name">{product.title}</h1>
            
            <div className="price-tag">
              <span className="starting">Starting from</span>
              <span className="price">₹1.2 Lakh*</span>
            </div>

            <p className="product-desc" itemProp="description">
              Premium {product.category.toLowerCase()} design with modular storage, 
              ergonomic layout and 10-year warranty. Customizable as per your room size.
            </p>

            <Tabs
              items={[
                {
                  key: '1',
                  label: 'Specifications',
                  children: (
                    <div className="spec-grid">
                      {specs.map((spec, idx) => (
                        <div key={idx} className="spec-item">
                          <span className="spec-label">{spec.label}</span>
                          <span className="spec-value">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )
                },
                {
                  key: '2',
                  label: "What's Included",
                  children: (
                    <ul className="include-list">
                      <li>✓ Wardrobe with soft-close hinges</li>
                      <li>✓ Hydraulic storage bed</li>
                      <li>✓ Study unit with chair</li>
                      <li>✓ Dressing table with mirror</li>
                      <li>✓ False ceiling + LED lights</li>
                      <li>✓ Premium laminates & hardware</li>
                    </ul>
                  )
                }
              ]}
            />

            <div className="lead-box">
              <h3>Get Free Quote for This Design</h3>
              <div className="lead-form">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  aria-label="Full name"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  aria-label="Phone number"
                />
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  aria-label="Select city"
                >
                  <option value="">Select City *</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Noida">Noida</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Faridabad">Faridabad</option>
                </select>
                
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.checked})}
                  />
                  <span>Send me updates on WhatsApp</span>
                </label>

                <button className="submit-detail-btn" onClick={handleSubmit}>
                  GET FREE DESIGN QUOTE
                </button>
                
                <p className="form-note">
                  By submitting, you agree to our <a href="/privacy">privacy policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;