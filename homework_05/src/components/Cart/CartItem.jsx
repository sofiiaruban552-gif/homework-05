import { Minus, Plus, Trash2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import  useCartStore  from "../../store/useCartStore";

import Button from "../shared/Button";

const CartItem = ({ item }) => {
  const { incrementQty, decrementQty, removeFromCart } = useCartStore(
    useShallow((state) => ({
      incrementQty: state.incrementQty,
      decrementQty: state.decrementQty,
      removeFromCart: state.removeFromCart,
    })),
  );

  return (
    <article className="cart-item">
      <h3 className="cart-item__title">{item.title}</h3>

      <div className="cart-item__actions">
        <Button
          icon={Minus}
          className="cart-item__btn"
          onClick={() => decrementQty(item.id)}
        />

        <span className="cart-item__quantity">{item.qty}</span>

        <Button
          icon={Plus}
          className="cart-item__btn"
          onClick={() => incrementQty(item.id)}
        />

        <Button
          icon={Trash2}
          className="cart-item__remove"
          onClick={() => removeFromCart(item.id)}
        />
      </div>
    </article>
  );
};

export default CartItem;
