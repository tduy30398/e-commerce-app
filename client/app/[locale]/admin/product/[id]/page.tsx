import { getProductDetail } from '@/actions/product';
import { ProductTypes } from '@/actions/product/type';
import ProductDashboard from '@/components/templates/ProductDashboard';

// export async function generateStaticParams() {
//   const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}product`);
//   const products: APIPaginationResponse<ProductTypes[]> = await data.json();

//   return products.data.map((product) => ({
//     id: product._id,
//   }));
// }

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let productDetail: ProductTypes | undefined;

  if (id !== 'create') {
    const product = await getProductDetail(id);
    productDetail = product.product;
  }

  return <ProductDashboard id={id} data={productDetail} />;
};

export default ProductDetail;
