export const setCustomSignInErrorHandler = (error) => {
  switch (error?.code) {
    case "auth/invalid-email":
      alert("Invalid Email!");
      break;
    case "auth/wrong-password":
      alert("Wrong Password!");
      break;
    case "auth/too-many-requests":
      alert(
        "We have blocked all requests from this device due to unusual activity. Please Try again later."
      );
      break;
    case "auth/user-not-found":
      alert("No user is associated with that email");
      break;
    default:
      break;
  }
};

export const setCustomSignupErrorHandler = (error) => {
  if (error.code === "auth/email-already-in-use") {
    alert(
      "Email already in use!\nTry another email or sign in with your email :)"
    );
  } else {
    console.log(`user creation encountered an error`, error);
  }
};

export const isEmailAndPassPresent = (email, password) => {
  if (!email) {
    alert("Please enter an email");
  } else if (!password) {
    alert("Please enter an password");
  }
};
