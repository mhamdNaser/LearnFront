import React, { useState, useEffect } from "react";
import { CiLocationOn, CiPhone, CiMail } from "react-icons/ci";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextsProvider";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [phonenumbers, setPhoneNumbers] = useState([]);
  const navigated = useNavigate()
  const [emails, setEmails] = useState([]);
  const { user } = useStateContext()
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userMessage, setUserMessage] = useState({
    user_id: user?.id,
    name: "",
    email: "",
    subject: "",
    content: "",
  });

  useEffect(() => {
    getPhone();
    getEmail();
    getLocation();
  },[]);

  const getPhone =  () => {
    axiosClient.get('/siteEmail').then((response) => {
      setPhoneNumbers(response.data.data)
    }).catch(()=>{
      setLocations([])
    })
  }
  const getEmail = () => {
    axiosClient.get('/sitePhone').then((response) => {
      setEmails(response.data.data)
    }).catch(()=>{
      setLocations([])
    })
  }
  const getLocation = () => {
    axiosClient.get('/siteLocation').then((response) => {
      setLocations(response.data.data)
    }).catch(()=>{
      setLocations([])
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user?.id) {
      navigated('login')
    } else {
      axiosClient
      .post("/Message", userMessage)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <h3>Contact Us</h3>
          {errorMessage && (
            <span className="text-danger text-center">{errorMessage}</span>
          )}
          <input
            type="text"
            placeholder="Full Name"
            onChange={(event) =>
              setUserMessage({ ...userMessage, name: event.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(event) =>
              setUserMessage({ ...userMessage, email: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Subject"
            onChange={(event) =>
              setUserMessage({ ...userMessage, subject: event.target.value })
            }
          />
          <textarea
            placeholder="Message content"
            rows={10}
            onChange={(event) =>
              setUserMessage({ ...userMessage, content: event.target.value })
            }
          />
          <button type="submit">Send</button>
        </form>
        <div className="image">
          <img src="/image/logo.png" alt="" />
          <div className="contact-contant">
            <div className="content">
              <span className="pt-2 px-3 border-end border-danger">
                <CiPhone style={{ fontSize: "24px", lineHeight: "2", color: "red" }} />
              </span>
              <span>
                {phonenumbers.map((element, index) => (
                  <span key={index}>{element.content}</span>
                ))}
              </span>
            </div>
            <div className="content">
              <span className="pt-2 px-3 border-end border-danger">
                <CiMail style={{ fontSize: "24px", lineHeight: "2", color: "red" }} />
              </span>
              <span>
                {emails.map((element, index) => (
                  <span key={index}>{element.content}</span>
                ))}
              </span>
            </div>
            <div className="content">
              <span className="pt-2 px-3 border-end border-danger">
                <CiLocationOn style={{ fontSize: "24px", lineHeight: "2", color: "red" }} />
              </span>
              <span>
                {locations.map((element, index) => (
                  <span key={index}>{element.content}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
