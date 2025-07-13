'use client'

import { AdminTable } from '@/components/organisms/AdminTable';
import { ProductTypes } from '@/components/templates/NewArrivals';
import axiosInstance from '@/lib/axios';
import Link from 'next/link';
import React, { useMemo } from 'react'
import useSWR from 'swr';

const getAllProduct = (url: string) => axiosInstance.get(url).then((res) => res.data);

const Module = () => {
    const { data: products, error, isLoading } = useSWR('/api/product', getAllProduct)

    const tableCoulmn = [
        {
            key: 'id',
            label: 'ID'
        },
        {
            key: 'name',
            label: 'Name'
        },
        {
            key: 'price',
            label: 'Price'
        },
        {
            key: 'rating',
            label: 'Rating'
        }
    ]

    const tableData = useMemo(() => {
        if (!products) return [];

        return (products as ProductTypes[])?.map((product) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            rating: product.rating
        }))
    }, [products])

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load</div>;

    return (
        <div>
            <div className="flex justify-between">
                <h2 className='text-2xl font-bold mb-6'>Products List</h2>
                <Link href='/admin/product/create' className='bg-black text-white px-4 py-2 rounded-md h-9 leading-[18px]'>
                    Create
                </Link>
            </div>
            <AdminTable
                columns={tableCoulmn}
                data={tableData}
            />
        </div>
    )
}

export default Module