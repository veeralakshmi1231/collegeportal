import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Staffs from "./pages/Staffs";
import Departments from "./pages/Departments";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/staffs"
          element={<Staffs />}
        />

        <Route
          path="/departments"
          element={<Departments />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;