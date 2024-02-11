/* eslint-disable react/no-unescaped-entities */
"use client"
import { useDispatch, useSelector } from "react-redux";
import { setForms } from "@/redux/features/forms/educationSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
import {saveData} from '../../server-actions/handleData'

interface LoginForm {
    deleteBtn : React.ReactNode,
    saveBtn : React.ReactNode,

}
export default function LoginForm({saveBtn, deleteBtn} : LoginForm){
    const dispatch = useDispatch<AppDispatch>();
    const json = JSON.parse(localStorage.getItem("educationForm") || "{}")
    
    const [formId, setFormId] = useState(json.formId);
    const [schoolName, setSchoolName] = useState(json.schoolName);
    const [GPA, setGPA] = useState(json.GPA);
    const [endDate, setEndDate] = useState(json.endDate);
    const [startDate, setStartDate] = useState(json.startDate);
    const [degree, setDegree] = useState(json.degree);
    const [fieldOfStudy, setFieldOfStudy] = useState(json.fieldOfStudy);
    const [successfulSave, setSuccessfulSave] = useState(false);
    const [failedSave, setFailedSave] = useState(false);

    const errors = useAppSelector((state)=>state.errorMessagesReducer.value.errors);

    // const saveForm = async (e : MouseEvent) => {
    //     e.preventDefault();
        
    //     //let uploaded = useAppSelector((state)=>state.personalReducer.value.form.uploaded)
    //     //dispatch(setForm({uploaded: uploaded, firstName: firstName, lastName: lastName, address: address, state: state, county: county, zipcode: zipcode, phoneNumber: phoneNumber, phoneNumberType: phoneNumberType}))
    //     let upload : Promise<boolean> = saveData({
    //         GPA,
    //         schoolName,
    //         startDate,
    //         endDate, 
    //         degree,
    //         fieldOfStudy,
    //         userId: localStorage.getItem('userId')
    //     });

    //     if(await upload == true){
    //         setSuccessfulSave(true)
    //         setFailedSave(false)
    //         dispatch(setForms({uploaded: true, formId: formId, firstName: firstName, lastName: lastName, address: address, state: state, county: county, zipcode: zipcode, phoneNumber: phoneNumber, phoneNumberType: phoneNumberType}))
    //         console.log(localStorage.getItem('personalForm'));
    //     }else{
    //         setFailedSave(true);
    //         setSuccessfulSave(false);
    //     }
    // }

    return(
        <form className="mt-4 w-11/12 m-auto tablet:max-w-[800px] desktop:grid desktop:grid-cols-2 desktop:gap-x-2">
            {successfulSave && <Box className="flex justify-center items-center text-center bg-green-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was saved successfully</Box>}
            {failedSave && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was saved not saved</Box>}            <div className="flex flex-col">
                <label>School Name</label>
                <input type="text" placeholder="Example State University" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setSchoolName(e.target.value)}/>
            </div> 
            <div className="flex flex-col">
                <label>GPA</label>
                <input type="text" placeholder="0.00" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setGPA(e.target.value)}/>
            </div> 
            <div className="flex flex-col">
                <label>Start Date</label>
                <input type="text" placeholder="mm/yyyy" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setStartDate(e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label>Graduation (Actual or Expected)</label>
                <input type="text" placeholder="mm/yyyy" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEndDate(e.target.value)}/>
            </div>  
            <div className="flex flex-col">
                <label>Degree Type</label>
                <select className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setDegree(e.target.value)}>
                    <option>Bachelor</option>
                    <option>Master's</option>
                    <option>Certification</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label>Field of Study</label>
                <input type="text" placeholder="Ex. Computer Science" className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setFieldOfStudy(e.target.value)}/>
            </div>
            <Box className="flex flex-col mt-3 tablet:flex-row">
                <Button text="Save" className="px-3 bg-[#2DC653] tablet:mr-3 mb-3 tablet:mb-0" onClick={(e)=> console.log('clicked')}/>
                {saveBtn}
                {deleteBtn}
            </Box>
        </form>
    )
}