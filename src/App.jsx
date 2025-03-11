import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/create-blog" element={<CreateBlog />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;