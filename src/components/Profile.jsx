import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Profile = () => {
    // ✅ Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user')) || {};

    // ✅ Fallback for avatar generation (if username is not available)
    const avatarSeed = user.username || 'default-user';

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* ✅ Navbar Component */}
            <Navbar />

            {/* ✅ Profile Section */}
            <div className="flex justify-center items-center mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex overflow-hidden transform hover:scale-[1.02] transition duration-300"
                >
                    {/* ✅ Left Section */}
                    <div className="bg-gradient-to-br from-pink-500 to-orange-400 w-1/2 p-10 flex flex-col items-center justify-center">
                        {/* Avatar */}
                        <motion.img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                            whileHover={{ scale: 1.1 }}
                        />
                        <h2 className="text-white text-2xl font-bold mt-4">
                            {user.name || 'Guest'}
                        </h2>
                        <p className="text-white text-md">{user.username || 'N/A'}</p>
                        
                        {/* Edit Profile Button */}
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 bg-white text-pink-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300 shadow"
                        >
                            Edit Profile
                        </motion.a>
                    </div>

                    {/* ✅ Right Section */}
                    <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-50">
                        {/* Information Section */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium text-lg">{user.email || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">About</p>
                                <p className="font-medium text-lg">
                                    {user.about || 'No about info available'}
                                </p>
                            </div>
                        </div>

                        {/* ✅ Social Icons */}
                        <div className="mt-8 flex gap-6">
                            <motion.a
                                href="#"
                                className="text-blue-500 hover:text-blue-600 text-2xl"
                                whileHover={{ scale: 1.2 }}
                            >
                                <i className="fab fa-facebook-f"></i>
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-blue-400 hover:text-blue-500 text-2xl"
                                whileHover={{ scale: 1.2 }}
                            >
                                <i className="fab fa-twitter"></i>
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-pink-500 hover:text-pink-600 text-2xl"
                                whileHover={{ scale: 1.2 }}
                            >
                                <i className="fab fa-instagram"></i>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
