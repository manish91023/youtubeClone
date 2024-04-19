
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home/home';
import Video from './pages/videos/video';
import Navbar from './components/navbar/Navbar';
import { useState } from 'react';
function App() {
  
  const [sidebar,setSidebar]=useState(true);


  return (
    <div>
        <Navbar setSidebar={setSidebar}/>
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar}/>} />
          <Route path="/video/:categoryId/:videoId" element={<Video/>}/>
        </Routes>
    </div>
  )
}

export default App
