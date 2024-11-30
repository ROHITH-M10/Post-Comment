import React from 'react';
import PostList from './components/PostList';  // Import PostList component
import CreatePost from './components/CreatePost';  // Import CreatePosts component
import ShowPosts from './components/ShowPosts';  // Import ShowPosts component

function App() {
  return (
    <div className="App">
      <h1>Postgram</h1>
      <CreatePost />
      <ShowPosts/>
    </div>
  );
}

export default App;
