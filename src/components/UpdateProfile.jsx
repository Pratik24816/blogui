import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';

const ProfileUpdate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const use = location.state.user || {};
    const [formData, setFormData] = useState({
        id: use?.id || 0,
        name: use?.name || '',
        email: use?.email || '',
        password: use?.password || '',
        about: use?.about || ''
    });
    useEffect(() => {
        console.log('Received Data:', use);  // ✅ Now it will log the correct data
    }, []);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/users/${formData.id}`,
                formData,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            if (response.status === 200) {
                alert('Profile updated successfully!');
                navigate('/profile');
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-8 rounded-xl shadow-2xl 
                            w-full max-w-md border border-teal-500">
                <h2 className="text-3xl font-extrabold text-teal-400 mb-6 text-center">
                    Update Profile
                </h2>
    
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-teal-300 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full p-3 border border-teal-500 bg-gray-700 text-white 
                                       rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 
                                       placeholder-white/60"
                        />
                    </div>
    
                    <div>
                        <label className="block text-sm text-teal-300 mb-1">About</label>
                        <input
                            type="text"
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            className="w-full p-3 border border-teal-500 bg-gray-700 text-white 
                                       rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 
                                       placeholder-white/60"
                        />
                    </div>
                </div>
    
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => navigate('/profile')}
                        className="bg-gray-600 text-white px-5 py-2.5 rounded-lg 
                                   hover:bg-gray-500 transition duration-300"
                    >
                        Cancel
                    </button>
    
                    <button
                        onClick={handleUpdate}
                        className="bg-teal-500 text-white px-5 py-2.5 rounded-lg 
                                   hover:bg-teal-400 transition duration-300 shadow-md"
                    >
                        Confirm Update
                    </button>
                </div>
            </div>
        </div>
    );
    
    
    
};

export default ProfileUpdate;
