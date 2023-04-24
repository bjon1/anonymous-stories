import Post from './Post';
import { useState, useEffect } from 'react';

const Board = ({ Posts, filteredPosts, searchInput }) => {

  return (
    <div id="grid">
      {searchInput.length > 0
        ? filteredPosts &&
          filteredPosts.map((post, i) => (
            <Post post={post} key={i}/>
          ))
        : Posts &&
          Posts.map((post, i) => (
            <Post post={post} key={i}/>
          ))}
    </div>
  );
};

export default Board;
