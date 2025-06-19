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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
