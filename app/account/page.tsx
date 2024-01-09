'use client'
import { Box } from "@mui/material";
import PersonalForm from "@/components/forms/personalForm"
import TopSection from "@/components/TopSection";
export default function Account(){
    return(
        <Box>
            <TopSection title="Account"/>
            <PersonalForm />
        </Box>
    )
}