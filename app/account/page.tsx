'use client'
import { Box } from "@mui/material";
import PersonalForm from "@/components/forms/personalForm"
import TopSection from "@/components/TopSection";
import { GetFormData } from "@/server-actions/receiveData";
import FormDropdown from "@/components/Accordion";
import EducationForm from "@/components/forms/EducationForm";
import EducationContainer from "@/components/forms/EducationContainer";
export default function Account(){
    GetFormData("personalFormData");
    GetFormData("educationFormData")
    return(
        <Box>
            <TopSection title="Account"/>
            <FormDropdown value="personalForm" text="Personal Information"><PersonalForm /></FormDropdown>
            <FormDropdown value="education" text="Education"><EducationContainer /></FormDropdown>
            <FormDropdown value="workHistory" text="Work History"><EducationContainer /></FormDropdown>
            <FormDropdown value="skills" text="Skills"><PersonalForm /></FormDropdown>
            <FormDropdown value="nonDisclosureForm" text="Non Disclosure Information"><PersonalForm /></FormDropdown>
        </Box>
    )
}