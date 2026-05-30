import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import { message } from 'antd';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import InspirationGrid from '../Components/InspirationGrid';
import ProductDetailModal from '../Components/ProductDetailModal';
import '../Components/css/Bedroom.css';
import Hero from '../Components/Hero';

const Bedroom = () => {
  const [activeText, setActiveText] = useState('Bedroom');
  const [loading, setLoading] = useState(false);
  const textOptions = ['Bedroom', 'Wardrobe', 'Full Home', 'Kitchen'];
  
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText(prev => {
        const currentIndex = textOptions.indexOf(prev);
        return textOptions[(currentIndex + 1) % textOptions.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bhkType: '',
    rooms: {
      LivingRoom: 0,
      Kitchen: 0,
      Bedroom: 1,
      Bathroom: 0,
      Dining: 0
    },
    package: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    city: '',
    whatsappUpdates: true,
    serviceType: 'bedroom'
  });

  const handleRoomChange = (room, action) => {
    setFormData(prev => ({
     ...prev,
      rooms: {
       ...prev.rooms,
        [room]: action === 'inc'? prev.rooms[room] + 1 : Math.max(0, prev.rooms[room] - 1)
      }
    }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  
  const handleSubmit = async () => {
    if (!formData.clientName ||!formData.clientPhone ||!formData.city) {
      message.error('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
       ...formData,
        source: 'Bedroom Calculator',
        roomType: 'Bedroom',
        timestamp: new Date().toISOString()
      };
      
      await axios.post('http://localhost:5000/api/leads/bedroom', payload);
      message.success('Thank you! Our bedroom designer will call you in 24 hours.');
      
      setStep(1);
      setFormData({
        bhkType: '', 
        rooms: { LivingRoom: 0, Kitchen: 0, Bedroom: 1, Bathroom: 0, Dining: 0 },
        package: '', clientName: '', clientEmail: '', clientPhone: '', city: '', 
        whatsappUpdates: true, serviceType: 'bedroom'
      });
    } catch (err) {
      message.error('Failed to submit. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (design) => {
    setSelectedDesign(design);
    setDetailModalOpen(true);
  };

  const handleQuoteClick = (design) => {
    setSelectedDesign(design);
    setDetailModalOpen(true);
  };

  const handleConsultClick = (design) => {
    setSelectedDesign(design);
    setDetailModalOpen(true);
  };

  const handleLeadSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/leads/product-detail', {
       ...data,
        source: 'Product Detail Page',
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Bedroom Interior Cost Calculator Delhi NCR | Free 3D Design | Space Interio</title>
        <meta name="description" content="Calculate bedroom interior cost online in Delhi, Ghaziabad, Noida. Get instant estimate for modular wardrobes, beds, study units, dressing tables. Free 3D design & 10-year warranty." />
        <meta name="keywords" content="bedroom interior cost, wardrobe design delhi, bedroom calculator, modular bedroom, master bedroom design, space interio" />
        <link rel="canonical" href="https://spaceinterio.com/bedroom" />
        <meta property="og:title" content="Bedroom Interior Cost Calculator | Space Interio" />
        <meta property="og:description" content="Get instant bedroom interior cost. Free 3D design in Delhi NCR." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://spaceinterio.com/images/bedroom-og.jpg" />
      </Helmet>

        <Hero />

      <div className="livspace-calculator">
        <section className="calc-hero">
          <div className="container">
            <h1>
              Get the estimate for your <span className="animated-text">{activeText}</span>
            </h1>
            <p>Calculate the approximate cost of doing-up your home interiors</p>
          </div>
        </section>

        {step === 1 && (
          <section className="category-cards">
            <div className="container">
              <h2 className="seo-h2">Choose Interior Service to Calculate Bedroom Cost</h2>
              <div className="card-grid">
                <div className="calc-card">
                  <div className="card-icon">🛏</div>
                  <h3>Bedroom Interior</h3>
                  <p>Get estimate for complete bedroom with wardrobe & bed</p>
                  <button onClick={handleNext}>CALCULATE →</button>
                </div>
                <div className="calc-card">
                  <div className="card-icon">🚪</div>
                  <h3>Wardrobe</h3>
                  <p>Our estimate for your dream modular wardrobe</p>
                  <button onClick={handleNext}>CALCULATE →</button>
                </div>
                <div className="calc-card">
                  <div className="card-icon">🏠</div>
                  <h3>Full Home Interior</h3>
                  <p>Know the estimate price for your full home interiors</p>
                  <button onClick={handleNext}>CALCULATE →</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="form-step">
            <div className="form-container">
              <div className="step-header">
                <span className="active">BHK TYPE</span>
                <span>ROOMS TO DESIGN</span>
                <span>PACKAGE</span>
                <span>GET QUOTE</span>
              </div>
              <h2>Select your BHK type</h2>
              <p className="subtitle">To know more about this, <a href="#">click here</a></p>
              <div className="bhk-options">
                {['1 BHK', '2 BHK', '3 BHK', '4 BHK'].map(bhk => (
                  <label key={bhk} className={`bhk-radio ${formData.bhkType === bhk? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="bhk" 
                      value={bhk}
                      checked={formData.bhkType === bhk}
                      onChange={(e) => setFormData({...formData, bhkType: e.target.value})}
                    />
                    <span>{bhk}</span>
                  </label>
                ))}
              </div>
              <button className="next-btn" disabled={!formData.bhkType} onClick={handleNext}>NEXT</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="form-step">
            <div className="form-container">
              <div className="step-header">
                <span className="done">✓ BHK TYPE</span>
                <span className="active">ROOMS TO DESIGN</span>
                <span>PACKAGE</span>
                <span>GET QUOTE</span>
              </div>
              <h2>Select the rooms you'd like us to design</h2>
              <p className="subtitle">Add bedroom, wardrobe, study unit as needed</p>
              <div className="room-list">
                {Object.keys(formData.rooms).map(room => (
                  <div key={room} className="room-item">
                    <span>{room.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <div className="counter">
                      <button 
                        onClick={() => handleRoomChange(room, 'dec')}
                        aria-label={`Decrease ${room}`}
                      >−</button>
                      <span>{formData.rooms[room]}</span>
                      <button 
                        onClick={() => handleRoomChange(room, 'inc')}
                        aria-label={`Increase ${room}`}
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="next-btn" onClick={handleNext}>NEXT</button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="form-step">
            <div className="form-container">
              <div className="step-header">
                <span className="done">✓ BHK TYPE</span>
                <span className="done">✓ ROOMS TO DESIGN</span>
                <span className="active">PACKAGE</span>
                <span>GET QUOTE</span>
              </div>
              <h2>Pick your bedroom package</h2>
              <div className="package-grid">
                {[
                  { name: 'Essentials', price: '₹₹', desc: 'Affordable bedroom sets', features: ['Laminate wardrobe', 'Engineered wood bed', 'Basic accessories'] },
                  { name: 'Premium', price: '₹₹₹', desc: 'Premium bedroom interiors', features: ['Acrylic wardrobe', 'Hydraulic bed', 'Study unit included'] },
                  { name: 'Luxe', price: '₹₹₹₹', desc: 'Luxury master bedroom', features: ['Veneer finish', 'King size bed', 'Dressing unit', 'Premium lighting'] }
                ].map(pkg => (
                  <div 
                    key={pkg.name}
                    className={`package-card ${formData.package === pkg.name? 'selected' : ''}`}
                    onClick={() => setFormData({...formData, package: pkg.name})}
                  >
                    <h3>{pkg.name} ({pkg.price})</h3>
                    <p>{pkg.desc}</p>
                    <ul>
                      {pkg.features.map(f => <li key={f}>✓ {f}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <button className="next-btn" disabled={!formData.package} onClick={handleNext}>NEXT</button>
            </div>
          </section>
        )}

        {step === 5 && (
          <section className="form-step">
            <div className="form-container">
              <div className="step-header">
                <span className="done">✓ BHK TYPE</span>
                <span className="done">✓ ROOMS TO DESIGN</span>
                <span className="done">✓ PACKAGE</span>
                <span className="active">GET QUOTE</span>
              </div>
              <h2>Your bedroom estimate is almost ready</h2>
              <div className="lead-form">
                <input 
                  type="text" 
                  placeholder="Full Name *" 
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="Email ID" 
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Phone number *" 
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                  maxLength={10}
                  pattern="[6-9]{1}[0-9]{9}"
                  required
                />
                <label className="checkbox">
                  <input 
                    type="checkbox" 
                    checked={formData.whatsappUpdates}
                    onChange={(e) => setFormData({...formData, whatsappUpdates: e.target.checked})}
                  />
                  <span>Send me updates on WhatsApp</span>
                </label>
                <select 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                >
                  <option value="">Select City *</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                  <option value="Noida">Noida</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Faridabad">Faridabad</option>
                </select>
                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                  {loading? 'SUBMITTING...' : 'GET FREE BEDROOM QUOTE'}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      <InspirationGrid 
        onQuoteClick={handleQuoteClick}
        onConsultClick={handleConsultClick}
        onCardClick={handleCardClick}
      />

      <ProductDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        product={selectedDesign}
        onLeadSubmit={handleLeadSubmit}
      />
    </>
  );
};

export default Bedroom;