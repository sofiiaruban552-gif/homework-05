import { Star, ShoppingCart } from "lucide-react";
import { useShallow } from "zustand/shallow";

import useCartStore from "../../store/useCartStore";

import Button from "../shared/Button";

const ProductCard = ({ product }) => {
  const { title, price, rating, thumbnail, id } = product;

  const { items, addToCart } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      addToCart: state.addToCart,
    })),
  );

  const cartItem = items.find((item) => item.id === id);
  const qty = cartItem?.qty ?? 0;

  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img className="product-card__image" src={thumbnail} alt={title} />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>

        <div className="product-card__rating">
          <Star size={16} className="product-card__star" />
          <span>{rating}</span>
        </div>

        <div className="product-card__footer">
          <span className="product-card__price">${price}</span>

          <Button
            icon={ShoppingCart}
            onClick={() => addToCart(product)}
            className={qty > 0 ? "product-card__btn--active" : ""}
          >
            {qty > 0 ? `In cart (${qty})` : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
