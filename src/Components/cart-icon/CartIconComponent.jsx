import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCartSize,
  selectIsCartOpen,
} from "../../reduxStateManagement/cart/cart.selector";
import { setIsCartOpen } from "../../reduxStateManagement/cart/cart.actions";

function CartIcon() {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartSize = useSelector(selectCartSize);

  const handleToggle = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={handleToggle}>
      <ShoppingIcon />
      <ItemCount>{cartSize}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
