import "./checkout-item.styles.scss";
import { useDispatch } from "react-redux";

function CheckoutItem({
  checkOutItem,
  decrementQuantity,
  addItemToCart,
  removeItem,
  cartItems,
}) {
  const dispatch = useDispatch();
  const { name, price, imageUrl, quantity } = checkOutItem;

  const _decrementQuantity = () =>
    dispatch(decrementQuantity(cartItems, checkOutItem));

  const incrementQuantity = () =>
    dispatch(addItemToCart(cartItems, checkOutItem));

  const _removeItem = () => dispatch(removeItem(cartItems, checkOutItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt="product desc" />
      </div>

      <span className="name">{name}</span>
      <div className="quantity">
        <span className="arrow" onClick={_decrementQuantity}>
          &#8722;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={incrementQuantity}>
          &#43;
        </span>
      </div>
      <span className="price">{price * quantity}</span>
      <span className="remove-button" onClick={_removeItem}>
        &#10005;
      </span>
    </div>
  );
}

export default CheckoutItem;
