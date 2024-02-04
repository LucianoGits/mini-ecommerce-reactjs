import "./product-card.styles.scss";
import CustomButton, {
  BUTTON_TYPE_CLASSES,
} from "../custom-button/ButtonComponent";

import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../reduxStateManagement/cart/cart.actions";
import { selectCartItems } from "../../reduxStateManagement/cart/cart.selector";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;

  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />

      <div className="product-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <CustomButton
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        content="Add to Cart"
        onClick={addProductToCart}
      />
    </div>
  );
};

export default ProductCard;
