import { useSelector } from "react-redux";
import { selectCurrectUser } from "../../reduxStateManagement/user/user.selector";
import { selectIsCartOpen } from "../../reduxStateManagement/cart/cart.selector";

import { Outlet } from "react-router-dom";

import { ReactComponent as ShopLogo } from "../../assets/shop-logo.svg";

import CartIcon from "../../Components/cart-icon/CartIconComponent";
import CartDropdown from "../../Components/cart-dropdown/CartDropdownComponent";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navstyles.styles";

import { useDispatch } from "react-redux";
import { signOutStart } from "../../reduxStateManagement/user/user.actions";

const Navigation = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrectUser);

  const isCartOpen = useSelector(selectIsCartOpen);

  // console.log("This is the current user: ", currentUser);

  const signOutHandler = async () => {
    dispatch(signOutStart());
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <ShopLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <CartIcon />

          <NavLink to="shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as={`span`} onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="auth">SIGN IN</NavLink>
          )}
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
