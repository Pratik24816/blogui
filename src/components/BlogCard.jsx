// const BlogCard = ({ blog }) => {
//     return (
//       <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
//         {/* <img
//           src={`/uploads/${blog.imageName}`}
//           alt={blog.title}
//           className="w-full h-48 object-cover rounded-t-md"
//         /> */}
//         <div className="p-4">
//           <h3 className="text-lg font-bold">{blog.title}</h3>
//           <p className="text-sm text-gray-600 mt-2 line-clamp-2">{blog.content}</p>
//         </div>
//       </div>
//     );
//   };
  
//   export default BlogCard;
  
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
            // setBlog((prevBlog) => ({
            //     ...prevBlog,
            //     comments: [...prevBlog.comments, response.data] // Append new comment to existing comments
            // }));
    
            setNewComment(''); // Clear input after successful submission
        } catch (error) {
            console.error('Error creating comment:', error.response?.data || error.message);
            alert('Failed to post comment.');
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            {/* Image Section */}
            <div className="w-full h-64 bg-gray-200">
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
                    <h3 className="text-lg font-bold">{blog.title}</h3>
                    <p className="text-sm text-gray-500">{blog.category.categoryTitle}</p>
                </div>

                <p className="text-sm text-gray-600 mt-2">{blog.content}</p>

                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-blue-600"><strong>By:</strong> {blog.user.name}</p>

                    {/* Toggle Comments Button */}
                    <button
                        className="text-sm text-purple-500 hover:underline"
                        onClick={() => setShowComments(!showComments)}
                    >
                        {showComments ? 'Hide Comments' : 'View Comments'}
                    </button>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <div className="mt-3 border-t pt-3 max-h-40 overflow-y-auto space-y-3 animate-fade-in">
                        {/* Add Comment Box (YouTube Style) */}
                        <div className="flex items-start gap-3 mb-3">
                            {/* Profile Icon */}
                            <img
                                src={`https://avatarfiles.alphacoders.com/347/347546.png`}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full border border-gray-300"
                                onError={(e) => e.target.src = '/default-avatar.png'}
                            />

                            {/* Input Box */}
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 text-sm px-2 py-1"
                                />

                                {/* Comment Button (Appears only when typing) */}
                                {newComment.trim() && (
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={handleCommentSubmit}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                                        >
                                            Comment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {blog.comments.length > 0 ? (
                            blog.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start gap-3">
                                    {/* Profile Picture */}
                                    <img
                                        // src={`/avatars/${comment.id}.png`} 
                                        src={`https://avatarfiles.alphacoders.com/347/347546.png`}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full border border-gray-300"
                                        onError={(e) => e.target.src = '/default-avatar.png'}
                                    />

                                    {/* Comment Content */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">
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
