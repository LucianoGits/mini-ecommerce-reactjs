import { useState } from "react";
import FormInputComponent from "../../Components/form-input/FormInputComponent";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../Utilities/firebase/firebaseUtility";
import { setCustomSignupErrorHandler } from "../../Utilities/exceptions/CustomErrorHandler";
import { resetFormFields } from "../../Utilities/formsUtils/clearFormFields";
import CustomButton from "../../Components/custom-button/ButtonComponent";
import "./signup-styles.scss";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { signUpStart } from "../../reduxStateManagement/user/user.actions";
// this the object to link to formfield state(rather than having 4 use states separately)
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const dispatch = useDispatch();
  const changeRoute = useNavigate();

  const [formField, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formField;

  const handleChange = (event) => {
    // what to change
    const { name, value } = event.target;
    //setFormField takes in spread, and sets name in square brackets to value
    setFormField({ ...formField, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) alert("passwords do not match");

    dispatch(signUpStart(email, password, displayName));

    resetFormFields(setFormField, defaultFormFields);

    changeRoute("/");
  };

  return (
    <div className="signup-form-container">
      <h2>Sign up</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInputComponent
          label="Display Name"
          id="name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInputComponent
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <CustomButton content="signup" type="submit" />
      </form>
    </div>
  );
}

export default SignUpForm;
