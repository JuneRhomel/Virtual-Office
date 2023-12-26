import { Route, Router, Routes } from "react-router-dom"
import LoginPage from "./page/login/LoginPage"
import ProtectedRoutes from "./ProtectedRoutes"
import DashboardPage from "./page/dashboard/DashboardPage"
import Cookies from "universal-cookie";
function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoutes token={token} />} >
          <Route element={<DashboardPage />}  path="/" exact />
        </Route>
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </div>
  );
}
export default App
