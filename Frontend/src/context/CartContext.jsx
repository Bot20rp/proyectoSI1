import { createContext, useState, useEffect } from 'react';

// Crear contexto
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado para el carrito de compras
  const [cartList, setCartList] = useState(() => {
    // Inicializar con datos del localStorage si existen
    const storedCartList = localStorage.getItem("cartList");
    return storedCartList ? JSON.parse(storedCartList) : [];
  });

  // Efecto para almacenar el carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  // Funciones para manejar el carrito
  const addToCart = (product, num = 1) => {
    const existingProduct = cartList.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartList(
        cartList.map((item) =>
          item.id === product.id
            ? { ...existingProduct, qty: existingProduct.qty + num }
            : item
        )
      );
    } else {
      setCartList([...cartList, { ...product, qty: num }]);
    }
  };

  const decreaseQty = (product) => {
    const existingProduct = cartList.find((item) => item.id === product.id);
    if (existingProduct.qty === 1) {
      setCartList(cartList.filter((item) => item.id !== product.id));
    } else {
      setCartList(
        cartList.map((item) =>
          item.id === product.id
            ? { ...existingProduct, qty: existingProduct.qty - 1 }
            : item
        )
      );
    }
  };

  const deleteProduct = (product) => {
    setCartList(cartList.filter((item) => item.id !== product.id));
  };

  return (
    <CartContext.Provider value={{ cartList, addToCart, decreaseQty, deleteProduct }}>
      {children}
    </CartContext.Provider>
  );
};
