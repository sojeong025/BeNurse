import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigations from "./navigations/Navigations.jsx";

import NavBar from "@components/templates/NavBar/NavBar";
import TabBar from "@components/templates/TabBar/TabBar";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
        <NavBar />
        <Navigations />
        <TabBar />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
