function ProductReviews({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  return (
    <div>
      review {params.reviewId} Product {params.productId}
    </div>
  );
}

export default ProductReviews;
