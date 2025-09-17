import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";

export default function CreateProject() {
  const { createProjectMutation, isPending } = useCreateProject();

  const navigate = useNavigate();
  async function handleCreateProject() {
    try {
      const res = await createProjectMutation();
      const projectId = res.data;
      navigate(`/project/${projectId}`);
    } catch (error) {
      console.log("error creating project", error);
    }
  }
  return (
    <>
      <h1>Create Project</h1>
      <button onClick={handleCreateProject}>CreateProject</button>
      {isPending && <p>Creating project...</p>}
    </>
  );
}
