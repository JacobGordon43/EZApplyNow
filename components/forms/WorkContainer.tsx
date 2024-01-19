import { useEffect, useState } from "react"
import Button from "../Button"
import EducationForm from "./EducationForm"
import WorkForm from "./WorkForm"

export default function EducationContainer(){
    //let forms : React.ReactNode[] = [<EducationForm />]
    const [forms, setForms] = useState(Array<React.ReactNode>)
    // useEffect(()=>{
    //     setForms(forms);
    //     console.log(forms)
    // }, forms)

    return(
        <div>
            {
                forms.map(form=>{
                    return form
                    //return <form key={num} />
                })
            }
            <Button text="Add" onClick={()=>{
                let elements = forms;
                let num = Math.random()

                setForms([...forms, <WorkForm key={num}/>]);
                console.log(forms);
                //forms.push(<EducationForm />)
            }}/>
        </div>
    )
}