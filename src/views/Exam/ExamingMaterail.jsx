import { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';
import $ from 'jquery';

export default function ExamingMaterail({ id }) {
    const [loading, setLoading] = useState(true);
    const [materials, setMaterials] = useState([null]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        $(document).ready(function () {
            // Hide the audio controller
            $('audio').removeAttr('controls');
            
            // Set the autoplay attribute
            $('audio').attr('autoplay', 'autoplay');
        });
    })

    useEffect(() => {
        getMaterial()
    },[id])

    const getMaterial = () => {
        axiosClient.get(`/formExam/${id}/material`).then((response) => {
            setMaterials(response.data.data)
            setLoading(false);
        }).catch(() => {
            setError('An error occurred while fetching data');
            setLoading(false);
        })
    }

    return (
        <div className="material">
            <h4>Material Content</h4>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                materials.map((material, index) => (
                    <div id='material-content' className='p-3' key={index} dangerouslySetInnerHTML={{ __html: material.content }}></div>
                ))
            )}
        </div>
    )
}

// const [isPlaying, setIsPlaying] = useState(false);

// const toggleAudio = () => {
//   const audio = $('audio')[0]; // Get the first audio element

//   if (audio) {
//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   }
// };

// useEffect(() => {
//     $(document).ready(function () {
//         // Hide the audio controller
//         $('audio').removeAttr('controls');
//     });
// });