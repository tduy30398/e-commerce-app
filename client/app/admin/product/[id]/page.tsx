import { getProductDetail } from '@/actions/product';
import { ProductTypes } from '@/actions/product/type';
import ProductDashboard from '@/components/templates/ProductDashboard';

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let productDetail: ProductTypes | undefined;

  if (id !== 'create') {
    productDetail = await getProductDetail(id);
  }

  return (
    <>
      <ProductDashboard id={id} data={productDetail} />
    </>
  );
};

export default ProductDetail;
