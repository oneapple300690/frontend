import { Button } from 'react-bootstrap';
import Header from '../Header.js';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Login() {
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push('/addProd');
        }
    }, []);

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let [error_message, setErrorMsg] = useState('');

    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort, 8000);

    async function login() {
        let item = { email, password }
        console.log(item);
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                timeout: 8000,
                signal: signal // connecting fetch() with AbortController
            });

            clearTimeout(timeoutId);

            const result = await response.json();

            if (result !== 'Email or Password is incorrect!' && result.email) {
                localStorage.setItem('user-info', JSON.stringify(result));
                history.push('/addProd');
            } else {
                // console.log(result);
                // const result_decode = JSON.parse(result);
                setErrorMsg(result.error);
                console.log(error_message);
                history.push('/login');
            }
            return result;
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
            console.log(error.name === 'AbortError');
        }
    }

    return (
        <div>
            <Header />
            <div class='col-md-6 offset-md-3'>
                <h1>Login Page</h1>
                <input type='text' className='form-control' onChange={(e) => setEmail(e.target.value)} id='email' value={email} placeholder='Enter Email'></input><br />
                <input type='password' className='form-control' onChange={(e) => setPassword(e.target.value)} id='password' value={password} placeholder='Enter Password'></input><br />
                {
                    error_message !== '' ?
                        <>
                            <span id='err_msg'>{error_message}</span><br /><br/>
                        </>
                        : null

                }
                <Button className='btn btn-primary' onClick={login}>Login</Button>
            </div>
        </div>
    )
}

export default Login