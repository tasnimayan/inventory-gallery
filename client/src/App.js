import {Fragment} from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'


import HomePage from './pages/HomePage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CategoryPage from './pages/CategoryPage';
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/add' element={<ProductCreatePage />} />
          <Route path='/products/:productId' element={<ProductDetailsPage />} />
        </Routes>      
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
