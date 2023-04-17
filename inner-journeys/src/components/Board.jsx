import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Post from './Post';
import { supabase } from '../client';

const Board = ({Posts}) => {

    const addPost = async () => {
        await supabase
            .from('Posts')
            .insert({title:"DEFAULT", content:"DEFAULT CONTENT", upvotes: 100})
            .select();
    }

    return(
        <>

            <button onClick={addPost}>+</button>

            {Posts && Posts.map((post, i) => (
                <Link to={`/details/${post.id}`}>
                    <div key={i}><Post post={post} /></div>
                </Link>
            ))}
        </>
    )
}

export default Board;