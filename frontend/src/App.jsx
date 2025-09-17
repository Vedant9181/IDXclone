import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateProject from "./pages/CreateProject";
import { ProjectPlayground } from "./pages/ProjectPlayground.jsx";

function App() {
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
