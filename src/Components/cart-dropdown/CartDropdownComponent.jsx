import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

import CustomButton, {
  BUTTON_TYPE_CLASSES,
} from "../custom-button/ButtonComponent";
import CartItem from "../cart-item/CartItemComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../reduxStateManagement/cart/cart.selector";

function CartDropdown() {
  const cartItems = useSelector(selectCartItems);

  const changeLoc = useNavigate();

  const onClickHandler = () => changeLoc("/checkout");

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>empty cart 😔</EmptyMessage>
        )}
      </CartItems>
      <CustomButton
        content={"go to checkout"}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={onClickHandler}
      />
    </CartDropdownContainer>
  );
}

export default CartDropdown;
