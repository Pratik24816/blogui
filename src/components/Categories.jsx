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
        <div className="m-6bg-white min-h-screen">
            <Navbar />
            <h2 className="p-6 text-2xl font-bold mb-4">Blogs by Category</h2>

            {/* ✅ Category Dropdown */}
            <div className="w-full md:w-1/3 mx-auto mb-6">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="border p-2 rounded-md w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.categoryTitle}
                        </option>
                    ))}
                </select>
            </div>

            {/* ✅ Display Blogs Using BlogCard */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-3">
                            No blogs available for this category.
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default BlogByCategory;
