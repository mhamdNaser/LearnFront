import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="social-icon">
        <a className="text-white" href="/">
          <BsFacebook />
        </a>
        <a className="text-white" href="/">
          <BsInstagram />
        </a>
        <a className="text-white" href="/">
          <BsLinkedin />
        </a>
      </div>
      <div className="section-link">
        <div className="links">
          <h6>Main Page</h6>
          <Link to={"/home"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </div>
        <div className="links">
          <h6>Subpage</h6>
          <Link to={"/generalpage"}>General</Link>
          <Link to={"/academypage"}>Academic</Link>
        </div>
        <div className="links">
          <h6>IELTSIMULATEXAM</h6>
          Experience the IELTS exam like never before on our platform! Our
          website offers a realistic IELTS exam simulation, allowing you to
          practice Listening, Reading, Writing, and Speaking skills. Prepare
          with confidence as our simulations closely match the actual test
          format. Whether you are pursuing academic goals or immigration
          opportunities, our simulation is your key to IELTS readiness.
        </div>
      </div>
      <div className="dash-footer">
        <span>&copy; Copyright 2023 Coding Nasser . All Rights Reserved.</span>
        <span>
          Design :{" "}
          <a className="text-white" target="_blank" rel="nofollow" href="/">
            Muhammed Nasser Edden
          </a>
        </span>
      </div>
    </div>
  );
}
