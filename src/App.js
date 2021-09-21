import './App.css';
// import Header from './Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import TestPage from './pages/Test';
import Protected from './Protected';
import Profile from './pages/Profile';
import ProductList from './pages/ProductList';
import SearchProduct from './pages/SearchProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <h1>E-Commerce Project</h1> */}
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/updateProd/:id'>
            <Protected Cmp={UpdateProduct} />
          </Route>
          <Route path='/addProd'>
            <Protected Cmp={AddProduct} />
          </Route>
          <Route path='/searchProd'>
            <Protected Cmp={SearchProduct} />
          </Route>
          <Route path='/testPage'>
            <TestPage />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/'>
            <Protected Cmp={ProductList} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
