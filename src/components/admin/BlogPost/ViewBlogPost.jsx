import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { API_URL } from '../../../config/config';

export default function ViewBlogPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blog-posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setPost(data.post);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (section) => {
    switch (section.type) {
      case 'text':
        return (
          <div className="prose prose-invert max-w-none">
            <ReactQuill
              value={section.content}
              readOnly={true}
              theme="bubble"
            />
          </div>
        );
      case 'code':
        return (
          <pre className="bg-gray-700 text-gray-100 p-4 rounded-lg overflow-x-auto">
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
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!post) return null;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/admin/posts')}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Posts
            </button>
            <button
              onClick={() => navigate(`/admin/edit-post/${postId}`)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Post
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl p-8 space-y-8">
            {/* Title */}
            <div className="border-b border-gray-700 pb-6">
              <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-400 text-sm">
                <span>By {post.author?.firstName} {post.author?.lastName}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {post.sections.map((section, index) => (
                <div key={section._id} className="relative">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-400">
                      Section {index + 1} - {section.type}
                    </span>
                  </div>
                  {renderSection(section)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 