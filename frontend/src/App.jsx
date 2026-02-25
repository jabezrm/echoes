import { useEffect, useState } from "react";
import CreatePost from "./components/CreatePost";
import PostCard from "./components/PostCard";

function App() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  const fetchActivities = () => {
    fetch("http://localhost:5000/activities")
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchActivities();
  }, []);

return (
  <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-200">
    
    {/* Sticky Header */}
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-2xl mx-auto px-4 py-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 tracking-tight">
          echoes
        </h1>
      </div>
    </header>

    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CreatePost 
        users={users} 
        onPostCreated={fetchActivities} 
      />

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

export default App;



