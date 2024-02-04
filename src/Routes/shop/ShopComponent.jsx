// import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { setCategoriesMap } from "../../reduxStateManagement/categories/categories.actions";

// import { getCollectionAndDocuments } from "../../Utilities/firebase/firebaseUtility";

import CategoriesPreviewRoute from "../categories-preview/CategoryRoutePreviewComponent";
import Category from "../category/CategoryComponent";
import "./shop.styles.scss";

function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreviewRoute />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

export default Shop;
