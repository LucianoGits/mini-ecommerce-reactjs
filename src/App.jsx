import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { checkUserSession } from "./reduxStateManagement/user/user.actions";
import { fetchCategoriesStart } from "./reduxStateManagement/categories/categories.actions";

import Home from "./Routes/homepage/HomeComponent";
import Navigation from "./Routes/navigation/NavigationComponent";
import AuthComponent from "./Routes/auth/AuthComponent";
import Shop from "./Routes/shop/ShopComponent";
import Checkout from "./Routes/checkout/CheckoutComponent";

const App = () => {
  const dispatch = useDispatch();

  //implementing Observer: state listener
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  // fetching products
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<AuthComponent />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
