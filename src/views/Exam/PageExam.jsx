import { useEffect, useState } from 'react';
import { GiNotebook } from 'react-icons/gi';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Timer from '../../hooks/Timer';
import Menu from '../../components/Menu';
import ExamingMaterail from './ExamingMaterail';
import ExamingQuestions from './ExamingQuestions';
import { useStateContext } from '../../contexts/ContextsProvider';

function PageExam() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('form_id');
    const navigate = useNavigate();
    const [formExam, setFormExam] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useStateContext();
    const [myAnswers, setAllAnswers] = useState([]);
    const [studentExaming, setstudentExaming] = useState({
        student_id: user.id,
        form_exams_id: parseInt(id),
        fullmark: 0,
    });



    useEffect(() => {
        axiosClient.get(`/formExam/${id}`).then((response) => {
            setFormExam(response.data)
        })
    }, [id])

    // Function to update total points
    const handleTotalPointsChange = (newTotalPoints) => {
        setstudentExaming({ ...studentExaming, fullmark: newTotalPoints });
    };

    const handleAnswer = (stuanswer, questionId, questionType) => {
        if (stuanswer) {
            setAllAnswers((prevAnswers) => {
                const updatedAnswers = prevAnswers.filter((a) => a.answer_id !== stuanswer.answer_id);
                return [...updatedAnswers, stuanswer];
            });
        }
    };

    const handleAllAnswer = () => {
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

            console.log(updatedQuestion);
            // Send the updatedQuestion object to the server
            axiosClient.post('/examing', updatedQuestion);

            // Navigate to the '/resultscore' route
            navigate('/resultscore');
        } catch (error) {
            console.log(error);
        }
    };



    const handleContextMenu = (event) => {
        event.preventDefault();
        const xPos = event.clientX;
        const yPos = event.clientY;
        setMenuPosition({ x: xPos, y: yPos });
        setShowMenu(true);
    };

    const handleCloseMenu = () => {
        setShowMenu(false);
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
            <div className="exam-header sticky-top" style={{top: '65px'}}>
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
                        <span>{studentExaming?.fullmark}</span>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    {formExam?.exam_time && <Timer
                        time={formExam.exam_time}
                        handleAllAnswer={handleAllAnswer}
                    />}
                    <button className='changesection-btn ms-2' onClick={handleAllAnswer}>End Exam</button>
                </div>
            </div>
            <div className="exam-section my-5">
                <div className="exam-content">
                    <div className="scrolling Flipped mx-2 my-2">
                        <ExamingMaterail id={id} />
                    </div>
                    <div className="question mx-2 my-2">
                        <ExamingQuestions id={id} onTotalPointsChange={handleTotalPointsChange} stuAns={handleAnswer} />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PageExam;
