import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch activities/feed
  const fetchActivities = () => {
    fetch("http://localhost:5000/activities")
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Create post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !userId) return alert("Fill all fields!");

    try {
      const res = await fetch("http://localhost:5000/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, userId }),
      });
      const newPost = await res.json();

      setTitle("");
      setContent("");
      setUserId("");
      fetchActivities(); // refresh feed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
        Echoes Feed
      </h1>
      <h1 className="text-4xl font-bold text-red-500">Hello Tailwind</h1>
      {/* Create Post Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow-md mb-8"
      >
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Create Post
        </button>
      </form>

      {/* Feed */}
      <div className="max-w-md mx-auto">
        {activities.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet</p>
        ) : (
          activities.map(activity => (
            <div
              key={activity._id}
              className="bg-white p-4 rounded shadow mb-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
              <p className="text-gray-700 mt-2">{activity.content}</p>
              <small className="text-gray-500 mt-2 block">
                Posted by: {activity.user?.username || "Unknown"}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;