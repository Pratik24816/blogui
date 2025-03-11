import React from 'react';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>
                <p className="text-gray-700">{user.about}</p>
            </div>
        </div>
    );
};

export default Home;