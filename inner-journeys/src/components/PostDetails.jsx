
import { supabase } from '../client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom;

const PostDetails = () => {
    
    const [post, setPost] = useState({})
    const params = useParams();

    useEffect(() => {
        getPost();
    }, [])

    const getPost = async () => {
        await supabase 
            .from('Posts')
            .select()
            .eq('id', params.id)
    }

    const deletePost = async () => {
        await supabase
            .from('Posts')
            .delete()
            .eq('id', post.id)
    }

    return(
        <div>
            Welcome to Post Details
            <button onClick={deletePost}>delete</button>
        </div>
    )
}

export default PostDetails;