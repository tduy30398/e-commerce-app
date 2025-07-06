import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Search } from 'lucide-react'
import SearchForm from '../molecules/SearchForm'

const MobileHeaderInput = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Search className='size-6 cursor-pointer' />
            </SheetTrigger>
            <SheetContent side={"right"} className='w-screen h-screen max-w-none'>
                <SheetHeader>
                    <SheetTitle className="text-left">Search</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                    <SearchForm isMobile />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileHeaderInput