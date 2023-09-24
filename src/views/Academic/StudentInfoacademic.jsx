import Timer from '../../hooks/Timer'
import { GiNotebook } from 'react-icons/gi';

export default function StudentInfoAcaddemic() {
    return (
        <div
            // onContextMenu={formExam?.type === 'reading' ? handleContextMenu : undefined}
        >
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

                        </span>
                        <span>

                        </span>
                        {/* <span>{totalPoints}</span> */}
                    </div>
                </div>
                <div>
                    {/* {formExam?.exam_time &&  */}
                    <Timer
                        // time={formExam.exam_time}
                    // handleAllAnswer={handleAllAnswer} 
                    />
                    {/* } */}
                </div>
            </div>
        </div>
    )
}
