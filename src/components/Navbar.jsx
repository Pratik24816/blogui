import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-[#3A86FF]">MyBlog</div>

            {/* Navigation Links */}
            <div className="space-x-6">
                <Link to="/home" className="text-gray-800 hover:text-[#3A86FF] transition">
                    Home
                </Link>
                <Link to="/profile" className="text-gray-800 hover:text-[#3A86FF] transition">
                    Profile
                </Link>
                <Link to="/category" className="text-gray-800 hover:text-[#3A86FF] transition">
                    Category
                </Link>
            </div>

            {/* Logout Button */}
            <button className="bg-[#FF4D4D] text-white px-4 py-2 rounded-lg hover:bg-[#e53935] transition">
                <LogoutButton />
            </button>
        </nav>
    );
};

export default Navbar;
