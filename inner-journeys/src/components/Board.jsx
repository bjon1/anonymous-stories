import Post from './Post';

const Board = ({Posts}) => {

    return(
        <ul>
            {Posts ?? Posts.map((post, i) => {
                <Post />
            })}
        </ul>
    )
}

export default Board;