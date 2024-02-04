// all imports required for firebase database
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

//firebase settings from the firebase site
const firebaseConfig = {
  apiKey: "AIzaSyCDcOKPACTNXYOGbLnFL8_nVABnWNHR7Zs",
  authDomain: "ln-clothings-db.firebaseapp.com",
  projectId: "ln-clothings-db",
  storageBucket: "ln-clothings-db.appspot.com",
  messagingSenderId: "899781235867",
  appId: "1:899781235867:web:06e7450fc36ca02596a23e",
};

// Initializing firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//signing in with google pop up
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//signing in with google redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//signing in with email and password
export const signInWithUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
};

// database firestore
export const db = getFirestore();

// adding collections to db
export const addCollectionAndDocuments = async (
  collectionKey,
  ObjectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  ObjectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done done");
};

// getting collections and documents from db, in our case it is going to be the categories collection
export const getCollectionAndDocuments = async (collectionToGet) => {
  //get the collection instance
  const collectionRef = collection(db, collectionToGet);

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

//creating user Document from login(Authorisation)
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userSnapshot;
};

//create with custom email
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return res;
};

export const signOutUser = async () => await signOut(auth);

//observer
export const onAuthStateChangedListener = (callbackFn) => {
  if (!callbackFn) return;
  onAuthStateChanged(auth, callbackFn);
};

export const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
