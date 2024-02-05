import { setForm } from "@/redux/features/forms/personalSlice"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { v4 } from "uuid";

export async function GetFormData(tableName : string, setForm : Function){
    const dispatch = useDispatch<AppDispatch>()
    let results = await fetch("https://tgcsxw5b6a.execute-api.us-west-1.amazonaws.com/dev/getData/getPersonalFormData", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "domainName": "localhost.com/login",
            "domainPrefix": "localhost",
            "time": new Date(),
            "body": JSON.stringify({
                tableName: tableName,
                expectsOne: true,
                userId: localStorage.getItem('userId')
            })
            })
        }).then((res)=>res.json())
        .then((body)=>{
            body = JSON.parse(body.body)
            dispatch(setForm({uploaded: true, ...body.result }))

        }
        )
        return results;
    }

    export async function saveData(tableName : string, data : any){
        let statusCode = 0;
        console.log("In upload function");
        if(data.formId == ""){
            data.formId = v4();
        }
        //Prevents a call from being made to the API gateway if there are any error messages
        console.log("The Form ID is " + data.formId);
        return await fetch("https://tgcsxw5b6a.execute-api.us-west-1.amazonaws.com/dev/uploadData", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "domainName": "localhost.com/login",
            "domainPrefix": "localhost",
            "time": new Date(),
            "body": {
                tableName,
                data
            }
            })
        }).then((res)=>{
            return res.status
        }).then((statusCode)=>{
            //Checking the status code to determine how to handle the request
            if(statusCode == 200){
                return true
            }else{
                return false
            }
        })
    }