import { useState } from 'react';
import axios from 'axios';

const BlogCard = ({ blog }) => {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = async () => {
        const commentData = {
            content: newComment
        };
    
        try {
            const response = await axios.post(
                `http://localhost:8080/api/blog/${blog.id}/comments`,
                commentData, // Sending only the required data
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            window.location.reload();
            
    
            setNewComment(''); // Clear input after successful submission
        } catch (error) {
            console.error('Error creating comment:', error.response?.data || error.message);
            alert('Failed to post comment.');
        }
    }

    return (
        <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] rounded-xl shadow-lg overflow-hidden mb-6 border border-teal-500">
            {/* Image Section */}
            <div className="w-full h-64 bg-gray-700">
                <img
                    src={`${blog.imageName}`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = '/default-placeholder.png'}
                />
            </div>
    
            {/* Blog Details */}
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                    <p className="text-sm text-teal-400 bg-teal-700 px-2 py-1 rounded-lg">
                        {blog.category.categoryTitle}
                    </p>
                </div>
    
                <p className="text-sm text-gray-300 mt-2">{blog.content}</p>
    
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-teal-300"><strong>By:</strong> {blog.user.name}</p>
    
                    {/* Toggle Comments Button */}
                    <button
                        className="text-sm text-blue-400 hover:text-blue-300 transition"
                        onClick={() => setShowComments(!showComments)}
                    >
                        {showComments ? 'Hide Comments' : 'View Comments'}
                    </button>
                </div>
    
                {/* Comments Section */}
                {showComments && (
                    <div className="mt-3 border-t border-teal-600 pt-3 max-h-40 overflow-y-auto space-y-3 animate-fade-in">
                        {/* Add Comment Box */}
                        <div className="flex items-start gap-3 mb-3">
                            <img
                                src={`https://avatarfiles.alphacoders.com/347/347546.png`}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full border border-teal-400"
                                onError={(e) => e.target.src = '/default-avatar.png'}
                            />
    
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full border-b border-teal-500 bg-transparent text-white 
                                               focus:outline-none focus:border-teal-400 px-2 py-1"
                                />
    
                                {newComment.trim() && (
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={handleCommentSubmit}
                                            className="bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-400"
                                        >
                                            Comment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
    
                        {blog.comments.length > 0 ? (
                            blog.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start gap-3 bg-gray-700 p-2 rounded-lg">
                                    <img
                                        src={`https://avatarfiles.alphacoders.com/347/347546.png`}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full border border-teal-400"
                                        onError={(e) => e.target.src = '/default-avatar.png'}
                                    />
    
                                    <div>
                                        <p className="text-sm text-gray-300">
                                            {comment.content}
                                        </p>
                                        <p className="text-xs text-gray-400">2 hours ago</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 text-center">
                                No comments yet. Be the first to comment!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default BlogCard;
