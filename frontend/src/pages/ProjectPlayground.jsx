import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponents.jsx/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
// import { useState } from "react";
import { useActiveFileTabStore } from "../store/activeFileTabStore.js";

export function ProjectPlayground() {
  // const [activeTab, setActiveTab] = useState("file.js");

  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

  const { projectId } = useParams();
  return (
    <>
      <div>welcome</div>
      <p>{projectId}</p>
      <EditorButton
        activeTab={activeFileTab}
        setActiveTab={setActiveFileTab}
        value={"file.js"}
      />
      <EditorButton
        activeTab={activeFileTab}
        setActiveTab={setActiveFileTab}
        value={"next.js"}
      />
      <EditorComponent />
    </>
  );
}
