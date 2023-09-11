import "./App.css";
import ProductList from "./Products/ProductList";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import Blogs from "./Pages/Blogs";
import About from "./Pages/About";
import Laptops from "./ProductCategories/Laptops";
import Phones from "./ProductCategories/Phones";
import ProductCard from "./Products/ProductCard";
import ProductPage from "./Products/ProductPage";
import Fragrances from "./ProductCategories/Fragrances";
import Groceries from "./ProductCategories/Groceries";
import SkinCare from "./ProductCategories/SkinCare";
import HomeDeco from "./ProductCategories/HomeDeco";
import BuyProduct from "./Products/BuyProduct";
import Cart from "./components/Cart/Cart";
import Buy from "./components/Cart/Buy";
import Signup from "./Pages/Signup";
import Forgot from "./Pages/Forgot";
import Reset from "./Pages/Reset";
import Verify from "./Pages/Verify";
import DashBoardContainer from "./components/DashBoard/DashBoardContainer";
import Chart from "./components/Chart";
import MyDashBoard from "./Pages/MyDashBoard";
import ChangePassword from "./Pages/ChangePassword";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/about" element={<About />} />

        <Route path="/categories/Laptops" element={<Laptops />} />
        <Route path="/categories/Phones" element={<Phones />} />
        <Route path="/categories/Fragrances" element={<Fragrances />} />
        <Route path="/categories/Groceries" element={<Groceries />} />
        <Route path="/categories/skin-care" element={<SkinCare />} />
        <Route path="/categories/Home-Decoration" element={<HomeDeco />} />
        <Route path="/productPage/:title" element={<ProductPage />} />
        <Route path="/BuyProduct/:title" element={<BuyProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cartItem/buy/:id" element={<Buy />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/confirm" element={<VerifyEmail />} /> */}
        <Route path="/confirm" element={<Verify />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<DashBoardContainer />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/myDashBoard" element={<MyDashBoard />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
      
    </div>
  );
}

export default App;
