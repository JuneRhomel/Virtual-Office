import style from "./style.module.css";
import FormComponent from "../../components/FormComponent";
import { Button, Input } from "../../components/UI/UiComponents";
import { LoginModel } from "../../model/model";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../redux/authSlice";
import auth from "../../utils/auth";
function LoginPage() {
  const user = useSelector((state: any) => state.auth.value);
  console.log(user)
  const dispatch = useDispatch();
  const handleFormSubmit = async (_event: React.FormEvent<HTMLFormElement>) => {
    _event.preventDefault();
    const { email, password } = _event.target as any;
    const data: LoginModel = {
      email: email.value,
      password: password.value,
    };
    const res = await auth(data)
    dispatch(setUser(res))
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
