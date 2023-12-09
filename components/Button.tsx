'use client'
import React from "react"
import { Button as Btn}  from "@mui/material"
import { cn } from "@/lib/utils"
interface ButtonProps{
    text : string,
    className ?: string
}
export default function Button({text, className} : ButtonProps){
    return(
        <button className={cn("p-2", className)}>{text}</button>
    )
}