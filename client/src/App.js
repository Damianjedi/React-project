import './App.css';
import Signup from './Signup'
import Login from './Login'
import Menu from './menu';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MyComponent from './Home';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/register' element={<Login />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
        <Route path='/home' element={<MyComponent />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
