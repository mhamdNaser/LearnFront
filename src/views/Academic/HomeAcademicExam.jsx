import React from "react";
import { Link } from "react-router-dom";

export default function HomeAcademicExam() {
  return (
    <div className="homeexam-container pt-5 pb-5">
      <div className="homeexam-header">
        <h2 className="text-dark">You have chosen the Academic test.</h2>
        <Link to={'/academypage'}>Select a different test</Link>
      </div>
      <div className="homeexam p-0 bg-white">
        <div className="d-flex">
          <img src="/image/keyboard.jpg" alt="" />
          <div className="px-4">
            <h2 className="mt-5 text-dark">
              How do the familiarisation tests work?
            </h2>
            There are three sections to this IELTS on computer familiarisation
            test:
            <br />
            <br />
            Listening (30 minutes)
            <br />
            Reading (60 minutes)
            <br />
            Writing (60 minutes)
            <br />
            <br />
            The Writing section is scored by a person in the real test. In this
            familiarisation test, the writing is not scored.
            <br />
            <br />
            The Speaking section is conducted face-to-face and does not form
            part of this test.
            <br />
            <br />
            <h4>How to use this familiarisation test</h4>
            <br />
            Take this test on a computer for the most accurate test experience.
            <br />
            <br />
            Warning: Do not close your browser during the test. You will not get
            your results.
            <br />
            <br />
            Press "Finish Section" to move to the next section.
            <br />
            <br />
            Press "Finish Test" to end the test.
            <br />
            <br />
            Please note that these buttons are not available in the real
            computer-delivered test.
            <br />
            <br />
            IELTS on computer has helpful tools for taking notes and reviewing.
            Press "Help" before you start for more details.
            <br />
            <br />
            <h4>After you finish the test</h4> Once you have completed the
            familiarisation test, you will receive an email with a link of your
            percentage marks for your Listening and Reading answers.
            <br />
            <br />
            You will be able to match these with the Common European Framework
            of Reference for Languages (CEFR) framework levels.
            <br />
            <br />
            You can explore further marking or practice options with our
            partners, GEL IELTS.
            <br />
            <br />
            <Link className="btn btn-primary mb-4" to={"/acadymicfullexam"}>
              Start Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
