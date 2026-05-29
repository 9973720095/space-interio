import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [filter, setFilter] = useState({ bhk: "", budget: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    whatsapp: true,
  });

  // Modal states
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalForm, setModalForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const dummyProjects = [
      {
        id: 1,
        title: "3BHK Modern Style Interior Design in Gurgaon With Home Office",
        city: "Gurgaon",
        bhk: "3-BHK",
        budget: "30-35 Lakhs",
        scope: "Full Home, Kitchen, Living Room",
        images: 15,
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&auto=format&fit=crop",
        ],
        video: "https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4",
        featured: true,
      },
      {
        id: 2,
        title: "Luxury 4BHK Villa Interior in Faridabad with Pool View",
        city: "Faridabad",
        bhk: "Villa",
        budget: "45-50 Lakhs",
        scope: "Full Home, Living Room",
        images: 20,
        img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&auto=format&fit=crop",
        ],
        video: "https://videos.pexels.com/video-files/8061021/8061021-hd_1920_1080_25fps.mp4",
        featured: true,
      },
      {
        id: 3,
        title: "3BHK Apartment Interiors in Noida for Budget 30L",
        city: "Noida",
        bhk: "3-BHK",
        budget: "25-30 Lakhs",
        scope: "Kitchen, Living Room",
        images: 12,
        img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&auto=format&fit=crop",
        ],
        video: "",
        featured: true,
      },
      {
        id: 4,
        title: "Contemporary 3BHK Interior Design in Ghaziabad",
        city: "Ghaziabad",
        bhk: "3-BHK",
        budget: "20-25 Lakhs",
        scope: "Full Home, Kitchen",
        images: 16,
        img: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&h=800&auto=format&fit=crop",
        ],
        video: "",
        featured: false,
      },
      {
        id: 5,
        title: "2BHK Smart Home Interior in Delhi with Modular Kitchen",
        city: "Delhi",
        bhk: "2-BHK",
        budget: "10-15 Lakhs",
        scope: "Kitchen, Living Room",
        images: 10,
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&auto=format&fit=crop",
        ],
        video: "",
        featured: false,
      },
      {
        id: 6,
        title: "Villa Interior in Delhi with Island Kitchen",
        city: "Delhi",
        bhk: "Villa",
        budget: "15-20 Lakhs",
        scope: "Living Room, Kitchen",
        images: 15,
        img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&auto=format&fit=crop",
        ],
        video: "",
        featured: false,
      },
    ];

    setFeatured(dummyProjects.filter((p) => p.featured));
    setProjects(dummyProjects.filter((p) =>!p.featured));

    // GSAP Animation - with proper cleanup
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const filteredProjects = projects.filter((p) => {
    return (
      (!filter.bhk || p.bhk === filter.bhk) &&
      (!filter.city || p.city === filter.city)
    );
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      await axios.post(`${baseURL}/api/leads/projects`, {
       ...formData,
        source: "Delivered Projects Page",
      });
      alert("Thanks! Our expert will call you with similar designs.");
      setFormData({ name: "", email: "", phone: "", city: "", whatsapp: true });
      if (window.fbq)
        window.fbq("track", "Lead", { content_name: "Projects Page" });
    } catch (err) {
      console.error("Error:", err);
      alert("Thanks! Our expert will call you with similar designs.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        whatsapp: true,
      });
    }
    setLoading(false);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      await axios.post(`${baseURL}/api/leads/projects`, {
       ...modalForm,
        projectId: selectedProject?.id,
        projectTitle: selectedProject?.title,
        source: "Get This Design - Card Modal",
      });
      alert("Thanks! Our expert will call you with this design.");
      setModalForm({ name: "", phone: "", address: "", email: "" });
      setShowLeadModal(false);
      if (window.fbq)
        window.fbq("track", "Lead", { content_name: "Card Modal" });
    } catch (err) {
      console.error("Error:", err);
      alert("Thanks! Our expert will call you with this design.");
      setModalForm({ name: "", phone: "", address: "", email: "" });
      setShowLeadModal(false);
    }
    setLoading(false);
  };

  const openLeadModal = (project) => {
    setSelectedProject(project);
    setShowLeadModal(true);
  };

  const openGallery = (project) => {
    setSelectedProject(project);
    setGalleryIndex(0);
    setShowGalleryModal(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showGalleryModal) return;
      if (e.key === "Escape") setShowGalleryModal(false);
      if (e.key === "ArrowRight") {
        setGalleryIndex((prev) =>
          prev === selectedProject.gallery.length - 1? 0 : prev + 1
        );
      }
      if (e.key === "ArrowLeft") {
        setGalleryIndex((prev) =>
          prev === 0? selectedProject.gallery.length - 1 : prev - 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGalleryModal, selectedProject]);

  const ProjectCard = ({ project }) => (
    <article className="project-card bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300">
      <div
        className="relative h-64 overflow-hidden cursor-pointer"
        onClick={() => openGallery(project)}
      >
        <img
          src={project.img}
          alt={`${project.title} - Urbane Living Interior Design`}
          loading="lazy"
          width="800"
          height="600"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {project.video && (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            muted
            loop
            playsInline
            preload="none"
            onMouseEnter={(e) => e.target.play().catch(() => {})}
            onMouseLeave={(e) => {
              if (!e.target.paused) {
                e.target.pause();
                e.target.currentTime = 0;
              }
            }}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        )}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          {project.gallery?.length || project.images}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 min-h-">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{project.city}</p>
        <div className="border-t pt-3 grid grid-cols-3 gap-2 text-xs mb-4">
          <div>
            <div className="text-gray-400">Scope</div>
            <div className="font-semibold truncate">{project.scope}</div>
          </div>
          <div>
            <div className="text-gray-400">BHK</div>
            <div className="font-semibold">{project.bhk}</div>
          </div>
          <div>
            <div className="text-gray-400">Pricing</div>
            <div className="font-semibold">{project.budget}</div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openLeadModal(project);
          }}
          className="block w-full text-center border-2 border-[#E63946] text-[#E63946] py-2.5 rounded-lg font-semibold hover:bg-[#E63946] hover:text-white transition-all duration-300"
        >
          Get This Design
        </button>
      </div>
    </article>
  );

  return (
    <>
      <Helmet>
        <title>Delivered Projects - 500+ Home Interiors | Urbane Living Delhi NCR</title>
        <meta
          name="description"
          content="Explore 500+ delivered home interior projects by Urbane Living in Delhi, Gurgaon, Ghaziabad, Faridabad, Noida. 3BHK, 4BHK, Villa designs with 3D visualization."
        />
        <meta
          name="keywords"
          content="home interior projects delhi, delivered homes gurgaon, 3bhk interior design noida, villa interior ghaziabad"
        />
        <link rel="canonical" href="https://urbaneliving.in/projects" />
      </Helmet>

      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-8 bg-[#E63946]"></div>
            <h1 className="text-4xl md:text-5xl font-black">
              Urbane Delivered Homes
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl text-base md:text-lg mb-12">
            Urbane Delivered Homes features expertly crafted, personalized
            interiors, showcasing stunning transformations and seamless
            execution for inspiring, real home makeovers.
          </p>

          <div className="bg-gradient-to-b from-pink-50 to-white rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Featured Delivered Homes
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Browse our top home interior projects for May, 2026, handpicked by our experts.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              All Delivered Projects
            </h2>
            <div className="flex gap-3">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                value={filter.bhk}
                onChange={(e) => setFilter({...filter, bhk: e.target.value })}
              >
                <option value="">All BHK</option>
                <option value="1-BHK">1 BHK</option>
                <option value="2-BHK">2 BHK</option>
                <option value="3-BHK">3 BHK</option>
                <option value="4-BHK">4 BHK</option>
                <option value="Villa">Villa</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                value={filter.city}
                onChange={(e) => setFilter({...filter, city: e.target.value })}
              >
                <option value="">All Cities</option>
                <option value="Delhi">Delhi</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Ghaziabad">Ghaziabad</option>
                <option value="Faridabad">Faridabad</option>
                <option value="Noida">Noida</option>
              </select>
            </div>
          </div>

          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#2D1B4E] text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=500&auto=format&fit=crop"
              alt="Luxury bedroom interior design"
              className="rounded-2xl w-full h- object-cover"
              loading="lazy"
            />
          </div>
          <div className="bg-[#3D2A5E] p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Designs for Every Budget
            </h2>
            <p className="text-center text-gray-300 mb-8">
              Get your dream home today. Let our experts help you.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name *"
                required
                className="w-full p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                value={formData.name}
                onChange={(e) =>
                  setFormData({...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email *"
                required
                className="w-full p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                value={formData.email}
                onChange={(e) =>
                  setFormData({...formData, email: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                pattern="[0-9]{10}"
                className="w-full p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({...formData, phone: e.target.value })
                }
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({...formData, whatsapp: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                Send me updates on WhatsApp
              </label>
              <select
                className="w-full p-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                value={formData.city}
                onChange={(e) =>
                  setFormData({...formData, city: e.target.value })
                }
                required
              >
                <option value="">Select City *</option>
                <option value="Delhi">Delhi</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Ghaziabad">Ghaziabad</option>
                <option value="Faridabad">Faridabad</option>
                <option value="Noida">Noida</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E63946] py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_#E63946] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {loading? "SUBMITTING..." : "DELIVERED PROJECTS"}
              </button>
              <p className="text-xs text-gray-400 text-center">
                By submitting this form, you agree to the{" "}
                <Link
                  to="/privacy-policy"
                  className="text-[#E63946] hover:underline"
                >
                  privacy policy
                </Link>{" "}
                &{" "}
                <Link
                  to="/terms-conditions"
                  className="text-[#E63946] hover:underline"
                >
                  terms and conditions
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      {showLeadModal && selectedProject && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center p-4" onClick={() => setShowLeadModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-2">Get This Design</h3>
            <p className="text-sm text-gray-600 mb-6 line-clamp-2">{selectedProject.title}</p>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name *"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                value={modalForm.name}
                onChange={(e) => setModalForm({...modalForm, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                pattern="[0-9]{10}"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                value={modalForm.phone}
                onChange={(e) => setModalForm({...modalForm, phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address *"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                value={modalForm.address}
                onChange={(e) => setModalForm({...modalForm, address: e.target.value })}
              />
              <input
                type="email"
                placeholder="Gmail *"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E63946]"
                value={modalForm.email}
                onChange={(e) => setModalForm({...modalForm, email: e.target.value })}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E63946] text-white py-3 rounded-lg font-bold hover:shadow-[0_0_20px_#E63946] transition-all disabled:opacity-50"
              >
                {loading? "SUBMITTING..." : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showGalleryModal && selectedProject && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4" onClick={() => setShowGalleryModal(false)}>
          <button
            onClick={() => setShowGalleryModal(false)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
          >
            ×
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex((prev) => (prev === 0? selectedProject.gallery.length - 1 : prev - 1));
            }}
            className="absolute left-4 text-white text-5xl hover:text-gray-300 z-10"
          >
            ‹
          </button>
          <img
            src={selectedProject.gallery[galleryIndex]}
            alt={`${selectedProject.title} - Image ${galleryIndex + 1}`}
            className="max-w-full max-h- object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex((prev) => (prev === selectedProject.gallery.length - 1? 0 : prev + 1));
            }}
            className="absolute right-4 text-white text-5xl hover:text-gray-300 z-10"
          >
            ›
          </button>
          <div className="absolute bottom-4 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {galleryIndex + 1} / {selectedProject.gallery.length}
          </div>
        </div>
      )}

      <a
        href="https://wa.me/919560555103"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.38 0-4.54 3.7-8.24 8.24-8.24s8.24 3.7 8.24 8.24-3.7 8.24-8.24 8.24zm4.52-6.14c-.25-.12-1.47-.73-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z" />
        </svg>
      </a>
    </>
  );
};

export default Projects;