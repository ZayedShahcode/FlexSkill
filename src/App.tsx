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
import { ViewTeam } from "./pages/ViewTeam";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <TeamProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Teams />}></Route>
              <Route path="join" element={<JoinTeam />}></Route>
              <Route path="create" element={<CreateTeam />}></Route>
              <Route path="view" element={<ViewTeam />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="profile/:userId" element={<Profile />}></Route>
            </Route>
          </Routes>
        </TeamProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
