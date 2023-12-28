import { Route, Routes } from "react-router-dom"
import LoginPage from "./page/login/LoginPage"
import ProtectedRoutes from "./ProtectedRoutes"
import DashboardPage from "./page/dashboard/DashboardPage"
import Cookies from "universal-cookie";
import style from "./App.module.css"
import Usermangement from "./page/usermangement/Usermangement";
import Userrole from "./page/userrole/Userrole";
function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return (
    <div className={style.container}>
      <Routes>
        <Route element={<ProtectedRoutes token={token} />} >
          <Route element={<DashboardPage />} path="/" />
          <Route element={<Usermangement />} path="/usermangement" />
          <Route element={<Userrole />} path="/userrole" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </div>
  );
}
export default App
