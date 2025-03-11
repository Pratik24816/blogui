const BlogCard = ({ blog }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300">
        <img
          src={`/uploads/${blog.imageName}`}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-md"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{blog.title}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{blog.content}</p>
        </div>
      </div>
    );
  };
  
  export default BlogCard;
  