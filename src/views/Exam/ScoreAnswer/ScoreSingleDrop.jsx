import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextsProvider';
import Select from 'react-select';

export default function ScoreSingleDrop({ question_id }) {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useStateContext();
    const [studentAnswer, setStudentAnswer] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getAnswer(question_id);
        if (user.id) {
            getStudentForm(user.id);
        }
    }, [question_id, user.id]);

    useEffect(() => {
        const selectedAnswers = studentAnswer.map((ele) => {
            const matchingAnswer = answers.find((answer) => answer.id === ele.answer_id);
            return matchingAnswer
                ? { value: ele.answer_id, label: matchingAnswer.answer_content }
                : null;
        });
        setSelectedValue(selectedAnswers.filter((value) => value !== null));
    }, [studentAnswer, answers]);

    const getAnswer = (id) => {
        axiosClient
            .get(`/formExam/${id}/answer`)
            .then(({ data }) => {
                setAnswers(data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(
                    error.response && error.response.status === 404
                        ? error.response.data.message
                        : 'An error occurred while fetching the material'
                );
                setLoading(false);
            });
    };

    const getStudentForm = (userId) => {
        axiosClient
            .get(`/scoreExam/${userId}`)
            .then((response) => {
                getStudentAnswer(response.data.id);
            })
            .catch((error) => {
                console.error('Error fetching form information:', error);
            });
    };

    const getStudentAnswer = (form) => {
        axiosClient.get(`/form-examing/${form}/Students-answer`).then((response) => {
            setStudentAnswer(response.data.data);
        });
    };

    const options = answers.map((answer) => ({
        value: answer.answer_value,
        label: answer.answer_content,
        color: answer.answer_value === 1 ? 'green' : '',
    }));

    const colorStyle = {
        control: (styles) => ({ ...styles, backgroundColor: '#fff' }),
        option: (styles, { data }) => ({ ...styles, color: data.color }),
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.value === 1 ? 'green' : 'black',
        }),
    };

    return (
        <div className='answer-list fs-6'>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Select
                    className='mx-5 my-3 fw-bolder'
                    options={options}
                    value={selectedValue}
                    isMulti
                    styles={colorStyle}
                    isClearable={true}
                />
            )}
        </div>
    );
}

