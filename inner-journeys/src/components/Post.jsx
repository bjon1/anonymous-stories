
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
                <h2>{post.title}</h2>
                <p>{post.created_at}</p>
                <p>{post.upvotes}</p>
                <button onClick={deletePost}>delete</button>
            </div>
        </div>
    )
}

export default Post;