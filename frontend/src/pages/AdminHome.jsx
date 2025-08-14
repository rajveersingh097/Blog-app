// src/pages/AdminHome.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // axios instance
import {
PencilSquareIcon,
TrashIcon,
PlusIcon,
} from "@heroicons/react/24/solid";
/**
* AdminHome Component
* Provides an interface for administrators to manage blog posts
* Includes functionality for creating, reading, updating and deleting blogs
* @returns {JSX.Element} The admin dashboard interface
*/
export default function AdminHome() {
const navigate = useNavigate();
// State management for blogs and UI
const [blogs, setBlogs] = useState([]); // Stores all blog posts
const [loading, setLoading] = useState(true); // Loading state indicator
const [modalOpen, setModalOpen] = useState(false); // Controls modal visibility
const [editId, setEditId] = useState(null); // Tracks which blog is being edited
const [formData, setFormData] = useState({
title: "",
content: "",
image: "",
});
// Get authentication token from localStorage
const token = localStorage.getItem("token");
// Check authentication and fetch blogs on component mount
useEffect(() => {
if (!token) {
navigate("/admin/login");
return;
}
fetchBlogs();
}, [token, navigate]);
/**
* Fetches all blogs from the API
*/
const fetchBlogs = async () => {
try {
const res = await api.get("/api/blogs");// Add API endpoint
setBlogs(res.data);
} catch (err) {
console.error("Error fetching blogs:", err);
} finally {
setLoading(false);
}
};
/**
* Handles blog deletion
* @param {string} id - The ID of the blog to delete
*/
const handleDelete = async (id) => {
if (!window.confirm("Are you sure you want to delete this blog?")) return;
try {
await api.delete(`/api/blogs/${id}`, {
headers: { Authorization: `Bearer ${token}` },
}); // Add API endpoint
setBlogs(blogs.filter((b) => b._id !== id));
} catch (err) {
console.error("Error deleting blog:", err);
}
};
/**
* Opens modal for adding new blog
*/
const openAddModal = () => {
setEditId(null);
setFormData({ title: "", content: "", image: "" });
setModalOpen(true);
};
/**
* Opens modal for editing existing blog
* @param {Object} blog - The blog post to edit
*/
const openEditModal = (blog) => {
setEditId(blog._id);
setFormData({
title: blog.title,
content: blog.content,
image: blog.image || "",
});
setModalOpen(true);
};
/**
* Handles form submission for both creating and updating blogs
* @param {Event} e - The form submission event
*/
const handleSubmit = async (e) => {
e.preventDefault();
try {
if (editId) {
// Update existing blog
await api.put(`/api/blogs/${editId}`, formData, {
headers: { Authorization: `Bearer ${token}` },
});// Add API endpoint
} else {
// Create new blog
await api.post("/api/blogs", formData, {
headers: { Authorization: `Bearer ${token}` },
});// Add API endpoint
}
setModalOpen(false);
fetchBlogs(); // Refresh blogs list
} catch (err) {
console.error("Error saving blog:", err);
}
};
// Show loading state
if (loading) {
return (
<div className="flex justify-center items-center py-10">
<p>Loading blogs...</p>
</div>
);
}
return (
<div className="p-6 relative">
{/* Admin header with controls */}
<div className="flex justify-between items-center mb-4">
<h1 className="text-xl font-bold">Welcome, Admin</h1>
<div className="flex gap-2">
<button
onClick={openAddModal}
className="flex items-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
>
<PlusIcon className="h-5 w-5 mr-1" /> Add Blog
</button>
</div>
</div>
{/* Blog posts grid layout */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{blogs.map((blog) => (
<div
key={blog._id}
className="bg-white shadow-md rounded-lg overflow-hidden border relative h-[280px]"
>
{/* Blog image (if available) */}
{blog.image ? (
<img
src={blog.image}
alt={blog.title}
className="w-full h-48 object-cover"
/>
) : (
<div className="w-full h-48 bg-gray-200 flex items-center justify-center">
<span className="text-gray-400">No image</span>
</div>
)}
{/* Blog title */}
<div className="p-4">
<h2 className="text-xl font-semibold truncate">{blog.title}</h2>
{/* Edit and delete controls */}
<div className="absolute bottom-4 right-4 flex gap-2">
<PencilSquareIcon
className="h-5 w-5 text-blue-500 cursor-pointer"
onClick={() => openEditModal(blog)}
/>
<TrashIcon
className="h-5 w-5 text-red-500 cursor-pointer"
onClick={() => handleDelete(blog._id)}
/>
</div>
</div>
</div>
))}
</div>
{/* Modal for adding/editing blogs */}
{modalOpen && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-md">
<h2 className="text-lg font-bold mb-4">
{editId ? "Edit Blog" : "Add Blog"}
</h2>
<form onSubmit={handleSubmit} className="space-y-3">
<input
type="text"
placeholder="Title"
value={formData.title}
onChange={(e) =>
setFormData({ ...formData, title: e.target.value })
}
className="w-full border p-2 rounded"
required
/>
<textarea
placeholder="Content"
rows={5}
value={formData.content}
onChange={(e) =>
setFormData({ ...formData, content: e.target.value })
}
className="w-full border p-2 rounded"
required
></textarea>
<input
type="text"
placeholder="Image URL (optional)"
value={formData.image}
onChange={(e) =>
setFormData({ ...formData, image: e.target.value })
}
className="w-full border p-2 rounded"
/>
<div className="flex justify-end gap-2">
<button
type="button"
onClick={() => setModalOpen(false)}
className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
>
Cancel
</button>
<button
type="submit"
className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
>
{editId ? "Update" : "Create"}
</button>
</div>
</form>
</div>
</div>
)}
</div>
);
}