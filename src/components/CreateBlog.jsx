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
        console.log(response.data);
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

    const blogData = {
      title,
      content,
      image,
    };

    try {
      // ✅ Create blog post
      const userInfo = await axios.get(`http://localhost:8080/api/users/email/${user.email}`);
      const response = await axios.post(
        `http://localhost:8080/api/user/${userInfo.data.id}/category/${selectedCategory}/blogs`,
        blogData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Blog created:', response.data);
      navigate('/profile');
    } catch (error) {
      console.error('Error creating blog:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="p-6 bg-white rounded-xl shadow-lg w-full md:w-2/3 mx-auto">
        <h2 className="text-xl font-bold mb-4">Create a New Blog</h2>
        {message && (
          <div
            className={`p-2 rounded-md text-center ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full border p-2 rounded-md"
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
  
          {/* 🔹 Single-Select Category Dropdown */}
          <select
            className="w-full border p-2 rounded-md"
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
  
          {/* <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full border p-2 rounded-md"
          /> */}
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            placeholder="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    );
};

export default CreateBlog;
