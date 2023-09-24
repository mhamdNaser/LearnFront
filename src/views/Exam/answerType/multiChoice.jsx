import { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';

export default function MultiChoice({ questionId, onAnswerChange }) {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getAnswer(questionId);
    }, [questionId]);

    const getAnswer = (id) => {
        axiosClient
            .get(`/formExam/${id}/answer`)
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
    }

    const handleChange = (ev) => {
        const { id, value } = ev.target;
        const newAnswer = {
            answer_id: parseInt(id),
            stu_ans_value: value,
            answer_content: 'null',
        };

        // Call the onAnswerChange function from props to update parent component's state
        onAnswerChange(newAnswer);
    };

    return (
        <div className='answer-list fs-6'>
            {loading ? (
                <li>Loading...</li>
            ) : error ? (
                <li>{error}</li>
            ) : (
                <div className='mx-5 my-2' >
                    {answers.map((answer, index) => (
                        <div className="d-flex" key={index}>
                            <input
                                type='checkbox'
                                name={answer.question_id}
                                id={answer.id}
                                autoComplete="off"
                                value={answer.answer_value} // Use 'selectedAnswer' state for checked property
                                onChange={handleChange}
                            />
                            <label className='ms-3 text-start' htmlFor={answer.id}>{answer.answer_content}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
