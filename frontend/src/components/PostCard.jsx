function PostCard({ activity }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800">
        {activity.title}
      </h3>

      <p className="text-gray-700 mt-2 leading-relaxed">
        {activity.content}
      </p>

      <div className="mt-4 text-sm text-gray-500">
        Posted by {activity.user?.username || "Unknown"}
      </div>
    </div>
  );
}

export default PostCard;