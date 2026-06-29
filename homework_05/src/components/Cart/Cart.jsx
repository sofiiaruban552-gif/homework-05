import { useShallow } from "zustand/react/shallow";

import useCartStore from "../../store/useCartStore";

import Button from "../shared/Button";
import CartItem from "./CartItem";

const Cart = () => {
  const { items, clearCart } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      clearCart: state.clearCart,
    })),
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <section className="cart">
      <h2 className="cart__title">Shopping Cart</h2>

      {items.length === 0 ? (
        <p className="cart__empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart__items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart__footer">
            <span className="cart__total">Total: ${totalPrice.toFixed(2)}</span>

            <Button className="cart__clear-btn" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
