import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/Common/NavBar/NavBar.jsx";
import TabBar from "./components/Common/TabBar/TabBar.jsx";

import MainPage from "@pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ThreeTestPage from "@pages/ThreeTestPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/threeTest"
          element={<ThreeTestPage />}
        />
      </Routes>
      <TabBar />
    </BrowserRouter>
  );
}

export default App;
