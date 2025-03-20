import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage({ type: 'error', text: 'Failed to load categories.' });
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim() || !selectedCategory || !image) {
      setMessage({ type: 'error', text: 'All fields are required.' });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    const blogData = JSON.stringify({ title, content });
    const blogBlob = new Blob([blogData], { type: 'application/json' });
    formData.append('blogDTO', blogBlob);
    formData.append('image', image);

    try {
      const userInfo = await axios.get(`http://localhost:8080/api/users/email/${user.email}`);
      const response = await axios.post(
        `http://localhost:8080/api/user/${userInfo.data.id}/category/${selectedCategory}/blogs`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Blog created:', response.data);
      navigate('/profile');
    } catch (error) {
      console.error('Error creating blog:', error.response?.data || error.message);
      setMessage({ type: 'error', text: 'Error creating blog' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-2xl p-8">
  
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 hover:text-blue-700 transition"
        >
          ← Back
        </button>
  
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ✍️ Create a New Blog
        </h2>
  
        {message && (
          <div
            className={`p-3 rounded-md text-center font-medium ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}
  
        {/* 📝 Blog Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
  
          {/* Title Input */}
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
  
          {/* Content Input */}
          <textarea
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
          />
  
          {/* Category Dropdown */}
          <select
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryTitle}
              </option>
            ))}
          </select>
  
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-md hover:from-blue-600 hover:to-purple-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default CreateBlog;
