import React, { useEffect } from 'react';
import CommentForm from './CommentForm';
import ShowComments from './ShowComments';

function ShowPosts({ fetchPosts, posts }) {
    useEffect(() => {
      fetchPosts();
    }, [fetchPosts]);
  
    return (
      <div className="PostList">
        <h2>Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="title">{post.title}</div>
            <div className="post-by">@{post.author || 'Anonymous'}</div>
            <div className="content">{post.content}</div>
            <div className="time-stamp">{post.timestamp}</div>
            <CommentForm postId={post.id} refreshComments={fetchPosts} />
            <ShowComments post={post} />
          </div>
        ))}
      </div>
    );
  }

export default ShowPosts;
  