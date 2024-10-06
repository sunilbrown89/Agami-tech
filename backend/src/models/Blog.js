

  const mongoose = require('mongoose');

  const likeDislikeBlogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    like: { type: Number, default: 0 }, 
    dislike: { type: Number, default: 0 }, 
  }, { _id: false });

  const likeDislikeCommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    like: { type: Number, default: 0 }, 
    dislike: { type: Number, default: 0 }, 
  }, { timestamps: true });

  const commentSchema = new mongoose.Schema({
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likeDislike: {
      totalLikesForThisComment: { type: Number, default: 0 },
      totalDislikesForThisComment: { type: Number, default: 0 },
      likeDislikeCommentUserList: [likeDislikeCommentSchema], 
    },
  }, { timestamps: true });


  const blogSchema = new mongoose.Schema({
    title: { type: String},
    description: { type: String},
    image: { type: String},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },

    like: {
      totalLikes: { type: Number, default: 0 },
      likesUserList: [likeDislikeBlogSchema], 
    },
    dislike: {
      totalDislikes: { type: Number, default: 0 },
      dislikeUserLists: [likeDislikeBlogSchema], 
    },

    comments: {
      totalNumberOfComments: { type: Number, default: 0 },
      commentsUserList: [commentSchema],
    },
   
  });

  blogSchema.pre('save', function (next) {
    this.like.totalLikes = this.like.likesUserList.filter(l => l.like === 1).length;
    this.dislike.totalDislikes = this.dislike.dislikeUserLists.filter(d => d.dislike === 1).length;
    this.comments.totalNumberOfComments = this.comments.commentsUserList.length;
    this.comments.commentsUserList.forEach(comment => {
      comment.likeDislike.totalLikesForThisComment = comment.likeDislike.likeDislikeCommentUserList.filter(l => l.like === 1).length;
      comment.likeDislike.totalDislikesForThisComment = comment.likeDislike.likeDislikeCommentUserList.filter(d => d.dislike === 1).length;
    });

    next();
  });

  module.exports = mongoose.model('Blog', blogSchema);
