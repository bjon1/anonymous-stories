
import { supabase } from '../client';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const PostDetails = () => {
    
    const params = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({});
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        getPost();
    }, [])

    const getPost = async () => {
        const {data} = await supabase 
            .from('Posts')
            .select()
            .eq('id', params.id)
        setPost(data[0]);
    }

    const deletePost = async () => {
        await supabase
            .from('Posts')
            .delete()
            .eq('id', params.id)
        navigate('/');
        //alert("Post Deleted!");
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

    const handleChange = (e) => {
        const { value } = e.target;
        setNewComment((prev) => {
            return {
                ...prev, value
            }
        })
    }

    const addComment = async (e) => {
        e.preventDefault();
        await supabase
            .from('Posts')
            .update([{ comments: [...(post.comments ? post.comments : []), newComment.value] }])
            .eq('id', params.id)
        getPost();
    }
    
    return(
        <div className="post_details">
            <div className="title is-3">{post.title}</div>
            {post.name ? (<p className="post_poster">Posted by: {post.name}</p>) : null}
            <p className="post_time subtitle is-6">{post.created_at ? post.created_at.substring(0,10) : null}</p>
            <p className="post_content">{post.content}</p>
            <button className="btn-upvote" onClick={upvotePost}>Upvotes: {post.upvotes}</button>
            <button className="btn-delete" onClick={deletePost}>delete</button>
            <Link to={`/update/${post.id}`}>
                <button className="btn-edit">edit</button>
            </Link>

            <div className="post_comments">
                <div className="title">Comments</div>
                <ul>
                    {post.comments ? post.comments && 
                        post.comments.map((comment, i) => (
                            <li>
                                <div className="comment">
                                <p className="comment-text">{comment}</p>
                                </div>
                            </li>
                        ))
                    :
                    "No Comments...Yet!"
                    }
                </ul>
                
                <form className="comment-form">
                    <label for="comment">Comment:</label>
                    <textarea id="comment" name="comment" placeholder="Add a comment..." onChange={handleChange} required></textarea>
                    <button type="submit" onClick={addComment}>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default PostDetails;