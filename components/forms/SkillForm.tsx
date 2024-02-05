import React, { MouseEvent, useEffect, useState } from "react"
import Button from "../Button"
import EducationForm from "./EducationForm"
import { useDispatch } from "react-redux"
import { useAppSelector, AppDispatch } from "@/redux/store";
import { setSkills, skillsFormat } from "@/redux/features/forms/skillsSlice";
import {v4 as uuidv4} from 'uuid';
import SkillBox from "../skillbox";
import { saveData } from "@/server-actions/receiveData";

export default function EducationContainer(){
    //let forms : React.ReactNode[] = [<EducationForm />
    let selectorSkills = useAppSelector((state) => state.skillReducer.value.form.skills)
    let uploaded = useAppSelector((state)=> state.skillReducer.value.form.uploaded)
    const json = JSON.parse(localStorage.getItem("nonDisclosureForm") || "{}")
    const [formId, setFormId] = useState(json.formId);
    const [skill, setSkill] = useState("")
    const [successfulSave, setSuccessfulSave] = useState(false);
    const [failedSave, setFailedSave] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // const deleteSkill = (e : MouseEvent, key : string)=> {
    //     e.preventDefault();
    //     let arr = selectorSkills;
    //     arr = arr.filter(item => item.key !== key)
    //     dispatch(setSkills(arr));
    // }

    const saveForm = async (e : MouseEvent) =>{
        e.preventDefault();
        let arr = selectorSkills;
        let upload : Promise<boolean> = saveData("nonDisclosureData", {
            formId,
            skills: arr,
            userId: localStorage.getItem('userId')
        })
        if(await upload == true){
            setSuccessfulSave(true)
            setFailedSave(false)
            dispatch(setSkills({uploaded: true, formId: formId, skills:arr}))
            console.log(localStorage.getItem('personalForm'));
        }else{
            setFailedSave(true);
            setSuccessfulSave(false);
        }
    }

    return(
        <form className="mt-4 w-11/12 m-auto tablet:max-w-[800px] ">
            <div className="flex pb-3 gap-2">
                <input type="text" className="p-1 border-[#eee] border-2 shadow-sm w-full" placeholder="Skill" onChange={(e)=>setSkill(e.target.value)}/>
                <Button text="Add" className="w-full mt-10 m-auto tablet:max-w-[150px]" onClick={(e)=>{
                    e.preventDefault()
                    let id = uuidv4();
                    let newSkill : skillsFormat = {
                            key: id,
                            skill: skill
                        }
                    dispatch(setSkills({uploaded: uploaded, formId: formId, skills:[...selectorSkills, newSkill]}))
                }}/>
            </div>
            
            <div className="flex flex-row flex-wrap gap-2">
                {
                    selectorSkills?.map(skill=>{
                        return <SkillBox key={skill.key} text={skill.skill}/>
                    })
                }
            </div>
            <Button text="Save" className="w-full mt-5 tablet:max-w-[150px]" onClick={(e) => saveForm(e)}/>
        </form>
    )
}