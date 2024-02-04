import SignInForm from "../../Components/sign-in-form/SignInForm";
import SignUpForm from "../../Components/Sign-Up-Form/SignUpFormComponent";
import "./authStyles.scss";
const AuthComponent = () => {
  return (
    <div className="auth-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default AuthComponent;
