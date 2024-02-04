import CustomButton from "../../Components/custom-button/ButtonComponent";
import CheckoutItem from "../../Components/checkout-item/CheckoutItemComponent";
import "./checkout.styles.scss";

import { useSelector } from "react-redux";

import {
  selectCartItems,
  selectTotalPrice,
} from "../../reduxStateManagement/cart/cart.selector";
import {
  decrementQuantity,
  addItemToCart,
  removeItems,
} from "../../reduxStateManagement/cart/cart.actions";

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <span className="header-block">Product</span>
        <span className="header-block">Description</span>
        <span className="header-block">quantity</span>
        <span className="header-block">price</span>
        <span className="header-block">Remove</span>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem
          key={item.id}
          checkOutItem={item}
          decrementQuantity={decrementQuantity}
          addItemToCart={addItemToCart}
          removeItem={removeItems}
          cartItems={cartItems}
        />
      ))}
      <span className="total">
        <CustomButton content={`Total: $${totalPrice}.00`} />
      </span>
    </div>
  );
}

export default Checkout;
