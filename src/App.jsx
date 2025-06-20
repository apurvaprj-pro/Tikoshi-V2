import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import ThankYouPage from "./pages/ThankYou";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpVerification from "./pages/OtpVerification";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/product/:productName" element={<ProductDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
