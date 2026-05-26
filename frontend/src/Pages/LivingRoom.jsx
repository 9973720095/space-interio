import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import * as THREE from 'three'
import AOS from 'aos'
import 'aos/dist/aos.css'
import VanillaTilt from 'vanilla-tilt'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

const LivingRoom = () => {
  const mountRef = useRef(null)
  const journeyRef = useRef(null)
  const [formData, setFormData] = useState({ 
    name: '', phone: '', email: '', ceilingType: '', 
    designStyle: '', area: '', timeline: '', message: '' 
  })
  const [loading, setLoading] = useState(false)
  const [activeMaterial, setActiveMaterial] = useState('marble')
  const [stats, setStats] = useState({ projects: 0, rating: 0, days: 0 })

  // 3D Hero Ceiling - Fully Responsive
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 })
    
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), { 
      max: 15, speed: 400, glare: true, 'max-glare': 0.3 
    })

    if (!mountRef.current || mountRef.current.children.length > 0) return
    
    const scene = new THREE.Scene()
    const getHeight = () => window.innerWidth < 768? 350 : 500
    const height = getHeight()
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    const handleResize = () => {
      if (!mountRef.current) return
      const newHeight = getHeight()
      camera.aspect = mountRef.current.clientWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, newHeight)
    }
    
    renderer.setSize(mountRef.current.clientWidth, height)
    renderer.shadowMap.enabled = true
    mountRef.current.appendChild(renderer.domElement)
    window.addEventListener('resize', handleResize)

    const ceilingGeo = new THREE.BoxGeometry(6, 0.15, 6)
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3 })
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat)
    ceiling.position.y = 2.5
    ceiling.receiveShadow = true
    scene.add(ceiling)

    const coveGeo = new THREE.TorusGeometry(2.8, 0.05, 16, 100)
    const coveMat = new THREE.MeshStandardMaterial({ 
      color: 0xE63946, 
      emissive: 0xE63946, 
      emissiveIntensity: 2 
    })
    const coveLight = new THREE.Mesh(coveGeo, coveMat)
    coveLight.position.y = 2.4
    coveLight.rotation.x = Math.PI / 2
    scene.add(coveLight)

    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const pointLight = new THREE.PointLight(0xE63946, 1.5, 10)
    pointLight.position.set(0, 2, 0)
    pointLight.castShadow = true
    scene.add(pointLight)

    camera.position.set(0, 0, 4)
    camera.lookAt(0, 2.5, 0)

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      gsap.to(camera.position, { x: x * 0.5, duration: 1 })
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)
      coveLight.rotation.z += 0.005
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current) mountRef.current.innerHTML = ''
      renderer.dispose()
    }
  }, [])

  // Design Journey Horizontal Scroll - Desktop Only
  useEffect(() => {
    if (window.innerWidth < 768) return
    
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.journey-step')
      if (sections.length > 0) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: journeyRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + journeyRef.current.offsetWidth,
            invalidateOnRefresh: true
          }
        })
      }
    }, journeyRef)
    
    setTimeout(() => ScrollTrigger.refresh(), 500)
    
    return () => ctx.revert()
  }, [])

  // Stats Counter Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(stats, {
        projects: 500,
        rating: 4.9,
        days: 45,
        duration: 2,
        ease: "power2.out",
        onUpdate: function() {
          setStats({
            projects: Math.round(this.targets()[0].projects),
            rating: Number(this.targets()[0].rating.toFixed(1)),
            days: Math.round(this.targets()[0].days)
          })
        },
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%"
        }
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
      const res = await axios.post(`${baseURL}/api/leads/living-room`, {
        clientName: formData.name,
        clientPhone: formData.phone,
        clientEmail: formData.email,
        ceilingType: formData.ceilingType,
        designStyle: formData.designStyle,
        layoutSize: formData.area,
        urgencyScope: formData.timeline,
        serviceType: 'Living Room Interior',
        source: 'Living Room 3D Page',
        message: formData.message
      })

      if (res.status === 201 || res.status === 200) {
        alert('Thanks! Our designer will call you in 30 mins with free 3D design.')
        setFormData({ name: '', phone: '', email: '', ceilingType: '', designStyle: '', area: '', timeline: '', message: '' })
        if (window.fbq) window.fbq("track", "Lead", {content_name: "Living Room 3D Page", value: 0.0, currency: "INR"})
      }
    } catch (err) {
      console.error('Error:', err.response?.data || err.message)
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const designStyles = [
    { name: 'Modern Minimal', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80', desc: 'Clean lines, cove lighting, neutral palette' },
    { name: 'Royal Luxe', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80', desc: 'POP moulding, chandelier, rich textures' },
    { name: 'Scandinavian', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=80', desc: 'Wooden rafters, cozy, natural light' }
  ]

  const materials = [
    { 
      id: 'marble', 
      name: 'Italian Marble', 
      img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&auto=format&fit=crop',
      video: 'https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4',
      price: '₹450/sqft'
    },
    { 
      id: 'wood', 
      name: 'Teak Wood', 
      img: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&auto=format&fit=crop',
      video: 'https://videos.pexels.com/video-files/8061021/8061021-hd_1920_1080_25fps.mp4',
      price: '₹320/sqft'
    },
    { 
      id: 'pop', 
      name: 'Designer POP', 
      img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&auto=format&fit=crop',
      video: 'https://videos.pexels.com/video-files/8061021/8061021-hd_1920_1080_25fps.mp4',
      price: '₹180/sqft'
    }
  ]

  const journeySteps = [
    { icon: '📐', title: 'Free 3D Design', desc: 'Get photorealistic 3D renders of your ceiling in 48 hours. No cost, no commitment.' },
    { icon: '📋', title: 'Material Selection', desc: 'Choose from 50+ premium materials. Our expert helps you pick the best for your budget.' },
    { icon: '🔨', title: '45-Day Execution', desc: 'Dust-free installation by certified carpenters. Daily progress updates on WhatsApp.' },
    { icon: '✨', title: '10-Year Warranty', desc: 'Crack-proof guarantee on POP work. Free maintenance for 1 year included.' }
  ]

  return (
    <>
      <Helmet>
        <title>Luxury Living Room Interior Design in Delhi NCR | 3D Ceiling Experts - Urbane Living</title>
        <meta name="description" content="Get premium living room interiors with 3D ceiling designs, cove lights & modular furniture. Urbane Living offers 45-day delivery & free 3D design in Delhi NCR. 500+ homes delivered." />
        <meta name="keywords" content="living room interior designer delhi, false ceiling design, 3d interior design, cove light ceiling, pop design, wooden ceiling, modular living room delhi ncr, interior design cost" />
        <link rel="canonical" href="https://urbaneliving.in/living" />
        <meta property="og:title" content="Luxury Living Room Interior Design | 3D Ceiling Experts Delhi NCR" />
        <meta property="og:description" content="Transform your living room with designer ceilings & 3D visualization before execution. 45-day delivery guaranteed." />
        <meta property="og:image" content="https://urbaneliving.in/og-living-room.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Luxury Living Room Interior Design | Urbane Living" />
        <meta name="twitter:description" content="Free 3D design + 45-day delivery for living room interiors in Delhi NCR" />
        <meta name="twitter:image" content="https://urbaneliving.in/og-living-room.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Living Room Interior Design with 3D Ceiling",
            "provider": { 
              "@type": "LocalBusiness", 
              "name": "Urbane Living",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "DLF Phase 3",
                "addressLocality": "Gurgaon",
                "addressRegion": "Delhi NCR",
                "postalCode": "122002",
                "addressCountry": "IN"
              },
              "telephone": "+91-9999999999",
              "priceRange": "₹₹",
              "image": "https://urbaneliving.in/logo.jpg",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500"
              }
            },
            "areaServed": ["Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad"],
            "description": "Premium living room interior design with 3D ceiling visualization, cove lighting, and 45-day delivery guarantee",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "description": "Free 3D Design Consultation"
            }
          })}
        </script>
      </Helmet>

      {/* Section 1: 3D Hero */}
      <section className="bg-[#121212] text-white py-12 md:py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight" style={{ fontFamily: 'Playfair Display' }}>
              Redefine Your <br className="hidden md:block"/>
              Living Room with <br className="hidden md:block"/>
              <span className="text-[#E63946] relative inline-block">
                Designer Ceilings
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#E63946] animate-pulse"></span>
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg">
              Experience luxury with 3D visualized false ceilings before execution. Move your mouse to explore.
            </p>
            <a href="#contact" className="inline-block bg-[#E63946] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:shadow-[0_0_30px_#E63946] hover:scale-105 transition-all duration-300">
              Get Free 3D Design
            </a>
          </div>
          <div ref={mountRef} data-aos="zoom-in" className="h- md:h- w-full rounded-2xl"></div>
        </div>
      </section>

      {/* Section 2: 4-Step Design Journey - GSAP Horizontal Scroll */}
      <section ref={journeyRef} className="bg-[#F5F5F5] py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center" style={{ fontFamily: 'Playfair Display' }}>
            Your Dream Ceiling in 4 Steps
          </h2>
          <p className="text-center text-gray-600 mt-4">Scroll to explore our process</p>
        </div>
        
        {/* Desktop: Horizontal Scroll */}
        <div className="hidden md:flex w-[400%] h-screen items-center">
          {journeySteps.map((step, i) => (
            <div key={i} className="journey-step w-screen px-4 flex items-center justify-center">
              <div className="max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="text-6xl md:text-8xl mb-6">{step.icon}</div>
                <div className="text-sm text-[#E63946] font-bold mb-2">STEP {i + 1}</div>
                <h3 className="text-2xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>{step.title}</h3>
                <p className="text-gray-600 text-base md:text-lg">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Normal Vertical Cards */}
        <div className="md:hidden space-y-6 px-4">
          {journeySteps.map((step, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-xl" data-aos="fade-up">
              <div className="text-5xl mb-4">{step.icon}</div>
              <div className="text-sm text-[#E63946] font-bold mb-2">STEP {i + 1}</div>
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display' }}>{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Signature Design Styles */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16" data-aos="fade-up" style={{ fontFamily: 'Playfair Display' }}>
          Signature Design Styles
        </h2>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {designStyles.map((style, i) => (
            <article key={i} className="tilt-card bg-white rounded-2xl shadow-xl overflow-hidden group" data-aos="fade-up" data-aos-delay={i*100}>
              <div className="h-56 md:h-64 overflow-hidden">
                <img 
                  src={style.img} 
                  alt={`${style.name} Living Room Interior Design Delhi NCR`}
                  loading="lazy"
                  width="600"
                  height="400"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{style.name}</h3>
                <p className="text-gray-600">{style.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 4: Premium Material Library */}
      <section className="py-16 md:py-20 px-4 bg-[#121212] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4" data-aos="fade-up" style={{ fontFamily: 'Playfair Display' }}>
            Premium Material Library
          </h2>
          <p className="text-center text-gray-400 mb-12 md:mb-16" data-aos="fade-up" data-aos-delay="100">
            Hover to preview. Click to select for your 3D design.
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {materials.map((mat) => (
              <div 
                key={mat.id} 
                className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeMaterial === mat.id? 'ring-4 ring-[#E63946] scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setActiveMaterial(mat.id)}
                data-aos="zoom-in"
              >
                <div className="relative h-64 group">
                  <img src={mat.img} alt={`${mat.name} ceiling material for interior design`} className="w-full h-full object-cover" loading="lazy" />
                  <video 
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    muted 
                    loop 
                    playsInline
                    preload="none"
                    onMouseEnter={(e) => {
                      const video = e.target
                      const playPromise = video.play()
                      if (playPromise!== undefined) {
                        playPromise.catch(err => console.log('Video play interrupted:', err))
                      }
                    }}
                    onMouseLeave={(e) => {
                      const video = e.target
                      if (!video.paused) {
                        video.pause()
                        video.currentTime = 0
                      }
                    }}
                  >
                    <source src={mat.video} type="video/mp4" />
                  </video>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-bold">{mat.name}</h3>
                    <p className="text-[#E63946] font-semibold">{mat.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Live Stats Counter */}
      <section className="stats-section py-16 md:py-20 px-4 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          <div data-aos="zoom-in">
            <div className="text-5xl md:text-6xl font-black text-[#E63946] mb-2">{stats.projects}+</div>
            <p className="text-lg md:text-xl text-gray-700">Homes Delivered</p>
          </div>
          <div data-aos="zoom-in" data-aos-delay="100">
            <div className="text-5xl md:text-6xl font-black text-[#E63946] mb-2">{stats.rating}/5</div>
            <p className="text-lg md:text-xl text-gray-700">Client Rating</p>
          </div>
          <div data-aos="zoom-in" data-aos-delay="200">
            <div className="text-5xl md:text-6xl font-black text-[#E63946] mb-2">{stats.days} Days</div>
            <p className="text-lg md:text-xl text-gray-700">Avg Delivery</p>
          </div>
        </div>
      </section>

      {/* Section 6: Form */}
      <section className="py-16 md:py-20 px-4 bg-[#121212] text-white" id="contact">
        <div className="max-w-2xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Playfair Display' }}>
            Get Free 3D Design
          </h2>
          <p className="text-center text-gray-400 mb-8 md:mb-12">Our designer will call you in 30 minutes</p>
          <form onSubmit={handleSubmit} className="backdrop-blur-lg bg-white/10 p-6 md:p-12 rounded-3xl border border-white/20">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name *" required 
                className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="tel" placeholder="Phone *" required pattern="[0-9]{10}"
                className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all" 
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            
            <input type="email" placeholder="Email *" required
              className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all mt-4" 
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <select 
                className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all"
                value={formData.ceilingType} onChange={e => setFormData({...formData, ceilingType: e.target.value})}>
                <option value="" className="text-black">Select Ceiling Type</option>
                <option value="Cove Light" className="text-black">Cove Light</option>
                <option value="Wooden Rafters" className="text-black">Wooden Rafters</option>
                <option value="Geometric POP" className="text-black">Geometric POP</option>
              </select>
              
              <select 
                className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all"
                value={formData.designStyle} onChange={e => setFormData({...formData, designStyle: e.target.value})}>
                <option value="" className="text-black">Design Style</option>
                <option value="Modern Minimal" className="text-black">Modern Minimal</option>
                <option value="Royal Luxe" className="text-black">Royal Luxe</option>
                <option value="Scandinavian" className="text-black">Scandinavian</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="Room Area (sqft)" 
                className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all" 
                value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
              <input type="text" placeholder="Timeline (e.g. 2 months)" 
                className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all" 
                value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} />
            </div>

            <textarea placeholder="Message / Requirements" 
              className="w-full p-3 md:p-4 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all mt-4" 
              rows="4"
              value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
            
            <button type="submit" disabled={loading} className="w-full bg-[#E63946] py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:shadow-[0_0_30px_#E63946] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
              {loading? 'Sending...' : 'Get Free Quote + 3D Design'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default LivingRoom