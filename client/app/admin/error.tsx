'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    // Log the error to an error reporting service
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div>
            <div className="flex flex-col items-center h-screen text-center p-4 justify-center">
                <h1 className="text-5xl font-black mb-4">Oops!</h1>
                <p className="mb-6 text-lg font-medium text-gray-600">
                    Something went wrong! Error:{error.message}
                </p>
                <button onClick={() => reset()}>Try again</button>
            </div>
        </div>
    )
}