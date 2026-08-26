import React, { createContext, useContext, useState, useReducer } from "react";
const GlobalStateContext = createContext();
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size,
      );
      if (existingItemIndex > -1) {
        const newCart = [...state.cart];
        newCart[existingItemIndex].quantity += 1;
        return { ...state, cart: newCart };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    default:
      return state;
  }
};
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });
  const [activeTab, setActiveTab] = useState("cart");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebarTab = (tabName) => {
    setActiveTab(tabName);
    setIsSidebarOpen(true);
    console.log("Global Sidebar Opened on Tab: " + tabName);
  };
  const closeSidebar = () => setIsSidebarOpen(false);
  return (
    <GlobalStateContext.Provider
      value={{
        cart: state.cart,
        dispatch,
        activeTab,
        setActiveTab,
        isSidebarOpen,
        setIsSidebarOpen,
        openSidebarTab,
        closeSidebar,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
