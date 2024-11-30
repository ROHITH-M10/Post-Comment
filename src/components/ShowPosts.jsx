import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm'; // Assuming you have a separate CommentForm component for adding comments

function ShowPosts() {

  const [posts, setPosts] = useState([]);


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

  

//   const refreshComments = (postId) => {
//     fetchPosts();
//   };

  return (
    <div className='PostList'>
      
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
                        <a href={comment.content} target='_blank' className={`comment-content-list ${comment.style}`}>{comment.content}</a>
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

export default ShowPosts;
