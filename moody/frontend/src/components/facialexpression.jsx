import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from "face-api.js";
import { Icon } from '@iconify/react'
import './common.css'


const FacialExpression = () => {
    // Step 1: Refs & States

    const videoRef = useRef(null);
    const [emotion, setEmotion] = useState("")
    const [modelsLoaded, setModelsLoaded] = useState(false);

    // Step 2: Camera Starting Function
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.log("Camera Error:", error);
        }
    };

    // Step 3 Load Face api Models
    const loadFaceModels = async () => {
        const MODEL_URL = "/models";

        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

        setModelsLoaded(true);
    };

    // STEP 4 Detect Mood Fuction

    const detectMood = async () => {
        if(!modelsLoaded) {
            alert("Models not loaded yet!");
            return;
        }

        const result = await faceapi.detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceExpressions();

        if(!result) {
            setEmotion("No Face Detected")
            return;
        }

        const expressions = result.expressions;

        let maxValue = 0;
        let detectedEmotion = "";

        for(let mood in expressions) {
            if(expressions[mood] > maxValue) {
                maxValue = expressions[mood];
                detectedEmotion = mood;
            }
        }

        setEmotion(detectedEmotion.toUpperCase());
    };

useEffect(() => {
    loadFaceModels();
    startCamera();
}, [])

return (
    <div id='main'>
        <h1>Facial Mood Detector!</h1>
        <video
        ref={videoRef}
        autoPlay
        muted
        width="518"
        height="390"
        />

        <br />

        <button onClick={detectMood}>
            Detect Mood
            <Icon icon="material-symbols-light:line-end-arrow-notch" width="24" height="24" style={{ marginLeft: '8px' }} />
        </button>

        <h3>Mood: {emotion}</h3>
    </div>
  )
}

export default FacialExpression