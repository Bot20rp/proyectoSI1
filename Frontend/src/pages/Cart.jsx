import { useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext"; // Asegúrate de que la ruta sea correcta
import "./cart.css"; // Asegúrate de crear este archivo CSS
import 'font-awesome/css/font-awesome.min.css';
export const Cart = () => {
  const { cartList, addToCart, decreaseQty, deleteProduct } = useContext(CartContext); // Usar el contexto

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="cart-items">
      <div className="cart-container">
        <div className="cart-content">
          {cartList.length === 0 && (
            <h1 className="no-items">No se añadieron productos al carrito</h1>
          )}
          {cartList.map((item) => {
            const productQty = item.price * item.qty;
            return (
              <div className="cart-list" key={item.id}>
                <div className="image-holder">
                  <img src={item.imgUrl} alt={item.productName} />
                </div>
                <div className="cart-details">
                  <h3>{item.productName}</h3>
                  <h4>
                    Bs{item.price}.00 * {item.qty}
                    <span>Bs{productQty}.00</span>
                  </h4>
                </div>
                <div className="cart-control">
                  <button
                    className="incCart"
                    onClick={() => addToCart(item, 1)} // Cambiar para usar el contexto
                  >
                    <i className="fa-solid fa-plus"></i>
                   
                  </button>
                  <button
                    className="desCart"
                    onClick={() => decreaseQty(item)} // Cambiar para usar el contexto
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                </div>
                <button
                  className="delete"
                  onClick={() => deleteProduct(item)} // Cambiar para usar el contexto
                >
                  <ion-icon name="close"></ion-icon>
                </button>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <h2>Carritoo</h2>
          <div className="total-price">
            <h4>Total precio :</h4>
            <h3>Bs{totalPrice}.00</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
