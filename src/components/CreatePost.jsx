import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreatePost() {

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: '',
  });


  const handleNewPostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmitNewPost = async (e) => {
    e.preventDefault();
    console.log('New Post Data:', newPost);  // Log data before sending
    try {
      await axios.post('http://127.0.0.1:5000/api/posts', newPost);
      setNewPost({ title: '', content: '', author: '' });  // Reset the form
    //   fetchPosts();  // Refresh the list of posts
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

//   const refreshComments = (postId) => {
//     fetchPosts();
//   };

  return (
    <div className='PostList'>
      <form onSubmit={handleSubmitNewPost} className='post-form'>
      <h1>Create a new post</h1>
      <div className="form-inputs">

      
            <input
            type="text"
            name="title"
            placeholder="Title"
            className='post-title'
            value={newPost.title}
            onChange={handleNewPostChange}
            required
            />
            
            <textarea
            name="content"
            placeholder="Content"
            className='post-content'
            value={newPost.content}
            onChange={handleNewPostChange}
            required
            />

            

            <input
            type="text"
            name="author"
            placeholder="Author (optional)"
            className='post-author'
            value={newPost.author}
            onChange={handleNewPostChange}
            
            />


        </div>
        <button type="submit" className='post-submit-button'>Post</button>
      </form>

      
    </div>
  );
}

export default CreatePost;
