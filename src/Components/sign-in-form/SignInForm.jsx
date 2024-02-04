import React, { useState } from "react";
import FormInputComponent from "../form-input/FormInputComponent";
import CustomButton, {
  BUTTON_TYPE_CLASSES,
} from "../custom-button/ButtonComponent";
import { useNavigate } from "react-router-dom";
import "./signinStyles.scss";
import {
  setCustomSignInErrorHandler,
  isEmailAndPassPresent,
} from "../../Utilities/exceptions/CustomErrorHandler";
import { useDispatch } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../reduxStateManagement/user/user.actions";

function SignInForm() {
  //state management
  const dispatch = useDispatch();

  const changeRoute = useNavigate();

  const [formField, setFormField] = useState({ email: "", password: "" });
  const { email, password } = formField;

  //login function for pop up
  const googleUserLogIn = () => {
    dispatch(googleSignInStart());
  };

  //login with user email and password
  const handleEmailPassLogin = async (e) => {
    e.preventDefault();
    isEmailAndPassPresent(email, password);

    dispatch(emailSignInStart(email, password));
    
    changeRoute("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <form onSubmit={handleEmailPassLogin}>
        <FormInputComponent
          label="Email"
          id="email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInputComponent
          label="Password"
          id="password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="login-buttons-container">
          <CustomButton
            content="sign in"
            onClick={handleEmailPassLogin}
            type="submit"
          />
          <CustomButton
            content="Sign in with Google"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={googleUserLogIn}
          />
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
