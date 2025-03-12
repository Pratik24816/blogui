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
        <div className="max-w-6xl mx-auto py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                All Blogs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center mt-6 space-x-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={pageNo === 0}
                    className={`px-4 py-2 rounded-lg ${pageNo === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Previous
                </button>

                <p className="text-sm text-gray-700">
                    Page {pageNo + 1} of {totalPages}
                </p>

                <button
                    onClick={handleNextPage}
                    disabled={pageNo === totalPages - 1}
                    className={`px-4 py-2 rounded-lg ${pageNo === totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Blogs;
