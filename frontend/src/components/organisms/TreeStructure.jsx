import { useEffect } from "react";
import { useTreeStructureStore } from "../../store/treeStructureStore.js";
import { TreeNode } from "../atoms/TreeNode/TreeNode.jsx";

export function TreeStructure() {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();

  useEffect(() => {
    if (treeStructure) {
      console.log("tree", treeStructure);
    } else {
      setTreeStructure();
    }
  }, [setTreeStructure, treeStructure]);

  return (
    <>
      <TreeNode fileFolderData={treeStructure} />
    </>
  );
}
