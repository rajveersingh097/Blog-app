import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";

/**
* App Component
* Root component of the blog application
*
* Features:
* - Responsive layout with flex container
* - Consistent navigation header
* - Route management for different pages
* - Sticky footer design
* - Protected admin routes
*
* Layout Structure:
* - Navbar (fixed at top)
* - Main content (flexible height)
* - Footer (fixed at bottom)
*
* Routes:
* - / : Home page with blog listings
* - /blogs/:id : Individual blog post view
* - /admin-login : Admin authentication
pg. 13
* - /admin-manage : Protected admin dashboard
*
* @returns {JSX.Element} The root application component
*/

export default function App() {
return (
// Main container with flex layout and minimum height
<div className="flex flex-col min-h-screen bg-gray-100">
{/* Navigation bar - present on all pages */}
<Navbar />
{/*
Main content area
- Grows to fill available space
- Contains route-specific content
*/}
<main className="flex-grow">
{/* Route configuration */}
<Routes>
{/* Public routes */}
<Route path="/" element={<Home />} />
<Route path="/blogs/:id" element={<BlogDetail />} />
{/* Authentication routes */}
<Route path="/admin-login" element={<AdminLogin />} />
{/* Protected admin routes */}
<Route path="/admin-manage" element={<AdminHome />} />
</Routes>
</main>
{/* Footer - present on all pages */}
<Footer />
</div>
);
}