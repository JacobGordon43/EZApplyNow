'use client'

import { Box, Typography } from "@mui/material"
//A simple footer component using MUI
export default function Footer(){
    return(
        <Box className="w-screen bg-black h-16 ">
            <Box className="flex w-full h-full justify-center">
                <Typography color={"#2DC653"} className="m-auto">© 2023 EZApply. All rights reserved.</Typography>
            </Box>
        </Box>
    )

}