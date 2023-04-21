import { useState, useEffect } from 'react'
import { supabase } from './client';
import { Link } from "react-router-dom";
import Board from './components/Board';
import './App.css'


function App() {

  const [Posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  useEffect(() => {
    const channel = supabase 
      .channel('table_db_changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'Posts',
        },
        (payload) => {
          if(fetchData() && payload.eventType === 'INSERT'){
            console.log("INSERT ", payload.new);
            setPosts([...Posts, payload.new]);
          } else if(fetchData() && payload.eventType === 'UPDATE'){
            console.log("UPDATE ", payload.new);
            const newPosts = [...Posts];
            newPosts[payload.new.id] = payload.new;
            setPosts(newPosts)
          } else if(fetchData() && payload.eventType === 'DELETE'){
            console.log("DELETE ", payload.new);
            const newPosts = [...Posts];
            newPosts.splice(payload.new.id, 1);
            setPosts(newPosts);
          }
        }
      )
      .subscribe();
      fetchData();
  }, []);

  

  const fetchData = async () => {
    const {data} = await supabase 
      .from('Posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data);
  }

  const searchPosts = (searchValue) => {
    setSearchInput(searchValue);
    console.log("SEARCH", searchInput);
    console.log("Filtered Posts", filteredPosts);
    if(searchValue !== '') {
      const filteredData = Posts.filter((item) => {
        return Object.values(item.title)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredPosts(filteredData);
    }
  }


  return (
    <div className="App">
      <div className="is-flex-column">
        <input
          className="search_post"
          type="text"
          placeholder="Search..."
          onChange={(e) => searchPosts(e.target.value)}
        />
        <Link to={'/update/'}>
          <button id="addButton">
          <i className="fa-solid fa-plus"></i>
          </button>
        </Link>
      </div>

      <Board Posts={Posts} filteredPosts={filteredPosts} searchInput={searchInput} />
    </div>
  )
}

export default App;
