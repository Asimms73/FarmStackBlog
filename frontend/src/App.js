import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import CreateBlog from './CreateBlog';
import BlogDetails from './BlogDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {


  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path='/' element={<Home/>}></Route>
            <Route exact path='/create' element={<CreateBlog/>}></Route>
            <Route exact path='/blogs/:id' element={<BlogDetails/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;