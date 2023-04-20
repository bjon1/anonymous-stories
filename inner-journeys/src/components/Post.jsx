
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Post = ({post}) => {
    const squareRef = useRef(null);

    useEffect(() => {
        getRandomColor();
        console.log("runs once");
    }, [])
      
    const getRandomColor = () => {
        const colors = [
            "#2E6171",
            "#556F7A",
            "#798086",
            "#B79FAD",
            "#D4AFCD",
            "#4ECDC4",
            "#6C464F",
            "#CBC5EA",
            "#8E9DCC",
            "#D9DBF1",
            "#B2ABF2",
            "#977390",
            "#A6B1E1"
          ];

        squareRef.current.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    };

    return(
        <div className="square" ref={squareRef} to={`/details/${post.id}`}>
            <Link to={`/details/${post.id}`} className='link-button'>
                <div className="is-flex-row">
                    <h2>{post.title}</h2>
                    <p>Time Created: {post.created_at.substring(5, 10)}</p>
                    <p>Upvotes: {post.upvotes}</p>
                </div>
            </Link>
        </div>
    )
}

export default Post;