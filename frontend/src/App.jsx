import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { io } from "socket.io-client";

import CreateProject from "./pages/CreateProject";
import { ProjectPlayground } from "./pages/ProjectPlayground.jsx";

function App() {
  // const socket = io("http://localhost:3000");

  return (
    <>
      <Routes>
        <Route path="/" element={<CreateProject />} />
        <Route path="/project/:projectId" element={<ProjectPlayground />} />
      </Routes>
    </>
  );
}

export default App;
