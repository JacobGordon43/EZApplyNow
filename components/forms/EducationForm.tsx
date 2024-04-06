/* eslint-disable react/no-unescaped-entities */
"use client"
import { useDispatch, useSelector } from "react-redux";
import { setEducationForms } from "@/redux/features/forms/educationSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
import {saveData} from '../../server-actions/handleData'

interface LoginForm {
    deleteBtn : React.ReactNode,
    formKey : string
}
export default function LoginForm({ formKey, deleteBtn} : LoginForm){
    const dispatch = useDispatch<AppDispatch>();
    const json = JSON.parse(localStorage.getItem("educationForms") || "{}")
    const form = json.at(formKey);
    console.log(form)
    // dispatch(setEducationForms(json))
    const selectorForms = useAppSelector((state) => state.educationReducer.value.forms)
    const [formId, setFormId] = useState(form.values.formId);
    const [schoolName, setSchoolName] = useState(form.values.schoolName);
    const [GPA, setGPA] = useState(form.values.GPA);
    const [endDate, setEndDate] = useState(form.values.endDate);
    const [startDate, setStartDate] = useState(form.values.startDate);
    const [degree, setDegree] = useState(form.values.degree);
    const [field, setField] = useState(form.values.field);
    const [successfulSave, setSuccessfulSave] = useState(false);
    const [failedSave, setFailedSave] = useState(false);
    
    console.log(json)
    console.log(schoolName)
    //Saves the form
    const saveForm = async (e : MouseEvent, key : string) =>{
        e.preventDefault();
        console.log(key)

        let upload : Promise<boolean> = saveData("educationFormData", {
            formId: formId,
            key: key,
            schoolName: schoolName,
            GPA: GPA,
            endDate: endDate,
            startDate: startDate,
            degree: degree,
            field: field,
            userId: localStorage.getItem("userId")
        }, setEducationForms, dispatch)

        if(await upload == true){
            setSuccessfulSave(true)
            setFailedSave(false)

        //Copies the selectorForms array to a new one
        let arr = [...selectorForms];
        console.log(key);
        //Goes through each form and uses an anoynmous function with two paramaters, using form as the form and index as an incrementing value
        // arr.forEach(function(form, index){
        //     //If the two keys match, it will replace that form with a new value consisting of new data
        //     if(form.key == key){
        //         arr[index] = {key : key, values: {
        //             uploaded: true,
        //             formId: formId,
        //             schoolName: schoolName,
        //             GPA: GPA,
        //             endDate: endDate,
        //             startDate: startDate,
        //             degree: degree,
        //             field: field
        //         }}
        //         //Exits the foreach as it found what it needed
        //         return
        //     }
        // })
            //dispatch(setEducationForms(arr))
            console.log(localStorage.getItem('educationForms'));
        }else{
            setFailedSave(true);
            setSuccessfulSave(false);
        }

        console.log(selectorForms);
    }


    return(
        <form className="mt-4 w-11/12 m-auto tablet:max-w-[800px] desktop:grid desktop:grid-cols-2 desktop:gap-x-2">
            {successfulSave && <Box className="flex justify-center items-center text-center bg-green-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was saved successfully</Box>}
            {failedSave && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was saved not saved</Box>}            
            <div className="flex flex-col">
                <label>School Name</label>
                <input type="text" placeholder="Example State University" value={schoolName} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setSchoolName(e.target.value)}/>
            </div> 
            <div className="flex flex-col">
                <label>GPA</label>
                <input type="text" placeholder="0.00" className="p-1 border-[#eee] border-2 shadow-sm" value={GPA} onChange={(e)=>setGPA(e.target.value)}/>
            </div> 
            <div className="flex flex-col">
                <label>Start Date</label>
                <input type="text" placeholder="mm/yyyy" className="p-1 border-[#eee] border-2 shadow-sm" value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label>Graduation (Actual or Expected)</label>
                <input type="text" placeholder="mm/yyyy" className="p-1 border-[#eee] border-2 shadow-sm" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
            </div>  
            <div className="flex flex-col">
                <label>Degree Type</label>
                <input type="text" placeholder="Bachelor" className="p-1 border-[#eee] border-2 shadow-sm" value={degree} onChange={(e)=>setDegree(e.target.value)}/>

            </div>
            <div className="flex flex-col">
                <label>Field of Study</label>
                <input type="text" placeholder="Ex. Computer Science" className="p-1 border-[#eee] border-2 shadow-sm" value={field} onChange={(e)=>setField(e.target.value)}/>
            </div>
            <Box className="flex flex-col mt-3 tablet:flex-row">
                <Button text="Save" className="px-3 bg-[#2DC653] tablet:mr-3 mb-3 tablet:mb-0" onClick={(e : React.MouseEvent)=> saveForm(e, formKey)}/>
                {/* {saveBtn} */}
                {deleteBtn}
            </Box>
        </form>
    )
}