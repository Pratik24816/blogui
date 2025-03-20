import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import Navbar from './Navbar';
import axios from 'axios';

const BlogByCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [blogs, setBlogs] = useState([]);

    // ✅ Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // ✅ Fetch Blogs by Category
    const fetchBlogsByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/category/${categoryId}/blogs`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // ✅ Handle Category Selection
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        fetchBlogsByCategory(categoryId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#9333ea]">
    
            {/* Navbar (Margins and Padding Removed) */}
            <Navbar />
    
            {/* Title */}
            <h1 className="text-5xl font-extrabold text-white mb-12 text-center tracking-wide m-10">
                📚 Blogs by Category
            </h1>
    
            {/* Category Dropdown */}
            <div className="w-full md:w-1/3 mx-auto mb-8">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full bg-white/10 backdrop-blur-md text-white border-2 border-white 
                    p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 
                    transition-transform hover:scale-105"
                >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option 
                            key={category.categoryId} 
                            value={category.categoryId} 
                            className="text-black"
                        >
                            {category.categoryTitle}
                        </option>
                    ))}
                </select>
            </div>
    
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div 
                            key={blog.id} 
                            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white 
                            hover:scale-105 transition-transform duration-300"
                        >
                            <BlogCard blog={blog} />
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center col-span-3 text-lg mt-8">
                        🚫 No blogs available for this category.
                    </p>
                )}
            </div>
        </div>
    );
    
};

export default BlogByCategory;
