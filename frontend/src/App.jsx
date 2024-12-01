import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePost from './components/CreatePost';
import ShowPosts from './components/ShowPosts';

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>Postgram</h1>
      <CreatePost fetchPosts={fetchPosts} />
      <ShowPosts fetchPosts={fetchPosts} posts={posts} />
    </div>
  );
}

export default App;
