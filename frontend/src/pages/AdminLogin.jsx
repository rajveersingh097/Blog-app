// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
export default function AdminLogin() {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const handleSubmit = async (e) => {
e.preventDefault();
setError(null);
setLoading(true);
try {
const res = await api.post("/api/admin/login ", { email, password }); // Add API endpoint
// Save token to localStorage
localStorage.setItem("token", res.data.token);
alert("Login successful!");
navigate("/admin-manage"); // Redirect to home (or /admin if you create dashboard)
} catch (err) {
console.error(err);
setError(
err.response?.data?.message || "Login failed. Please try again."
);
} finally {
setLoading(false);
}
};
return (
<div className="flex justify-center items-center min-h-screen bg-gray-100">
<form
onSubmit={handleSubmit}
className="bg-white p-6 rounded-lg shadow-md w-80"
>
<h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
{error && (<p className="text-red-500 text-sm mb-3 text-center">{error}</p>
)}
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
required
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
required
/>
<button
type="submit"
disabled={loading}
className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
>
{loading ? "Logging in..." : "Login"}
</button>
</form>
</div>
);
}