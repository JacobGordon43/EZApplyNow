// "use client";
import Link from "next/link";
import {login, logout} from "../../redux/features/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, setErrors, errorFormat, errorMessages } from "@/redux/features/errorSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/server-actions/validation";
import { redirect } from "next/navigation";
import { Box, Typography } from "@mui/material";
import Button from "../Button";

export default function LoginForm(){
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState("There was an issue logging in.")
    const errors = useAppSelector((state)=>state.errorMessagesReducer.value.errors);

    useEffect(()=>{
        setEmailError(false);
        setPasswordError(false);
        setLoginError(false);
        errors.map((error: { input: string, message : string })=>{
            if(error.input == "email"){
                setEmailError(true)
            }
    
            if(error.input == "password"){
                setPasswordError(true)
            }

            if(error.input == "login"){
                setLoginError(true);
                setLoginErrorMessage(error.message)
            }
        })    
    }, [emailError, errors, passwordError, loginError, loginErrorMessage] )
    
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
           await fetch("https://tgcsxw5b6a.execute-api.us-west-1.amazonaws.com/dev/login", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "headers": {
                      "Content-Type": "application/json"
                    },
                    "domainName": "localhost.com/login",
                    "domainPrefix": "localhost",
                    "time": new Date(),
                    "body": {
                      "email": email,
                      "password": password
                    }
                  })
            }).then((res)=>res.json()).then((data)=>{
                console.log(data);
                if(data.statusCode == 401){
                    errorMessages.push({input: "login", message: data.body.message})
                }else if(data.statusCode == 200){
                    redirect("/");
                }
            })
    
            // if(response.status == 200){
            //     redirect("/account");
            // }else if(response.status==401){
            //     errorMessages.push({input:"page", message:"Incorrect credentials. Try again or create an account."})
            //     dispatch(setErrors(errorMessages))
            // }
        // }else{
            dispatch(setErrors(errorMessages))
            console.log(errors);
        // }
        
        dispatch(login(email));
    }

    return(
        <form className="mt-4 w-11/12 m-auto tablet:w-96">
            {loginError && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 mt-2 rounded-md">{loginErrorMessage}</Box>}

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
                <Button text="Login" className="px-3" onClick={(e)=> loginAccount(e)}/>
                <Typography className="self-center">No Account? No problem, sign up <Link href={"/signup"} className="text-purple-900 underline">here</Link></Typography>
            </Box>
        </form>
    )
}