'use client'
import { Box } from "@mui/material";
import PersonalForm from "@/components/forms/personalForm"
import TopSection from "@/components/TopSection";
import { getFormData } from "@/server-actions/uploadData";
import FormDropdown from "@/components/Accordion";
import EducationForm from "@/components/forms/EducationForm";
import EducationContainer from "@/components/forms/EducationContainer";
export default function Account(){
    getFormData()

    return(
        <Box>
            <TopSection title="Account"/>
            <FormDropdown children={<PersonalForm />} value="personalForm" text="Personal Information"/>
            <FormDropdown children={<EducationContainer />} value="education" text="Education"/>
            <FormDropdown children={<PersonalForm />} value="workHistory" text="Work History"/>
            <FormDropdown children={<PersonalForm />} value="skills" text="Skills"/>
            <FormDropdown children={<PersonalForm />} value="nonDisclosureForm" text="Non Disclosure Information"/>

        </Box>
    )
}