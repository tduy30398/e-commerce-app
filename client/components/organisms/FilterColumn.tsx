import { ListFilter } from 'lucide-react'
import React from 'react'

const FilterColumn = () => {
    return (
        <aside className='lg:col-span-1 bg-white p-4 rounded-xl shadow'>
            <div className="flex items-center justify-between mb-4">
                <h2 className='text-xl font-bold'>Filters</h2>
                <ListFilter className='size-5' />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-medium mb-1'>Category</label>
                <select className='w-full border rounded px-3 py-2 text-sm'>
                    <option value=''>All</option>
                    <option value='electronics'>Electronics</option>
                    <option value='clothing'>Clothing</option>
                </select>
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-medium mb-1'>Price Range</label>
                <input type='range' min='0' max='1000' className='w-full' />
            </div>
        </aside>
    )
}

export default FilterColumn