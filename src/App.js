import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import './App.css'
import Home from "./pages/home/Home";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Footer from "./components/footer/Footer";
import Bucket from "./pages/bucket/Bucket";
import SignIn from "./pages/sign/SignIn";
import Products from "./pages/products/Product";
import User from "./pages/user/User";
import Purchase from "./pages/purchase/Purchase";
import Wishlist from "./pages/wishlist/Wishlist";



function App() {
  window.addEventListener('load' , () => {
    localStorage.removeItem('token')
  })
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/bucket" element={<Bucket />}/>
          <Route path="/productDetail/:id" element={<ProductDetail />}/>
          <Route path="/sign" element={<SignIn />}/>
          <Route path="/products/:id" element={<Products/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/purchase" element={<Purchase/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
