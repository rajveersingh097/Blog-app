// src/pages/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // axios instance
export default function BlogDetail() {
const { id } = useParams();
const navigate = useNavigate();
const [blog, setBlog] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
const fetchBlog = async () => {
try {
const res = await api.get(`/api/blogs/${id}`); // Add API endpoint
setBlog(res.data);
} catch (err) {
console.error("Error fetching blog:", err);
setError("Blog not found");
} finally {
setLoading(false);
}
};
fetchBlog();
}, [id]);
if (loading) {
return (
<div className="flex justify-center items-center py-10">
<p>Loading blog...</p>
</div>
);
}
if (error) {
return (
<div className="flex justify-center items-center py-10">
<p className="text-red-500">{error}</p>
</div>
);
}
return (
<div className="p-6 max-w-3xl mx-auto">
<button
onClick={() => navigate("/")}
className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
>
← Back to Home
</button>
{blog?.image && (
<img
src={blog.image}
alt={blog.title}
className="w-full h-64 object-cover rounded-lg mb-4"
/>
)}
<h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
<p className="text-gray-500 text-sm mb-6">
{new Date(blog.createdAt).toLocaleDateString()}
</p>
<p className="text-lg text-gray-700 whitespace-pre-line">
{blog.content}
</p>
</div>
);
}