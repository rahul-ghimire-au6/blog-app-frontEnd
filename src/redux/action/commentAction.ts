import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { commentActions } from '../slice/commentSlice';
import { Dispatch } from '@reduxjs/toolkit'
import Router from "next/router";
import {baseUrl} from '../../utils/constants';

interface errType {
    errMessage?: string
}

const handleBlogError = (dispatch: Dispatch, error: errType) => {
    dispatch(
        commentActions.setError(error)
    );
    if (error.errMessage === "jwt expired") {
        toast.error("Session Got Ended Please Log-in Again!")
        Router.push('/login')
    } else {
        toast.error(error.errMessage)
    }
}

// fetch All Blogs
export const fetchAllCommentByBlogId = (blogId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(commentActions.setLoading(true));
        const { data } = await axios.get(
            `${baseUrl}/comment/fetchAllCommentByBlogId/${blogId}`,
        );
        dispatch(commentActions.fetchAllComment(data.data));
    } catch (error) {
        let err = error as AxiosError
        let temp: errType = err.response && err.response.data ? err.response.data : { errMessage: 'An unexpected error has occured. Please try again later.' }
        handleBlogError(dispatch, temp)
    }
};

// create a blog 
// fetch Blogs by User Id
export const addComment = (blogId: string, commentData: string, authToken: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(commentActions.setLoading(true));
        const { data } = await axios.post(
            `${baseUrl}/comment/addComment/${blogId}`,
            { commentData },
            {
                headers: {
                    Authorization: authToken
                }
            }
        );
        if (data.success) {
            fetchAllCommentByBlogId(blogId)
            toast.success("Comment Added Successfully")
        }
    } catch (error) {
        let err = error as AxiosError
        let temp: errType = err.response && err.response.data ? err.response.data : { errMessage: 'An unexpected error has occured. Please try again later.' }
        handleBlogError(dispatch, temp)
    }
};
