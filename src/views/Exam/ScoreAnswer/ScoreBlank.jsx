import { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';

export default function ScoreBlank({ question_id, form }) {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentAnswer, setStudentAnswer] = useState([])

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
                <div className='input-group-vertical mx-5 my-2' >
                    {answers.map((answer, index) => (
                        <textarea
                            key={index}
                            cols={30}
                            onChange={handle}
                            id={answer.id}
                            value={
                                Array.isArray(studentAnswer) &&
                                studentAnswer.find((ele) => answer.id === ele.answer_id)?.answer_content
                            }
                            className={ Array.isArray(studentAnswer) &&
                            studentAnswer.find((ele) => answer.id === ele.answer_id && ele.stu_ans_value === 1 ) ? 'text-success input-group-text' : 'text-danger input-group-text'}
                            type='text'
                        >
                        </textarea>
                    ))}
                </div>
            )}
        </div>
    );
}
