
import { supabase } from '../client';

const Post = ({post}) => {

    const deletePost = async () => {
        await supabase
            .from('Posts')
            .delete()
            .eq('id', post.id)
    }

    return(
        <div className="Post">
            <div>
                <span></span>
                <h2>Title: {post.title}</h2>
                <p>Time Created: {post.created_at}</p>
                <p>Upvotes: {post.upvotes}</p>
                <button onClick={deletePost}>delete</button>
            </div>
        </div>
    )
}

export default Post;