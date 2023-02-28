import { useEffect } from 'react'
import Router from 'next/router';
import { toast } from 'react-toastify';
import { setUserDetails } from '../redux/action/userAction'
import { useAppDispatch } from '../redux/reduxHooks'

export default function ValidateUserInfo() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo") as string);
    if (!userData || !userData.authToken) {
      toast.error('please login')
      Router.push('/login')
    } else {
      dispatch(setUserDetails(userData.userName, userData.authToken));
    }
  }, [dispatch])
  return (
    <></>
  )
}
