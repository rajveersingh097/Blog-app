const verifyAdminToken = require("../middleware/auth");   // import auth middleware
const express = require("express");
const { 
    getAllBlogs, 
    getBlogById, 
    createBlog,
    deleteBlogById,
    updateBlog
} = require("../controller/blogController");


const router = express.Router();
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.delete("/:id",deleteBlogById);
router.put("/:id",updateBlog);
router.post("/", verifyAdminToken, createBlog);    //Update Create Blog Route

module.exports = router;

