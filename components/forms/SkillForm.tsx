import React, { MouseEvent, useEffect, useState } from "react"
import Button from "../Button"
import EducationForm from "./EducationForm"
import { useDispatch } from "react-redux"
import { useAppSelector, AppDispatch } from "@/redux/store";
import { setSkills, skillsFormat } from "@/redux/features/forms/skillsSlice";
import {v4 as uuidv4} from 'uuid';
import SkillBox from "../skillbox";
import { saveData } from "@/server-actions/handleData";
import { Box } from "@mui/material";

export default function EducationContainer(){
    //let forms : React.ReactNode[] = [<EducationForm />
    let selectorSkills = useAppSelector((state) => state.skillReducer.value.form.skills)
    let uploaded = useAppSelector((state)=> state.skillReducer.value.form.uploaded)
    const json = JSON.parse(localStorage.getItem("skills") || "{}")
    // const [formId, setFormId] = useState(json.formId);
    const [skill, setSkill] = useState("")
    const [successfulSave, setSuccessfulSave] = useState(false);
    const [failedSave, setFailedSave] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // console.log(formId)
    console.log(json.uploaded)
    console.log(json)
    const deleteSkill = (e : MouseEvent, key : string)=> {
        e.preventDefault();
        let arr = selectorSkills;
        arr = arr.filter(item => item.key !== key)
        dispatch(setSkills({uploaded: uploaded, formId: json.formId, skills:arr}))
    }

    const saveForm = async (e : MouseEvent) =>{
        e.preventDefault();
        if(selectorSkills === undefined || selectorSkills.length === 0){
            setFailedSave(true);
            return
        }
        let arr : Array<string> = [];
        selectorSkills.forEach(skill => {
            arr.push(skill.skill);
            console.log(arr);
        });
        console.log(localStorage.getItem('userId'))

        //Uploads the data and stores the results in upload      
        console.log(json.formId)  
        let upload : Promise<boolean> = saveData("skillsFormData", {
            formId: json.formId,
            skills: selectorSkills,
            userId: localStorage.getItem('userId'),
        }, setSkills, dispatch)

        console.log(upload);

        //Once it's been uploaded, if it was uploaded then we update the UI with a success message and set the redux with the updated information. Otherwise, we display a failure message.
        if(await upload == true){
            setSuccessfulSave(true)
            setFailedSave(false)
            // dispatch(setSkills({uploaded: true, formId: formId, skills:selectorSkills}))
            console.log(localStorage.getItem('skills'));
        }else{
            setFailedSave(true);
            setSuccessfulSave(false);
        }
    }

    return(
        <form className="mt-4 w-11/12 m-auto tablet:max-w-[800px] ">
            {successfulSave && <Box className="flex justify-center items-center text-center bg-green-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was saved successfully</Box>}
            {failedSave && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was not saved</Box>}

            <div className="flex pb-3 gap-2">
                <input id="skillInput" type="text" className="p-1 border-[#eee] border-2 shadow-sm w-full" placeholder="Skill" onChange={(e)=>setSkill(e.target.value)}/>
                <Button text="Add" className="w-full mt-10 m-auto tablet:max-w-[150px]" onClick={(e)=>{
                    e.preventDefault()
                    let id = uuidv4();
                    let newSkill : skillsFormat = {
                            key: id,
                            skill: skill
                        }
                    dispatch(setSkills({uploaded: uploaded, formId: json.formId, skills: (selectorSkills != undefined ? [...selectorSkills, newSkill] : [newSkill])}))
                }}/>
            </div>
            
            <div className="flex flex-row flex-wrap gap-2">
                {
                    selectorSkills?.map(skill=>{
                        return <SkillBox key={skill.key} text={skill.skill} onClick={(e : React.MouseEvent) => deleteSkill(e, skill.key)}/>
                    })
                }
            </div>
            <Button text="Save" className="w-full mt-5 tablet:max-w-[150px]" onClick={(e) => saveForm(e)}/>
        </form>
    )
}