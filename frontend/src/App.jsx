import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState([]);

  // Fetch activities from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:5000/activities")
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Echoes Feed</h1>

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