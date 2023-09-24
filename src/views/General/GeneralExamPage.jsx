import { useEffect, useState } from "react"
import { BsBoxArrowInRight } from "react-icons/bs";
import axiosClient from "../../axios-client"
import { useNavigate } from "react-router";

export default function GeneralExamPage() {
    const [formexam, setForm] = useState([])
    const navigated = useNavigate();

    useEffect(() => {
        axiosClient.get('/ActiveGeneralForms').then((data) => {
            setForm(data.data.data);
        })
    }, [setForm])

    const handletSelectExam = (id) => {
        navigated(`/pageExam?form_id=${id}`);
    }
    return (
        <div className='text-center exam-page-header'>
            <h3>General Form Exam</h3>
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
                                <div className="form-header" title={form.created_at}>
                                    <span>{form.type}</span>
                                    <span>{form.exam_time} minute</span>
                                    <button onClick={() => handletSelectExam(form.id)}>Start Exam <BsBoxArrowInRight /></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
