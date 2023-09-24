import { useEffect, useState } from 'react';
import { GiNotebook } from 'react-icons/gi';
import axiosClient from '../../axios-client';
import ExamingMaterail from '../Exam/ExamingMaterail';
import ExamingQuestions from '../Exam/ExamingQuestions';
import Menu from '../../components/Menu';
import Timer from '../../hooks/Timer';
import { useStateContext } from '../../contexts/ContextsProvider';
import { useNavigate } from 'react-router-dom';

export default function GeneralFullExam() {
  const [id, setId] = useState([])
  const [formExam, setFormExam] = useState(null);
  const navigate = useNavigate();
  const [totalPoints, setTotalPoints] = useState(0);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useStateContext();
  const [section, setSection] = useState(0);
  const [myAnswers, setAllAnswers] = useState([]);
  const [studentExaming, setstudentExaming] = useState({
    student_id: user?.id,
    form_exams_id: localStorage.getItem('formId'),
    fullmark: 0,
  });

  useEffect(() => {
    getformid()
  }, [section]);

  const handleNewSection = (section) => {
    // Create an object to store the final answers
    const finalAnswer = {};

    // Iterate through allAnswers and store the last answer for each question ID
    myAnswers.forEach((answer) => {
      if (answer.questionType === 'single_choice_radio') {
        const { questionType, questionId, ...rest } = answer;
        finalAnswer[answer.questionId] = rest;
      } else {
        finalAnswer[answer.answer_id] = answer;
      }
    });

    // Convert the object of answers back to an array
    const allAnswers = Object.values(finalAnswer);
    try {
      // Update studentExaming with finalAnswerArray
      const updatedQuestion = { ...studentExaming, allAnswers };

      // Send the updatedQuestion object to the server
      console.log(updatedQuestion);
      axiosClient.post('/examing', updatedQuestion).then(() => {
        let sec = section + 1;
        setSection(sec);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getformid = () => {
    let endpoint = '';
    switch (section) {
      case 0:
        endpoint = '/GeneralReadingExam';
        break;
      case 1:
        endpoint = '/GeneralListeningExam';
        break;
      case 2:
        endpoint = '/GeneralWritingExam';
        break;
      // case 3:
      //   endpoint = '/GeneralSpeakingExam';
        // break;
      default:
        navigate('/home');
    }
    if(section === 0 || section === 1 || section === 2){
      axiosClient.get(endpoint).then((response) => {
        setId(response.data.random_id);
        localStorage.setItem('formId', response?.data.random_id);
        // Fetch form details after getting the form ID
        axiosClient.get(`/formExam/${response.data.random_id}`).then((formResponse) => {
          setFormExam(formResponse.data);
        });
      });
    }else{
      localStorage.removeItem('formId')
    }
  }

  const formId = localStorage.getItem('formId')


  // Function to update total points
  const handleTotalPointsChange = (newTotalPoints) => {
    setstudentExaming({ ...studentExaming, fullmark: newTotalPoints });
  };



  const handleAnswer = (stuanswer) => {
    if (stuanswer) {
      setAllAnswers((prevAnswers) => {
        const updatedAnswers = prevAnswers.filter((a) => a.answer_id !== stuanswer.answer_id);
        return [...updatedAnswers, stuanswer];
      });
    }
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const xPos = event.clientX;
    const yPos = event.clientY;
    setMenuPosition({ x: xPos, y: yPos });
    setShowMenu(true);
  };

  return (
    <div
      onContextMenu={formExam?.type === 'reading' ? handleContextMenu : undefined}
    >
      {formExam?.type === 'reading' &&
        <Menu
          x={menuPosition.x}
          y={menuPosition.y}
          showMenu={showMenu}
          onClose={handleCloseMenu}
        />
      }
      <div className="exam-header">
        <div className="form-info">
          <div className="icon">
            <GiNotebook />
          </div>
          <div>
            <span>Form Name</span>
            <span>Form Writer</span>
            <span>Total Points</span>
          </div>
          <div>
            <span>:</span>
            <span>:</span>
            <span>:</span>
          </div>
          <div>
            <span>
              {formExam?.form_name} / {formExam?.type}
            </span>
            <span>
              {formExam?.writer?.first_name} {formExam?.writer?.last_name}
            </span>
            <span>{totalPoints}</span>
          </div>
        </div>
        <div className='d-flex align-items-center'>
          {formExam?.exam_time && <Timer
            time={formExam.exam_time}
          // handleAllAnswer={handleAllAnswer}
          />}
          <button className='changesection-btn ms-2' onClick={() => handleNewSection(section)}>{section && section === 3 ? "End Exam" : "Next Section"}</button>
        </div>
      </div>
      <div className="exam-section my-4">
        <div className="exam-content">
          <div className="scrolling Flipped mx-2 my-2">
            <ExamingMaterail id={formId} />
          </div>
          <div className="question mx-2 my-2">
            <ExamingQuestions id={formId}
              onTotalPointsChange={handleTotalPointsChange}
              stuAns={handleAnswer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
