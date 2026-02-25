import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-md w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border px-3 py-2 rounded-lg"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-lg"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded-lg"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account? <Link to="/login" className="text-purple-600">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;