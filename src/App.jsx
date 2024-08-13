import './App.css';
import Join from "./component/Join/Join";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from "./component/Chat/Chat"; // Importing Chat without destructuring

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Join />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
