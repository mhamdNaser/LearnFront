import { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';


export default function ScoreSingleChoice({ question_id, form }) {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentAnswer, setStudentAnswer] = useState()

    useEffect(() => {
        setLoading(true);
        setError(null);
        axiosClient
            .get(`/formExam/${question_id}/answer`)
            .then(({ data }) => {
                setAnswers(data.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setError(error.response.data.message);
                } else {
                    setError('An error occurred while fetching the material');
                }
                setLoading(false);
            });
        getStudentAnswer(form);
    }, [question_id, form]);


    const getStudentAnswer = (formid) => {
        axiosClient.get(`/form-examing/${formid}/Students-answer`).then((response) => {
            setStudentAnswer(response.data.data);
        })
    }

    const handle = () =>{ return null}

    return (
        <div className='answer-list fs-6'>
            {loading ? (
                <li>Loading...</li>
            ) : error ? (
                <li>{error}</li>
            ) : (
                <div className='mx-5 my-2' role="group" aria-label="Basic radio toggle button group">
                    {answers.map((answer, index) => (

                        <div className="d-flex" key={index}>
                            <input
                                type="radio" // Add this line
                                onChange={handle}
                                id={answer.id}
                                name={question_id}
                                checked={Array.isArray(studentAnswer) && studentAnswer.some(ele => answer.id === ele.answer_id)}
                            />
                            
                            <label
                                className={`ms-3 text-start fw-bolder ${Array.isArray(studentAnswer) && studentAnswer?.map(ele => (
                                    answer.answer_value === 1 ? 'text-success fw-bolder'
                                        : answer.id === ele.answer_id && answer.answer_value === 0 ? 'text-danger fw-bolder'
                                            : 'text-dark'
                                ))
                                    }`}
                                htmlFor={answer.id}
                            >
                                {answer.answer_content}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
