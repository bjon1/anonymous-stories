import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Post from './Post';
import { supabase } from '../client';


const Board = ({ Posts, filteredPosts, searchInput }) => {
  return (
    <div id="container">
      {searchInput.length > 0
        ? filteredPosts &&
          filteredPosts.map((post, i) => (
            <Post post={post} />
          ))
        : Posts &&
          Posts.map((post, i) => (
            <Post post={post} />
          ))}
    </div>
  );
};

export default Board;
