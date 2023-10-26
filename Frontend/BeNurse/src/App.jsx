import { BrowserRouter } from "react-router-dom";
import Navigations from "./navigations/Navigations.jsx";

import NavBar from "@components/templates/NavBar/NavBar";
import TabBar from "@components/templates/TabBar/TabBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Navigations />
      <TabBar />
    </BrowserRouter>
  );
}

export default App;
