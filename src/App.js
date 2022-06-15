import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Newsfeed from "./pages/Newsfeed";
import Search from "./pages/Search";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/Newsfeed" element={<Newsfeed />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route exact path="/Search" element={<Search />} />
      </Routes>
      <NavBar/>
    </BrowserRouter>
  );
};

export default App;
