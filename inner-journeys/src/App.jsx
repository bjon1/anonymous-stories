import { useState, useEffect } from 'react'
import { supabase } from './client';
import Board from './components/Board';
import './App.css'


function App() {

  const [Posts, setPosts] = useState({});
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000)
  });

  const fetchData = () => {
    //get all posts from supabase and set it to Posts
    setPosts();
  }

  return (
    <div className="App">
      <Board Posts={Posts}/>

    </div>
  )
}

export default App;
