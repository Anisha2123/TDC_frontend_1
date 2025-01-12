import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import AdminLayout from '../layout/AdminLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditBlogPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Add local state for tracking changes
  const [localChanges, setLocalChanges] = useState({});

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/blog-posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setPost(data.post);
        // Initialize local changes with current content
        const initialChanges = {};
        data.post.sections.forEach(section => {
          initialChanges[section._id] = section.content;
        });
        setLocalChanges(initialChanges);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  // Handle local content changes
  const handleContentChange = (sectionId, newContent) => {
    setLocalChanges(prev => ({
      ...prev,
      [sectionId]: newContent
    }));
  };

  // Save changes to database
  const handleSectionUpdate = async (sectionId) => {
    try {
      const section = post.sections.find(s => s._id === sectionId);
      if (!section) {
        throw new Error('Section not found');
      }

      const response = await fetch(`http://localhost:3000/api/blog-posts/${postId}/sections/${sectionId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: section.type,
          content: localChanges[sectionId]
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update post state with saved changes
        setPost(prev => ({
          ...prev,
          sections: prev.sections.map(section =>
            section._id === sectionId 
              ? { ...section, content: localChanges[sectionId] }
              : section
          )
        }));
        alert('Changes saved successfully');
      } else {
        throw new Error(data.message || 'Failed to update section');
      }
    } catch (error) {
      console.error('Error updating section:', error);
      alert('Failed to update section: ' + error.message);
    }
  };

  const handleTitleUpdate = async (newTitle) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/blog-posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle,
          sections: post.sections // Include current sections
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update title');
      }

      const data = await response.json();
      
      if (data.success) {
        setPost(prev => ({ ...prev, title: newTitle }));
        alert('Title updated successfully');
      } else {
        throw new Error(data.message || 'Failed to update title');
      }
    } catch (error) {
      console.error('Error updating title:', error);
      alert('Failed to update title: ' + error.message);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;

    try {
        // Remove 'admin' from the URL path to match server route
        const response = await fetch(`http://localhost:3000/api/blog-posts/${postId}/sections/${sectionId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });

        const data = await response.json();

        if (data.success) {
            // Update local state
            setPost(prev => ({
                ...prev,
                sections: prev.sections.filter(section => section._id !== sectionId)
            }));
            // Also update localChanges
            setLocalChanges(prev => {
                const newChanges = { ...prev };
                delete newChanges[sectionId];
                return newChanges;
            });
            alert('Section deleted successfully');
        } else {
            throw new Error(data.message || 'Failed to delete section');
        }
    } catch (error) {
        console.error('Error deleting section:', error);
        alert('Failed to delete section: ' + error.message);
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
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl p-8 space-y-8">
            {/* Title Section */}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm">Title</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => handleTitleUpdate(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Content Sections */}
            {post.sections.map((section, index) => (
              <div key={section._id} className="relative bg-gray-700 rounded-lg p-6">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleSectionUpdate(section._id)}
                    className="p-2 text-green-400 hover:text-green-300 rounded-full hover:bg-gray-600"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section._id)}
                    className="p-2 text-red-400 hover:text-red-300 rounded-full hover:bg-gray-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-400">
                    Section {index + 1} - {section.type}
                  </span>
                </div>

                {section.type === 'text' && (
                  <ReactQuill
                    value={localChanges[section._id] || section.content}
                    onChange={(content) => handleContentChange(section._id, content)}
                    theme="snow"
                  />
                )}

                {section.type === 'code' && (
                  <pre className="bg-gray-700 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{localChanges[section._id] || section.content}</code>
                  </pre>
                )}

                {section.type === 'image' && (
                  <div className="mt-2">
                    <img
                      src={localChanges[section._id] || section.content}
                      alt="Blog content"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                )}

                {section.type === 'video' && (
                  <div className="aspect-w-16 aspect-h-9 mt-2">
                    <iframe
                      src={localChanges[section._id] || section.content}
                      title="Embedded video"
                      allowFullScreen
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 