
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
        <div>
            Welcome to Post Details
            <h2>Title: {post.title}</h2>
            <p>Name: {post.name}</p>
            <p>Time: {post.created_at}</p>
            <p>Content: {post.content}</p>
            <p>Upvotes: {post.upvotes}</p>
            <p>Comments: {post.comments}</p>

            <button onClick={upvotePost}>upvote</button>

            <button onClick={deletePost}>delete</button>
            <Link to={`/update/${post.id}`}>
                <button>update</button>
            </Link>
        </div>
    )
}

export default PostDetails;