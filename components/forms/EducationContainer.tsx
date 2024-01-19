import React, { MouseEvent, useEffect, useState } from "react"
import Button from "../Button"
import EducationForm from "./EducationForm"
import { useDispatch } from "react-redux"
import { useAppSelector, AppDispatch } from "@/redux/store";
import { setForms } from "@/redux/features/educationSlice";
export default function EducationContainer(){
    //let forms : React.ReactNode[] = [<EducationForm />
    const selectorForms = useAppSelector((state) => state.educationReducer.value.forms)
    const [forms, setForms] = useState(selectorForms)
    const dispatch = useDispatch<AppDispatch>();

    // useEffect(()=>{
    //     setForms(selectorForms);
    //     console.log(forms)
    // }, forms)

    const deleteForm = (e : MouseEvent, form : React.ReactNode, formArr : Array<React.ReactNode>)=> {
        e.preventDefault();
        formArr.push(form);
        let btn = <Button text="Delete" className="bg-red-500 mb-3 tablet:mb-0" onClick={(e)=>{deleteForm(e, form, forms)}}/>
        dispatch(setForms({forms: [<EducationForm btn={btn}/>]}))
        let forms = useAppSelector((state) => state.educationReducer.value.forms)
        //let foundForm = formsArray.find(requiredForm => requiredForm === form);
        // console.log(foundForm)
        // console.log(formsArray)
    }

    return(
        <div className="tablet:flex flex-col">
            {
                forms.map(form=>{
                    return form
                    //return <form key={num} />
                })
            }
            <Button text="Add" className="w-full mt-10 m-auto tablet:max-w-[150px]" onClick={()=>{
                let num = Math.random();
                let form : React.ReactNode = <EducationForm btn={<Button text="Delete" className="bg-red-500 mb-3 tablet:mb-0" onClick={(e)=>{deleteForm(e, form, forms)}}/>} key={num}/>
                //setForms([...forms, form]);
                console.log(forms);
            }}/>
        </div>
    )
}