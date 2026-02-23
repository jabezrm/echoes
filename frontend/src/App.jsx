import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(""); // user to post as
  const [users, setUsers] = useState([]);

  // Fetch all users for dropdown
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

  // Handle creating a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !userId) return alert("Fill all fields!");

    try {
      const res = await fetch("http://localhost:5000/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, userId })
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
    <div style={{ padding: "20px" }}>
      <h1>Echoes Feed</h1>

      {/* Create Post Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "300px" }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "300px", height: "80px" }}
        />
        <button type="submit">Create Post</button>
      </form>

      {/* Feed */}
      {activities.length === 0 && <p>No posts yet</p>}
      {activities.map(activity => (
        <div
          key={activity._id}
          style={{
            border: "1px solid black",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "5px"
          }}
        >
          <h3>{activity.title}</h3>
          <p>{activity.content}</p>
          <small>Posted by: {activity.user?.username || "Unknown"}</small>
        </div>
      ))}
    </div>
  );
}

export default App;