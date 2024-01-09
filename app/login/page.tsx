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
    return(
        <Box>
            <TopSection title="Login"/>
            <LoginForm />
        </Box>
    )

}