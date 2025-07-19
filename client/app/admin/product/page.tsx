import { ProductTable } from '@/components/templates/ProductTable';
import Link from 'next/link';

const ProductDashboard = () => {
    return (
        <>
            <div className="flex justify-between">
                <h2 className='text-2xl font-bold mb-6'>Products List</h2>
                <Link href='/admin/product/create' className='bg-black text-white px-4 py-2 rounded-md h-9 leading-[18px]'>
                    Create
                </Link>
            </div>
            <ProductTable />
        </>
    )
}

export default ProductDashboard