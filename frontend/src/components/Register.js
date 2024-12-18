import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_number: phoneNumber }),  
            });
            if (response) {
                toast.success("OTP sent successfully!");
                setOtpSent(true);
            } else {
                toast.error("Failed to send OTP. Try again!");
            } 
        } catch (error) {
            console.error("Error sending OTP: ", error);
            toast.error("Error sending OTP!");
        }
    };
    
    const handleVerifyOtp = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_number: phoneNumber, otp: otp }),
            });
            if (response.status === 200) {
                alert('OTP verified successfully');
            } else {
                alert('enter vlid otp');
            }
        } catch (error) {
            console.error("Error verifying OTP: ", error);
            toast.error("Error verifying OTP!");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        // Verify OTP before completing registration
        try {
            const otpResponse = await fetch('http://127.0.0.1:8000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_number: phoneNumber, otp: otp }),
            });
            if (otpResponse.ok) {
                toast.success("OTP verified successfully!");
                // Continue with registration after OTP verification
                userRegister();
            } else {
                toast.error("Invalid OTP. Please try again!");
            }
        } catch (error) {
            console.error("Error verifying OTP: ", error);
            toast.error("Error during OTP verification!");
        }
    };

    async function userRegister() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            if (response.ok) {
                toast.success("User registered successfully!");
                navigate('/login');
            } else {
                toast.error(`Registration failed: ${response.statusText}`);
            }
        } catch (error) {
            toast.error("Something went wrong! Try again later.");
        }
    }

    const resetHandle = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');
        setError('');
    };

    return (
        <div className="container bg-light px-3 py-2">
            <form className="register mt-2" onSubmit={(e) => handleSubmit(e)}>

                {/* Message or Error Section */}
                <div className="text-center mt-3">
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>

                <h3 className="mb-3 text-center">Sign Up</h3>

                <div className="form-group mb-2">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password" 
                        className="form-control"
                        required
                    />
                </div>
                <input
                type="number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleSendOtp}>Send OTP</button>
            {otpSent && (
                <div>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
            )}

                <button type="submit" className="btn btn-success my-3 me-2">Sign Up</button>
                <button type="reset" className="btn btn-warning" onClick={resetHandle}>Reset</button>
            </form>
            <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
    );
};

export default Register;
