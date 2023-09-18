export default function Page({ params }: { params: { productID: string } }) {
  return <div>My Page id: {params.productID}</div>;
}
