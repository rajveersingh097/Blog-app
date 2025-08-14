// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
/**
* Navbar Component
* Provides navigation and authentication controls
* Shows different options based on user authentication status
*
* Features:
* - Home link
* - Conditional rendering for authenticated/non-authenticated users
* - Admin management links
* - Logout functionality
*
*/
export default function Navbar() {
// Hook for programmatic navigation
const navigate = useNavigate();
// Get authentication token from localStorage
const token = localStorage.getItem("token");
/**
* Handles user logout
* Removes authentication token and redirects to home page
*/
const handleLogout = () => {
localStorage.removeItem("token");
navigate("/");
};
return (
<nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
{/* Logo / Home link - Always visible */}
<Link to="/" className="text-lg font-semibold hover:text-gray-300">
Blog App
</Link>
{/* Conditional rendering based on authentication status */}
{token ? (
// Authenticated user view

<div className="flex items-center gap-4">
{/* Admin management link */}
<Link
to="/admin-manage"
className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-medium"
>
Manage Blog
</Link>
{/* Welcome message */}
<span className="text-sm">Welcome, Admin</span>
{/* Logout button */}
<button
onClick={handleLogout}
className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-medium"
>
Logout
</button>
</div>
) : (
// Non-authenticated user view
<Link
to="/admin-login"
className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-medium"
>
Admin Login
</Link>
)}
</nav>
);
}