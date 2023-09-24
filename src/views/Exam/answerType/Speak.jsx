
import React, { useRef, useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { useStateContext } from '../../../contexts/ContextsProvider';

export default function Speak({ questionId, onAnswerChange }) {
    const audioContainerRef = useRef(null);
    const { user } = useStateContext();
    const [ answerId , setAnswerId] = useState(0)
    // const [audio, setAudio] = useState([]);

    const getCurrentTimeFormatted = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    };

    const currentTimeFormatted = getCurrentTimeFormatted();

    const addAudioElement = (blob) => {
        // setAudio((prevAudio) => [...prevAudio, blob]);
        const url = URL.createObjectURL(blob);
        const audio = document.createElement('audio');
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
        audioContainerRef.current.appendChild(audio)

        const formData = new FormData();
        formData.append('answer_id', answerId);
        formData.append('answer_content', `user-${user.id}-audio-${currentTimeFormatted}.webm`);
        formData.append('stu_ans_value' , 0);

        if (blob) {
        formData.append('audio_file', blob, 'audio.webm');
        }
        onAnswerChange(formData)
        setAnswerId(answerId + 1)
    };
    
    // console.log(audio);

    return (
        <div className='speak-page' ref={audioContainerRef} >
            <div className='record-page'>
                <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                        showVisualizer: true,
                    }}
                    downloadFileExtension="webm"
                />
            </div>
        </div>
    );
}

// const newAnswer = {
    //     answer_id: null,
    //     answer_content: `user-${user.id}-audio-${currentTimeFormatted}.webm`,
    //     stu_ans_value: 0,
    //     audio_file: formData
    // };

    
    // const formData = new FormData();
    // formData.append('audio', blob);