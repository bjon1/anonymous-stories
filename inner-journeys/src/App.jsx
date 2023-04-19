import { useState, useEffect } from 'react'
import { supabase } from './client';
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
      <input
        className="input is-medium"
        type="text"
        placeholder="Search..."
        onChange={(e) => searchPosts(e.target.value)}
      />
      <Board Posts={Posts} filteredPosts={filteredPosts} searchInput={searchInput} />
    </div>
  )
}

export default App;
