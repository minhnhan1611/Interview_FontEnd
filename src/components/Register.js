import React, { useRef, useState } from 'react';
import './Authecation.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const { register } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords do not mach");
        }

        try {
            setError("");
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch {
            setError("Failed to create an account");
        }
        setLoading(false);
    };

    return (
        <div className='container'>
            <div className="box">
                <h2>Register From</h2>
                {error && <div style={{ width: "100%", height: 30, backgroundColor: "#dc3545", textAlign: 'center' }}>
                    {error}
                </div>}
                <form onSubmit={handleSubmit}>
                    <label>Email:</label><br />
                    <input ref={emailRef} type="email" name='email' placeholder='example@kyanon.digital' />
                    <br />

                    <label>Password:</label>
                    <br />
                    <input ref={passwordRef} name='password' type='password' placeholder='********' />

                    <br />
                    <label>Confirm Password:</label>
                    <br />
                    <input ref={confirmPasswordRef} name='password-confirm' type='password' placeholder='********' />

                    <button type='submit' className='registerBtn' disabled={loading}>Register</button>
                    <div className='account'>
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
