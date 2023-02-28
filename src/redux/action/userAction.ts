import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { userActions } from '../slice/userSlice';
import { Dispatch } from '@reduxjs/toolkit'
import Router from "next/router";
import {baseUrl} from '../../utils/constants';
// const baseUrl = process.env.baseUrl ?? "http://localhost:8080";

interface errType {
    errMessage?: string
}


// register user
export const registerUser = (name: string, email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(userActions.setLoading(true));
        const { data } = await axios.post(
            `${baseUrl}/user/register`,
            { name, email, password },
        );
        dispatch(userActions.register(data));
        toast.success('Registered Successfully, Pls Login !!!');
        Router.push('/login')
    } catch (error) {
        let err = error as AxiosError
        let temp: errType = err.response && err.response.data ? err.response.data : { errMessage: 'An unexpected error has occured. Please try again later.' }
        dispatch(
            userActions.setError(temp)
        );
        toast.error(temp.errMessage)
    }
};

//login user
export const loginUser = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(userActions.setLoading(true));
        const { data } = await axios.post(
            `${baseUrl}/user/login`,
            { email, password },
        );
        dispatch(userActions.login({ userName: data.data.userName, authToken: `Bearer ${data.data.authToken}` }));
        toast.success('Logged In Successfull');
        localStorage.setItem('userInfo', JSON.stringify({ userName: data.data.userName, authToken: `Bearer ${data.data.authToken}` }));
        Router.push('/')
    } catch (error) {
        let err = error as AxiosError
        let temp: errType = err.response && err.response.data ? err.response.data : { errMessage: 'An unexpected error has occured. Please try again later.' }
        dispatch(
            userActions.setError(temp)
        );
        toast.error(temp.errMessage)
    }
};

export const setUserDetails = (userName: string, authToken: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(userActions.setUserDetails({ userName, authToken }))
    } catch (error) {
        let err = error as AxiosError
        let temp: errType = err.response && err.response.data ? err.response.data : { errMessage: 'An unexpected error has occured. Please try again later.' }
        dispatch(
            userActions.setError(temp)
        );
        toast.error(temp.errMessage)
    }
}