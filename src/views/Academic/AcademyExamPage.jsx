import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router";
import { BsBoxArrowRight } from "react-icons/bs";

export default function AcademyExamPage() {
    const [formexam, setForm] = useState([])
    const navigated = useNavigate();

    useEffect(() => {
        axiosClient.get('/ActiveAcademyForms').then((data) => {
            setForm(data.data.data);
        })
    }, [setForm])

    const handletSelectExam = (id) => {
        navigated(`/pageExam?form_id=${id}`);
    }
    return (
        <div className='text-center exam-page-header'>
            <h3>Academy Form Exam</h3>
            <div className="header-alert" role="alert">
                <p className="mb-0">Alert Description</p>
            </div>
            <div className='exam-page-body'>
                <div className='exam-page-center'>
                    <div className='exam-center-header'>
                        <h5>Type Of Form</h5>
                    </div>
                    <div className="container-form-card p-5">
                        {formexam.map((form, index) =>
                            <div key={index} className="form-card">
                                <div className="form-header">
                                    <span>{form.form_name}</span>
                                    <span>exam time : {form.exam_time}</span>
                                </div>
                                <div className="form-content">
                                    <span>Write By : {form.writer.first_name}{form.writer.last_name}</span>
                                    <span>Write In : {form.created_at}</span>
                                    <span>Exam Type : {form.type}</span>
                                </div>
                                <div className="form-footer">
                                    <button onClick={ev => handletSelectExam(form.id)}>Start Exam <BsBoxArrowRight /></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
