import "./EditorButton.css";

export function EditorButton({ activeTab, setActiveTab, value }) {
  {
    /* */
  }
  function handleButtonClick(value) {
    setActiveTab({ value });
  }
  return (
    <button
      className={`${
        activeTab.value === value ? "editor-button active" : "editor-button"
      }`}
      onClick={() => handleButtonClick(value)}
    >
      {value}
    </button>
  );
}
