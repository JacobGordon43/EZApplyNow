"use client"
import Link from "next/link";
import { setNonDisclosureForm } from "@/redux/features/forms/nonDisclosureSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
//import router from "next/router"
import {GetFormData, saveData} from '../../server-actions/handleData'
export default function NonDisclosureForm(){
    const dispatch = useDispatch<AppDispatch>();
    const json = JSON.parse(localStorage.getItem("nonDisclosureForm") || "{}")
    const [formId, setFormId] = useState(json.formId);
    const [sex, setSex] = useState(json.sex);
    const [disability, setDisability] = useState(json.disability);
    //const [sexualOrientation, setSexualOrientation] = useState(json.sexualOrientation);
    const [veteranStatus, setVeteranStatus] = useState(json.veteranStatus);
    const [race, setRace] = useState(json.race);
    const [ethnicity, setEthnicity] = useState(json.ethnicity);
    const [successfulSave, setSuccessfulSave] = useState(false);
    const [failedSave, setFailedSave] = useState(false);
    console.log(json)
    const saveForm = async (e : MouseEvent) => {
        e.preventDefault();
        
        //let uploaded = useAppSelector((veteranStatus)=>veteranStatus.personalReducer.value.form.uploaded)
        //dispatch(setForm({uploaded: uploaded, sex: sex, disability: disability, sexualOrientation: sexualOrientation, veteranStatus: veteranStatus, race: race, ethnicity: ethnicity, phoneNumber: phoneNumber, phoneNumberType: phoneNumberType}))
        
        //Uploads the data and stores the results in upload
        let upload : Promise<boolean> = saveData("nonDisclosureFormData", {
            formId: json.formId,
            sex,
            disability,
            race,
            veteranStatus,
            ethnicity,
            userId: localStorage.getItem('userId')
        }, setNonDisclosureForm, dispatch);
        //Once it's been uploaded, if it was uploaded then we update the UI with a success message and set the redux with the updated information. Otherwise, we display a failure message.
        if(await upload == true){
            setSuccessfulSave(true)
            setFailedSave(false)
            // dispatch(setNonDisclosureForm({uploaded: true, formId: formId, sex: sex, disability: disability, veteranStatus: veteranStatus, race: race, ethnicity: ethnicity}))
            console.log(localStorage.getItem('nonDisclosureForm'));
        }else{
            setFailedSave(true);
            setSuccessfulSave(false);
        }
    }

    //Displays non disclosure form
    //I intiially was going to have it use select fields but having it be automatically set to an option based on the data recieved from the database was not going to work at this time
    return(
        <form className="mt-4 w-11/12 m-auto tablet:max-w-[800px] ">
            {successfulSave && <Box className="flex justify-center items-center text-center bg-green-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was saved successfully</Box>}
            {failedSave && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was not saved</Box>}

            <div className="desktop:grid desktop:grid-cols-2 desktop:gap-x-2">
                <div className="flex flex-col">
                    <label>What is your sex?</label>
                    <input type="text" placeholder="Male" value={sex} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setSex(e.target.value)}/>
                </div> 
                <div className="flex flex-col">
                    <label>Do you have any disabilities?</label>
                    <input type="text" placeholder="No Disability" value={disability} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setDisability(e.target.value)}/>
                </div> 
                <div className="flex flex-col">
                    <label>Are you a protected veteran?</label>
                    <input type="text" placeholder="Not a protected veteran" value={veteranStatus} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setVeteranStatus(e.target.value)}/>
                    </div>  
                <div className="flex flex-col">
                    <label>Race</label>
                    <input type="text" placeholder="White" value={race} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setRace(e.target.value)}/>
                </div> 
                <div className="flex flex-col">
                    <label>Ethnicity</label>
                    <input type="text" placeholder="Not Hispanic" value={ethnicity} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEthnicity(e.target.value)}/>
                </div>
            </div>
            <Box className="flex flex-col mt-3 tablet:flex-row justify-between">
                <Button text="Save" className="px-3 bg-[#2DC653]" onClick={(e)=> saveForm(e)}/>
            </Box>
        </form>
    )
}