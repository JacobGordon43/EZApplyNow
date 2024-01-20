import React, { MouseEvent, useEffect, useState } from "react"
import Button from "../Button"
import EducationForm from "./EducationForm"
import { useDispatch } from "react-redux"
import { useAppSelector, AppDispatch } from "@/redux/store";
import { educationFormat, setForms } from "@/redux/features/educationSlice";
export default function EducationContainer(){
    //let forms : React.ReactNode[] = [<EducationForm />
    const selectorForms = useAppSelector((state) => state.educationReducer.value.forms)
    const [localForms, setLocalForms] = useState(Array<React.ReactNode>)
    const dispatch = useDispatch<AppDispatch>();

    const deleteForm = (e : MouseEvent, key : number)=> {
        e.preventDefault();
        let arr = selectorForms;
        arr = arr.filter(item => item.key !== key)
        dispatch(setForms(arr));
        // selectorForms.forEach((form)=>{
        //     let i = 0;
        //     if(form.key === key){
        //        selectorForms.
        //     }else{
        //         i++
        //     }
        // })
    }

    return(
        <div className="tablet:flex flex-col">
            {
                selectorForms.map(form=>{
                    let newForm = <EducationForm key={form.key} btn={<Button text="Delete" className="bg-red-500 mb-3 tablet:mb-0" onClick={(e)=>{deleteForm(e, form.key)}}/>}/>
                    return newForm
                })
            }

            <Button text="Add" className="w-full mt-10 m-auto tablet:max-w-[150px]" onClick={()=>{
                let num = Math.random();
                let form : educationFormat = {
                    key: num,
                    values: {
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