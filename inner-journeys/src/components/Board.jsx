import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Post from './Post';
import { supabase } from '../client';


const Board = ({ Posts, filteredPosts, searchInput }) => {

  const containerRef = useRef(null);

  return (
    <div id="grid" ref={containerRef}>
      {searchInput.length > 0
        ? filteredPosts &&
          filteredPosts.map((post, i) => (
            <Post post={post} containerRef={containerRef}/>
          ))
        : Posts &&
          Posts.map((post, i) => (
            <Post post={post} containerRef={containerRef}/>
          ))}
    </div>
  );
};

export default Board;
