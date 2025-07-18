import Login from "@/pages/Login/page";
import Register from "@/pages/Register/page";
import Home from "@/pages/Home/page";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App