
const Post = ({post}) => {

    return(
        <li className="Post">
            <a href="#">
                <span></span>
                <h2>{post.title}</h2>
                <p>{post.created_at}</p>
                <p>{post.upvotes}</p>
            </a>
        </li>
    )
}

export default Post;