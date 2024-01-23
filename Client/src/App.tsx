import "./App.css";
import Navigation from "./Components/Navigation";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import DeleteUser from "./Components/DeleteUser";
import { useAuth } from "./Components/AuthContext";
function App() {
  const { loggedIn } = useAuth();
  return (
    <div className="bg-white dark:bg-gray-950 dark:text-white min-h-screen min-w-screeen">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/delete" element={loggedIn ? <DeleteUser /> : <></>} />
      </Routes>
    </div>
  );
}

export default App;
