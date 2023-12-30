import { Route, Routes } from "react-router-dom"
import LoginPage from "./page/login/LoginPage"
import ProtectedRoutes from "./ProtectedRoutes"
import DashboardPage from "./page/dashboard/DashboardPage"
import Cookies from "universal-cookie";
import style from "./App.module.css"
import Usermangement from "./page/usermangement/Usermangement";
import Useraccess from "./page/useraccess/Useraccess";
import { setToken } from "../src/redux/token";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch()
  const cookies = new Cookies();
  const token = cookies.get("token");
  dispatch(setToken(token))
  return (
    <div className={style.container}>
      <Routes>
        <Route element={<ProtectedRoutes token={token} />} >
          <Route element={<DashboardPage />} path="/" />
          <Route element={<Usermangement />} path="/usermangement" />
          <Route element={<Useraccess />} path="/useraccess" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </div>
  );
}
export default App
