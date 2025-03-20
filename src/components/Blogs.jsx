// import React, { useEffect, useState } from 'react';
// import BlogCard from './BlogCard';

// const Blogs = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [pageNo, setPageNo] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);

//     useEffect(() => {
//         const fetchBlogs = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/api/blogs'); // Backend API to fetch blogs
//                 const data = await response.json();
//                 setPageNo(data.pageNo);
//                 setBlogs(data.content);
//                 setTotalPages(response.data.totalPages);
//             } catch (error) {
//                 console.error('Error fetching blogs:', error);
//             }
//         };

//         fetchBlogs();
//     }, []);

//     return (
//         <div className="max-w-6xl mx-auto py-12">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">
//                 All Blogs
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {blogs.map((blog) => (
//                     <BlogCard key={blog.id} blog={blog} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Blogs;

import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 6; // Matches your backend page size

    // Fetch blogs with pagination
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/blogs?pageNo=${pageNo}&pageSize=${pageSize}`);
                const data = await response.json();
                setBlogs(data.content);
                setTotalPages(data.totalPages); // Corrected from `response.data.totalPages`
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [pageNo]); // Refetch data whenever `pageNo` changes

    // Pagination controls
    const handleNextPage = () => {
        if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
    };

    const handlePreviousPage = () => {
        if (pageNo > 0) setPageNo(pageNo - 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#9333ea] p-10 flex flex-col items-center">
            
            {/* Title */}
            <h1 className="text-5xl font-extrabold text-white mb-12 tracking-wide">
                🌟 Explore Blogs
            </h1>
    
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {blogs.map((blog) => (
                    <div 
                        key={blog.id} 
                        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white hover:scale-105 transition-transform duration-300"
                    >
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
    
            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-6 mt-10">
                <button
                    onClick={handlePreviousPage}
                    disabled={pageNo === 0}
                    className={`px-6 py-3 rounded-full font-bold text-lg shadow-lg transition 
                    ${pageNo === 0 ? 'bg-gray-400 text-gray-300 cursor-not-allowed' 
                    : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}
                >
                    ← Previous
                </button>
    
                <p className="text-lg font-medium text-white">
                    Page {pageNo + 1} of {totalPages}
                </p>
    
                <button
                    onClick={handleNextPage}
                    disabled={pageNo === totalPages - 1}
                    className={`px-6 py-3 rounded-full font-bold text-lg shadow-lg transition 
                    ${pageNo === totalPages - 1 ? 'bg-gray-400 text-gray-300 cursor-not-allowed' 
                    : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Blogs;
