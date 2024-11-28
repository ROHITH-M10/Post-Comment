import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ postId, refreshComments }) {
  const [comment, setComment] = useState({
    content: '',
    author: ''
  });

  const handleCommentChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:5000/api/posts/${postId}/comments`, comment);
      setComment({ content: '', author: '' });  // Reset the form
    //   refreshComments(postId);  // Refresh comments for the post
    refreshComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='CommentForm'>
      {/* <div className="heading">Comments</div> */}
      <form onSubmit={handleSubmitComment}>
        <div className="comment-form-input">
            <input
            name="content"
            placeholder="Add a comment..."
            className='comment-content'
            value={comment.content}
            onChange={handleCommentChange}
            required
            />
            <input
            type="text"
            name="author"
            placeholder="Your name"
            className='comment-author'
            value={comment.author}
            onChange={handleCommentChange}
            />
        </div>
        <button type="submit" className='comment-submit'>Comment</button>
      </form>
    </div>
  );
}

export default CommentForm;
