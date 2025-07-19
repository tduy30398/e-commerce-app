import React from 'react'
import { Input } from '../ui/input'
import { Mail } from 'lucide-react'
import { Button } from '../ui/button'

const SubsribeForm = () => {
    return (
        <div className='w-[calc(100%-1rem)] sm:w-[calc(100%-4rem)] lg:max-w-4/5 2xl:max-w-screen-xl flex flex-col lg:flex-row justify-between items-center bg-black p-4 lg:px-16 lg:py-11 rounded-3xl absolute top-[-120px] lg:top-[-100px] left-1/2 -translate-x-1/2'>
            <h1 className='text-white font-black text-3xl lg:text-4xl basis-1/2 max-lg:text-center'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
            <div className="basis-1/2 flex flex-col items-end max-lg:w-full max-lg:mt-6">
                <div className="relative w-full lg:max-w-[350px]">
                    <button className='absolute left-3 top-1/2 -translate-y-1/2'>
                        <Mail className="text-muted-foreground size-5" />
                    </button>
                    <Input
                        className='bg-white rounded-full w-full h-10 lg:h-12 pl-10'
                        placeholder='Enter your email address'
                    />
                </div>
                <Button className='bg-white cursor-pointer text-black rounded-full w-full h-10 lg:h-12 lg:max-w-[350px] mt-4 hover:bg-white hover:opacity-80 hover:text-black'>
                    Subscribe to Newsletter
                </Button>
            </div>
        </div>
    )
}

export default SubsribeForm