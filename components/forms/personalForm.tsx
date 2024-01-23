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
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

export default function PersonalForm(){
    const dispatch = useDispatch<AppDispatch>();
    const json = JSON.parse(localStorage.getItem("personalForm") || "{}")
    console.log(json)
    const values = useAppSelector((state)=>{
        return {
            "firstName": state.personalReducer.value.form.firstName, 
            "lastName": state.personalReducer.value.form.lastName, 
            "address": state.personalReducer.value.form.address,
            "state": state.personalReducer.value.form.state,
            "county": state.personalReducer.value.form.county,
            "zipcode": state.personalReducer.value.form.zipcode,
            "phoneNumber": state.personalReducer.value.form.phoneNumber,
            "phoneNumberType": state.personalReducer.value.form.phoneNumberType
        }
 
    })
    const [firstName, setFirstName] = useState(json.firstName);
    const [lastName, setLastName] = useState(json.lastName);
    const [address, setAddress] = useState(json.address);
    const [state, setState] = useState(json.state);
    const [county, setCounty] = useState(json.county);
    const [zipcode, setZipcode] = useState(json.zipcode);
    const [phoneNumber, setPhoneNumber] = useState(json.phoneNumber);
    const [phoneNumberType, setPhoneNumberType] = useState(json.phoneNumberType);
    //const [statusCode, setStatusCode] = useState(0);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState("There was an issue logging in.")
    const [successfulSave, setSuccessfulSave] = useState(false);
    const errors = useAppSelector((state)=>state.errorMessagesReducer.value.errors);
    const router = useRouter();
    //dispatch(clearErrors())

    // useEffect(()=>{
    //     setEmailError(false);
    //     setPasswordError(false);
    //     setLoginError(false);
    //     errors.map((error: { input: string, message : string })=>{
    //         if(error.input == "email"){
    //             setEmailError(true)
    //         }
    
    //         if(error.input == "password"){
    //             setPasswordError(true)
    //         }

    //         if(error.input == "login"){
    //             setLoginError(true);
    //             setLoginErrorMessage(error.message)
    //         }
    //     })    
    // }, [emailError, errors, passwordError, loginError, loginErrorMessage] )
    
    async function uploadData(){
        let statusCode = 0;
        console.log("In upload function");
        
        //Prevents a call from being made to the API gateway if there are any error messages

        await fetch("https://tgcsxw5b6a.execute-api.us-west-1.amazonaws.com/dev/uploadData", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "domainName": "localhost.com/login",
            "domainPrefix": "localhost",
            "time": new Date(),
            "body": {
                tableName: "personalFormData",
                data: {
                    formId: v4(),
                    firstName,
                    lastName,
                    address, 
                    county,
                    zipcode,
                    phoneNumber,
                    phoneNumberType,
                    userId: localStorage.getItem('userId')
                }
            }
            })
        }).then((res)=>{
            //Setting the statusCode to check later
            statusCode = res.status
            console.log(statusCode);
            console.log(res);
            //Returning the body of the data, which contains our message
            return res.json()
        }).then((data)=>{
            console.log(data);
            //Checking the status code to determine how to handle the request
            // if(statusCode == 401){
            //     errorMessages.push({input: "login", message: data.message})
            // }else if(statusCode == 200){
            //     console.log({email, uid:data.userId, name:data.name})
            //     document.cookie = `email=${email}; userId=${data.userId}; name=${data.name}`
            //     console.log(document.cookie);
            //     dispatch(login({email, uid:data.userId, name:data.name}));
            //     router.push("/");
            // }else{
            //     errorMessages.push({input: "signup", message: "There was an issue with the server. Please try again later."})
            // }
        })
    }



    const saveForm = (e : MouseEvent) => {
        e.preventDefault();
        dispatch(setForm({firstName: firstName, lastName: lastName, address: address, state: state, county: county, zipcode: zipcode, phoneNumber: phoneNumber, phoneNumberType: phoneNumberType}))
        uploadData();
        setSuccessfulSave(true)
    }

    return(
        <form className="mt-4 w-11/12 m-auto tablet:max-w-[800px] ">
            {successfulSave && <Box className="flex justify-center items-center text-center bg-green-600 p-2 min-h-10 my-2 rounded-md max-w-[300px] m-auto">Your account was saved successfully</Box>}
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