import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "components/homePage";
import LoginPage from "components/loginPage";
import ProfilePage from "components/profilePage";

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>;

  return <div className="app"></div>;
}

export default App;
