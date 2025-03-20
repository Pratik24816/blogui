import React, { useEffect,useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import BlogCard from './BlogCard';
import { motion } from 'framer-motion';
import { useNavigate,Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

const Profile = () => {
    // ✅ Get user data from localStorage
    const [blogs, setBlogs] = useState([]);
    
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const email = user.email;
    const [use, setUse] = useState({
        id: 0,
        name: '',
        email: '',
        password: '',
        about: ''
    });
    useEffect(()=>{
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:8080/api/users/email/${email}`); 
            console.log(response.data); 
            setUse((prevState) => ({
                ...prevState, 
                ...response.data 
            }));
        };
        fetchUser();
    },[])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const userInfo = await axios.get(`http://localhost:8080/api/users/email/${user.email}`);
                const response = await axios.get(`http://localhost:8080/api/user/${userInfo.data.id}/blogs`);
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    // ✅ Fallback for avatar generation (if username is not available)
    const avatarSeed = user.username || 'default-user';

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#9333ea]">
    
            {/* ✅ Navbar (No Margins/Padding) */}
            <Navbar />
    
{/* ✅ Profile Section */}
<div className="flex justify-center items-center mt-10">
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/90 shadow-2xl rounded-2xl w-full max-w-5xl
                   flex overflow-hidden transform hover:scale-[1.02] transition duration-300"
    >
        {/* ✅ Left Section */}
        <div className="bg-gradient-to-br from-[#5B21B6] to-[#3B82F6] w-1/2 p-10 flex flex-col items-center justify-center">
            {/* Avatar */}
            <motion.img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                whileHover={{ scale: 1.1 }}
            />
            <h2 className="text-white text-2xl font-bold mt-4">{user.name || 'Guest'}</h2>
            <p className="text-teal-200 text-md">{use.name || 'N/A'}</p>

            {/* Edit Profile Button */}
            <Link
                to="/updateprofile"
                state={{ user: use }}
                className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full
                           bg-teal-500 text-white font-semibold shadow-md
                           hover:bg-teal-400 transition duration-300"
            >
                <FiEdit className="text-lg" />
                Edit Profile
            </Link>
        </div>

        {/* ✅ Right Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-800">
            {/* Information Section */}
            <h3 className="text-xl font-semibold text-white mb-6 border-b-2 border-teal-500 pb-2">
                Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <p className="text-teal-400">Email</p>
                    <p className="font-medium text-lg text-white">{use.email || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-teal-400">About</p>
                    <p className="font-medium text-lg text-white">
                        {use.about || 'No about info available'}
                    </p>
                </div>
            </div>

            {/* ✅ Social Icons */}
            <div className="mt-8 flex gap-6">
                <motion.a
                    href="#"
                    className="text-teal-400 hover:text-teal-300 text-2xl"
                    whileHover={{ scale: 1.2 }}
                >
                    <i className="fab fa-facebook-f"></i>
                </motion.a>
                <motion.a
                    href="#"
                    className="text-teal-400 hover:text-teal-300 text-2xl"
                    whileHover={{ scale: 1.2 }}
                >
                    <i className="fab fa-twitter"></i>
                </motion.a>
                <motion.a
                    href="#"
                    className="text-teal-400 hover:text-teal-300 text-2xl"
                    whileHover={{ scale: 1.2 }}
                >
                    <i className="fab fa-instagram"></i>
                </motion.a>
            </div>
        </div>
    </motion.div>
</div>


    
            {/* ✅ My Blogs Section */}
            <div className="mt-12 px-6">
                <h3 className="text-3xl font-bold text-white mb-8 border-b-4 border-white/60 pb-3">
                    My Blogs
                </h3>
    
                {blogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-white
                                           hover:scale-105 transition-transform duration-300"
                            >
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white text-center italic mt-8">
                        🚫 You haven't created any blogs yet. Start writing now! ✍️
                    </p>
                )}
            </div>
        </div>
    );
    
};

export default Profile;
