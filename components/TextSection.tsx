'use client';

import { Box, Typography } from "@mui/material";
import { cn } from "@/lib/utils";
interface TextSectionProps{
    title : string
    text : string,
    titleClassName ?: string,
    className ?: string
}

export default function TextSection({title, text, className, titleClassName} : TextSectionProps){
    return(
        <Box className={cn("my-4 tablet:my-14 flex flex-col max-w-[300px] tablet:flex-row tablet:max-w-[600px] desktop:max-w-[900px] mx-auto", className)}>
            <Box className="self-center">
                <Typography color={"#1A7431"} fontFamily={"League Gothic"} fontWeight={"900"} textAlign={"center"} className={cn("text-xl tablet:w-[200px] desktop:w-[300px]", titleClassName)}>{title}</Typography>
            </Box>
            <Box className="self-center">
                <Typography textAlign={"center"} fontFamily={"Schibsted Grotesk"} className="text-center tablet:min-w-[400px]">{text}</Typography>
            </Box>
        </Box>
    )
}