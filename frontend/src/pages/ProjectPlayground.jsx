import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponents.jsx/EditorComponent";
import { TreeStructure } from "../components/organisms/TreeStructure.jsx";
import { useEffect } from "react";
import { useTreeStructureStore } from "../store/treeStructureStore.js";
import { io } from "socket.io-client";
import { useEditorSocketStore } from "../store/editorSocketStore.js";

export function ProjectPlayground() {
  // const [activeTab, setActiveTab] = useState("file.js");

  const { projectId: projectIdFromURL } = useParams();

  const { projectId, setProjectId } = useTreeStructureStore();

  const { setEditorSocketStore } = useEditorSocketStore();

  useEffect(() => {
    setProjectId(projectIdFromURL);

    const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: {
        projectId: projectIdFromURL,
      },
    });

    setEditorSocketStore(editorSocketConn);

    return () => editorSocketConn.disconnect();
    // socket.on
  }, [projectIdFromURL, setProjectId, setEditorSocketStore]);
  return (
    <>
      {/* {activeFileTab && (
        <EditorButton
          activeFileTab={activeFileTab}
          activeFileName={activeFileName}
          setActiveFileName={setActiveFileName}
        />
      )} */}

      <div style={{ display: "flex" }}>
        {projectId && (
          <div
            style={{
              backgroundColor: "#344a57",
              paddingRight: "10px",
              paddingTop: "0.3vh",
              minWidth: "250px",
              maxWidth: "25%",
              height: "100vh",
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
