import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCollectionAndDocuments } from "../../Utilities/firebase/firebaseUtility";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.actions";

import CATEGORIES_ACTION_TYPES from "./categories.types";

// fetching products from firestore
export function* fetchCategoriesAsync() {
  try {
    const categoriesArr = yield call(getCollectionAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categoriesArr));
  } catch (error) {
    put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
