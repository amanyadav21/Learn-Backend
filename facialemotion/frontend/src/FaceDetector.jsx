import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './FaceDetector.css'; // 👉 CSS file import
import MusicPlayer from './song';

const FaceDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [detectedEmotion, setDetectedEmotion] = useState('');
  const [emotionScore, setEmotionScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const emotionEmojiMap = {
    happy: "😄",
    sad: "😢",
    angry: "😠",
    surprised: "😲",
    disgusted: "🤢",
    fearful: "😨",
    neutral: "😐",
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        await startVideo();
        setLoading(false);
      } catch (err) {
        setError('❌ Failed to load face-api models.');
        console.error(err);
      }
    };

    loadModels();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('❌ Camera access denied or not available.');
      console.error('Error accessing camera:', err);
    }
  };

  const handleDetectFace = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (detections.length === 0) {
      setDetectedEmotion('');
      setEmotionScore(0);
      return;
    }

    const expressions = detections[0].expressions;
    const maxEmotion = Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );

    setDetectedEmotion(maxEmotion);
    setEmotionScore(expressions[maxEmotion].toFixed(2));

    const dims = faceapi.matchDimensions(canvasRef.current, videoRef.current, true);
    const resizedDetections = faceapi.resizeResults(detections, dims);

    faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
  };

  return (
    <div className='parent-container'>

      {/* Face Detector */}
      <div className="face-detector-container">
        <h2 className="face-detector-heading">🎯 Emotion Detection</h2>

        {error && <p className="error-text">{error}</p>}
        {loading && !error && <p className="loading-text">Loading models and camera...</p>}

        <div className="video-wrapper">
          <video ref={videoRef} autoPlay muted className="video-box" />
          <canvas ref={canvasRef} width="720" height="560" className="video-canvas" />
        </div>

        <button onClick={handleDetectFace} className="detect-btn">
          Detect Face
        </button>

        <div className="emotion-output">
          {detectedEmotion ? (
            <>
              <div className="emotion-chip">
                {emotionEmojiMap[detectedEmotion] || '🙂'} {detectedEmotion}
              </div>
              <div className="emotion-chip emotion-score">
                Confidence: {emotionScore}
              </div>
            </>
          ) : (
            <div className="no-emotion">No face detected yet...</div>
          )}
        </div>
      </div>

      {/* Music Player */}
      <div>
        <MusicPlayer />
      </div>

    </div>
  );
};

export default FaceDetector;
