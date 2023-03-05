import { React, useState, useRef } from 'react';
import { Link, useLocation, } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [password, setPassword] = useState("");
    const [isPassword, setIsPassword] = useState('false');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate(redirectPath, { replace: true });
        } catch {
            setError("Failed to Log In");
        }
        setLoading(false);
    };

    return (
        <div className='container'>
            <div className="box">
                <h2>Login</h2>
                {error && <div style={{ width: "100%", height: 30, backgroundColor: "#dc3545", textAlign: 'center' }}>
                    {error}
                </div>}

                <form onSubmit={handleSubmit}>
                    <label>Email:</label><br />
                    <input ref={emailRef} type="name" placeholder='example@kyanon.digital' />

                    <br />
                    <label>Password:</label>
                    <br />
                    <input ref={passwordRef} name='password' type={isPassword ? 'password' : 'text'} placeholder='*******' />
                    <div className="checkbox">
                        <div className="pwd-container">
                            <input type="checkbox" onClick={() => setIsPassword(prevState => !prevState)} /> {isPassword ? "Show Password" : "Hide Password"}
                        </div>
                        <button disabled={loading} type='submit' className='loginBtn'>Login</button>
                    </div>
                    <div className='account'>
                        Need an account? <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
