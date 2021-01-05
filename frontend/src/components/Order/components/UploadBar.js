import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function UploadBar({progress}) {

    useEffect(() => {
        return () => {
        }
    }, [progress])

    return (
        <div className="w-100">
            {
                progress > 0 ? 
                <div className="progress-bar-div w-75 m-auto">
                    <div style={{ width: `${progress}%` }} className="progress-bar-span p-2 bg-primary text-center text-white">{progress}%</div>
                </div>
                :
                null
            }
        </div>
    )
}
