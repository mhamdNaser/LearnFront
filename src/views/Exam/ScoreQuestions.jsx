import { useEffect, useRef, useState } from 'react'
import axiosClient from '../../axios-client';
import ScoreSingleDrop from './ScoreAnswer/ScoreSingleDrop';
import ScoreSingleChoice from './ScoreAnswer/ScoreSingleChoice';
import ScoreBlank from './ScoreAnswer/ScoreBlank';
import ScoreMultiChoice from './ScoreAnswer/ScoremultiChoice';

export default function ScoreQuestions({ id, examing }) {
    const formId = examing 
    const [questions, setQuestions] = useState([]);
    


    const questionRefs = useRef([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(id);
    },[id])

    const fetchData = async (formId) => {
        try {
            setLoading(true);
            setError(null);

            const [questionResponse] = await Promise.all([
                axiosClient.get(`/formExam/${formId}/question`),
            ]);

            setQuestions(questionResponse.data.data);
            setLoading(false);
        } catch (error) {
            setError('An error occurred while fetching data');
            setLoading(false);
        }
    };

    return (
        <div>
            <h4>Student Answer</h4>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='question1'>
                    {questions.map((question, index) => (
                        <div className=" my-2 p-3" ref={el => questionRefs.current[index] = el} key={index}>
                            <div className="content">
                                <span>{index + 1} -</span>
                                <span dangerouslySetInnerHTML={{ __html: question.content }}></span>
                            </div>
                            {question.type === 'single_choice_dropdown' ? (
                                <ScoreSingleDrop question_id={question?.id} form={formId} />
                            ) :
                                question.type === 'single_choice_radio' ? (
                                    <ScoreSingleChoice question_id={question?.id} form={formId}/>
                                ) :
                                    question.type === 'multiple_choice' ? (
                                        <ScoreMultiChoice question_id={question?.id} form={formId}/>
                                    ) :
                                        question.type === 'fill_blanks' ? (
                                            <ScoreBlank question_id={question?.id} form={formId}/>
                                        ) : (
                                            <></>
                                        )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
