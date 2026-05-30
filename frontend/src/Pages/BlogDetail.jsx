import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyBlogs = [
      {
        id: 1,
        title: "10 Modern Kitchen Design Trends for 2026 That Will Transform Your Home",
        slug: "modern-kitchen-design-trends-2026",
        excerpt: "Discover the latest kitchen design trends including smart storage, sustainable materials, and minimalist aesthetics that are dominating 2026.",
        content: `
          <h2>1. Smart Storage Solutions</h2>
          <p>Modern kitchens in 2026 are all about maximizing space. Pull-out pantry systems, corner carousels, and vertical dividers are must-haves for urban homes.</p>
          <p>Consider deep drawers with dividers for pots and pans, and tall units that go all the way to the ceiling for maximum storage.</p>
          
          <h2>2. Sustainable Materials</h2>
          <p>Bamboo cabinets, recycled glass countertops, and cork flooring are trending. Eco-friendly doesn't mean compromising on style anymore.</p>
          <p>These materials are not only good for the environment but also highly durable and easy to maintain.</p>
          
          <h2>3. Minimalist Aesthetics</h2>
          <p>Handleless cabinets, integrated appliances, and clean lines create a clutter-free look that feels spacious and calm.</p>
          <p>The push-to-open mechanism and sleek profiles give kitchens a futuristic yet timeless appeal.</p>
          
          <h2>4. Smart Technology Integration</h2>
          <p>Voice-activated faucets, smart refrigerators that track inventory, and app-controlled lighting are becoming standard in luxury kitchens.</p>
          
          <h2>5. Bold Color Accents</h2>
          <p>While white kitchens remain popular, 2026 sees bold navy islands, forest green cabinets, and terracotta backsplashes making statements.</p>
        `,
        category: "Kitchen",
        author: "Priya Sharma",
        authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop&q=80",
        date: "2026-05-25",
        readTime: "6 min read",
        img: "https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1780037121/WhatsApp_Image_2026-04-28_at_15.58.22_kjetig.jpg",
        tags: ["Kitchen Design", "Interior Trends", "2026"],
      },
      {
        id: 2,
        title: "Small Bedroom? 15 Space-Saving Ideas That Actually Work",
        slug: "small-bedroom-space-saving-ideas",
        excerpt: "Maximize your small bedroom with these genius storage hacks, multifunctional furniture, and layout tricks from top designers.",
        content: `
          <h2>1. Wall-Mounted Nightstands</h2>
          <p>Free up floor space with floating nightstands. They create visual lightness and make cleaning easier.</p>
          
          <h2>2. Under-Bed Storage</h2>
          <p>Invest in storage beds or use rolling bins. You can store off-season clothes, extra bedding, or shoes without cluttering the room.</p>
          
          <h2>3. Mirrors to Create Illusion</h2>
          <p>A large mirror opposite the window doubles natural light and makes the room feel twice as big. Full-length mirrors behind doors work great too.</p>
          
          <h2>4. Vertical Storage</h2>
          <p>Use wall space up to the ceiling. Tall, narrow bookshelves and wall-mounted cabinets keep floor space clear.</p>
          
          <h2>5. Multipurpose Furniture</h2>
          <p>Ottomans with storage, beds with drawers, and fold-down desks are game changers for small spaces.</p>
        `,
        category: "Bedroom",
        author: "Rahul Verma",
        authorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop&q=80",
        date: "2026-05-22",
        readTime: "8 min read",
        img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&auto=format&fit=crop&q=80",
        tags: ["Bedroom", "Small Spaces", "Storage"],
      },
      {
        id: 3,
        title: "Living Room Lighting: Complete Guide to Layered Illumination",
        slug: "living-room-lighting-guide",
        excerpt: "Learn how to create the perfect ambiance with ambient, task, and accent lighting. Expert tips for every budget.",
        content: `
          <h2>1. Ambient Lighting - The Foundation</h2>
          <p>Start with general lighting like ceiling fixtures or recessed lights. This provides overall illumination for the room.</p>
          
          <h2>2. Task Lighting - Functional Zones</h2>
          <p>Reading lamps, table lamps, and floor lamps for specific activities. Place them near seating areas and workspaces.</p>
          
          <h2>3. Accent Lighting - Drama & Depth</h2>
          <p>Wall sconces, picture lights, and LED strips highlight artwork and architectural features, adding depth to your space.</p>
          
          <h2>4. Dimmer Switches - Control is Key</h2>
          <p>Install dimmers to adjust lighting for different moods - bright for gatherings, soft for movie nights.</p>
        `,
        category: "Living Room",
        author: "Anjali Mehta",
        authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop&q=80",
        date: "2026-05-20",
        readTime: "7 min read",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&auto=format&fit=crop&q=80",
        tags: ["Lighting", "Living Room", "Interior Design"],
      },
      {
        id: 4,
        title: "Sustainable Interior Design: Eco-Friendly Materials Guide",
        slug: "sustainable-interior-design-materials",
        excerpt: "Go green with your interiors. Complete guide to bamboo, cork, reclaimed wood, and other sustainable materials for modern homes.",
        content: `
          <h2>1. Bamboo - The Fast-Growing Wonder</h2>
          <p>Bamboo grows 30x faster than hardwood and is incredibly durable. Perfect for flooring, furniture, and decor items.</p>
          
          <h2>2. Reclaimed Wood - Character & History</h2>
          <p>Salvaged wood from old buildings adds character while reducing deforestation. Each piece has a unique story.</p>
          
          <h2>3. Cork - Soft & Sustainable</h2>
          <p>Harvested from tree bark without cutting the tree, cork is renewable, water-resistant, and great for flooring.</p>
          
          <h2>4. Recycled Glass & Metal</h2>
          <p>Countertops made from recycled glass and furniture from repurposed metal reduce landfill waste significantly.</p>
        `,
        category: "Sustainability",
        author: "Vikram Singh",
        authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop&q=80",
        date: "2026-05-18",
        readTime: "10 min read",
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&auto=format&fit=crop&q=80",
        tags: ["Sustainable", "Eco-Friendly", "Materials"],
      },
      {
        id: 5,
        title: "Color Psychology: How to Choose Paint Colors for Every Room",
        slug: "color-psychology-paint-colors",
        excerpt: "Understand how colors affect mood and productivity. Scientific guide to picking the perfect palette for bedrooms, offices, and more.",
        content: `
          <h2>Bedroom - Calming Blues & Greens</h2>
          <p>Blue lowers blood pressure and heart rate, promoting better sleep. Soft greens reduce stress and create a natural feel.</p>
          
          <h2>Home Office - Focused Yellows & Neutrals</h2>
          <p>Yellow stimulates creativity and optimism, while neutral grays and whites keep distractions minimal.</p>
          
          <h2>Living Room - Warm & Inviting</h2>
          <p>Earthy tones like terracotta, warm beige, and soft browns create cozy, welcoming spaces for socializing.</p>
          
          <h2>Kitchen - Energizing Reds & Oranges</h2>
          <p>Red stimulates appetite and conversation, while orange adds warmth and energy to cooking spaces.</p>
        `,
        category: "Design Tips",
        author: "Neha Kapoor",
        authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop&q=80",
        date: "2026-05-15",
        readTime: "9 min read",
        img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&auto=format&fit=crop&q=80",
        tags: ["Color", "Paint", "Psychology"],
      },
      {
        id: 6,
        title: "Vastu Shastra for Modern Homes: 12 Essential Rules",
        slug: "vastu-shastra-modern-homes",
        excerpt: "Balance traditional Vastu principles with contemporary design. Practical tips for entrance, kitchen, bedroom, and puja room placement.",
        content: `
          <h2>1. Main Entrance - North or East</h2>
          <p>The main door should face north or east to welcome positive energy and prosperity into the home.</p>
          
          <h2>2. Kitchen - Southeast Corner</h2>
          <p>Place the kitchen in the southeast, with the cook facing east while cooking for health and wealth.</p>
          
          <h2>3. Master Bedroom - Southwest</h2>
          <p>The master bedroom in the southwest ensures stability and good health for the homeowners.</p>
          
          <h2>4. Puja Room - Northeast</h2>
          <p>The northeast corner is most auspicious for prayer rooms, bringing peace and spiritual growth.</p>
        `,
        category: "Vastu",
        author: "Pandit Rajesh Sharma",
        authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop&q=80",
        date: "2026-05-12",
        readTime: "12 min read",
        img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&auto=format&fit=crop&q=80",
        tags: ["Vastu", "Traditional", "Home Design"],
      },
    ];

    const foundBlog = dummyBlogs.find((b) => b.slug === slug);
    setBlog(foundBlog);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E63946]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <Link to="/blogs" className="text-[#E63946] hover:underline">← Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} | Urbane Living Blog</title>
        <meta name="description" content={blog.excerpt} />
        <meta name="keywords" content={blog.tags.join(", ")} />
        <link rel="canonical" href={`https://urbaneliving.in/blogs/${blog.slug}`} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.img} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={blog.date} />
        <meta property="article:author" content={blog.author} />
        <meta property="article:section" content={blog.category} />
        {blog.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image" content={blog.img} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: blog.img,
            datePublished: blog.date,
            dateModified: blog.date,
            author: {
              "@type": "Person",
              name: blog.author,
              image: blog.authorImg
            },
            publisher: {
              "@type": "Organization",
              name: "Urbane Living",
              logo: {
                "@type": "ImageObject",
                url: "https://urbaneliving.in/logo.png"
              }
            },
            description: blog.excerpt,
            articleBody: blog.content.replace(/<[^>]*>/g, ''),
            keywords: blog.tags.join(", ")
          })}
        </script>
      </Helmet>

      <article className="py-6 sm:py-8 md:py-12 px-4 bg-white" itemScope itemType="https://schema.org/BlogPosting">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 md:mb-8 overflow-x-auto" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#E63946] whitespace-nowrap">Home</Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-[#E63946] whitespace-nowrap">Blogs</Link>
            <span>/</span>
            <span className="text-gray-700 line-clamp-1">{blog.title}</span>
          </nav>

          <div className="mb-4">
            <span className="bg-[#E63946] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              {blog.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight" itemProp="headline">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b">
            <div className="flex items-center gap-2 sm:gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
              <img
                src={blog.authorImg}
                alt={blog.author}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                itemProp="image"
              />
              <div>
                <div className="font-semibold text-sm sm:text-base" itemProp="name">{blog.author}</div>
                <div className="text-xs sm:text-sm text-gray-500">Interior Designer</div>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <time dateTime={blog.date} itemProp="datePublished">
                {new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-auto"
              loading="eager"
              itemProp="image"
            />
          </div>

          <div 
            className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 sm:prose-h2:mt-10 prose-h2:mb-3 sm:prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 sm:prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            itemProp="articleBody"
          />

          <div className="flex flex-wrap gap-2 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
            <span className="font-semibold text-gray-700">Tags:</span>
            {blog.tags.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs sm:text-sm" itemProp="keywords">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl">
            <div className="font-semibold mb-3 text-sm sm:text-base">Share this article:</div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button 
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Facebook
              </button>
              <button 
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`, '_blank')}
                className="bg-sky-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors text-sm sm:text-base"
              >
                Twitter
              </button>
              <button 
                onClick={() => window.open(`https://wa.me/?text=${blog.title} ${window.location.href}`, '_blank')}
                className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
              >
                WhatsApp
              </button>
            </div>
          </div>

          <div className="mt-8 sm:mt-12">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-[#E63946] font-semibold hover:gap-3 transition-all text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Blogs
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;