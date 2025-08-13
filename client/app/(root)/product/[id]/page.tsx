import React from 'react';

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <div>ProductDetail: {id}</div>;
};

export default ProductDetail;
