import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'

const facialexpression = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState('')
  const [isDetecting, setIsDetecting] = useState(false)

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'
      
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ])
        setModelsLoaded(true)
        console.log('Models loaded successfully!')
      } catch (error) {
        console.error('Error loading models:', error)
      }
    }

    loadModels()
  }, [])

  // Start webcam
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 720, height: 560 } 
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing webcam:', error)
      }
    }

    if (modelsLoaded) {
      startVideo()
    }
  }, [modelsLoaded])

  // Detect emotions continuously
  const handleVideoPlay = () => {
    setIsDetecting(true)
    
    const detectEmotions = async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current
        const canvas = canvasRef.current
        
        const displaySize = { 
          width: video.videoWidth, 
          height: video.videoHeight 
        }
        
        faceapi.matchDimensions(canvas, displaySize)

        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions()

          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          
          // Clear canvas
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
          
          // Draw detections
          faceapi.draw.drawDetections(canvas, resizedDetections)
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

          // Get dominant emotion
          if (detections.length > 0) {
            const expressions = detections[0].expressions
            const dominantEmotion = Object.keys(expressions).reduce((a, b) => 
              expressions[a] > expressions[b] ? a : b
            )
            setCurrentEmotion(dominantEmotion)
          }
        }, 100)
      }
    }

    detectEmotions()
  }

  const getEmotionEmoji = (emotion) => {
    const emojiMap = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      surprised: '😲',
      neutral: '😐',
      disgusted: '🤢',
      fearful: '😨'
    }
    return emojiMap[emotion] || '🙂'
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          🎭 Emotion Detector
        </h1>

        {!modelsLoaded && (
          <div className="text-white text-center mb-4">
            <p className="text-xl">⏳ Loading AI models...</p>
          </div>
        )}

        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            onPlay={handleVideoPlay}
            width="720"
            height="560"
            className="rounded-lg"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0"
          />
        </div>

        {isDetecting && currentEmotion && (
          <div className="mt-6 bg-white/20 backdrop-blur-md rounded-xl p-6 text-center">
            <p className="text-white text-lg mb-2">Current Emotion:</p>
            <p className="text-5xl font-bold text-yellow-300 capitalize">
              {currentEmotion} {getEmotionEmoji(currentEmotion)}
            </p>
          </div>
        )}

        {!modelsLoaded && (
          <div className="mt-6 bg-red-500/20 backdrop-blur-md rounded-xl p-4 text-white">
            <p className="font-semibold">⚠️ Important Setup:</p>
            <p className="text-sm mt-2">
              Make sure you have downloaded the models and placed them in <code className="bg-black/30 px-2 py-1 rounded">public/models/</code> folder
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default facialexpression