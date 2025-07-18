'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center h-screen text-center p-4 justify-center">
                    <h1 className="text-5xl font-black mb-4">Oops!</h1>
                    <p className="mb-6 text-lg font-medium text-gray-600">
                        Something went wrong! Error:{error.message}
                    </p>
                    <button onClick={() => reset()}>Try again</button>
                </div>
            </body>
        </html>
    )
}