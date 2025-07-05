'use client'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface CustomButtonProps {
    buttonProps?: {
        label: string,
        onClick: () => void,
    },
    linkProps?: {
        href: string,
        label: string,
    }
    className?: string,
}

const CustomButton: React.FC<CustomButtonProps> = ({ linkProps, buttonProps, className }) => {

    if (linkProps) {
        return (
            <Link href={linkProps.href || ''} className={`bg-black text-white text-base font-medium rounded-4xl py-4 px-10 ${className || ''}`}>
                {linkProps.label}
            </Link>
        )
    }

    return (
        <Button onClick={buttonProps?.onClick} className={`bg-black text-white text-base font-medium rounded-4xl py-4 px-10 ${className || ''}`}>
            {buttonProps?.label || ''}
        </Button>
    )
}

export default CustomButton