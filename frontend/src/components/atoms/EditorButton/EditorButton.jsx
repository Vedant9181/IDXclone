// import { useActiveFileTabStore } from "../../../store/activeFileTabStore";
import "./EditorButton.css";

export function EditorButton({
  activeFileTab,
  setActiveFileName,
  activeFileName,
}) {
  const fileNameArr = activeFileTab.path.split("\\");
  console.log(fileNameArr);
  const fileName = fileNameArr[fileNameArr.length - 1];
  console.log("filenaame:", fileName);

  function handleButtonClick(fileName) {
    setActiveFileName(fileName);
  }
  return (
    <button
      className={`${
        activeFileName === fileName ? "editor-button active" : "editor-button"
      }`}
      onClick={() => handleButtonClick(fileName)}
    >
      {fileName}
    </button>
  );
}
