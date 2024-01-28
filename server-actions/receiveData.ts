import { setForm } from "@/redux/features/forms/personalSlice"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"

export async function GetFormData(){
    const dispatch = useDispatch<AppDispatch>()
    await fetch("https://tgcsxw5b6a.execute-api.us-west-1.amazonaws.com/dev/getData/getPersonalFormData", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "domainName": "localhost.com/login",
            "domainPrefix": "localhost",
            "time": new Date(),
            "body": JSON.stringify({
                tableName: "personalFormData",
                expectsOne: true,
                userId: localStorage.getItem('userId')
            })
            })
        }).then((res)=>res.json())
        .then((body)=>{
            body = JSON.parse(body.body)        
            dispatch(setForm({uploaded: true, firstName: body.result.firstName, lastName: body.result.lastName, address: body.result.address, state: body.result.state, county: body.result.county, zipcode: body.result.zipcode, phoneNumber: body.result.phoneNumber, phoneNumberType: body.result.phoneNumberType}))
        }
        )
    }
