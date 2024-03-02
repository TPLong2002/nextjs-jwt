import Link from "next/link";

function Product({ params }: { params: { productId: string } }) {
  return (
    <div>
      <Link href="/product">Back to Product List</Link>
      Product {params.productId}
    </div>
  );
}

export default Product;
