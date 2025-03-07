import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import Teams from "./Components/dashboard/Teams";
import JoinTeam from "./pages/JoinTeam";
import { UserProvider } from "./context/UserContext";
import { TeamProvider } from "./context/TeamContext";
import { CreateTeam } from "./Components/dashboard/CreateTeam";
function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route
            path="/dashboard"
            element={
              <TeamProvider>
                <Dashboard />
              </TeamProvider>
            }
          >
            <Route index element={<Teams />}></Route>
            <Route path="join" element={<JoinTeam />}></Route>
            <Route path="create" element={<CreateTeam />}></Route>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
