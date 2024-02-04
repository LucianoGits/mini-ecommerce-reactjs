import { createSelector } from "reselect";

// accessing the wholee state from the store
const selectCategoriesSlice = (state) => {
  return state.categories;
};

//create selector takes 2 arguments(inputs): "input selector" functions, plus an "output selector".

export const selectCategories = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => {
    return categoriesSlice.categories.reduce((accumulator, category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.isLoading
);

//using intermidiaries//
//
// const reselectCategories = createSelector(
//   [selectCategoryReducer],
//   (categoriesSlice) => {
//     console.log("reselectCategories(Memoised) selector fired!");
//     return categoriesSlice.categories;
//   }
// );

// export const selectCategories = createSelector(
//   [reselectCategories],
//   (categories) => {
//     console.log("selectCategories fired!");
//     return categories.reduce((accumulator, category) => {
//       const { title, items } = category;
//       accumulator[title.toLowerCase()] = items;

//       return accumulator;
//     }, {});
//   }
// );
