'use client'
import { Box } from "@mui/material";
import PersonalForm from "@/components/forms/personalForm"
import TopSection from "@/components/TopSection";
import { GetFormData } from "@/server-actions/handleData";
import FormDropdown from "@/components/Accordion";
import EducationForm from "@/components/forms/EducationForm";
import EducationContainer from "@/components/forms/EducationContainer";
import NonDisclosureForm from "@/components/forms/nonDisclosureForm";
import SkillsForm from "@/components/forms/SkillForm";
import { setPersonalForm } from "@/redux/features/forms/personalSlice";
import { setNonDisclosureForm } from "@/redux/features/forms/nonDisclosureSlice"
import { useRouter } from "next/navigation";
import { setSkills } from "@/redux/features/forms/skillsSlice";
import { setEducationForms } from "@/redux/features/forms/educationSlice";
export default function Account(){
    const router = useRouter();
    if(localStorage.length === 0){
        router.push("/");
    }
    
    GetFormData("personalFormData", setPersonalForm, true);
    GetFormData("nonDisclosureFormData", setNonDisclosureForm, true);
    GetFormData("skillsFormData", setSkills, true);
    GetFormData("educationFormData", setEducationForms, false)
    //GetFormData("educationFormData");
    return(
        <Box>
            <TopSection title="Account"/>
            <FormDropdown value="personalForm" text="Personal Information"><PersonalForm /></FormDropdown>
            <FormDropdown value="education" text="Education"><EducationContainer /></FormDropdown>
            <FormDropdown value="workHistory" text="Work History"><EducationContainer /></FormDropdown>
            <FormDropdown value="skills" text="Skills"><SkillsForm /></FormDropdown>
            <FormDropdown value="nonDisclosureForm" text="Non Disclosure Information"><NonDisclosureForm /></FormDropdown>
        </Box>
    )
}