import React, { MouseEvent, useEffect, useState } from "react"
import Button from "../Button"
import EducationForm from "./EducationForm"
import { useDispatch } from "react-redux"
import { useAppSelector, AppDispatch } from "@/redux/store";
import { educationFormat, setForms } from "@/redux/features/forms/educationSlice";
import {v4 as uuidv4} from 'uuid';

export default function EducationContainer(){
    //let forms : React.ReactNode[] = [<EducationForm />
    const selectorForms = useAppSelector((state) => state.educationReducer.value.forms)
    const [localForms, setLocalForms] = useState(Array<React.ReactNode>)
    const dispatch = useDispatch<AppDispatch>();

    const deleteForm = (e : MouseEvent, key : string)=> {
        e.preventDefault();
        let arr = selectorForms;
        arr = arr.filter(item => item.key !== key)
        dispatch(setForms(arr));
    }

    const saveForm = (e : MouseEvent, key : string) =>{
        e.preventDefault();
        let arr = selectorForms;
        arr.forEach(element => {
            if(element.key == key){
                // element = 
            }
        });
    }
    return(
        <div className="tablet:flex flex-col">
            {
                selectorForms.map(form=>{
                    let deleteBtn = <Button text="Delete" className="bg-red-500 mb-3 tablet:mb-0" onClick={(e)=>{deleteForm(e, form.key)}}/>
                    let saveBtn = <Button text="Sae" className="bg-red-500 mb-3 tablet:mb-0" onClick={(e)=>{saveForm(e, form.key)}}/>
                    let newForm = <EducationForm key={form.key} deleteBtn={deleteBtn} saveBtn={saveBtn}/>
                    return newForm
                })
            }

            <Button text="Add" className="w-full mt-10 m-auto tablet:max-w-[150px]" onClick={()=>{
                let id = uuidv4();
                let form : educationFormat = {
                    key: id,
                    values: {
                        uploaded: false,
                        formId: "",
                        schoolName: "",
                        GPA: "",
                        endDate: "",
                        startDate: "",
                        degree: "",
                        field: ""
                    }
                }
                dispatch(setForms([...selectorForms, form]))
                //setForms([...forms, form]);
                console.log(localForms);
            }}/>
        </div>
    )
}