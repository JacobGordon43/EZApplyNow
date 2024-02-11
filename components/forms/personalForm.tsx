"use client"
import Link from "next/link";
import { setForm } from "@/redux/features/forms/personalSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, setErrors, errorFormat, errorMessages } from "@/redux/features/errorSlice";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { MouseEvent, useEffect, useState } from "react";
import { validateEmail, validatePassword } from "@/server-actions/validation";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
//import router from "next/router"
import {GetFormData, saveData} from '../../server-actions/handleData'
export default function PersonalForm(){
    const dispatch = useDispatch<AppDispatch>();
    const json = JSON.parse(localStorage.getItem("personalForm") || "{}")
    
    const [formId, setFormId] = useState(json.formId);
    const [firstName, setFirstName] = useState(json.firstName);
    const [lastName, setLastName] = useState(json.lastName);
    const [address, setAddress] = useState(json.address);
    const [state, setState] = useState(json.state);
    const [county, setCounty] = useState(json.county);
    const [zipcode, setZipcode] = useState(json.zipcode);
    const [phoneNumber, setPhoneNumber] = useState(json.phoneNumber);
    const [phoneNumberType, setPhoneNumberType] = useState(json.phoneNumberType);
    const [successfulSave, setSuccessfulSave] = useState(false);
    const [failedSave, setFailedSave] = useState(false);

    //GetFormData("personalFormData", setForm);

    const saveForm = async (e : MouseEvent) => {
        e.preventDefault();
        
        //let uploaded = useAppSelector((state)=>state.personalReducer.value.form.uploaded)
        //dispatch(setForm({uploaded: uploaded, firstName: firstName, lastName: lastName, address: address, state: state, county: county, zipcode: zipcode, phoneNumber: phoneNumber, phoneNumberType: phoneNumberType}))
        let upload : Promise<boolean> = saveData("personalFormData", {
            formId,
            firstName,
            lastName,
            address, 
            county,
            state,
            zipcode,
            phoneNumber,
            phoneNumberType,
            userId: localStorage.getItem('userId')
        });

        if(await upload == true){
            setSuccessfulSave(true)
            setFailedSave(false)
            dispatch(setForm({uploaded: true, formId: formId, firstName: firstName, lastName: lastName, address: address, state: state, county: county, zipcode: zipcode, phoneNumber: phoneNumber, phoneNumberType: phoneNumberType}))
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
                    <label>First Name</label>
                    <input type="text" placeholder="John" value={firstName} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setFirstName(e.target.value)}/>
                </div> 
                <div className="flex flex-col">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" value={lastName} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setLastName(e.target.value)}/>
                </div> 
                <div className="flex flex-col">
                    <label>Home Address</label>
                    <input type="text" placeholder="1234 Example Ave" value={address} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <label>State</label>
                    <input type="text" placeholder="Arizona" value={state} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setState(e.target.value)}/>
                </div>  
                <div className="flex flex-col">
                    <label>County</label>
                    <input type="text" placeholder="Maricopa" value={county} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setCounty(e.target.value)}/>
                </div> 
                <div className="flex flex-col">
                    <label>Zipcode</label>
                    <input type="text" placeholder="12345" value={zipcode} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setZipcode(e.target.value)}/>
                </div>
                <div className="flex flex-col">
                    <label>Phone Number</label>
                    <input type="text" placeholder="123-456-7890" value={phoneNumber} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setPhoneNumber(e.target.value)}/>
                </div>
                {/* {errors[0]?.input=="email" && <Box>{errors[0].message}</Box>} */}
                <div className="flex flex-col">
                    <label>Phone Number Type</label>
                    <input type="text" placeholder="Landline" value={phoneNumberType} className="p-1 border-[#eee] border-2 shadow-sm" onChange={(e)=>setPhoneNumberType(e.target.value)}/>
                </div> 
            </div>
            <Box className="flex flex-col mt-3 tablet:flex-row justify-between">
                <Button text="Save" className="px-3 bg-[#2DC653]" onClick={(e)=> saveForm(e)}/>
            </Box>
        </form>
    )
}