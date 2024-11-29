import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ postId, refreshComments }) {

  const [comment, setComment] = useState({
    content: '',
    author: '',
    style: 'text', // Default style
  });

  const handleCommentChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:5000/api/posts/${postId}/comments`, comment);
      console.log(comment)
      setComment({ content: '', author: '', style: 'text' }); // Reset the form
      refreshComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='CommentForm'>
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

          <div className="radio-buttons">
            <input
              type="radio"
              name="style"
              value="text"
              checked={comment.style === 'text'}
              onChange={handleCommentChange}
            />
            <label htmlFor="text">Text</label>

            <input
              type="radio"
              name="style"
              value="bold"
              checked={comment.style === 'bold'}
              onChange={handleCommentChange}
            />
            <label htmlFor="bold">Bold</label>

            <input
              type="radio"
              name="style"
              value="italic"
              checked={comment.style === 'italic'}
              onChange={handleCommentChange}
            />
            <label htmlFor="italic">Italic</label>

            <input
              type="radio"
              name="style"
              value="link"
              checked={comment.style === 'link'}
              onChange={handleCommentChange}
            />
            <label htmlFor="link">Link</label>

          </div>
        </div>
        <button type="submit" className='comment-submit'>Comment</button>
      </form>
    </div>
  );
}

export default CommentForm;
