import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from "./Pages/Checkout";
import Address from "./Pages/Address";
import Cart from "./Pages/Cart";
import Confirmation from "./Pages/Confirmation";
import Prescription from "./Pages/Prescription";
import Profile from "./Pages/Profile";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterSuccess from "./Pages/RegisterSuccess";
import Verification from "./Pages/Verification";
import LeftbarAdmin from "./Admin/components/Leftbar";
import NavbarAdmin from "./Admin/components/Navbar";
import Dashboard from "./Admin/pages/Dashboard";
import Login from "./Admin/pages/Login";
import Product from "./Admin/pages/Product";
import AllOrder from "./Admin/pages/AllOrder";
import NewOrder from "./Admin/pages/NewOrder";
import ReadyToSend from "./Admin/pages/ReadyToSend";
import OnSend from "./Admin/pages/OnSend";
import OrderDone from "./Admin/pages/OrderDone";
import OrderCancel from "./Admin/pages/OrderCancel";
import Statistics from "./Admin/pages/Statistics";
import Kas from "./Admin/pages/Kas";
import SalesRevenue from "./Admin/pages/SalesRevenue";

function App() {
  const location = useLocation();
  //
  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <Navbar />
      )}
      {location.pathname === "/loginadmin" ? null : <NavbarAdmin />}
      {location.pathname === "/loginadmin" ? null : <LeftbarAdmin />}

      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/registered" element={<RegisterSuccess />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:product_id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/myaccount" element={<Profile />} />
        <Route path="/verification/:token" element={<Verification />} />
        <Route path="/loginadmin" element={<Login />} />
        <Route path="/homeadmin" element={<Dashboard />} />
        <Route path="/productadmin" element={<Product />} />
        <Route path="/allorderadmin" element={<AllOrder />} />
        <Route path="/neworderadmin" element={<NewOrder />} />
        <Route path="/readytosendadmin" element={<ReadyToSend />} />
        <Route path="/onsendadmin" element={<OnSend />} />
        <Route path="/doneadmin" element={<OrderDone />} />
        <Route path="/canceladmin" element={<OrderCancel />} />
        <Route path="/statisticsadmin" element={<Statistics />} />
        <Route path="/kasadmin" element={<Kas />} />
        <Route path="/salesrevenueadmin" element={<SalesRevenue />} />
      </Routes>
      {location.pathname === "/login" ||
      location.pathname === "/register" ? null : (
        <Footer />
      )}
      <ToastContainer
        pauseOnFocusLoss={false}
        autoClose={1000}
        hideProgressBar={true}
      />
    </>
  );
}

export default App;
