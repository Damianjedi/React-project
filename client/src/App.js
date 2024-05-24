import './App.css';
import Signup from './Signup'
import Login from './Login'
import Menu from './menu';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MyComponent from './Home';
import Opinions from './opinie';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/opinie' element={<Opinions/>}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
        <Route path='/home' element={<MyComponent />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
