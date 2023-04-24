import Post from './Post';



const Board = ({ Posts, filteredPosts, searchInput }) => {

  return (
    <div id="grid">
      {searchInput.length > 0
        ? filteredPosts &&
          filteredPosts.map((post, i) => (
            <Post post={post} />
          ))
        : Posts &&
          Posts.map((post, i) => (
            <Post post={post} />
          ))}
    </div>
  );
};

export default Board;
