

import { UserLoginStyles } from './indexStyles';
import { loginUser } from '../../redux/action/userAction';
import { useAppDispatch } from '../../redux/reduxHooks'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Router from "next/router";



export default function UserLogin() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = (e: React.MouseEvent<HTMLElement>) => {
        try {
            e.preventDefault()
            if (email && password) {
                dispatch(loginUser(email, password))
            } else {
                toast.error('Both Fields are Mandatory');
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            e.preventDefault()
            switch (e.target.name) {
                case "email": return setEmail(e.target.value);
                case "password": return setPassword(e.target.value);
                default: return;
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <UserLoginStyles>
            <div className='rootDiv'>
                <div className='headerDiv'>
                    <h2>Login</h2>
                    <div className='divider'></div>
                </div>

                {/* form here */}
                <div className='formDiv'>
                    <div className='textDiv'>
                        <TextField type="email" sx={{ width: "30vw" }} value={email} name="email" id="outlined-basic 2" label="Email" variant="outlined" onChange={handleOnChange} />
                    </div>
                    <div className='textDiv'>
                        <TextField type="password" sx={{ width: "30vw" }} value={password} name="password" id="outlined-basic 3" label="Password" variant="outlined" onChange={handleOnChange} />
                    </div>
                    <div className='buttonDiv'>
                        <Button variant="contained" onClick={handleOnSubmit}>Submit</Button>
                    </div>
                </div>
                {/* end of form here */}
                <div className='paragraphDiv'><p>Don&apos;t Have an Account? <span onClick={() => { return Router.push('/register') }}>Click Here to Register</span></p></div>
            </div>
        </UserLoginStyles>
    )
}
