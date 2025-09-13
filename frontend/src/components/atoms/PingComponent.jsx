import usePing from "../../hooks/apis/queries/usePing";

export default function PingComponent() {
  const { isLoading, data } = usePing();

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return <div>Hello {data.message}</div>;
}
