import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import Navbar from '../components/Navbar';

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  const fetchBlogDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/blog-posts/${id}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.post);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
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

  const renderSection = (section) => {
    switch (section.type) {
      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            <ReactQuill
              value={section.content}
              readOnly={true}
              theme="bubble"
            />
          </div>
        );
      case 'code':
        return (
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
            <code>{section.content}</code>
          </pre>
        );
      case 'image':
        return (
          <img
            src={section.content}
            alt="Blog content"
            className="w-full rounded-lg"
          />
        );
      case 'video':
        return (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={section.content}
              title="Embedded video"
              allowFullScreen
              className="w-full rounded-lg"
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Blog post not found.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-[#333333] to-[#111827] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center text-gray-200 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Blogs
            </button>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center space-x-6 text-gray-200">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(blog.createdAt)}
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {blog.author?.firstName || 'Admin'}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="space-y-12 prose prose-lg max-w-none">
              <div className="prose-headings:text-[#111827] prose-p:text-[#333333]">
                {blog.sections.map((section, index) => (
                  <div key={index} className="blog-section">
                    {renderSection(section)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Share and Navigation Section */}
          <div className="mt-12 flex justify-between items-center">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center text-[#333333] hover:text-[#111827] transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to All Posts
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 