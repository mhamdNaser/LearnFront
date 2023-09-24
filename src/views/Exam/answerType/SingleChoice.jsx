import { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';

export default function SingleChoice({ questionId, onAnswerChange }) {
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

        const [index, stu_ans_value, questionType] = value.split(',');

        const newAnswer = {
            questionId: parseInt(index),
            answer_id: parseInt(id),
            questionType: questionType,
            stu_ans_value: stu_ans_value,
            answer_content: 'null',
        };

        // Call the onAnswerChange function from props to update the parent component's state
        onAnswerChange(newAnswer);
    };

    return (
        <div className='answer-list fs-6'>
            {loading ? (
                <li>Loading...</li>
            ) : error ? (
                <li>{error}</li>
            ) : (
                <div className=' mx-5 my-2' role="group" aria-label="Basic radio toggle button group">
                    {answers.map((answer, index) => (
                        <div className="d-flex" key={index}>
                            <input
                                type="radio"
                                name={answer.question.id} // Use the question id for 'name' attribute
                                id={answer.id} // Set 'id' attribute for connecting label and input
                                autoComplete="off"
                                value={`${answer.question.id},${answer.answer_value},${answer.question.type}`}
                                onChange={handleChange}
                            />
                            <label className='ms-3 text-start' htmlFor={answer.id}>
                                {answer.answer_content}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
