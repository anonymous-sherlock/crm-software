export default async function LeadsPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>{params.id}</div>;
}
