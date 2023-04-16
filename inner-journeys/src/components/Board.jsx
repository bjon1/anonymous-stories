import Post from './Post';

const Board = ({Posts}) => {

    return(
        <>
            {Posts && Posts.map((post, i) => (
            <ul key={i}><Post post={post} /></ul>
            ))}
        </>
    )
}

export default Board;