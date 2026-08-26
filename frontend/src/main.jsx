import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./components/CartContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID =
  "959068642724-l3cenuc5tp5k6vgs4e1aqoki7654387m.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </CartProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
