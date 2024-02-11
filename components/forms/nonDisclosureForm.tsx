"use client"
import Link from "next/link";
import { setForm } from "@/redux/features/forms/nonDisclosureSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
//import router from "next/router"
import {saveData} from '../../server-actions/handleData'
export default function NonDisclosureForm(){
    const dispatch = useDispatch<AppDispatch>();
    const json = JSON.parse(localStorage.getItem("personalForm") || "{}")
    const [formId, setFormId] = useState(json.formId);
    const [sex, setSex] = useState(json.sex);
    const [disability, setDisability] = useState(json.disability);
    //const [sexualOrientation, setSexualOrientation] = useState(json.sexualOrientation);
    const [veteranStatus, setVeteranStatus] = useState(json.veteranStatus);
    const [race, setRace] = useState(json.race);
    const [ethnicity, setEthnicity] = useState(json.ethnicity);
    const [successfulSave, setSuccessfulSave] = useState(false);
    const [failedSave, setFailedSave] = useState(false);

    const saveForm = async (e : MouseEvent) => {
        e.preventDefault();
        
        //let uploaded = useAppSelector((veteranStatus)=>veteranStatus.personalReducer.value.form.uploaded)
        //dispatch(setForm({uploaded: uploaded, sex: sex, disability: disability, sexualOrientation: sexualOrientation, veteranStatus: veteranStatus, race: race, ethnicity: ethnicity, phoneNumber: phoneNumber, phoneNumberType: phoneNumberType}))
        let upload : Promise<boolean> = saveData("nonDisclosureFormData", {
            formId,
            sex,
            disability,
            race,
            veteranStatus,
            ethnicity,
            userId: localStorage.getItem('userId')
        });

        if(await upload == true){
            setSuccessfulSave(true)
            setFailedSave(false)
            dispatch(setForm({uploaded: true, formId: formId, sex: sex, disability: disability, veteranStatus: veteranStatus, race: race, ethnicity: ethnicity}))
            console.log(localStorage.getItem('personalForm'));
        }else{
            setFailedSave(true);
            setSuccessfulSave(false);
        }
    }

    return(
        <form className="mt-4 w-11/12 m-auto tablet:max-w-[800px] ">
            {successfulSave && <Box className="flex justify-center items-center text-center bg-green-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was saved successfully</Box>}
            {failedSave && <Box className="flex justify-center items-center text-center bg-red-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was not saved</Box>}

            <div className="desktop:grid desktop:grid-cols-2 desktop:gap-x-2">
                <div className="flex flex-col">
                    <label>What is your sex?</label>
                    <input type="text" placeholder="Male" value={sex} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setSex(e.target.value)}/>
                    {/* <select className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setSex(e.target.value)}>
                        <option value="unselected">Select One</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>
                    </select> */}
                </div> 
                <div className="flex flex-col">
                    <label>Do you have any disabilities?</label>
                    <input type="text" placeholder="No Disability" value={disability} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setDisability(e.target.value)}/>

                    {/* <select className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setDisability(e.target.value)}>
                        <option value="unselected">Select One</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>

                    </select>                 */}
                </div> 
                <div className="flex flex-col">
                    <label>Are you a protected veteran?</label>
                    <input type="text" placeholder="Not a protected veteran" value={veteranStatus} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setVeteranStatus(e.target.value)}/>
                    {/* <select className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setVeteranStatus(e.target.value)}>
                        <option value="Select One">Select One</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>

                    </select>                 */}
                    </div>  
                <div className="flex flex-col">
                    <label>Race</label>
                    <input type="text" placeholder="White" value={race} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setRace(e.target.value)}/>
                    {/* <select className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setRace(e.target.value)}>
                        <option value="Select One">Select One</option>
                        <option value="White">White</option>
                        <option value="...">...</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>

                    </select>                 */}
                </div> 
                <div className="flex flex-col">
                    <label>Ethnicity</label>
                    <input type="text" placeholder="Not Hispanic" value={ethnicity} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEthnicity(e.target.value)}/>

                    {/* <select className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setEthnicity(e.target.value)}>
                        <option value="Select One">Select One</option>
                        <option value="Hispanic">Hispanic</option>
                        <option value="Not Hispanic">Not Hispanic</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>

                    </select>                 */}
                </div>
            </div>
            <Box className="flex flex-col mt-3 tablet:flex-row justify-between">
                <Button text="Save" className="px-3 bg-[#2DC653]" onClick={(e)=> saveForm(e)}/>
            </Box>
        </form>
    )
}