import useSWR from "swr";
const ConnectionTestPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const backendApiUrl = process.env.BACKEND_URL as string;
  const { data } = useSWR(
    `${backendApiUrl}/connection-test/getEnvironment`,
    fetcher,
  );
  const env = data?.env || "loading...";

  return (
    <>
      <h1>Connection Test</h1>
      <p>Environment: {env}</p>
    </>
  );
};
export default ConnectionTestPage;
