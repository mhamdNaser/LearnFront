import { useEffect, useState } from 'react'
import axiosClient from '../../axios-client';

export default function ScoreMaterial({ id }) {
    const [loading, setLoading] = useState(true);
    const [materials, setMaterials] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getMaterial(id)
    },[id])

    const getMaterial = (formId) => {
        axiosClient.get(`/formExam/${formId}/material`).then((response) => {
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
