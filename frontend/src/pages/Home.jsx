// src/pages/Home.jsx
import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
/**
* Home Component
* Displays the main landing page with a grid of blog posts
*
* Features:
* - Fetches and displays all blog posts
* - Responsive grid layout (1 column mobile, 3 columns desktop)
* - Loading state handling
* - Empty state handling
* - Image fallback support
* - Card-based blog preview design
*
* State Management:
* - blogs: Array of blog posts from API
* - loading: Boolean to track data fetching status
*
* @returns {JSX.Element} The home page component
*/
export default function Home() {
// State management
const [blogs, setBlogs] = useState([]); // Stores blog posts
const [loading, setLoading] = useState(true); // Controls loading state
// Fetch blogs when component mounts
useEffect(() => {
/**
* Fetches blog posts from the API
* Updates local state with the fetched data
* Handles loading states and errors
*/
const fetchBlogs = async () => {
try {
const res = await api.get(`/api/blogs/`); // Add API endpoint
setBlogs(res.data);
} catch (err) {
console.error("Error fetching blogs:", err);
} finally {
setLoading(false);
}
};
fetchBlogs();
}, []); // Empty dependency array means this runs once on mount
// Show loading spinner while fetching data
if (loading) {
return (
<div className="flex justify-center items-center py-10">
<p>Loading blogs...</p>
</div>
);
}
// Show message if no blogs are found
if (blogs.length === 0) {
return (
<div className="flex justify-center items-center py-10">
<p>No blogs found.</p>
</div>
);
}
// Main blog grid display
return (
<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Iterate over blogs array to create blog cards */}
{blogs.map((blog) => (
<div
key={blog._id}
className="bg-white shadow-md rounded-lg overflow-hidden border relative h-[280px]"
>
{/* Conditional rendering of blog image or placeholder */}
{blog.image ? (
<img
src={blog.image}
alt={blog.title}
className="w-full h-48 object-cover"
/>
) : (
// Placeholder for blogs without images
<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
<span className="text-gray-400">No image</span>
</div>
)}
{/* Blog card content section */}
<div className="p-4">
{/* Blog title with truncation for long titles */}
<h2 className="text-xl font-semibold truncate">{blog.title}</h2>
pg. 3
{/* Read More link positioned absolutely within card */}
<Link
to={`/blogs/${blog._id}`}
className="absolute bottom-4 right-4 text-blue-500 hover:text-blue-600"
>
Read More
</Link>
</div>
</div>
))}
</div>
);
}