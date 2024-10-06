const Blog = require('../models/Blog');
const User = require('../models/User');
const mongoose = require('mongoose');


exports.createBlog = async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const userId = req.user.id; 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!title && !description && !image) {
      return res.status(400).json({ message: 'At least one of title, description, or image is required.' });
    }

    const newBlog = new Blog({
      ...(title && { title }),             
      ...(description && { description }), 
      ...(image && { image }),            
      author: user._id,                   
      authorName: user.username,          
    });

    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.getMyBlogs = async (req, res) => {
  try {
    const userId = req.user._id; 

    const myBlogs = await Blog.find({ author: userId }).populate('author', 'name email');

    if (!myBlogs.length) {
      return res.status(404).json({ message: 'No blogs found' });
    }

    res.status(200).json({ message: 'Blogs fetched successfully', blogs: myBlogs });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const { title } = req.query;
    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' }; 
    }

    const blogs = await Blog.find(filter).populate('author', 'name');

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  const { title, description, image } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    blog.title = title;
    blog.description = description;
    blog.image = image;
    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  const blogId  = req.params.id;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully', deletedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


exports.toggleBlogReaction = async (req, res) => {
  const { blogId } = req.params;
  const { reaction } = req.body; 
  
  const userId = req.user && req.user.id ? req.user.id : null;
  const username = req.user && req.user.name ? req.user.name : "Default"; 
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing or invalid in the request.' });
  }
  
  if (!['like', 'dislike'].includes(reaction)) {
    return res.status(400).json({ message: 'Invalid reaction type. Use "like" or "dislike".' });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    const existingLike = blog.like.likesUserList.find(user => user.userId.toString() === userId);
    const existingDislike = blog.dislike.dislikeUserLists.find(user => user.userId.toString() === userId);

    if (reaction === 'like') {
      if (existingLike) {
        existingLike.like = existingLike.like === 1 ? 0 : 1; 
       
        if (existingLike.like === 0) {
          blog.like.likesUserList = blog.like.likesUserList.filter(user => user.userId.toString() !== userId);
        }
      } else {
        const newLike = { userId, username, like: 1, dislike: 0 }; 
        blog.like.likesUserList.push(newLike);
      }

      if (existingDislike) {
        existingDislike.dislike = 0;
        blog.dislike.dislikeUserLists = blog.dislike.dislikeUserLists.filter(user => user.userId.toString() !== userId);
      }
    } else if (reaction === 'dislike') {
      if (existingDislike) {
        existingDislike.dislike = existingDislike.dislike === 1 ? 0 : 1; 
        if (existingDislike.dislike === 0) {
          blog.dislike.dislikeUserLists = blog.dislike.dislikeUserLists.filter(user => user.userId.toString() !== userId);
        }
      } else {
        const newDislike = { userId, username, like: 0, dislike: 1 }; 
        blog.dislike.dislikeUserLists.push(newDislike);
      }

      if (existingLike) {
        existingLike.like = 0;
        blog.like.likesUserList = blog.like.likesUserList.filter(user => user.userId.toString() !== userId);
      }
    }

  
    blog.like.totalLikes = blog.like.likesUserList.filter(user => user.like === 1).length;
    blog.dislike.totalDislikes = blog.dislike.dislikeUserLists.filter(user => user.dislike === 1).length;

    await blog.save();

    res.status(200).json({ message: 'Reaction updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



exports.addComment = async (req, res) => {
  const { blogId } = req.params;
  const { content } = req.body; 
  const userId = req.user.id || null; 
  const username = req.user.name || 'Default';

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing or invalid in the request.' });
  }

  if (!content) {
    return res.status(400).json({ message: 'Comment content is required.' });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    const newComment = {
      blogId: new mongoose.Types.ObjectId(blogId),
      _id: new mongoose.Types.ObjectId(),
      userId,
      username,
      content,
      likeDislike: {
        totalLikesForThisComment: 0,
        totalDislikesForThisComment: 0,
        likeDislikeCommentUserList: [],
      },
    };

    blog.comments.commentsUserList.push(newComment);
    blog.comments.totalNumberOfComments += 1;

    await blog.save();

    res.status(201).json({ message: 'Comment added successfully', comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


exports.getCommentsForBlog = async (req, res) => {
  const { blogId } = req.params; 

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    const comments = blog.comments.commentsUserList;

    res.status(200).json({ message: 'Comments fetched successfully', comments });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



exports.toggleCommentReaction = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { reaction } = req.body; 

  const userId = req.user && req.user.id ? req.user.id : null;
  const username = req.user && req.user.username ? req.user.username : "Anonymous";

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing or invalid in the request.' });
  }

  if (!['like', 'dislike'].includes(reaction)) {
    return res.status(400).json({ message: 'Invalid reaction type. Use "like" or "dislike".' });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    const comment = blog.comments.commentsUserList.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    const existingReaction = comment.likeDislike.likeDislikeCommentUserList.find(user => user.userId.toString() === userId);

    if (reaction === 'like') {
      if (existingReaction) {
        existingReaction.like = existingReaction.like === 1 ? 0 : 1;
        if (existingReaction.like === 0 && existingReaction.dislike === 0) {
          comment.likeDislike.likeDislikeCommentUserList = comment.likeDislike.likeDislikeCommentUserList.filter(
            (user) => user.userId.toString() !== userId
          );
        }
      } else {
        comment.likeDislike.likeDislikeCommentUserList.push({ userId, username, like: 1, dislike: 0 });
      }

      if (existingReaction && existingReaction.dislike === 1) {
        existingReaction.dislike = 0;
      }
    } else if (reaction === 'dislike') {
      if (existingReaction) {
        existingReaction.dislike = existingReaction.dislike === 1 ? 0 : 1; 
        if (existingReaction.like === 0 && existingReaction.dislike === 0) {
          comment.likeDislike.likeDislikeCommentUserList = comment.likeDislike.likeDislikeCommentUserList.filter(
            (user) => user.userId.toString() !== userId
          );
        }
      } else {
        comment.likeDislike.likeDislikeCommentUserList.push({ userId, username, like: 0, dislike: 1 });
      }

      if (existingReaction && existingReaction.like === 1) {
        existingReaction.like = 0;
      }
    }
    comment.likeDislike.totalLikesForThisComment = comment.likeDislike.likeDislikeCommentUserList.filter(user => user.like === 1).length;
    comment.likeDislike.totalDislikesForThisComment = comment.likeDislike.likeDislikeCommentUserList.filter(user => user.dislike === 1).length;

    await blog.save();

    res.status(200).json({ message: 'Comment reaction updated successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};








