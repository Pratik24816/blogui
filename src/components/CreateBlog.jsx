import { useState } from 'react';
import axios from 'axios';

const CreateBlog = ({ userId, categoryId, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const blogData = {
      title,
      content,
    };

    try {
      // ✅ Create blog post
      const response = await axios.post(
        `http://localhost:8080/api/user/${userId}/category/${categoryId}/blogs`,
        blogData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Blog created:', response.data);

      // ✅ Upload image if available
      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        await axios.post(
          `http://localhost:8080/api/blog/image/upload/${response.data.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
      }

      onPostCreated(); // Refresh blog list or redirect after success
    } catch (error) {
      console.error('Error creating blog:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full md:w-2/3 mx-auto">
      <h2 className="text-xl font-bold mb-4">Create a New Blog</h2>
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
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full border p-2 rounded-md"
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
