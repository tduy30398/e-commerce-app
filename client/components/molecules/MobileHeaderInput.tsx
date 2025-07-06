import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Search } from 'lucide-react'
import { Input } from '../ui/input'

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
                    <Input
                        type="search"
                        placeholder="Search for products..."
                        className="bg-flash-white rounded-3xl h-[36px]"
                    />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileHeaderInput