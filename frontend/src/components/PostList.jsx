import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm'; // Assuming you have a separate CommentForm component for adding comments

function PostList() {

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleNewPostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmitNewPost = async (e) => {
    e.preventDefault();
    console.log('New Post Data:', newPost);  // Log data before sending
    try {
      await axios.post('http://127.0.0.1:5000/api/posts', newPost);
      setNewPost({ title: '', content: '', author: 'Anonymous' });  // Reset the form
      fetchPosts();  // Refresh the list of posts
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

      <div className="posts-box">

        <h2>Posts</h2>
        {posts.map((post) => (
            <div key={post.id} className="post">
            <div className='title'>{post.title}</div>
            <div className='post-by'>
                @{post.author || 'Anonymous'}</div>

            <div className='content'>{post.content}</div>
            <div className='time-stamp'>{post.timestamp}</div>

            {/* <CommentForm postId={post.id} refreshComments={() => refreshComments(post.id)} /> */}
            <CommentForm postId={post.id} refreshComments={() => fetchPosts()}/>


            <div className="comments">
                {post.comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className='comment-by'>@{comment.author}</div>
                    {
                      comment.style === 'link' ? (
                        <a href={comment.content} className={`comment-content-list ${comment.style}`}>{comment.content}</a>
                      ) : (
                        <div className= {`comment-content-list ${comment.style}`}>{comment.content}</div>
                      )
                    }
                
                    <div className='time-stamp'>{comment.timestamp}</div>
                </div>
                ))}
            </div>
            </div>
        ))}
                
      </div>
    </div>
  );
}

export default PostList;
