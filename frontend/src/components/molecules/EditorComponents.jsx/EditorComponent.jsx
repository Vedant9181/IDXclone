import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

export const EditorComponent = function () {
  const [editorState, setEditorState] = useState({ theme: null });
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

  useEffect(() => {
    for (let index = 0; index < 1000000000; index++) {
      //
    }
    downloadTheme();
  }, []);
  return (
    <>
      {editorState.theme && (
        <Editor
          height="100vh"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          options={{
            fontSize: 18,
            fontFamily: "monospace",
          }}
          onMount={handleEditorTheme}
        />
      )}
    </>
  );
};
