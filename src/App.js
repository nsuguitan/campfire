import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Newsfeed from "./pages/Newsfeed";
import Search from "./pages/Search";
import NavBar from "./components/NavBar/NavBar";
import Postcard from "./components/Postcard/Postcard";
import AuthContext from "./context/auth/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import PrivateRoute from './routing/PrivateRoute'
const App = () => {
  console.log("launching app")
  console.log("process env", process.env.REACT_APP_KEY)
  return (
    <AuthContext>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/SignIn" element={<SignIn />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/Newsfeed" element={
            <PrivateRoute>
              <Newsfeed />
            </PrivateRoute>
          } />
          <Route exact path="/Profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route exact path="/Search" element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          } />
          <Route exact path='/Postcard' element={
            <PrivateRoute>
              <Postcard />
            </PrivateRoute>
          } />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </AuthContext>

  );
};

export default App;
