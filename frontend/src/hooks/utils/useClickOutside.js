import { useCallback, useEffect, useRef } from "react";

export const useClickOutside = (setIsOpen, setFileFolderPath) => {
  const contextMenuRef = useRef(null);
  const handleClickOutside = useCallback(
    (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        console.log("clicked outside context menu", event.target);
        setIsOpen(false);
        setFileFolderPath(null);
      }
    },
    [setIsOpen, setFileFolderPath]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("contextmenu", handleClickOutside, true);

    console.log("cleaning up event listener");
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("contextmenu", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return contextMenuRef;
};
