import { UserRegisterationStyles } from './indexStyles';
import { registerUser } from '../../redux/action/userAction';
import { useAppDispatch } from '../../redux/reduxHooks'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Router from "next/router";


export default function UserRegisteration() {
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleOnSubmit = (e: React.MouseEvent<HTMLElement>) => {
        try {
            e.preventDefault()
            if(name && email && password){
                if(password===confirmPassword){
                    dispatch(registerUser(name,email,password))
                }else{
                    toast.error('Password & Confirm Password does not Match !!!');
                }
            }else{
                toast.error('All Fields are Mandatory');
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            e.preventDefault()
            switch (e.target.name) {
                case "name": return setName(e.target.value);
                case "email": return setEmail(e.target.value);
                case "password": return setPassword(e.target.value);
                case "confirmPassword": return setConfirmPassword(e.target.value);
                default: return;
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <UserRegisterationStyles>
            <div className='rootDiv'>
                <div className='headerDiv'>
                    <h2>Registration</h2>
                    <div className='divider'></div>
                </div>

                {/* form here */}
                <div className='formDiv'>
                    <div className='textDiv'>
                        <TextField id="outlined-basic 1" sx={{ width: "30vw" }} value={name} name="name" label="Name" variant="outlined" onChange={handleOnChange} />
                    </div>
                    <div className='textDiv'>
                        <TextField type="email" sx={{ width: "30vw" }} value={email} name="email" id="outlined-basic 2" label="Email" variant="outlined" onChange={handleOnChange} />
                    </div>
                    <div className='textDiv'>
                        <TextField type="password" sx={{ width: "30vw" }} value={password} name="password" id="outlined-basic 3" label="Password" variant="outlined" onChange={handleOnChange} />
                    </div>
                    <div className='textDiv'>
                        <TextField type="password" sx={{ width: "30vw" }} value={confirmPassword} name="confirmPassword" id="outlined-basic 4" label="Confirm Password" variant="outlined" onChange={handleOnChange} />
                    </div>
                    <div className='buttonDiv'>
                        <Button variant="contained" onClick={handleOnSubmit}>Submit</Button>
                    </div>
                </div>
                {/* end of form here */}
                <div className='paragraphDiv'><p>Already Have An Account? <span onClick={()=>{return Router.push('/login')}}>Click Here to Login</span></p></div>
            </div>
        </UserRegisterationStyles>
    )
}
