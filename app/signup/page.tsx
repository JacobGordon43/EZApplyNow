"use client"
import TopSection from "@/components/TopSection";
import { Box, Typography } from "@mui/material";
import {TextInput, PasswordInput} from "@/components/InputFields";
import Button from "@/components/Button";
import Link from "next/link";
import {validateEmail, validatePassword} from "@/server-actions/validation";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { clearErrors, setErrors, errorFormat } from "@/redux/features/loginErrorSlice";
import { useState } from "react";

async function createAccount(){

}
//Signup page, used for creating accounts.
export default function SignUp(){
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const errors = useAppSelector((state)=>state.errorMessagesReducer.value.errors)
    return(
        <Box>
            <TopSection title="Create an Account"/>
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
                    <Button text="Sign Up" className="px-3"/>
                    <Typography className="self-center">Already have an account? Login <Link href={"/login"} className="text-purple-900 underline">here</Link></Typography>
                </Box>

            </form>
        </Box>
    )

}