"use client"
import TopSection from "@/components/TopSection";
import { Box, Typography } from "@mui/material";
import {TextInput, PasswordInput} from "@/components/InputFields";
import Button from "@/components/Button";
import Link from "next/link";
import {validateEmail, validatePassword} from "@/server-actions/validation";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { clearErrors, setErrors, errorFormat } from "@/redux/features/errorSlice";
import { useState } from "react";
import SignUpForm from "@/components/forms/signUpForm";

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
            <SignUpForm />
        </Box>
    )

}