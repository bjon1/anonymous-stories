import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';

const PostChange = () => {

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(params.id){
            getPost();
        }
    }, [])

    const [post, setPost] = useState({
        title: '',
        name: '',
        content: '',
    });

    const getPost = async () => {
        const {data} = await supabase 
            .from('Posts')
            .select()
            .eq('id', params.id)
            console.log("Post", post);
        setPost(data[0]);
    }

    const updatePost = async (e) => {
        e.preventDefault();
        await supabase
            .from('Posts')
            .update({
                title: post.title,
                name: post.name,
                content: post.content,
            })
            .eq('id', params.id);
        navigate('/');
        alert(`You have updated ${post.title}!`);
    }

    const addPost = async (e) => {
        e.preventDefault();
        await supabase
            .from('Posts')
            .insert({   
                title: post.title,
                name: post.name,
                content: post.content,
            })
            .select();
        navigate('/');
        alert(`You have added ${post.title}!`);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }


    return(
        <div>
            {params.id ? 
                (
                <form>
                    <div className="title">Update Post</div>
                    <label for="title">Title:</label><br/>
                    <input type="text" id="title" name="title" value={post.title} onChange={handleChange}/>
                    
                    <label for="name">Name:</label><br/>
                    <input type="text" id="name" name="name" value={post.name} onChange={handleChange}/>
                    
                    <label for="content">Content:</label><br/>
                    <textarea id="content" name="content" rows="5" cols="30" value={post.content} onChange={handleChange}></textarea>
                    
                    <input type="submit" value="Submit" onClick={updatePost}/>
                </form>
                )
            :   (
                
                <form>
                    <div className="title">Add Post</div>
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" value={post.title} onChange={handleChange}/>
                    
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value={post.name} onChange={handleChange}/>
                    
                    <label for="content">Content:</label>
                    <textarea id="content" name="content" rows="5" cols="30" value={post.content} onChange={handleChange}></textarea>
                    
                    <input type="submit" value="Add" onClick={addPost}/>
                </form>
                )
            }
        </div>
    )
}

export default PostChange;