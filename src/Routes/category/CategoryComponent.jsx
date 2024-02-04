import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../reduxStateManagement/categories/categories.selector";

import ProductCard from "../../Components/product-card/ProductComponent";

import { CategoryTitle, CategoryContainer } from "./category.styles";

import Spinner from "../../Components/spinner/SpinnerComponent";

function Category() {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </CategoryContainer>
    </>
  );
}

export default Category;
