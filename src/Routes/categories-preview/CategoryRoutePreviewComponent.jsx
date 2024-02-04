import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../reduxStateManagement/categories/categories.selector.js";
import CategoryPreview from "../../Components/category-preview/CategoryPreviewComponent.jsx";

import Spinner from "../../Components/spinner/SpinnerComponent.jsx";

function CategoriesPreviewRoute() {
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </>
  );
}

export default CategoriesPreviewRoute;
