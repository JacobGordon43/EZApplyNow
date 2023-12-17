'use client';
import Link from "next/link";
import { Input } from "@mui/material";
import { cn } from "@/lib/utils";
//An interface that requires a label and provides an optional className and placeholder
interface InputProps{
    label : string,
    className ?: string,
    placeholder ?: string
}
//A basic text input that takes a label and placeholder text, as well as class names
function TextInput({label, placeholder, className} : InputProps){
    return(
        <div className="flex flex-col">
            <label>{label}</label>
            <input type="text" placeholder={placeholder} className={cn("p-1 border-[#eee] border-2 shadow-sm", className)}/>
        </div>    
    )
}

//A basic password input that takes a label and placeholder text, as well as class names
function PasswordInput({label, placeholder, className} : InputProps){
    return(
        <div className="flex flex-col">
            <label>{label}</label>
            <input type="Password" placeholder="********" className={cn("p-1 border-[#eee] border-2 shadow-sm", className)}/>
        </div>    
)
}

export {TextInput, PasswordInput}