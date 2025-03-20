import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] shadow-lg p-4 
                        flex justify-between items-center border-b border-teal-600">
            
            {/* Logo */}
            <div className="text-3xl font-extrabold text-white tracking-wider drop-shadow-md">
                My<span className="text-teal-400">Blog</span>
            </div>
    
            {/* Navigation Links */}
            <div className="space-x-6">
                <Link 
                    to="/home" 
                    className="text-white text-lg font-medium hover:text-teal-300 
                               transition-all duration-300 hover:underline"
                >
                    Home
                </Link>
                <Link 
                    to="/profile" 
                    className="text-white text-lg font-medium hover:text-teal-300 
                               transition-all duration-300 hover:underline"
                >
                    Profile
                </Link>
                <Link 
                    to="/category" 
                    className="text-white text-lg font-medium hover:text-teal-300 
                               transition-all duration-300 hover:underline"
                >
                    Category
                </Link>
            </div>
    
            {/* Logout Button */}
            <button className="bg-gradient-to-r from-red-600 to-red-500 text-white px-5 py-2 
                               rounded-lg font-bold shadow-md hover:from-red-700 hover:to-red-600 
                               transition-transform duration-300 hover:scale-105">
                <LogoutButton />
            </button>
        </nav>
    );
    
    
};

export default Navbar;
