import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import homeimg from '../assets/img/home1.png';
import Navbar from './Navbar.jsx';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user?.name || 'Guest';

    // State to toggle card visibility
    const [showCard, setShowCard] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#9333ea]">
            {/* Navbar */}
            <Navbar />
    
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-8">
                {/* Left Side */}
                <div className="md:w-1/2 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl font-extrabold leading-tight"
                    >
                        <span className="text-[#1e293b]">
                            Hello,
                        </span>
                        <span className="bg-gradient-to-r from-[#3A86FF] to-[#2563eb] text-transparent bg-clip-text">
                            {userName || 'GUEST'}
                        </span>
                        <br />
                        <span className="text-[#1e293b]">
                            Thinking The High
                        </span>{' '}
                        <span className="bg-gradient-to-r from-[#ff4d4d] to-[#e53935] text-transparent bg-clip-text">
                            Quality Content
                        </span>
                    </motion.h1>
    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-300 text-lg"
                    >
                        {user?.about || 'Share your thoughts with the world through your blog.'}
                    </motion.p>
    
                    {/* CTA Buttons */}
                    <div className="space-x-4 mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowCard(true)}
                            className="bg-[#1e293b] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#111827] transition duration-300"
                        >
                            Start Writing
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#1e293b] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#111827] transition duration-300"
                        >
                            Learn More
                        </motion.button>
                    </div>
                </div>
    
                {/* Right Side (Image) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="md:w-1/2 flex justify-center mt-8 md:mt-0"
                >
                    <img
                        src={homeimg}
                        alt="Hero"
                        className="w-full max-w-md"
                    />
                </motion.div>
            </div>
    
            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {/* Card 1 */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center space-y-4"
                >
                    <div className="text-[#3A86FF] text-4xl">📈</div>
                    <h3 className="text-xl font-bold text-white">Analytics</h3>
                    <p className="text-gray-300 text-center">Track your blog performance in real-time.</p>
                </motion.div>
    
                {/* Card 2 */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center space-y-4"
                >
                    <div className="text-[#3A86FF] text-4xl">🎯</div>
                    <h3 className="text-xl font-bold text-white">Target Audience</h3>
                    <p className="text-gray-300 text-center">Reach your target audience with insights.</p>
                </motion.div>
    
                {/* Card 3 */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center space-y-4"
                >
                    <div className="text-[#3A86FF] text-4xl">📊</div>
                    <h3 className="text-xl font-bold text-white">Performance</h3>
                    <p className="text-gray-300 text-center">Improve your blog’s performance and engagement.</p>
                </motion.div>
            </div>
    
            {/* Start Writing Card */}
            {showCard && (
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="fixed top-20 left-1/2 transform -translate-x-1/2 
                           bg-[#1e293b] text-white border border-[#334155] 
                           shadow-xl rounded-lg p-6 w-96 z-50"
            >
                <h2 className="text-xl font-bold text-white mb-4">
                    Start Writing
                </h2>
                <p className="text-gray-300 mb-4">
                    Create your first blog and share your thoughts!
                </p>
                <Link to="/create-blog">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#1e293b] text-white px-6 py-2 rounded-lg font-semibold 
                                   shadow-md hover:bg-[#111827] transition duration-300"
                    >
                        Go to Editor →
                    </motion.button>
                </Link>
                <button
                    onClick={() => setShowCard(false)}
                    className="ml-4 text-gray-400 hover:text-gray-200 transition duration-300"
                >
                    Cancel
                </button>
            </motion.div>
            )}
    
            {/* Explore More Blogs */}
            <div className="mt-12 text-center">
                <h2 className="text-3xl font-bold text-white">
                    Explore More Blogs
                </h2>
                <p className="text-gray-400 mt-2">
                    Discover content created by our community.
                </p>
                <Link to="/blogs">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 bg-[#1e293b] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#111827] transition duration-300"
                    >
                        View All Blogs →
                    </motion.button>
                </Link>
            </div>
        </div>
    );
    
    
};

export default Home;
