/* eslint-disable react/no-unescaped-entities */
"use client"
import { useDispatch, useSelector } from "react-redux";
import { setEducationForms } from "@/redux/features/forms/educationSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
import {saveData} from '../../server-actions/handleData'

interface WorkForm {
    deleteBtn : React.ReactNode,
    formKey : string
}
export default function WorkForm({ formKey, deleteBtn} : WorkForm){
    const dispatch = useDispatch<AppDispatch>();
    const json = JSON.parse(localStorage.getItem("workForms") || "{}")
    const form = json.at(formKey);
    console.log(form)
    // dispatch(setEducationForms(json))
    const selectorForms = useAppSelector((state) => state.educationReducer.value.forms)
    const [formId, setFormId] = useState(form.values.formId);
    const [workTitle, setWorkTitle] = useState(form.values.workTitle);
    const [company, setCompany] = useState(form.values.COMPANY);
    const [to, setTo] = useState(form.values.to);
    const [from, setFrom] = useState(form.values.from);
    const [description, setDescription] = useState(form.values.location);
    const [location, setLocation] = useState(form.values.description);
    const [successfulSave, setSuccessfulSave] = useState(false);
    const [failedSave, setFailedSave] = useState(false);
    
    console.log(json)
    //Saves the form
    const saveForm = async (e : MouseEvent, key : string) =>{
        e.preventDefault();
        console.log(key)

        let upload : Promise<boolean> = saveData("educationFormData", {
            formId: formId,
            key: key,
            workTitle: workTitle,
            company: company,
            to: to,
            from: from,
            location: location,
            description: description,
            userId: localStorage.getItem("userId")
        }, setEducationForms, dispatch)

        if(await upload == true){
            setSuccessfulSave(true)
            setFailedSave(false)
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
                <label>Title</label>
                <input type="text" placeholder="Position" value={workTitle} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setWorkTitle(e.target.value)}/>
            </div> 
            <div className="flex flex-col">
                <label>Company</label>
                <input type="text" placeholder="Company Name" className="p-1 border-[#eee] border-2 shadow-sm" value={company} onChange={(e)=>setCompany(e.target.value)}/>
            </div> 
            <div className="flex flex-col">
                <label>From</label>
                <input type="text" placeholder="mm/yyyy" className="p-1 border-[#eee] border-2 shadow-sm" value={from} onChange={(e)=>setFrom(e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label>To (leave blank if currently working there)</label>
                <input type="text" placeholder="mm/yyyy" className="p-1 border-[#eee] border-2 shadow-sm" value={to} onChange={(e)=>setTo(e.target.value)}/>
            </div>  
            <div className="flex flex-col">
                <label>Location</label>
                <input type="text" placeholder="City, State" className="p-1 border-[#eee] border-2 shadow-sm" value={location} onChange={(e)=>setLocation(e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label>Description</label>
                <input type="text" placeholder="Ex. Computer Science" className="p-1 border-[#eee] border-2 shadow-sm" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <Box className="flex flex-col mt-3 tablet:flex-row">
                <Button text="Save" className="px-3 bg-[#2DC653] tablet:mr-3 mb-3 tablet:mb-0" onClick={(e : React.MouseEvent)=> saveForm(e, formKey)}/>
                {deleteBtn}
            </Box>
        </form>
    )
}