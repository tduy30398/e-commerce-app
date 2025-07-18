import React, { Suspense } from 'react'
import ProgressBar from '../molecules/ProgressBar'

const ProgressBarWraper = () => {
    return (
        <div>
            <Suspense>
                <ProgressBar />
            </Suspense>
        </div>
    )
}

export default ProgressBarWraper