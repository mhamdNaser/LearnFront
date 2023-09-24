// import { useEffect, useState } from 'react'
// import axiosClient from '../../../axios-client';

// export default function SingleDrop({ question_id, onAnswerChange }) {
//     const [answers, setAnswers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         setLoading(true);
//         setError(null);
//         getAnswer(question_id);
//     }, []);

//     const getAnswer = (id) => {
//         axiosClient
//             .get(`/formExam/${id}/answer`)
//             .then(({ data }) => {
//                 setAnswers(data.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 if (error.response && error.response.status === 404) {
//                     setError(error.response.data.message);
//                 } else {
//                     setError('An error occurred while fetching the material');
//                 }
//                 setLoading(false);
//             });
//     }

//     const handledropdown = (ev, answers) => {
//         const selectedIndex = ev.target.selectedIndex; // Get the selected index
//         const selectedValue = ev.target.value;

//         const selectedAnswer = answers[selectedIndex]; // Get the selected answer object

//         const newAnswer = {
//             answer_id: selectedAnswer.id,
//             stu_ans_value: selectedValue,
//             answer_content: 'null',
//         };

//         // Call the onAnswerChange function from props to update parent component's state
//         onAnswerChange(newAnswer);
//     };
//     return (
//         <div className='answer-list fs-6'>
//             {loading ? (
//                 <li>Loading...</li>
//             ) : error ? (
//                 <li>{error}</li>
//             ) : (
//                 <select
//                     className='mx-5'
//                     defaultValue={'default'}
//                     onChange={(ev) => handledropdown(ev, answers)}>
//                     <option value={'default'} disabled>Select Your Answer</option>
//                     {answers.map((answer) => (
//                         <option
//                             key={answer.id}
//                             value={answer.answer_value}
//                         >
//                             {answer.answer_content}
//                         </option>
//                     ))}
//                 </select>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';

export default function SingleDrop({ questionId, onAnswerChange }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAnswer(questionId);
  }, [questionId]); // Include question_id in the dependency array to re-fetch answers when it changes

  const getAnswer = (id) => {
    axiosClient
      .get(`/formExam/${id}/answer`)
      .then(({ data }) => {
        setAnswers(data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred while fetching the material');
        }
        setLoading(false);
      });
  };

  const handledropdown = (ev, answers) => {
    const selectedIndex = ev.target.selectedIndex; // Get the selected index
    const selectedValue = ev.target.value;
  
    if (answers.length > 0 && selectedIndex >= 0 && selectedIndex < answers.length) {
      const selectedAnswer = answers[selectedIndex]; // Get the selected answer object
  
      const newAnswer = {
        answer_id: selectedAnswer.id,
        stu_ans_value: selectedValue,
        answer_content: 'null',
      };
  
      // Call the onAnswerChange function from props to update the parent component's state
      onAnswerChange(newAnswer);
    } else {
      console.error('Invalid selection or no answers available.');
    }
  };
  

  return (
    <div className="answer-list fs-6">
      {loading ? (
        <li>Loading...</li>
      ) : error ? (
        <li>{error}</li>
      ) : (
        <select
          className="mx-5"
          defaultValue={'Select Your Answer'}
          onChange={(ev) => handledropdown(ev, answers)}
        >
          {answers.map((answer) => (
            <option key={answer.id +1} value={answer.answer_value}>
              {answer.answer_content}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
