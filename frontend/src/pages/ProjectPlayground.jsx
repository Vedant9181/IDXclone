import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponents.jsx/EditorComponent";

export function ProjectPlayground() {
  const { projectId } = useParams();
  return (
    <>
      <div>welcome</div>
      <p>{projectId}</p>
      <EditorComponent />
    </>
  );
}
