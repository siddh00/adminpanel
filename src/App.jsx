import "./App.css";
import { Route, Routes } from "react-router-dom";
import paths from "./utils/constants/paths";
import Header from "./components/Header";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const routes = paths;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Header />}>
            {routes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
