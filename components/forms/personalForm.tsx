import Link from "next/link";
import {login, logout} from "../../redux/features/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, setErrors, errorFormat, errorMessages } from "@/redux/features/errorSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/server-actions/validation";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
//import router from "next/router"
import { useRouter } from "next/navigation";

export default function LoginForm(){
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [statusCode, setStatusCode] = useState(0);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState("There was an issue logging in.")
    const errors = useAppSelector((state)=>state.errorMessagesReducer.value.errors);
    const router = useRouter();
    //dispatch(clearErrors())

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
        //const router = useRouter();
        let statusCode = 0;
        console.log("In login function");
        let errorMessages : Array<errorFormat> = [];
        let message = "";
        //Creates error messages if either fail validation
        if(!validateEmail(email)){
            errorMessages.push({input:"email", message:"The email provided is not in an email format"})
        }    
        if(!validatePassword(password)){
            errorMessages.push({input:"password", message:"Your password must be 8 characters long and include a lowercase, uppercase, special, and numerical character"})
        }
        //Prevents a call from being made to the API gateway if there are any error messages
        if(errorMessages.length == 0){
            dispatch(clearErrors())
            await fetch("https://tgcsxw5b6a.execute-api.us-west-1.amazonaws.com/dev/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "domainName": "localhost.com/login",
                "domainPrefix": "localhost",
                "time": new Date(),
                "body": {
                    "email": email,
                    "password": password
                }
                })
            }).then((res)=>{
                //Setting the statusCode to check later
                statusCode = res.status
                console.log(statusCode);
                //Returning the body of the data, which contains our message
                return res.json()
            }).then((data)=>{
                //Checking the status code to determine how to handle the request
                if(statusCode == 401){
                    errorMessages.push({input: "login", message: data.message})
                }else if(statusCode == 200){
                    console.log({email, uid:data.userId, name:data.name})
                    document.cookie = `email=${email}; userId=${data.userId}; name=${data.name}`
                    console.log(document.cookie);
                    dispatch(login({email, uid:data.userId, name:data.name}));
                    router.push("/");
                }else{
                    errorMessages.push({input: "signup", message: "There was an issue with the server. Please try again later."})
                }
            })
        }
        dispatch(setErrors(errorMessages))
        console.log(errors);
}

    return(
        <form className="mt-4 w-11/12 m-auto tablet:w-96">
            {loginError && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 mt-2 rounded-md">{loginErrorMessage}</Box>}
            <div className="flex flex-col">
                <label>First Name</label>
                <input type="text" placeholder="example@gmail.com" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEmail(e.target.value)}/>
                {emailError && <Box className="flex justify-center items-center bg-red-600 h-10 p-2 mt-2 rounded-md">The email is not in an email format</Box>}
            </div> 
            <div className="flex flex-col">
                <label>Last Name</label>
                <input type="text" placeholder="example@gmail.com" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEmail(e.target.value)}/>
                {emailError && <Box className="flex justify-center items-center bg-red-600 h-10 p-2 mt-2 rounded-md">The email is not in an email format</Box>}
            </div> 
            <div className="flex flex-col">
                <label>Home Address</label>
                <input type="text" placeholder="example@gmail.com" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEmail(e.target.value)}/>
                {emailError && <Box className="flex justify-center items-center bg-red-600 h-10 p-2 mt-2 rounded-md">The email is not in an email format</Box>}
            </div>
            <div className="flex flex-col">
                <label>State</label>
                <input type="text" placeholder="example@gmail.com" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEmail(e.target.value)}/>
                {emailError && <Box className="flex justify-center items-center bg-red-600 h-10 p-2 mt-2 rounded-md">The email is not in an email format</Box>}
            </div>  
            <div className="flex flex-col">
                <label>County</label>
                <input type="text" placeholder="example@gmail.com" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEmail(e.target.value)}/>
                {emailError && <Box className="flex justify-center items-center bg-red-600 h-10 p-2 mt-2 rounded-md">The email is not in an email format</Box>}
            </div> 
            <div className="flex flex-col">
                <label>Zipcode</label>
                <input type="text" placeholder="example@gmail.com" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEmail(e.target.value)}/>
                {emailError && <Box className="flex justify-center items-center bg-red-600 h-10 p-2 mt-2 rounded-md">The email is not in an email format</Box>}
            </div>
            <div className="flex flex-col">
                <label>Phone Number</label>
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
            </Box>
        </form>
    )
}