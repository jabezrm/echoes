import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Feed() {
  const [activities, setActivities] = useState([]);

  const fetchActivities = () => {
    fetch("http://localhost:5000/activities")
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200">

      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            Echoes
          </h1>

          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <CreatePost onPostCreated={fetchActivities} />

        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No posts yet.
            </div>
          ) : (
            activities.map(activity => (
              <PostCard key={activity._id} activity={activity} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed;