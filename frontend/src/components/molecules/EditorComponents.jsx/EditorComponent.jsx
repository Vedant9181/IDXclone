import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useActiveFileTabStore } from "../../../store/activeFileTabStore.js";
import { useEditorSocketStore } from "../../../store/editorSocketStore.js";
import { extensionToFileType } from "../../../utils/extensionToFileType.js";

export const EditorComponent = function () {
  let timeOutId;
  const [editorState, setEditorState] = useState({ theme: null });

  const { activeFileTab } = useActiveFileTabStore();

  const { editorSocket } = useEditorSocketStore();

  async function downloadTheme() {
    console.log("useeffect cb");
    const response = await fetch("../../../Oceanic_Next.json");
    const data = await response.json();
    // console.log(data);
    setEditorState({ ...editorState, theme: data });
  }

  function handleEditorTheme(editor, monaco) {
    console.log("onmount cb");

    monaco.editor.defineTheme("oceanic-next", editorState.theme);
    monaco.editor.setTheme("oceanic-next");
  }

  function handleEditorChange(data) {
    clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
      console.log("executing settimeout on handle change");
      editorSocket.emit("writeFile", {
        data,
        pathToFileOrFolder: activeFileTab.path,
      });
    }, 2000);
  }

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
            fontSize: 15,
            fontFamily: "monospace",
          }}
          language={extensionToFileType(activeFileTab?.extension)}
          onMount={handleEditorTheme}
          onChange={handleEditorChange}
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
