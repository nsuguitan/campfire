import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Newsfeed from "./pages/Newsfeed";
import Search from "./pages/Search";
import NavBar from "./components/NavBar/NavBar";
import Postcard from "./components/Postcard/Postcard";
import AuthContext from "./context/auth/AuthContext";
import CssBaseline from "@mui/material/CssBaseline";
import PrivateRoute from "./routing/PrivateRoute";

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 

const App = () => {
  return (
    <AuthContext>
      <CssBaseline />
      <BrowserRouter>
      <Wrapper>
        <div className="stars"></div>   
        <div className="twinkling"></div>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/SignIn" element={<SignIn />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/Newsfeed" element={<Newsfeed />} />
            <Route
              exact
              path="/Profile/:profileUsername"
              element={<Profile />}
            />
            <Route exact path="/Search" element={<Search />} />
            <Route exact path="/Postcard" element={<Postcard />} />
          </Route>
        </Routes>
        <NavBar />
        </Wrapper>
      </BrowserRouter>
    </AuthContext>
  );
};

export default App;
