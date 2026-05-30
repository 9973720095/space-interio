import React, { useState, useMemo, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';
import { Helmet } from "react-helmet-async";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Components/css/Kitchen.css";
import Hero from "../Components/Hero";

const { Option } = Select;

const KITCHEN_CONFIG = {
  hero: {
    title: "Modular Kitchen Designs in Ghaziabad",
    subtitle: "Get 50+ Premium L-Shaped, U-Shaped & Island Kitchen Designs with 10-Year Warranty",
    keywords: "modular kitchen, kitchen interior, l shaped kitchen, ghaziabad",
  },
  filters: ["All", "Modern", "Minimalist", "Classic", "Luxury"],
  card: {
    buttonLabel: "Get Free 3D Design",
    products: [
      {
        id: 1,
        title: `Premium L-Shaped Kitchen Design 1`,
        desc: "White acrylic finish with soft-close channels, inbuilt hob & chimney space",
        cat: "Modern",
        img: `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80`,
        alt: `Modern L shaped modular kitchen with white acrylic finish and island counter`,
        price: "₹1.2L"
      },
      {
        id: 2,
        title: `Sleek U-Shaped Kitchen Design 2`,
        desc: "Matte grey laminate, tandem drawers, corner carousel unit included",
        cat: "Minimalist",
        img: `https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop&q=80`,
        alt: `Minimalist U shaped kitchen with matte grey cabinets and quartz countertop`,
        price: "₹1.5L"
      },
      {
        id: 3,
        title: `Classic Parallel Kitchen Design 3`,
        desc: "Membrane finish shutters, SS baskets, tall unit for appliances",
        cat: "Classic",
        img: `https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=600&h=400&fit=crop&q=80`,
        alt: `Classic parallel kitchen with wooden membrane finish and glass shutters`,
        price: "₹1.1L"
      },
      {
        id: 4,
        title: `Luxury Island Kitchen Design 4`,
        desc: "High-gloss PU finish, quartz top, breakfast counter with seating",
        cat: "Luxury",
        img: `https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=600&h=400&fit=crop&q=80`,
        alt: `Luxury island modular kitchen with high gloss white finish and marble counter`,
        price: "₹2.8L"
      },
      {
        id: 5,
        title: `Contemporary Straight Kitchen Design 5`,
        desc: "Acrylic finish, profile handles, overhead loft storage cabinets",
        cat: "Modern",
        img: `https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=400&fit=crop&q=80`,
        alt: `Contemporary straight kitchen with white and wood combination`,
        price: "₹95k"
      },
      {
        id: 6,
        title: `Minimalist G-Shaped Kitchen Design 6`,
        desc: "Super matte finish, handle-less design, built-in oven space",
        cat: "Minimalist",
        img: `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop&q=80`,
        alt: `Minimalist G shaped kitchen with handleless cabinets and white countertop`,
        price: "₹1.8L"
      },
      {
        id: 7,
        title: `Heritage Classic Kitchen Design 7`,
        desc: "Wooden finish, carved panels, traditional brass handles",
        cat: "Classic",
        img: `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop&q=80`,
        alt: `Classic kitchen design with wooden finish and traditional elements`,
        price: "₹1.4L"
      },
      {
        id: 8,
        title: `Ultra Luxury Kitchen Design 8`,
        desc: "Italian marble top, glass shutters, premium Blum fittings",
        cat: "Luxury",
        img: `https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop&q=80`,
        alt: `Ultra luxury modular kitchen with italian marble and glass cabinets`,
        price: "₹3.5L"
      },
      {
        id: 9,
        title: `Compact Modern Kitchen Design 9`,
        desc: "Space-saving design, pull-out pantry, wall-mounted chimney",
        cat: "Modern",
        img: `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop&q=80`,
        alt: `Compact modern kitchen for small apartments with smart storage`,
        price: "₹85k"
      },
      {
        id: 10,
        title: `Scandinavian Kitchen Design 10`,
        desc: "Light wood finish, white quartz, open shelves concept",
        cat: "Minimalist",
        img: `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop&q=80`,
        alt: `Scandinavian kitchen with light wood and white combination`,
        price: "₹1.3L"
      },
      {
        id: 11,
        title: `Royal Classic Kitchen Design 11`,
        desc: "Dark wood polish, granite top, crockery unit included",
        cat: "Classic",
        img: `https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&h=400&fit=crop&q=80`,
        alt: `Royal classic kitchen with dark wood finish and granite countertop`,
        price: "₹1.9L"
      },
      {
        id: 12,
        title: `Designer Luxury Kitchen Design 12`,
        desc: "Back-painted glass, sensor lights, imported hardware",
        cat: "Luxury",
        img: `https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop&q=80`,
        alt: `Designer luxury kitchen with back painted glass and LED lighting`,
        price: "₹4.2L"
      },
      {
        id: 13,
        title: `Designer Luxury Kitchen Design 12`,
        desc: "Back-painted glass, sensor lights, imported hardware",
        cat: "Luxury",
        img: `https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop&q=80`,
        alt: `Designer luxury kitchen with back painted glass and LED lighting`,
        price: "₹4.2L"
      }
    ],
  },
};

const Kitchen = () => {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(4);
      else if (window.innerWidth < 1024) setItemsPerPage(8);
      else setItemsPerPage(12);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = useMemo(() => {
    return filter === "All"
    ? KITCHEN_CONFIG.card.products
      : KITCHEN_CONFIG.card.products.filter((p) => p.cat === filter);
  }, [filter]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentData = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const openQuoteModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    if (product) {
      form.setFieldsValue({ 
        serviceType: 'kitchen',
        productName: product.title 
      });
    } else {
      form.setFieldsValue({ serviceType: 'kitchen' });
    }
  };

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
      ...values,
        productName: selectedProduct? selectedProduct.title : 'General Inquiry',
        productId: selectedProduct? selectedProduct.id : null,
        page: 'Kitchen'
      };
      
      // SIRF YE LINE CHANGE KI - LOCAL + PRODUCTION DONO KE LIYE
      await axios.post(`${process.env.REACT_APP_API_URL}/api/leads/calculate`, payload);
      
      message.success('Quote request sent successfully!');
      form.resetFields();
      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      message.error('Failed to save lead. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Modular Kitchen Designs in Ghaziabad | 50+ Designs | Space Interio</title>
        <meta name="description" content="Top modular kitchen designs in Ghaziabad. L-shaped, U-shaped, island kitchens with premium fittings. Free 3D design & 10-year warranty. Get quote now." />
        <meta name="keywords" content={KITCHEN_CONFIG.hero.keywords} />
        <link rel="canonical" href="https://spaceinterio.com/modular-kitchen" />
        <meta property="og:title" content="Modular Kitchen Designs in Ghaziabad" />
        <meta property="og:description" content="Explore 50+ luxury kitchen interiors with free 3D design." />
      </Helmet>

      <Hero />

      <div className="kitchen-page">
        <section className="filter-section">
          <div className="container">
            <h2 className="section-title">Explore Our Kitchen Collection</h2>

            <div className="filter-controls" role="tablist">
              {KITCHEN_CONFIG.filters.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={filter === cat}
                  className={filter === cat? "active" : ""}
                  onClick={() => {
                    setFilter(cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <main className="product-grid">
              {currentData.map((item) => (
                <article key={item.id} className="modern-card" itemScope itemType="https://schema.org/Product">
                  <div className="card-img-wrapper">
                    <img
                      src={item.img}
                      alt={item.alt}
                      loading="lazy"
                      width="600"
                      height="400"
                      itemProp="image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&q=80';
                        e.target.onerror = null;
                      }}
                    />
                    <span className="card-badge">{item.cat}</span>
                  </div>
                  <div className="card-content">
                    <h3 itemProp="name">{item.title}</h3>
                    <p itemProp="description">{item.desc}</p>
                    <div className="card-footer">
                      <span className="kitchen-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        Starts at <span itemProp="price">{item.price}</span>
                      </span>
                      <button 
                        onClick={() => openQuoteModal(item)}
                        aria-label={`Get 3D design for ${item.title}`}
                      >
                        {KITCHEN_CONFIG.card.buttonLabel} →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </main>

            <nav className="kitchen-pagination pagination" aria-label="Kitchen designs pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1? "active" : ""}
                  aria-current={currentPage === i + 1? "page" : undefined}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          </div>
        </section>
      </div>

      <section className="hero-section bottom-hero">
        <div className="hero-content">
          <h1>Modular Kitchen Designs in Ghaziabad</h1>
          <p>Get 50+ Premium L-Shaped, U-Shaped & Island Kitchen Designs with 10-Year Warranty</p>
          <button className="hero-cta" onClick={() => openQuoteModal()}>
            Book Free Consultation
          </button>
        </div>
      </section>

      <Modal 
        title={selectedProduct? `Get Quote for ${selectedProduct.title}` : "Get Your Free Quote"} 
        open={isModalOpen} 
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
          form.resetFields();
        }} 
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="clientName" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item name="clientPhone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone' }]}>
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
          <Form.Item name="productName" label="Interested Product" hidden>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block danger>
            Submit Request
          </Button>
        </Form>
      </Modal>

    </>
  );
};

export default Kitchen;