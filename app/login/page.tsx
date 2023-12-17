//Using redux requires the 'use client'
"use client";
import TopSection from "@/components/TopSection";
import { Box, Typography } from "@mui/material";
import {TextInput, PasswordInput} from "@/components/InputFields";
import Button from "@/components/Button";
import Link from "next/link";
import {login, logout} from "../../redux/features/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { clearErrors, setErrors, errorFormat } from "@/redux/features/loginErrorSlice";
import { useAppSelector } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/server-actions/validation";
import { redirect } from "next/navigation";

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
        //    await fetch("/api/login", {
        //         method: "POST",
        //         headers:{
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             password: password
        //         })
        //     }).then((res)=>console.log(res))

            // if(response.status == 200){
            //     redirect("/account");
            // }else if(response.status==401){
            //     errorMessages.push({input:"page", message:"Incorrect credentials. Try again or create an account."})
            //     dispatch(setErrors(errorMessages))
            // }
        // }else{
        //     dispatch(setErrors(errorMessages))
        // }
        
        dispatch(login(email));
    }
        
    return(
        <Box>
            <TopSection title="Login"/>
            <form className="mt-4 w-11/12 m-auto tablet:w-96">
                <div className="flex flex-col">
                    <label>Email</label>
                    <input type="text" placeholder="example@gmail.com" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEmail(e.target.value)}/>
                    {emailError && <Box className="flex justify-center items-center bg-red-600 h-10 p-2 mt-2 rounded-md">The email is not in an email format</Box>}
                </div> 

                {/* {errors[0]?.input=="email" && <Box>{errors[0].message}</Box>} */}
                <div className="flex flex-col">
                    <label>Password</label>
                    <input type="password" placeholder="********" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setPassword(e.target.value)}/>
                    {passwordError && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 mt-2 rounded-md">Your password must be 8 characters long and include a lowercase, uppercase, special, and numerical character</Box>}
                </div> 
                <Box className="flex flex-col mt-3 tablet:flex-row justify-between">
                    <Button text="Login" className="px-3"/>
                    <Typography className="self-center">No Account? No problem, sign up <Link href={"/signup"} className="text-purple-900 underline">here</Link></Typography>
                </Box>
                <button onClick={(e)=> loginAccount(e)}>Login</button>
            </form>
        </Box>
    )

}