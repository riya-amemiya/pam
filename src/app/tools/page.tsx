import { getMetadata } from "@/utils/getMetadata";

export const metadata = getMetadata({
  title: "Tools",
});

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <div>
      <h1>Tools</h1>
    </div>
  );
}
