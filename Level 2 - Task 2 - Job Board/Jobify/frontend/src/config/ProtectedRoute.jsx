import axios from 'axios'
import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { setUser } from '../store/Reducers/Auth'

export const ProtectedRoute = ({children}) => {

    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const BASE_URL = "https://codsoft-jobify-api.vercel.app";

    const getUser = async () => {
        try{
            const {data} = await axios.get(`${BASE_URL}/api/v1/user/getProfile`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if(data.success){
                dispatch(setUser(data.user))
            }else{
                localStorage.removeItem('token');
                <Navigate to='/login'/>
            }

        }catch(error){
            console.log("something went wrong");
        }
    }

    useEffect(() => {
        if(!user) getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(localStorage.getItem('token'))
        return children
    else    
        return <Navigate to="/login"/>
}
