
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const Post = ({post, containerRef}) => {
    const squareRef = useRef(null);

    const resizeSquares = () => {
        squareRef.current.style.flexBasis = `calc(${100 / Math.floor(containerRef.current.clientWidth / squareRef.current.clientHeight)}% - 1px)`; //-1px
    }

    useEffect(() => {
        resizeSquares();
        getRandomColor();
        console.log("runs once");
    }, [])
      
    const getRandomColor = () => {
        const colors =
        [
            "#7CB0A9", "#D7A6B3", "#A2C6D3", "#F0C085", "#E6B098",
            "#90BEDE", "#B3D7C5", "#C4B7D6", "#F5C7A5", "#B5B7D2",
            "#9BB7A6", "#F2D1BC", "#AEC5B7", "#E8CFAF", "#D9B9D0",
            "#8DA9C4", "#C2D2C0", "#D8C1A9", "#C9D9E2", "#E8D0B3",
            "#AAD3C3", "#D6AEC6", "#BAC9D1", "#F2D2A8", "#D3C0C7"
        ]

        squareRef.current.style.backgroundColor = colors[Math.floor(Math.random() * (colors.length-2))];
    };

    const upvotePost = async () => {
        await supabase
            .from('Posts')
            .update({
                upvotes: post.upvotes + 1
            })
            .eq('id', post.id);
        getPost();
    }

    window.addEventListener('resize', resizeSquares);

    return(
        <div className="square" ref={squareRef} to={`/details/${post.id}`}>
            <div className="is-flex-column">
                    <Link to={`/details/${post.id}`} className='link-button'>
                        <h2 className="title">{post.title}</h2>
                        <div className="subtitle">
                            <p>{post.created_at.substring(5, 10)}</p>
                        </div>
                    </Link>
                <button className="likes-btn" onClick={upvotePost}>
                    <i class="fa-regular fa-thumbs-up"></i>
                    <span>{post.upvotes}</span>
                </button>
            </div>
        </div>
    )
}

export default Post;