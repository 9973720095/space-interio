import React, { useState } from 'react';
import './css/inspiration-grid.css';

const InspirationGrid = ({ onQuoteClick, onConsultClick, onCardClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const designs = [
    {
      id: 1,
      title: 'Modern Master Bedroom Design with Tufted Headboard',
      size: '10x12 ft',
      category: 'Master Bedroom',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop&q=80',
      alt: 'Modern master bedroom with grey tufted headboard, neutral tones and ambient lighting'
    },
    {
      id: 2,
      title: 'Contemporary Master Bedroom with Wood Paneling',
      size: '12x14 ft',
      category: 'Master Bedroom',
      image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&h=400&fit=crop&q=80',
      alt: 'Contemporary bedroom interior with wooden wall paneling and platform bed design'
    },
    {
      id: 3,
      title: 'Minimalist Kids Bedroom with Bunk Bed',
      size: '10x10 ft',
      category: 'Kids Bedroom',
      image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&h=400&fit=crop&q=80',
      alt: 'Minimalist kids bedroom with white bunk bed, study desk and space-saving design'
    },
    {
      id: 4,
      title: 'Luxury Guest Bedroom with Walk-in Wardrobe',
      size: '14x16 ft',
      category: 'Guest Bedroom',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop&q=80',
      alt: 'Luxury guest bedroom with walk-in wardrobe, accent wall and premium finishes'
    },
    {
      id: 5,
      title: 'Scandinavian Bedroom with Study Corner',
      size: '11x13 ft',
      category: 'Master Bedroom',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop&q=80',
      alt: 'Scandinavian style bedroom with light wood furniture and integrated study table'
    },
    {
      id: 6,
      title: 'Traditional Indian Bedroom with Carved Wood',
      size: '12x15 ft',
      category: 'Master Bedroom',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=400&fit=crop&q=80',
      alt: 'Traditional Indian bedroom with carved wooden furniture and ethnic decor elements'
    },
    {
      id: 7,
      title: 'Bohemian Bedroom with Canopy Bed',
      size: '13x14 ft',
      category: 'Master Bedroom',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop&q=80',
      alt: 'Bohemian bedroom interior with canopy bed, indoor plants and earthy color palette'
    },
    {
      id: 8,
      title: 'Industrial Loft Bedroom Design',
      size: '15x18 ft',
      category: 'Master Bedroom',
      image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&h=400&fit=crop&q=80',
      alt: 'Industrial loft bedroom with exposed brick wall, metal bed frame and concrete finish'
    },
    {
      id: 9,
      title: 'Coastal Theme Bedroom with Blue Accents',
      size: '11x12 ft',
      category: 'Guest Bedroom',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&q=80',
      alt: 'Coastal theme bedroom with blue and white decor, wooden flooring and beach vibes'
    },
    {
      id: 10,
      title: 'Smart Bedroom with Home Automation',
      size: '12x14 ft',
      category: 'Master Bedroom',
      image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&h=400&fit=crop&q=80',
      alt: 'Smart bedroom with automated lighting, motorized blinds and tech-enabled furniture'
    },
    {
      id: 11,
      title: 'Compact Bedroom with Murphy Bed',
      size: '9x11 ft',
      category: 'Guest Bedroom',
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&h=400&fit=crop&q=80',
      alt: 'Compact bedroom design with wall-mounted murphy bed and space optimization'
    },
    {
      id: 12,
      title: 'Luxury Master Suite with Dressing Area',
      size: '16x20 ft',
      category: 'Master Bedroom',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop&q=80',
      alt: 'Luxury master suite with king size bed, separate dressing area and premium wardrobes'
    }
  ];

  const totalPages = Math.ceil(designs.length / cardsPerPage);
  const startIdx = (currentPage - 1) * cardsPerPage;
  const currentDesigns = designs.slice(startIdx, startIdx + cardsPerPage);

  return (
    <section className="inspiration-section" aria-label="Bedroom design inspiration">
      <div className="container">
        <div className="section-header">
          <div className="header-left">
            <h2>Inspiration for home interior designs</h2>
            <p>Give your home a new look with these interior design ideas curated for you</p>
          </div>
        </div>

        <div className="inspiration-grid" role="list">
          {currentDesigns.map((design) => (
            <article 
              key={design.id} 
              className="inspiration-card"
              role="listitem"
              itemScope 
              itemType="https://schema.org/Product"
              onClick={() => onCardClick && onCardClick(design)}
              style={{ cursor: onCardClick ? 'pointer' : 'default' }}
            >
              <div className="card-image-wrap">
                <img
                  src={design.image}
                  alt={design.alt}
                  loading="lazy"
                  width="600"
                  height="400"
                  itemProp="image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop&q=80';
                    e.target.onerror = null;
                  }}
                />
                <span className="card-tag">{design.category}</span>
                <button 
                  className="fav-btn" 
                  aria-label={`Add ${design.title} to wishlist`}
                  onClick={(e) => e.stopPropagation()}
                >
                  ♡
                </button>
              </div>

              <div className="card-content">
                <h3 itemProp="name">{design.title}</h3>
                <p className="card-meta">Size: {design.size}</p>
                
                <div className="card-actions">
                  <button
                    className="btn-consult"
                    onClick={(e) => {
                      e.stopPropagation();
                      onConsultClick(design);
                    }}
                    aria-label={`Book free consultation for ${design.title}`}
                  >
                    Book Free Consultation
                  </button>
                  <button
                    className="btn-quote"
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuoteClick(design);
                    }}
                    aria-label={`Get quote for ${design.title}`}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="pagination bedroom-pagination" aria-label="Design pagination">
            <button 
              className="page-btn"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Prev
            </button>
            
            <div className="page-numbers">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                  aria-label={`Go to page ${i + 1}`}
                  aria-current={currentPage === i + 1 ? 'page' : undefined}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              className="page-btn"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next →
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default InspirationGrid;