import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore.js";

export const EditorComponent = function () {
  console.log("Editorcomponenet logic");
  const [editorState, setEditorState] = useState({ theme: null });

  const { editorSocket } = useEditorSocketStore();

  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

  async function downloadTheme() {
    console.log("useeffect cb");
    const response = await fetch("../../../Oceanic_Next.json");
    const data = await response.json();
    // console.log(data);
    setEditorState({ ...editorState, theme: data });
  }

  function handleEditorTheme(editor, monaco) {
    console.log("onmount cb");

    // console.log(editor);
    monaco.editor.defineTheme("oceanic-next", editorState.theme);
    monaco.editor.setTheme("oceanic-next");
  }

  editorSocket?.on("readFileSuccess", (data) => {
    console.log("Read file success", data);
    setActiveFileTab({ path: data.path, value: data.data });
  });

  useEffect(() => {
    downloadTheme();
  }, []);
  return (
    <>
      {editorState.theme && (
        <Editor
          height="100vh"
          width="100%"
          defaultLanguage={undefined}
          defaultValue="// some comment"
          options={{
            fontSize: 18,
            fontFamily: "monospace",
          }}
          onMount={handleEditorTheme}
          value={
            activeFileTab?.value
              ? activeFileTab.value
              : "//Welcome to playground"
          }
        />
      )}
    </>
  );
};
