
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Kanban from './Kanban/Kanban';

function App() {
  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/taskses" element={<Kanban />} />
      </Routes>
      </Router>
    
  )
}

export default App
