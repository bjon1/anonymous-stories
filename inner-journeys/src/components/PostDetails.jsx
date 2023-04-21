
import { supabase } from '../client';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const PostDetails = () => {
    
    const params = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({})

    useEffect(() => {
        getPost();
    }, [])

    const getPost = async () => {
        const {data} = await supabase 
            .from('Posts')
            .select()
            .eq('id', params.id)
            console.log("Post", post);
        setPost(data[0]);
    }

    const deletePost = async () => {
        await supabase
            .from('Posts')
            .delete()
            .eq('id', params.id)
        navigate('/');
        alert("Post Deleted!");
    }

    const upvotePost = async () => {
        await supabase
            .from('Posts')
            .update({
                upvotes: post.upvotes + 1
            })
            .eq('id', post.id);
        getPost();
    }
    
    return(
        <div className="post_details">
            <div className="title is-3">{post.title}</div>
            {post.name ? (<p className="post_poster">Posted by: {post.name}</p>) : null}
            <p className="post_time subtitle is-6">{post.created_at ? post.created_at.substring(0,10) : null}</p>
            <p className="post_content">{post.content}</p>
            <p className="post_upvotes">Upvotes: {post.upvotes}</p>
            <p className="post_comments">Comments: {post.comments}</p>

            <button className="btn-upvote" onClick={upvotePost}>upvote</button>
            <button className="btn-delete" onClick={deletePost}>delete</button>
            <Link to={`/update/${post.id}`}>
                <button className="btn-edit">edit</button>
            </Link>
        </div>
    )
}

export default PostDetails;