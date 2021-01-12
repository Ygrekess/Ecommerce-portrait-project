import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import RegisterPage from '../Register_Page'
import SigninPage from '../Signin_Page'

export default function Connexion_Page(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
      return () => {
        //
      };
    }, [userInfo]);

    return (
      <div className="container-fluid d-flex justify-content-between w-100">
        <SigninPage/>
        <RegisterPage/>
      </div>
    )
}
