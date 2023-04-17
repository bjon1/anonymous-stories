import { useState, useEffect } from 'react'
import { supabase } from './client';
import Board from './components/Board';
import './App.css'


function App() {

  const [Posts, setPosts] = useState([]);
  
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
    setPosts(data);
  }

  return (
    <div className="App">
      <Board Posts={Posts} />
    </div>
  )
}

export default App;
