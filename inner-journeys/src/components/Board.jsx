import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Post from './Post';
import { supabase } from '../client';
import Square from './Square'; // Import the Square component

const colors = [
  "#FFC857",
  "#E9724C",
  "#C5283D",
  "#481D24",
  "#255F85",
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const Board = ({ Posts, filteredPosts, searchInput }) => {
  return (
    <div id="container">
      {searchInput.length > 0
        ? filteredPosts &&
          filteredPosts.map((post, i) => (
            <Link to={`/details/${post.id}`} key={i}>
              <Square color={getRandomColor()}>
                <Post post={post} />
              </Square>
            </Link>
          ))
        : Posts &&
          Posts.map((post, i) => (
            <Link to={`/details/${post.id}`} key={i}>
              <Square color={getRandomColor()}>
                <Post post={post} />
              </Square>
            </Link>
          ))}
    </div>
  );
};

export default Board;
