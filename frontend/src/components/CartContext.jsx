import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopping_cart");

      if (!savedCart) return [];

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) return [];

      return parsedCart.filter(
        (item) => item && (item._id || item.id) && Number(item.qty) > 0,
      );
    } catch (error) {
      localStorage.removeItem("shopping_cart");
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState("cart");

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const openDrawerWithTab = (tabName) => {
    setDrawerTab(tabName);
    setIsDrawerOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ADD TO CART
  const addToCart = (product) => {
    const pId = product?._id || product?.id;

    if (!pId) return;

    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => (item?._id || item?.id) === pId);

      if (exist) {
        const availableStock = Number(product?.stock ?? exist?.stock ?? 0);

        // STOCK LIMIT
        if (availableStock <= 0) {
          alert("Sorry, this product is currently out of stock.");
          return prevItems;
        }

        if (Number(exist.qty) >= availableStock) {
          alert(
            `Only ${availableStock} unit${
              availableStock === 1 ? "" : "s"
            } of this product are available.`,
          );

          return prevItems;
        }

        return prevItems.map((item) =>
          (item?._id || item?.id) === pId
            ? {
                ...exist,
                qty: Number(exist.qty) + 1,
                stock: availableStock,
              }
            : item,
        );
      }

      // NEW PRODUCT
      const availableStock = Number(product?.stock ?? 0);

      if (availableStock <= 0) {
        alert("Sorry, this product is currently out of stock.");
        return prevItems;
      }

      return [
        ...prevItems,
        {
          ...product,
          stock: availableStock,
          qty: 1,
        },
      ];
    });

    setDrawerTab("cart");
    setIsDrawerOpen(true);
  };
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find(
        (item) => (item?._id || item?.id) === productId,
      );

      if (!exist) return prevItems;

      if (Number(exist.qty) === 1) {
        return prevItems.filter(
          (item) => (item?._id || item?.id) !== productId,
        );
      }

      return prevItems.map((item) =>
        (item?._id || item?.id) === productId
          ? {
              ...exist,
              qty: Number(exist.qty) - 1,
            }
          : item,
      );
    });
  };
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item?._id || item?.id) !== productId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + Number(item?.qty || 0),
    0,
  );

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item?.price || 0) * Number(item?.qty || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        drawerTab,
        setDrawerTab,
        openDrawerWithTab,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
