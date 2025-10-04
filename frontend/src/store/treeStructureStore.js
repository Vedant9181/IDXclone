import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { getProjectTree } from "../apis/project";

export const useTreeStructureStore = create((set, get) => {
  const queryClient = new QueryClient();
  return {
    projectId: null,
    treeStructure: null,
    setTreeStructure: async () => {
      const id = get().projectId;
      const data = await queryClient.fetchQuery({
        queryFn: () => getProjectTree({ projectId: id }),
        queryKey: [id],
      });

      console.log("queryclient data", data);

      set({ treeStructure: data });
    },

    setProjectId: (projectId) => {
      set({ projectId: projectId });
    },
  };
});
