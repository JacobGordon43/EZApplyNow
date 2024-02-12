import { setForm } from "@/redux/features/forms/personalSlice"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { v4 } from "uuid";

//Async function for getting form data from the AWS Database
//tableName is the table that we're targeting and setForm is the redux function that is being used
export async function GetFormData(tableName : string, setForm : Function){
    const dispatch = useDispatch<AppDispatch>()
    //Calls the AWS API Gateway to get the user data
    let results = await fetch("https://tgcsxw5b6a.execute-api.us-west-1.amazonaws.com/dev/getData/getPersonalFormData", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        //The body is stringified and specifies the table name. It specifies if we expect one result, 
        //and specifies the user's ID, obtained via the localstorage
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
            //res.json() gets the body of the response
        }).then((res)=>res.json())
        .then((body)=>{
            //We parse the body and use it to set the new global state management for the form that we were doing this for.
            body = JSON.parse(body.body)
            console.log(body);
            dispatch(setForm({uploaded: true, ...body.result }))

        }
        )
        return results;
    }

    //An async function that is saving the data to AWS
    //tableName is the name of the DynamoDB table that we're targeting and data is the JSON formatted data that we are sending.
    export async function saveData(tableName : string, data : any){
        console.log("In upload function");

        //If the form does not have an Id, we generate a new one (this is for first time uploads)
        if(data.formId == "" || data.formId == undefined){
            data.formId = v4();
        }
        console.log("The Form ID is " + data.formId);
        //We send the request to the database and return it as the result of the function for the client side to handle
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
            //We return only the status
        }).then((res)=>{
            console.log(res);
            console.log(res.json())
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