import './App.css';
import Signup from './Signup'
import Login from './Login'
import Menu from './menu';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MyComponent from './Home';
import Opinions from './opinie';
import Payment from './Payment'
import Orders from './Orders'
import OrderStatusClient from './OrderStatusClient';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/opinie' element={<Opinions/>}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
        <Route path='/home' element={<MyComponent />}></Route>
        <Route path='/payment' element={<Payment />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        <Route path='/yourorderstatus' element={<OrderStatusClient />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
