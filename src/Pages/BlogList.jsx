import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ChevronRight, Search } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/blog-posts');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.posts);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        {/* Hero Section with Gradient */}
        <div className="relative bg-gradient-to-r from-[#333333] to-[#111827] text-white">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h1 className="text-5xl font-bold text-center mb-6">
              TDC Blog
            </h1>
            <p className="text-xl text-center max-w-2xl mx-auto text-gray-100">
              Explore the latest insights, tutorials, and updates from our team of experts
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-[#111827] bg-opacity-50 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Blog List Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs
              .filter(blog => 
                blog.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((blog) => (
                <article
                  key={blog._id}
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Default Cover Image if no image section exists */}
                  <div className="h-48 bg-gradient-to-r from-[#333333] to-[#111827] relative">
                    {blog.sections.find(s => s.type === 'image') ? (
                      <img
                        src={blog.sections.find(s => s.type === 'image').content}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-opacity-30 text-6xl font-bold">
                          TDC
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#111827] mb-3 line-clamp-2 hover:text-[#333333] transition-colors">
                      {blog.title}
                    </h2>
                    
                    {blog.sections.find(s => s.type === 'text') && (
                      <p className="text-[#333333] mb-4 line-clamp-3">
                        {blog.sections.find(s => s.type === 'text').content.replace(/<[^>]*>/g, '')}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 text-[#333333]">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(blog.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {blog.author?.firstName || 'Admin'}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#111827]" />
                    </div>
                  </div>
                </article>
              ))}
          </div>

          {blogs.length === 0 && !loading && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-600">No blog posts found</h3>
              <p className="text-gray-500 mt-2">Check back later for new content</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 