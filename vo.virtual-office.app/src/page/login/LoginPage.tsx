import style from "./style.module.css";
import InputComponent from "../../components/InputComponent";
import FormComponent from "../../components/FormComponent";
function LoginPage() {
  return (
    <div className={style.main}>
      <div className={style.container}>
        <div className={style.header}>
          <h1>Welcome</h1>
          <img src="/logo.png" />
        </div>
        <FormComponent action="asd" method="post">
          <InputComponent
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            required
            label="Email"
          />
          <InputComponent
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            required
            label="Password"
          />
        </FormComponent>
        <div>
          <button type="submit">Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
