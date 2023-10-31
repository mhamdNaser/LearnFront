import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextsProvider";
import axiosClient from "../../axios-client";

function IndexToExamPage() {
  const { user, setUser } = useStateContext();
  const navigated = useNavigate();

  useEffect(() => {
    fetchUserData();
  });

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get("/user");
      setUser(response.data);
    } catch (error) {
      // Handle error gracefully
      console.error("Error fetching user data:", error);
    }
  };

  const handleExamStart = async (pageGoal) => {
      try {
        await axiosClient.get(`/user/${user?.id}/UserPayment`);
        navigated(pageGoal);
      } catch (error) {
        navigated(`/payment?pagegoal=${pageGoal}`);
      }
  };

  return (
    <div className="index-exam-page my-3">
      <div className="cont-exam-page p-3">
        <div className="header-alert">
          <img src="/image/logo.png"
            alt="" />
          <div className="container-fluid mt-3 text-dark text-center">
            <h5>Welcome! </h5>
            <p>
              Get familiar with IELTS on computer with these familiarisation
              tests, which will give you an idea of what to expect in the
              Listening, Reading and Writing sections.
            </p>
          </div>
        </div>
        <div className="index-exam-body justify-content-center">
          <div className="card border-0 py-3">
            <img className="card-img-top px-2" src="/image/general.png" alt="" />
            <div className="card-body">
              <h5 className="card-title">IELTS General Training</h5>
              <p className="card-text">
                IELTS General Training measures English language proficiency in a
                practical, everyday context. The tasks and tests reflect both
                workplace and social situations.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {handleExamStart("/homeGeneral")}}
              >
                Select IELTS General Training
              </button>
            </div>
          </div>
          <div className="card border-0 py-3">
            <img className="card-img-top px-2" src="/image/academy.png" alt="" />
            <div className="card-body">
              <h5 className="card-title">IELTS Academic</h5>
              <p className="card-text">
                IELTS Academic measures whether your level of English language
                proficiency is suitable for an academic environment. It reflects
                aspects of academic language and evaluates whether you're ready to
                begin training or studying.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {handleExamStart("/homeAcdemic")}}
              >
                Select IELTS Academic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexToExamPage;
