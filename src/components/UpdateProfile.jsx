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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 border rounded-md mb-3"
                />

                <input
                    type="text"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="About"
                    className="w-full p-2 border rounded-md mb-3"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => navigate('/profile')}
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
    );
};

export default ProfileUpdate;
