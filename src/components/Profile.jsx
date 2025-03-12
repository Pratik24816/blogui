import React, { useEffect,useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { motion } from 'framer-motion';

const Profile = () => {
    // ✅ Get user data from localStorage
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

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
            setUse(response.data); 
        };
        fetchUser();
    },[])

    const handleUpdate = async () => {
        try {
            
            const response = await axios.put(`http://localhost:8080/api/users/${use.id}`,use, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                setShowPopup(false);
            } else {
                console.error('Failed to update profile');
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                        <p className="text-white text-md">{use.name || 'N/A'}</p>
                        
                        {/* Edit Profile Button */}
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 bg-white text-pink-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-300 shadow"
                            onClick={() => setShowPopup(true)}
                        >
                            Edit Profile
                        </motion.a>

                        {/* Popup for update */}
                        {showPopup && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                    <h3 className="text-xl font-bold mb-4">Update Profile</h3>

                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 border rounded-md mb-3"
                                    />

                                    <textarea
                                        placeholder="Enter About"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        className="w-full p-2 border rounded-md mb-3"
                                    />

                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => setShowPopup(false)}
                                            className="bg-gray-400 text-white px-4 py-2 rounded-md"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={handleUpdate}
                                            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
                                        >
                                            Confirm Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                <p className="font-medium text-lg">{use.email || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">About</p>
                                <p className="font-medium text-lg">
                                    {use.about || 'No about info available'}
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
