
import { supabase } from '../client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    
    const [post, setPost] = useState({})
    const params = useParams();

    useEffect(() => {
        getPost();
        console.log("Post", post);
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
            <button onClick={deletePost}>delete</button>
        </div>
    )
}

export default PostDetails;