
import { supabase } from '../client';

const Post = ({post}) => {

    return(
        <div className="Post">
            <div>
                <span></span>
                <h2>Title: {post.title}</h2>
                <p>Time Created: {post.created_at}</p>
                <p>Upvotes: {post.upvotes}</p>
            </div>
        </div>
    )
}

export default Post;