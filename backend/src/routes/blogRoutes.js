const express = require('express');
const {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getCommentsForBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.post('/create-blog', authMiddleware, createBlog);
router.get('/my-blogs', authMiddleware, getMyBlogs);
router.get('/get-all-users-blogs', getAllBlogs);
router.get('/get-blog/:id', getBlogById);
router.put('/update-blog/:id', authMiddleware, updateBlog);
router.delete('/delete-blog/:id', authMiddleware, deleteBlog);
router.post('/:blogId/blog-reaction', authMiddleware, blogController.toggleBlogReaction);
router.post('/:blogId/blog-comments', authMiddleware, blogController.addComment);
router.get('/:blogId/blog-by-all-comments', authMiddleware, getCommentsForBlog);
router.put('/:blogId/comments/:commentId/comment-reaction', authMiddleware, blogController.toggleCommentReaction);

module.exports = router;
