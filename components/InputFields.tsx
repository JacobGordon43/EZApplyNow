'use client';
import Link from "next/link";
import { Input } from "@mui/material";
interface InputProps{
    
    className ?: string
}
function TextInput(){
    return(
        <Input type="text" />
    )
}