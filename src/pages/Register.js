import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from '../Header.js';

function Register() {
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push('/addProd');
        }
    }, []);
    
    const [first_name, setFirstName] = useState("");
    const [middle_name, setMiddleName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function signUp() {
        // initial Abort Controller and Signal to fetch()
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort, 8000);

        let item = { first_name, middle_name, last_name, email, password };
        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                timeout: 8000,
                signal: signal // connecting fetch() with AbortController
            });

            clearTimeout(timeoutId); // Clear the Abort Timing function if response is faster than timeout time

            // if (!response.ok) {
            //     const message = "An error has occured: " + response.status;
            //     throw new Error(message);
            // }

            const result = await response.json();
            localStorage.setItem('user-info', JSON.stringify(result));
            history.push("/addProd");
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
            <div className='col-sm-6 offset-sm-3'>
                <h1>Register Page</h1>
                <input type='text' onChange={(e) => setFirstName(e.target.value)} value={first_name} className='form-control' id='first_name' placeholder='Enter First Name'></input><br />
                <input type='text' onChange={(e) => setMiddleName(e.target.value)} value={middle_name} className='form-control' id='middle_name' placeholder='Enter Middle Name'></input><br />
                <input type='text' onChange={(e) => setLastName(e.target.value)} value={last_name} className='form-control' id='last_name' placeholder='Enter Last Name'></input><br />
                <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} className='form-control' id='email' placeholder='Enter Email'></input><br />
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} className='form-control' id='password' placeholder='Enter Password'></input><br />
                <Button className='btn btn-primary' onClick={signUp}>Register</Button>
            </div>
        </div>
    )
}

export default Register