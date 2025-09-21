import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponents.jsx/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton.jsx";
// import { useState } from "react";
import { useActiveFileTabStore } from "../store/activeFileTabStore.js";
import { TreeStructure } from "../components/organisms/TreeStructure.jsx";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore.js";

export function ProjectPlayground() {
  // const [activeTab, setActiveTab] = useState("file.js");

  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

  const { projectId: projectIdFromURL } = useParams();

  const { projectId, setProjectId } = useTreeStructureStore();

  useEffect(() => {
    setProjectId(projectIdFromURL);
  }, [projectIdFromURL, setProjectId]);
  return (
    <>
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
      <div style={{ display: "flex" }}>
        {projectId && (
          <div
            style={{
              backgroundColor: "#344a57",
              paddingRight: "10px",
              paddingTop: "0.3vh",
              minWidth: "250px",
              maxWidth: "25%",
              height: "99.7vh",
              overflow: "auto",
            }}
          >
            <TreeStructure />
          </div>
        )}

        <EditorComponent />
      </div>
    </>
  );
}
