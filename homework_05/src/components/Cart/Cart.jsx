import { useShallow } from "zustand/shallow";

import useCartStore from "../../store/useCartStore";

import Button from "../shared/Button";
import CartItem from "./CartItem";

const Cart = ({ onClose }) => {
  const { items, clearCart } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      clearCart: state.clearCart,
    })),
  );

  const isEmpty = items.length === 0;

  const totalPrice = items
    .reduce((total, item) => total + item.price * item.qty, 0)
    .toFixed(2);

  const handleClearCart = () => {
    clearCart();
    onClose();
  };

  if (isEmpty) {
    return (
      <section className="cart">
        <h2 className="cart__title">Shopping Cart</h2>
        <p className="cart__empty">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2 className="cart__title">Shopping Cart</h2>

      <div className="cart__items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart__footer">
        <span className="cart__total">Total: ${totalPrice}</span>

        <Button className="cart__clear-btn" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </section>
  );
};

export default Cart;
