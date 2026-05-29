import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchBlogs();
  }, []);


  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = [
        {
          _id: "1",
          title: "10 Modern Kitchen Design Trends for 2026 That Will Transform Your Home",
          slug: "modern-kitchen-design-trends-2026",
          excerpt: "Discover the latest kitchen design trends including smart storage, sustainable materials, and minimalist aesthetics that are dominating 2026.",
          category: "Kitchen",
          author: { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop&q=80" },
          publishedAt: "2026-05-25",
          readTime: 6,
          featuredImage: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1780037121/WhatsApp_Image_2026-04-28_at_15.58.22_kjetig.jpg",
          tags: ["Kitchen Design", "Interior Trends", "2026"],
          isFeatured: true,
          metaDescription: "Modern kitchen design trends 2026 - smart storage, sustainable materials, minimalist aesthetics. Expert tips from Urbane Living designers.",
          metaKeywords: "kitchen design 2026, modern kitchen trends, interior design delhi",
        },
        {
          _id: "2",
          title: "Small Bedroom? 15 Space-Saving Ideas That Actually Work",
          slug: "small-bedroom-space-saving-ideas",
          excerpt: "Maximize your small bedroom with these genius storage hacks, multifunctional furniture, and layout tricks from top designers.",
          category: "Bedroom",
          author: { name: "Rahul Verma", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop&q=80" },
          publishedAt: "2026-05-22",
          readTime: 8,
          featuredImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&auto=format&fit=crop&q=80",
          tags: ["Bedroom", "Small Spaces", "Storage"],
          isFeatured: false,
          metaDescription: "Small bedroom design ideas - 15 space-saving hacks for Delhi NCR apartments. Storage solutions, layout tips.",
          metaKeywords: "small bedroom design, space saving ideas, bedroom interior delhi",
        },
        {
          _id: "3",
          title: "Living Room Lighting: Complete Guide to Layered Illumination",
          slug: "living-room-lighting-guide",
          excerpt: "Learn how to create the perfect ambiance with ambient, task, and accent lighting. Expert tips for every budget.",
          category: "Living Room",
          author: { name: "Anjali Mehta", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop&q=80" },
          publishedAt: "2026-05-20",
          readTime: 7,
          featuredImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&auto=format&fit=crop&q=80",
          tags: ["Lighting", "Living Room", "Interior Design"],
          isFeatured: false,
          metaDescription: "Living room lighting guide - ambient, task, accent lighting explained. Budget-friendly tips for Indian homes.",
          metaKeywords: "living room lighting, home lighting design, interior lighting tips",
        },
        {
          _id: "4",
          title: "Sustainable Interior Design: Eco-Friendly Materials Guide",
          slug: "sustainable-interior-design-materials",
          excerpt: "Go green with your interiors. Complete guide to bamboo, cork, reclaimed wood, and other sustainable materials for modern homes.",
          category: "Sustainability",
          author: { name: "Vikram Singh", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop&q=80" },
          publishedAt: "2026-05-18",
          readTime: 10,
          featuredImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&auto=format&fit=crop&q=80",
          tags: ["Sustainable", "Eco-Friendly", "Materials"],
          isFeatured: false,
          metaDescription: "Sustainable interior design materials - bamboo, cork, reclaimed wood guide. Eco-friendly home decor ideas.",
          metaKeywords: "sustainable interior design, eco-friendly materials, green home decor",
        },
        {
          _id: "5",
          title: "Color Psychology: How to Choose Paint Colors for Every Room",
          slug: "color-psychology-paint-colors",
          excerpt: "Understand how colors affect mood and productivity. Scientific guide to picking the perfect palette for bedrooms, offices, and more.",
          category: "Design Tips",
          author: { name: "Neha Kapoor", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop&q=80" },
          publishedAt: "2026-05-15",
          readTime: 9,
          featuredImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&auto=format&fit=crop&q=80",
          tags: ["Color", "Paint", "Psychology"],
          isFeatured: false,
          metaDescription: "Color psychology for home interiors - paint color guide for bedrooms, living rooms, offices. Mood & productivity tips.",
          metaKeywords: "color psychology interior design, paint colors for home, room color guide",
        },
        {
          _id: "6",
          title: "Vastu Shastra for Modern Homes: 12 Essential Rules",
          slug: "vastu-shastra-modern-homes",
          excerpt: "Balance traditional Vastu principles with contemporary design. Practical tips for entrance, kitchen, bedroom, and puja room placement.",
          category: "Vastu",
          author: { name: "Pandit Rajesh Sharma", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop&q=80" },
          publishedAt: "2026-05-12",
          readTime: 12,
          featuredImage: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&auto=format&fit=crop&q=80",
          tags: ["Vastu", "Traditional", "Home Design"],
          isFeatured: false,
          metaDescription: "Vastu Shastra for modern homes - 12 essential rules for entrance, kitchen, bedroom placement. Contemporary Vastu tips.",
          metaKeywords: "vastu shastra home, modern vastu tips, vastu for apartment",
        },
      ];

      setFeaturedBlog(data.find((b) => b.isFeatured));
      setBlogs(data.filter((b) =>!b.isFeatured));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Kitchen", "Bedroom", "Living Room", "Sustainability", "Design Tips", "Vastu"];

  // SEARCH + FILTER LOGIC
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = category === "All" || blog.category === category;
    const searchLower = searchTerm.toLowerCase().trim();
    const matchesSearch = 
      searchLower === "" ||
      blog.title.toLowerCase().includes(searchLower) ||
      blog.excerpt.toLowerCase().includes(searchLower) ||
      blog.category.toLowerCase().includes(searchLower) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      blog.author.name.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  // SCHEMA.ORG STRUCTURED DATA
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Urbane Living Interior Design Blog",
    "description": "Expert interior design tips, trends, and inspiration for modern Indian homes",
    "url": "https://urbaneliving.in/blogs",
    "publisher": {
      "@type": "Organization",
      "name": "Urbane Living",
      "logo": {
        "@type": "ImageObject",
        "url": "https://urbaneliving.in/logo.png"
      }
    },
    "blogPost": blogs.slice(0, 10).map(blog => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "image": blog.featuredImage,
      "datePublished": blog.publishedAt,
      "dateModified": blog.publishedAt,
      "author": {
        "@type": "Person",
        "name": blog.author.name
      },
      "url": `https://urbaneliving.in/blogs/${blog.slug}`,
      "description": blog.metaDescription || blog.excerpt
    }))
  };

  const BlogCard = ({ blog }) => (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300" itemScope itemType="https://schema.org/BlogPosting">
      <Link to={`/blogs/${blog.slug}`} className="block" itemProp="url">
        <div className="relative h-56 overflow-hidden">
          <img
            src={blog.featuredImage}
            alt={`${blog.title} - Urbane Living Interior Design Blog`}
            loading="lazy"
            width="600"
            height="400"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            itemProp="image"
          />
          <div className="absolute top-3 left-3 bg-[#E63946] text-white px-3 py-1 rounded-full text-xs font-semibold">
            {blog.category}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <time dateTime={blog.publishedAt} itemProp="datePublished">
              {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </time>
            <span>•</span>
            <span>{blog.readTime} min read</span>
          </div>
          <h3 className="text-xl font-bold mb-3 line-clamp-2 min-h- group-hover:text-[#E63946] transition-colors" itemProp="headline">
            {blog.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4" itemProp="description">{blog.excerpt}</p>
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-8 h-8 rounded-full object-cover"
                itemProp="image"
              />
              <span className="text-sm font-medium text-gray-700" itemProp="name">{blog.author.name}</span>
            </div>
            <span className="text-[#E63946] font-semibold text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
              Read More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E63946]"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Interior Design Blog - Tips, Trends & Ideas 2026 | Urbane Living</title>
        <meta
          name="description"
          content="Expert interior design tips, latest trends, Vastu guides, and home decor ideas. Read Urbane Living's blog for kitchen, bedroom, living room inspiration for Delhi NCR homes."
        />
        <meta
          name="keywords"
          content="interior design blog, home decor tips, kitchen design ideas, bedroom interior, living room trends, vastu shastra, sustainable design, Delhi interior designer blog"
        />
        <link rel="canonical" href="https://urbaneliving.in/blogs" />
        <meta property="og:title" content="Interior Design Blog | Urbane Living" />
        <meta
          property="og:description"
          content="Latest interior design trends, tips, and inspiration for modern Indian homes. Expert advice from Urbane Living designers."
        />
        <meta property="og:image" content="https://urbaneliving.in/og-blogs.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://urbaneliving.in/blogs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interior Design Blog | Urbane Living" />
        <meta name="twitter:description" content="Expert interior design tips and trends for modern Indian homes" />
        <meta name="twitter:image" content="https://urbaneliving.in/og-blogs.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      {/* Hero Section - Fully Responsive */}
      <section className="bg-gradient-to-br from-[#2D1B4E] via-[#3D2A5E] to-[#2D1B4E] text-white py-12 sm:py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            Design Insights & Inspiration
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Expert tips, latest trends, and practical guides to transform your home
          </p>
          
          <div className="max-w-2xl mx-auto px-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search articles, tips, trends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 rounded-full text-black text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-[#E63946]/50"
                aria-label="Search blog articles"
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog - Responsive */}
      {featuredBlog && (
        <section className="py-8 md:py-12 lg:py-16 px-4 bg-white -mt-6 sm:-mt-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl" data-aos="fade-up">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#E63946] text-white px-3 py-1 rounded-full text-xs font-bold">FEATURED</span>
                <time className="text-gray-500 text-xs sm:text-sm">
                  {new Date(featuredBlog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </time>
              </div>
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
                <div>
                  <Link to={`/blogs/${featuredBlog.slug}`}>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 hover:text-[#E63946] transition-colors leading-tight">
                      {featuredBlog.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6">{featuredBlog.excerpt}</p>
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <img
                      src={featuredBlog.author.avatar}
                      alt={featuredBlog.author.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm md:text-base">{featuredBlog.author.name}</div>
                      <div className="text-xs md:text-sm text-gray-500">{featuredBlog.readTime} min read</div>
                    </div>
                  </div>
                  <Link
                    to={`/blogs/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 bg-[#E63946] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-[0_0_20px_#E63946] hover:scale-105 transition-all text-sm sm:text-base"
                  >
                    Read Full Article
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src={featuredBlog.featuredImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter - Responsive */}
      <section className="py-6 sm:py-8 px-4 bg-white sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold whitespace-nowrap transition-all text-sm sm:text-base ${
                  category === cat
                  ? "bg-[#E63946] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid - Fully Responsive */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {filteredBlogs.length > 0? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500 text-sm sm:text-base">Try changing your search or category filter</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blogs;