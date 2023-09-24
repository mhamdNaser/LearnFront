import { createRef, useEffect, useState } from "react"
import axiosClient from "../axios-client"
import axios from "axios"; // Import axios library
import { Link, useNavigate } from "react-router-dom"

export default function SignUp() {
    const f_nameRef = createRef()
    const l_nameRef = createRef()
    const emailRef = createRef()
    const countryRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate();

    const fetchCountries = () => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(({ data }) => {
                const countries = data.map((country) => ({
                    name: country.name.common,
                    code: country.cca2,
                }));
                setCountries(countries);
            })
            // .catch((error) => {
            //     console.error("Error fetching countries:", error);
            // });
    };

    useEffect(() => {
        fetchCountries();
    });

    const [countries, setCountries] = useState([]);

    const onSubmit = ev => {
        ev.preventDefault()

        const payload = {
            first_name: f_nameRef.current.value,
            last_name: l_nameRef.current.value,
            email: emailRef.current.value,
            country: countryRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(() => {
                navigate('/login')
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    return (
        <div className="login-page">
            {errors &&
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            <div>
                <img src="/image/logo.png" alt="" />
            </div>
            <form onSubmit={onSubmit}>
                <h3>Signup</h3>
                <input ref={f_nameRef} type="text" placeholder="First Name" />
                <input ref={l_nameRef} type="text" placeholder="Last Name" />
                <input ref={emailRef} type="email" placeholder="Email Address" />
                <select defaultValue={0} ref={countryRef} type="select">
                    <option value={0} disabled>Select Country</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <input ref={passwordRef} type="password" placeholder="Password" />
                <input ref={passwordConfirmationRef} type="password" placeholder="Repeat Password" />
                <button className="btn btn-block">Signup</button>
                <p className="message"></p>
                <div className="to-login">Already registered? <Link to="/login">Sign In</Link></div>
            </form>
        </div>
    )
}