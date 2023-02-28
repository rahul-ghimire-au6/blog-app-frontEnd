import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { blogActions } from '../slice/blogSlice';
import { Dispatch } from '@reduxjs/toolkit'
import Router from "next/router";
import {baseUrl} from '../../utils/constants';

interface errType {
    errMessage?: string
}

const handleBlogError = (dispatch:Dispatch,error:errType)=>{
    dispatch(
        blogActions.setError(error)
    );
    if(error.errMessage==="jwt expired"){
        toast.error("Session Got Ended Please Log-in Again!")
        Router.push('/login')
    }else{
        toast.error(error.errMessage)
    }
}

// fetch All Blogs
export const fetchAllBlog = () => async (dispatch: Dispatch) => {
    try {
        dispatch(blogActions.setLoading(true));
        const { data } = await axios.get(
            `${baseUrl}/blog/fetchAllBlog`,
        );
        dispatch(blogActions.fetchAllBlogs(data.data));
    } catch (error) {
        let err = error as AxiosError
        let temp: errType = err.response && err.response.data ? err.response.data : { errMessage: 'An unexpected error has occured. Please try again later.' }
        handleBlogError(dispatch,temp)
    }
};

// fetch Blogs by User Id
export const fetchBlogsByUserId = (authToken: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(blogActions.setLoading(true));
        const { data } = await axios.get(
            `${baseUrl}/blog/fetchBlogsByUserId`, {
            headers: {
                Authorization: authToken
            }
        }
        );
        dispatch(blogActions.fetchBlogsByUserId(data.data));
    } catch (error) {
        let err = error as AxiosError
        let temp: errType = err.response && err.response.data ? err.response.data : { errMessage: 'An unexpected error has occured. Please try again later.' }
        handleBlogError(dispatch,temp)
    }
};


// create a blog 
// fetch Blogs by User Id
export const createBlog = (blogTitle: string, blogDescription: string, authToken: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(blogActions.setLoading(true));
        const { data } = await axios.post(
            `${baseUrl}/blog/createBlog`,
            { blogTitle, blogDescription },
            {
                headers: {
                    Authorization: authToken
                }
            }
        );
        if(data.success){
            toast.success("Blog Saved Successfully, Click on Home to Check Your Blog")
        }
    } catch (error) {
        let err = error as AxiosError
        let temp: errType = err.response && err.response.data ? err.response.data : { errMessage: 'An unexpected error has occured. Please try again later.' }
        handleBlogError(dispatch,temp)
    }
};
