import style from "./style.module.css";
import FormComponent from "../../components/FormComponent";
import { Button, Input } from "../../components/UI/UiComponents";
import { LoginModel } from "../../model/model";
import { useDispatch } from 'react-redux';
import { logIn } from "../../redux/authSlice";
import auth from "../../utils/auth";
import { Navigate } from "react-router-dom";
function LoginPage() {
  const dispatch = useDispatch();
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = event.target as HTMLFormElement;
    const data: LoginModel = {
      email: email.value,
      password: password.value,
    };
    const response = await auth(data);
    dispatch(logIn(response));
    if (response.success) {
      <Navigate to="/dashboard" />;
    }
  };
  return (
    <div className={style.main}>
      <div className={style.container}>
        <div className={style.header}>
          <img src="/logo.png" />
          <h1>Welcome</h1>
        </div>
        <FormComponent id="login-form" eventListener={handleFormSubmit}>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            required
            label="Email"
            value="admin@mailinator.com"
          />
          <Input
            type="password"
            name="password"
            value="12345"
            id="password"
            placeholder="Enter password"
            required
            label="Password"
          />
          <div className="mt-3">
            <Button id="asd" type="submit">Login</Button>
          </div>
        </FormComponent>
      </div>
    </div>
  );
}

export default LoginPage;
