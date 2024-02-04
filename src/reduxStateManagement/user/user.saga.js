import { all, call, put, takeLatest } from "redux-saga/effects";

import USER_ACTION_TYPES from "./user.types";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithUserEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../Utilities/firebase/firebaseUtility";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* googleSignInStartAsync() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* emailSignInAsync({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInWithUserEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticatedAsync() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUpAsync({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    console.log("user created from signup", user);

    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUpAsync({ payload: { user, additionalInfo } }) {
  yield call(getSnapshotFromUserAuth, user, additionalInfo);
}

export function* signOutUserAsync() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* oncheckUserSession() {
  yield takeLatest(
    USER_ACTION_TYPES.CHECK_USER_SESSION,
    isUserAuthenticatedAsync
  );
}

export function* onGoogleSignInUser() {
  yield takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
    googleSignInStartAsync
  );
}

export function* onEmailSignInUser() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignInAsync);
}

export function* onSignUpUser() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpAsync);
}

export function* onSignUpUserSuccessful() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUpAsync);
}

export function* onSignoutUser() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutUserAsync);
}

export function* userSaga() {
  yield all([
    call(oncheckUserSession),
    call(onGoogleSignInUser),
    call(onEmailSignInUser),
    call(onSignUpUser),
    call(onSignUpUserSuccessful),
    call(onSignoutUser),
  ]);
}
