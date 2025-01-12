import { API_URL } from '../../../config/config';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Image, Code, Type, Video, X, ArrowLeft, Edit2, Check } from 'lucide-react';
import TextEditor from './TextEditor';
import CodeEditor from './CodeEditor';
import ImageUploader from './ImageUploader';
import VideoEmbed from './VideoEmbed';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function CreateBlogPost() {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [title, setTitle] = useState('Untitled Post');
  const [sections, setSections] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      console.log('Checking auth state:', authState);
      if (!authState.isAuthenticated || !authState.isAdmin) {
        console.log('User not authenticated or not admin');
        navigate('/admin/login');
      }
    };
    checkAuth();
  }, [authState, navigate]);

  const addSection = (type) => {
    setSections([...sections, { type, id: Date.now(), content: '' }]);
    setShowAddMenu(false);
  };

  const updateSection = (id, content) => {
    console.log('Updating section:', id, content);
    setSections(sections.map(section => 
      section.id === id ? { ...section, content } : section
    ));
  };

  const removeSection = (id) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!title.trim()) {
      alert('Please enter a title for the blog post');
      return;
    }

    if (sections.length === 0) {
      alert('Please add at least one content section');
      return;
    }

    try {
      console.log('Submitting blog post...');
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        console.log('No admin token found');
        navigate('/admin/login');
        return;
      }

      console.log('Sending request with token:', token);
      const response = await fetch(`${API_URL}/api/admin/blog-posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title.trim(),
          sections: sections.map(section => ({
            type: section.type,
            content: section.content || ''
          }))
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        alert('Blog post created successfully!');
        setTitle('');
        setSections([]);
        navigate('/admin/dashboard');
      } else {
        throw new Error(data.message || 'Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert(error.message || 'Failed to create blog post. Please try again.');
    }
  };

  const handleTitleSave = () => {
    if (!title.trim()) {
      setTitle('Untitled Post');
    }
    setIsEditingTitle(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                form="blog-form"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm hover:shadow transition-all duration-200"
              >
                Publish Post
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <form id="blog-form" onSubmit={handleSubmit} className="divide-y divide-gray-100">
            {/* Title Section */}
            <div className="p-8">
              <div className="flex items-center justify-between group">
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleSave}
                    onKeyPress={(e) => e.key === 'Enter' && handleTitleSave()}
                    autoFocus
                    className="w-full text-4xl font-bold text-gray-900 border-b-2 border-purple-500 focus:outline-none bg-gray-50 px-2 py-1 rounded"
                    placeholder="Enter your post title..."
                  />
                ) : (
                  <h2 
                    className="text-4xl font-bold text-gray-900 px-2 py-1"
                  >
                    {title}
                  </h2>
                )}
                <button
                  type="button"
                  onClick={() => isEditingTitle ? handleTitleSave() : setIsEditingTitle(true)}
                  className="ml-4 p-2 text-gray-400 hover:text-purple-600 rounded-full hover:bg-purple-50 transition-colors opacity-0 group-hover:opacity-100"
                >
                  {isEditingTitle ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Edit2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Content Sections */}
            <div className="p-8 space-y-8">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-purple-200 transition-colors duration-200"
                >
                  <button
                    onClick={() => removeSection(section.id)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-white transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="mb-2 text-sm font-medium text-gray-500">
                    {section.type === 'text' && 'Text Content'}
                    {section.type === 'code' && 'Code Block'}
                    {section.type === 'image' && 'Image Upload'}
                    {section.type === 'video' && 'Video Embed'}
                  </div>

                  {section.type === 'text' && (
                    <TextEditor
                      value={section.content}
                      onChange={(content) => updateSection(section.id, content)}
                    />
                  )}

                  {section.type === 'code' && (
                    <CodeEditor
                      value={section.content}
                      onChange={(content) => updateSection(section.id, content)}
                    />
                  )}

                  {section.type === 'image' && (
                    <ImageUploader
                      value={section.content}
                      onChange={(content) => updateSection(section.id, content)}
                    />
                  )}

                  {section.type === 'video' && (
                    <VideoEmbed
                      value={section.content}
                      onChange={(content) => updateSection(section.id, content)}
                    />
                  )}
                </motion.div>
              ))}

              {/* Add Section Button */}
              <div className="relative">
                <motion.button
                  type="button"
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  className="flex items-center space-x-2 px-5 py-3 text-purple-600 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-300 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Add Content</span>
                </motion.button>

                {showAddMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-10"
                  >
                    {[
                      { type: 'text', icon: Type, label: 'Text Content', desc: 'Add formatted text content' },
                      { type: 'code', icon: Code, label: 'Code Block', desc: 'Add code with syntax highlighting' },
                      { type: 'image', icon: Image, label: 'Image Upload', desc: 'Upload and embed images' },
                      { type: 'video', icon: Video, label: 'Video Embed', desc: 'Embed video content' },
                    ].map(({ type, icon: Icon, label, desc }) => (
                      <motion.button
                        key={type}
                        type="button"
                        onClick={() => addSection(type)}
                        whileHover={{ x: 4 }}
                        className="flex items-start space-x-3 w-full p-3 hover:bg-purple-50 rounded-lg text-gray-700 transition-colors duration-200"
                      >
                        <Icon className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div className="text-left">
                          <div className="font-medium">{label}</div>
                          <div className="text-sm text-gray-500">{desc}</div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlogPost; 