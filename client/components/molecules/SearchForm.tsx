import React from 'react'
import Form from 'next/form'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'

interface SearchFormProps {
    isMobile?: boolean
}

const SearchForm: React.FC<SearchFormProps> = ({ isMobile }) => {
    return (
        <Form action="/search" className={`relative w-full ${isMobile ? '' : 'hidden sm:block ml-10'}`}>
            <button type="submit" className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer'>
                <Search className="text-muted-foreground size-5" />
            </button>
            <Input
                name='query'
                type="search"
                placeholder="Search for products..."
                className="pl-10 bg-flash-white rounded-3xl h-[48px]"
            />
        </Form>
    )
}

export default SearchForm