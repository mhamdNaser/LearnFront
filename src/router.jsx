import { Navigate, createBrowserRouter } from "react-router-dom"
import GuistLayout from "./components/GuistLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import About from "./views/About";
import Contact from "./views/Contact";
import PaymentGuard from "./components/PaymentGuard";
import PaymentPage from "./views/PaymentPage";
import IndexToExamPage from "./views/Exam/IndexToExamPage";
import PageExam from "./views/Exam/PageExam";
import GeneralExamPage from "./views/General/GeneralExamPage";
import HomeGeneralExam from "./views/General/HomeGeneralExam";
import AcademyExamPage from "./views/Academic/AcademyExamPage";
import HomeAcademicExam from "./views/Academic/HomeAcademicExam";
import StudentInfoAcaddemic from "./views/Academic/StudentInfoacademic";
import ResultScore from "./views/Exam/ResultScore";
import GeneralFullExam from "./views/General/GeneralFullExam";
import AcadymicFullExam from "./views/Academic/AcadymicFullExam";
import Profile from "./views/Profile";
import Appointment from "./views/Appointment";


const router = createBrowserRouter([
  {
    path: '/',
    element: <GuistLayout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/',
        element: <Navigate to='/home' />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/generalpage',
        element: <GeneralExamPage />
      },
      {
        path: '/academypage',
        element: <AcademyExamPage />
      },
      {
        path: '/homeGeneral',
        element: <PaymentGuard><HomeGeneralExam /></PaymentGuard>
      },
      {
        path: '/homeAcdemic',
        element: <PaymentGuard><HomeAcademicExam /></PaymentGuard>
      },
      {
        path: '/pageExam',
        element: <PageExam />
      },
      {
        path: "/payment",
        element: <PaymentPage />
      },
      {
        path: '/indexexam',
        element: <IndexToExamPage />
      },
      {
        path: '/studentInfoAcademic',
        element: <StudentInfoAcaddemic />
      },
      {
        path: '/resultscore',
        element: <ResultScore />
      },
      {
        path: '/generalfullexam',
        element: <GeneralFullExam />
      },
      {
        path: '/acadymicfullexam',
        element: <AcadymicFullExam />
      }, {
        path: '/Profile',
        element: <Profile />
      }, {
        path: '/Appointment',
        element: <Appointment />
      }
    ]
  },
  {
    path: '*',
    element: <Home />
  }
])

export default router;
