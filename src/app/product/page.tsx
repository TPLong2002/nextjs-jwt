"use client";

import Link from "next/link";

function Products() {
  return (
    <div>
      <h1 className="text-red-400">Product List</h1>
      <h3>Product 1</h3>
      <h3>Product 2</h3>
      <h3>Product 3</h3>
      <Link href="/product/1" replace>
        Click me!
      </Link>
    </div>
  );
}

export default Products;
