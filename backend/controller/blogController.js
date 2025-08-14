const Blog = require("../model/blog");

exports.getAllBlogs = async (req, res) => {
const blogs = await Blog.find().sort({ createdAt: -1 });
res.json(blogs);
};

exports.getBlogById = async (req, res) => {
const blog = await Blog.findById(req.params.id);
if (!blog) return res.status(404).json({ msg: "Blog not found" });
res.json(blog);
};

exports.createBlog = async (req, res) => {
const { title, content, image } = req.body;
const newBlog = await Blog.create({ title, content, image });
res.status(201).json(newBlog);
};


exports.deleteBlogById = async (req, res) => {
const blog = await Blog.findByIdAndDelete(req.params.id);
if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
}
res.status(200).json({ message: "Blog deleted successfully" });
};


exports.updateBlog = async (req, res) => {

const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body);

if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
}
res.status(200).json(updatedBlog);
};
