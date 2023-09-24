// import { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router';
// import axiosClient from '../../axios-client';
// import SingleDrop from './answerType/SingleDrop';
// import SingleChoice from './answerType/SingleChoice';
// import Write from './answerType/Write';
// import Blank from './answerType/Blank';
// import MultiChoice from './answerType/multiChoice';
// import Speak from './answerType/Speak';

// export default function ExamingQuestions({ id, onTotalPointsChange, stuAns }) {
//   const navigate = useNavigate();
//   const [totalPoints, setTotalPoints] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const questionRefs = useRef([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   useEffect(() => {
//     questionRefs.current = questionRefs.current.slice(0, questions.length); // Resize the array if needed
//     onTotalPointsChange(totalPoints);
//   }, [totalPoints]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const [questionResponse] = await Promise.all([
//         axiosClient.get(`/formExam/${id}/question`),
//       ]);

//       setQuestions(questionResponse.data.data);
//       setTotalPoints(
//         questionResponse.data.data.reduce(
//           (total, question) => total + parseInt(question.points),
//           0
//         )
//       );
//       setLoading(false);
//     } catch (error) {
//       setError('An error occurred while fetching data');
//       setLoading(false);
//     }
//   };

//   const handleAnswerChange = (answer, questionId, questionType) => {
//     stuAns(answer, questionId, questionType);
//     // console.log(answer);
//   };

//   return (
//     <div>
//       <h4>Question</h4>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <>
//           {questions.map((question, index) => (
//             <div
//               className="my-2 p-3"
//               ref={(el) => (questionRefs.current[index] = el)}
//               key={index}
//             >
//               <div className="content">
//                 <span>{index + 1} -</span>
//                 <span dangerouslySetInnerHTML={{ __html: question.content }}></span>
//               </div>
//               {question.type === 'single_choice_dropdown' ? (
//                 <SingleDrop
//                   questionId={question.id}
//                   onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
//                 />
//               ) : question.type === 'single_choice_radio' ? (
//                 <SingleChoice
//                   questionId={question.id}
//                   onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
//                 />
//               ) : question.type === 'multiple_choice' ? (
//                 <MultiChoice
//                   questionId={question.id}
//                   onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
//                 />
//               ) : question.type === 'write' ? (
//                 <Write
//                   questionId={question.id}
//                   onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
//                 />
//               ) : question.type === 'fill_blanks' ? (
//                 <Blank
//                   questionId={question.id}
//                   onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
//                 />
//               ) : question.type === 'speak' ? (
//                 <Speak
//                   questionId={question.id}
//                   onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
//                 />
//               ) : (
//                 <></>
//               )}
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }

// import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import axiosClient from '../../axios-client';
// import SingleDrop from './answerType/SingleDrop';
// import SingleChoice from './answerType/SingleChoice';
// import Write from './answerType/Write';
// import Blank from './answerType/Blank';
// import MultiChoice from './answerType/multiChoice';
// import Speak from './answerType/Speak';
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
const SingleDrop = lazy(() => import('./answerType/SingleDrop'));
const SingleChoice = lazy(() => import('./answerType/SingleChoice'));
const Write = lazy(() => import('./answerType/Write'));
const Blank = lazy(() => import('./answerType/Blank'));
const MultiChoice = lazy(() => import('./answerType/multiChoice'));
const Speak = lazy(() => import('./answerType/Speak'));



export default function ExamingQuestions({ id, onTotalPointsChange, stuAns }) {
  const navigate = useNavigate();
  const [totalPoints, setTotalPoints] = useState(0);
  const [questions, setQuestions] = useState([]);
  const questionRefs = useRef([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    questionRefs.current = questionRefs.current.slice(0, questions.length); // Resize the array if needed
    onTotalPointsChange(totalPoints);
  }, [totalPoints]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [questionResponse] = await Promise.all([
        axiosClient.get(`/formExam/${id}/question`),
      ]);

      setQuestions(questionResponse.data.data);
      setTotalPoints(
        questionResponse.data.data.reduce(
          (total, question) => total + parseInt(question.points),
          0
        )
      );
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching data');
      setLoading(false);
    }
  };

  const handleAnswerChange = (answer, questionId, questionType) => {
    stuAns(answer, questionId, questionType);
  };

  const scrollToQuestion = (index) => {
    if (questionRefs.current[index]) {
      questionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <h4>Question</h4>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Dev questions={questions} scrollToQuestion={scrollToQuestion} />
          {questions.map((question, index) => (
            <div
              className="my-2 p-3"
              ref={(el) => (questionRefs.current[index] = el)}
              key={index}
            >
              <div className="content">
                <span>{index + 1} -</span>
                <span dangerouslySetInnerHTML={{ __html: question.content }}></span>
              </div>
              <React.Suspense fallback={<div>Loading...</div>}>
                {question.type === 'single_choice_dropdown' ? (
                  <SingleDrop
                    questionId={question.id}
                    onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
                  />
                ) : question.type === 'single_choice_radio' ? (
                  <SingleChoice
                    questionId={question.id}
                    onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
                  />
                ) : question.type === 'multiple_choice' ? (
                  <MultiChoice
                    questionId={question.id}
                    onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
                  />
                ) : question.type === 'write' ? (
                  <Write
                    questionId={question.id}
                    onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
                  />
                ) : question.type === 'fill_blanks' ? (
                  <Blank
                    questionId={question.id}
                    onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
                  />
                ) : question.type === 'speak' ? (
                  <Speak
                    questionId={question.id}
                    onAnswerChange={(answer) => handleAnswerChange(answer, question.id, question.type)}
                  />
                ) : (
                  <></>
                )}
              </React.Suspense>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// Create a Dev component for the buttons
function Dev({ questions, scrollToQuestion }) {
  return (
    <div className='buttun-container' >
      {questions.map((_, index) => (
        <button key={index} onClick={() => scrollToQuestion(index)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
}
