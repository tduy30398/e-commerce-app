import React, { Suspense } from 'react'
import ProgressBar from '../molecules/ProgressBar'

const ProgressBarWraper = () => {
    return (
        <Suspense>
            <ProgressBar />
        </Suspense>
    )
}

export default ProgressBarWraper