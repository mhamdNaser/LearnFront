import { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';

export default function Write({ questionId, onAnswerChange }) {
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

    const handleblanckChange = (ev) => {
        const { id, name, value } = ev.target;
        let test;
        if (name === value) {
            test = true;
        } else {
            test = false;
        }
        const newAnswer = {
            answer_id: parseInt(id),
            answer_content: value != null ? (value) : (false),
            stu_ans_value: test,
        };

        console.log(newAnswer);
        onAnswerChange(newAnswer);
    };

    return (
        <div className='answer-list fs-6'>
            {loading ? (
                <li>Loading...</li>
            ) : error ? (
                <li>{error}</li>
            ) : (
                <div className='input-group-vertical mx-5 my-2' >
                    {answers.map((answer, index) => (
                        <textarea
                            key={index}
                            rows={10}
                            cols={50}
                            id={answer.id}
                            name={answer.answer_content}
                            className='input-group-text'
                            type='text'
                            onChange={handleblanckChange}
                        >
                        </textarea>
                    ))}
                </div>
            )}
        </div>
    );
}
