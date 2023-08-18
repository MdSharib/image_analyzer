import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Landing/Home";
import Unauthorized from "./components/Landing/Unauthorized";
import Pagenotfound from "./components/Pagenotfound";
import Count from "./components/Landing/Count";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/count" element={<Count />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
