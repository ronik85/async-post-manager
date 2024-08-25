import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/**
 * Props for the Login component.
 */
/**
 * Login component for user authentication.
 * @param {LoginProps} props - Component properties.
 * @returns {JSX.Element} - Rendered component.
 */
const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    /**
     * Handles login button click.
     * Mock authentication process.
     */
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', { username, password });
            const { token } = response.data;
            // Store the token in localStorage or sessionStorage
            if (token) {
                localStorage.setItem('token', token);
                console.log('Login successful, token stored:', token);
                navigate('/post-management');
            } else {
                console.error('No token received');
                toast.error('Login failed. Please check your credentials and try again.');
            }

        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials and try again.');
        }
    };

    /**
    * Checks if both username and password fields are filled.
    * @returns {boolean} - True if both fields are filled, false otherwise.
    */
    const isButtonDisabled = () => {
        return !username || !password;
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} disabled={isButtonDisabled()}>Login</button>
            <ToastContainer />
        </div>
    );
};

export default Login;
