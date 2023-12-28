//Using redux requires the 'use client'
"use client";
import TopSection from "@/components/TopSection";
import { Box, Typography } from "@mui/material";
import {TextInput, PasswordInput} from "@/components/InputFields";
import Button from "@/components/Button";
import Link from "next/link";
import {login, logout} from "../../redux/features/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, setErrors, errorFormat } from "@/redux/features/errorSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/server-actions/validation";
import LoginForm from "@/components/forms/loginForm";
//Page used for logging in
export default function Login(){
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const errors = useAppSelector((state)=>state.errorMessagesReducer.value.errors);

    //Using useEffect to prevent a re-rendering error. Resets the error states and sets them to true if the corresponding input is in the redux error array
    useEffect(()=>{
        setEmailError(false);
        setPasswordError(false);
        errors.map((error)=>{
            if(error.input == "email"){
                setEmailError(true)
            }
    
            if(error.input == "password"){
                setPasswordError(true)
            }
        })    
    }, [emailError, errors, passwordError])
    //Async function for logging into an account.
    async function loginAccount(e : MouseEvent){
        e.preventDefault();
        console.log("In login function");
        let errorMessages : Array<errorFormat> = [];


        if(!validateEmail(email)){
            errorMessages.push({input:"email", message:"The email provided is not in an email format"})
        }
        
        if(!validatePassword(password)){
            errorMessages.push({input:"password", message:"Your password must be 8 characters long and include a lowercase, uppercase, special, and numerical character"})
        }
        //currently not working
        // if(errorMessages.length == 0){
        //     dispatch(clearErrors())
           await fetch("/api/login", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((res)=>console.log(res))

            // if(response.status == 200){
            //     redirect("/account");
            // }else if(response.status==401){
            //     errorMessages.push({input:"page", message:"Incorrect credentials. Try again or create an account."})
            //     dispatch(setErrors(errorMessages))
            // }
        // }else{
            dispatch(setErrors(errorMessages))
        // }
        
        dispatch(login(email));
    }
        
    return(
        <Box>
            <TopSection title="Login"/>
            <LoginForm />
        </Box>
    )

}