import React, { use, useEffect, useRef, useState } from 'react'

const facialexpression = () => {

    const videoRef = useRef(null)
    const canvaRef = useRef(null)
    const [modelsLoaded, setModelsLoaded] = useState(false)
    const [currentEmotion, setCurrentEmotion] = useState('')
    const [isDetecting, setIsDetecting] = useState(false)

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models'

            try {
                await Promise.all({
                    facialexpression.tinyFaceDetector.loadFromUri(MODEL_URL)
                    facialexpression
                })
            }
        }
    })

  return (
    <div>facialexpression</div>
  )
}

export default facialexpression