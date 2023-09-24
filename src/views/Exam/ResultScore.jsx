import { useEffect, useState } from 'react';
import { GiNotebook } from 'react-icons/gi';
import { LiaCertificateSolid } from 'react-icons/lia';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextsProvider';
import ScoreQuestions from './ScoreQuestions';
import ScoreMaterial from './ScoreMaterial';
import { useNavigate } from 'react-router-dom';

function ResultScore() {
  const { user } = useStateContext();
  const navigated = useNavigate()
  const [examing, setExaming] = useState([]);
  const [formid, setFormId] = useState();
  const [formFormula, setFormFormula] = useState();
  const [formType, setFormType] = useState();
  const [score, setScore] = useState();
  const [studentScore, setStudentScore] = useState(0)
  const [scoreRate, setScoreRate] = useState([])

  useEffect(() => {
    if (user.id) {
      getExaming(user.id)
    }
    if (user.id && examing.id) {
      getStudentAnswer(examing.id)
    }
    if (formFormula) {
      getRateScore()
    }
  }, [user.id, examing.id, formFormula]);

  useEffect(() => {
    scoreRate.forEach(ele => {
      if (ele.min <= score) {
        setStudentScore(ele.Score);
      } else {
        console.log('test');
      }
    })
  });

  const getExaming = (userId) => {
    axiosClient.get(`/scoreExam/${userId}`)
      .then((response) => {
        setExaming(response.data);
        setFormId(response.data.formExam.id);
        setFormFormula(response.data.formExam.formula)
        setFormType(response.data.formExam.type)
      })
      .catch((error) => {
        if (error.response) {
          // The request was made, but the server responded with an error status code (e.g., 404).
          console.error(`Request failed with status code ${error.response.status}`);
        } else if (error.request) {
          // The request was made, but no response was received.
          console.error('No response received from the server');
        } else {
          // Something else went wrong.
          console.error('An error occurred while making the request', error.message);
        }
      });
  }

  const getRateScore = () => {
    if (formType === 'reading') {
      if (formFormula === 'general') {
        axiosClient.get('/scoreGeneralReading').then((response) => {
          setScoreRate(response.data);
        })
      } else if (formFormula === 'academic') {
        axiosClient.get('/scoreAcademicReading').then((response) => {
          setScoreRate(response.data);
        })
      }
    } else {
      axiosClient.get('/scoreListening').then((response) => {
        setScoreRate(response.data);
      })
    }
  }

  const getStudentAnswer = (form) => {
    axiosClient.get(`/form-examing/${form}/Students-answer`).then((response) => {
      const studentAnswers = response.data.data;

      let sum = 0;
      let prevQuestionId = null;

      studentAnswers.forEach((answer) => {
        const currentQuestionId = answer.answers.question.id;

        // Check if the question ID is different from the previous one
        if (currentQuestionId !== prevQuestionId) {
          sum += answer.stu_ans_value;
        }

        // Update the previous question ID to the current one
        prevQuestionId = currentQuestionId;
      });

      // Now 'sum' contains the sum of values for answers with different question IDs
      setScore(sum);
    })
  }

  const handleScore = () => {
    const data = {
      result: studentScore,
      correction: 'CORRECTION',
      fullmark: 9
    };
    axiosClient.put(`/examing/${examing?.id}`, data).then((data)=>{
      navigated('/indexexam')
    })
  }

  return (
    <>
      <div className="exam-header align-items-center">
        <div className="form-info">
          <div className="icon">
            <GiNotebook />
          </div>
          <div>
            <span>Form Name</span>
            <span>Srudent Writer</span>
            <span>Total Points</span>
          </div>
          <div>
            <span>:</span>
            <span>:</span>
            <span>:</span>
          </div>
          <div>
            <span>
              {examing.formExam?.form_name} / {examing.formExam?.type}
            </span>
            <span>
              {examing?.student?.first_name} {examing?.student?.last_name}
            </span>
            <span>{examing?.fullmark}</span>
          </div>
        </div>
        <div className='text-light certaf'>
          <LiaCertificateSolid style={{ fontSize: '72px', color: '#f195aa' }} />
          <div className='text-center fw-bolder fs-4'>Your Score : {studentScore}</div>
        </div>
      </div>
      <div className="exam-section my-4">
        <div className="question text-dark">
          <ScoreMaterial id={formid} />
          <div className=" mx-2 my-2">
            <ScoreQuestions id={formid} examing={examing.id} />
          </div>
        </div>
        <button className='btn btn-success my-2' onClick={handleScore}>Back To Home</button>
      </div>
    </>
  );

}

export default ResultScore;
