// "use client";
import Link from "next/link";
import {login, logout} from "../../redux/features/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, setErrors, errorFormat, errorMessages } from "@/redux/features/errorSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { validateEmail, validateNotEmpty, validatePassword } from "@/server-actions/validation";
import { redirect } from "next/navigation";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
import {v4 as uuidv4} from 'uuid';

export default function SignUpForm(){
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [signUpError, setsignUpError] = useState(false)
    const [signUpErrorMessage, setsignUpErrorMessage] = useState("There was an issue creating your account in.")
    const [nameError, setNameError] = useState(false)
    const errors = useAppSelector((state)=>state.errorMessagesReducer.value.errors);

    useEffect(()=>{
        setEmailError(false);
        setPasswordError(false);
        setsignUpError(false);
        setNameError(false);
        errors.map((error: { input: string, message : string })=>{
            if(error.input == "name"){
                setNameError(true);
            }

            if(error.input == "email"){
                setEmailError(true)
            }
    
            if(error.input == "password"){
                setPasswordError(true)
            }

            if(error.input == "signup"){
                setsignUpError(true);
                setsignUpErrorMessage(error.message)
            }
        })    
    }, [emailError, errors, passwordError, signUpError, signUpErrorMessage] )
    
    async function createAccount(e : MouseEvent){
        e.preventDefault();
        console.log("In signup function");
        //Clearns all previous error messages
        let errorMessages : Array<errorFormat> = [];
    
        //Checks all the forms to validate if they're in an acceptable format for the API
       //Otherwise, they are added to the error messages array 
        if(!validateNotEmpty(name)){
            errorMessages.push({input:"name", message:"This field must be filled out."})
        }
        if(!validateEmail(email)){
            errorMessages.push({input:"email", message:"The email provided is not in an email format"})
        }
        if(!validatePassword(password)){
            errorMessages.push({input:"password", message:"Your password must be 8 characters long and include a lowercase, uppercase, special, and numerical character"})
        }
        //currently not working
        if(errorMessages.length == 0){
            dispatch(clearErrors())
            const id = uuidv4();
            await fetch("https://tgcsxw5b6a.execute-api.us-west-1.amazonaws.com/dev/signup", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "domainName": "localhost.com/signup",
                    "domainPrefix": "localhost",
                    "time": new Date(),
                    "body": JSON.stringify({
                        "name": name,
                        "uuid": id,
                        "email": email,
                        "password": password
                    }),
                    
                    })
                }).then((res)=>res.json()).then((data)=>{
                    //data = JSON.parse(data.body);
                    console.log(data);
                    console.log(data.statusCode);
                    if(data.statusCode == 200){
                        redirect("/")
                    }else{
                        errorMessages.push({input: "signup", message: "There was an issue with the server. Please try again later."})
                    }
                })
            
           
        }
            // if(response.status == 200){
            //     redirect("/account");
            // }else if(response.status==401){
            //     errorMessages.push({input:"page", message:"Incorrect credentials. Try again or create an account."})
            //     dispatch(setErrors(errorMessages))
            // }
        // }
        // else{
            dispatch(setErrors(errorMessages))
            console.log(errors);
        // }
        
        //dispatch(login(email));
    }

    return(
        <form className="mt-4 w-11/12 m-auto tablet:w-96">
            {signUpError && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 mt-2 rounded-md">{signUpErrorMessage}</Box>}

            <div className="flex flex-col">
                <label>First Name</label>
                <input type="text" placeholder="John" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setName(e.target.value)}/>
                {nameError && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 mt-2 rounded-md">Your name can not be empty. Please enter your name to proceed.</Box>}
            </div> 
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
                <Button text="Login" className="px-3" onClick={(e)=> createAccount(e)}/>
                <Typography className="self-center">Already have an account? Login <Link href={"/login"} className="text-purple-900 underline">here</Link></Typography>
            </Box>
        </form>
    )
}
