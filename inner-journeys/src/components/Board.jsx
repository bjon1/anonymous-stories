import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Post from './Post';
import { supabase } from '../client';

const Board = ({Posts, filteredPosts, searchInput}) => {

    /*
    const addPost = async () => {
        await supabase
            .from('Posts')
            .insert({title:"DEFAULT", content:"DEFAULT CONTENT", upvotes: 100})
            .select();
    }
    */

    return(
        <>

            <Link to={'/update/'}>
                <button>+</button>
            </Link>

            { searchInput.length > 0  
                ? filteredPosts && filteredPosts.map((post, i) => (
                    <Link to={`/details/${post.id}`}>
                        <div key={i}><Post post={post} /></div>
                    </Link>
                ))
                : Posts && Posts.map((post, i) => (
                    <Link to={`/details/${post.id}`}>
                        <div key={i}><Post post={post} /></div>
                    </Link>
                ))
            }
            
        </>
    )
}

export default Board;