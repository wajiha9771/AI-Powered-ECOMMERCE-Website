import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCMS from "./admin/AdminCMS";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminAnalytics from "./admin/AdminAnalytics";
import AdminMessages from "./admin/AdminMessages";
import AdminLogin from "./admin/AdminLogin";
import AdminForgotPassword from "./admin/AdminForgotPassword";
import AdminResetPassword from "./admin/AdminResetPassword";

import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import ProductGrid from "./components/ProductGrid";
import TrendingGrid from "./components/TrendingGrid";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import NewArrivals from "./components/NewArrivals";
import Men from "./components/Men";
import Women from "./components/Women";
import Kids from "./components/Kids";
import Accessories from "./components/Accessories";
import LoginScreen from "./components/LoginScreen";
import About from "./components/About";
import Contact from "./components/Contact";
import FAQs from "./components/FAQs";
import ReturnExchanges from "./components/ReturnExchanges";
import PrivacyTerms from "./components/PrivacyTerms";
import ProductDetail from "./components/ProductDetail";
import CartDrawer from "./components/CartDrawer";
import { GlobalStateProvider } from "./components/GlobalStateContext";
import { CartProvider, useCart } from "./components/CartContext";
import UserProfileScreen from "./components/UserProfileScreen";
import AIShoppingAssistant from "./components/AIShoppingAssistant";

const FooterWrapper = () => {
  const { openDrawerWithTab } = useCart();
  return <Footer openDrawerWithTab={openDrawerWithTab} />;
};
export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <GlobalStateProvider>
      <CartProvider>
        <div>
          {!isAdminRoute && <Navbar />}

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSlider />
                  <ProductGrid />
                  <TrendingGrid />
                </>
              }
            />

            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/category/men" element={<Men />} />
            <Route path="/category/women" element={<Women />} />
            <Route path="/category/kids" element={<Kids />} />
            <Route path="/category/accessories" element={<Accessories />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/returns" element={<ReturnExchanges />} />
            <Route path="/privacy" element={<PrivacyTerms />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/profile" element={<UserProfileScreen />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
<Route path="/admin/reset-password" element={<AdminResetPassword />} />

<Route element={<AdminProtectedRoute />}>
<Route path="/admin/dashboard" element={<AdminLayout />}>
<Route index element={<AdminDashboard />} />
<Route path="cms" element={<AdminCMS />} />
<Route path="products" element={<AdminProducts />} />
<Route path="orders" element={<AdminOrders />} />
<Route path="analytics" element={<AdminAnalytics />} />
<Route path="messages" element={<AdminMessages />} />
</Route>
</Route>
          </Routes>
          {!isAdminRoute && <CartDrawer />}
          {!isAdminRoute && <AIShoppingAssistant />}
          {!isAdminRoute && <FooterWrapper />}
        </div>
      </CartProvider>
    </GlobalStateProvider>
  );
}
