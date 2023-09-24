import { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextsProvider';

export default function ScoremultiChoice({ question_id }) {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useStateContext();
    const [formid, setFormId] = useState();
    const [studentAnswer, setStudentAnswer] = useState()

    useEffect(() => {
        setLoading(true);
        setError(null);
        getAnswer(question_id);
        getStudentForm(user.id)
    }, [question_id, user.id]);

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

    const getStudentForm = (userId) => {
        axiosClient.get(`/scoreExam/${userId}`)
            .then((response) => {
                setFormId(response.data.id);

                getStudentAnswer(response.data.id);
            })
            .catch((error) => {
                // Handle the error here, e.g., display an error message or log it.
                console.error("Error fetching form information:", error);
            });
    };


    const getStudentAnswer = (form) => {
        axiosClient.get(`/form-examing/${form}/Students-answer`).then((response) => {
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
                <div className='mx-5 my-2' >
                    {answers.map((answer, index) => (
                        <div className="d-flex" key={index}>
                            <input
                                type='checkbox'
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
                                htmlFor={answer.id}>{answer.answer_content}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
