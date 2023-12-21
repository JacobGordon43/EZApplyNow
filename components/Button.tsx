'use client'
import React from "react"
import { Button as Btn}  from "@mui/material"
import { cn } from "@/lib/utils"
//Simple interface that enforces text for the button string and gives the option to use a className 
interface ButtonProps{
    onClick ?: React.MouseEventHandler
    text : string,
    className ?: string
}
//A simple button that is styled for repeated use, needs to add an onClick function 
export default function Button({onClick, text, className} : ButtonProps){
    return(
        <button className={cn("p-2 bg-[#eee]", className)} onClick={onClick}>{text}</button>
    )
}