import { educationFormFormat, educationFormat } from "@/redux/features/forms/educationSlice";
import { workFormat } from "@/redux/features/forms/workSlice";
import { AppDispatch, useAppSelector } from "@/redux/store"
import exp from "constants";
import { useDispatch } from "react-redux"
import { v4 } from "uuid";

//Async function for getting form data from the AWS Database
//tableName is the table that we're targeting and setForm is the redux function that is being used
export async function GetFormData(tableName : string, setForm : Function, expectsOne : boolean){
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
                expectsOne: expectsOne,
                userId: localStorage.getItem('userId')
            })
            })
            //res.json() gets the body of the response
        }).then((res)=>res.json())
        .then((body)=>{
            //We parse the body and use it to set the new global state management for the form that we were doing this for.
            body = JSON.parse(body.body)
            console.log(body);
            console.log(body.result)
            if(tableName == "educationFormData"){
                let arr : Array<educationFormat> = []
                body.result.forEach((form : any) => {
                    //TODO Create a new form object and set its values to the existing form
                    const newForm : educationFormat = {
                        key: form.key,
                        values: {
                            uploaded: true,
                            endDate : form.endDate,
                            startDate : form.startDate,
                            GPA : form.GPA,
                            schoolName : form.schoolName,
                            degree: form.degree,
                            field: form.field,
                            formId: form.formId
                        }
                    }
                    arr.push(newForm)
                    console.log(arr);
                })
                if(arr.length > 0){
                    dispatch(setForm(arr))
                }

            }else if(tableName == "workFormData"){
                let arr : Array<workFormat> = []
                console.log(body)
                body.result.foreach((form : any) =>{
                    const newForm : workFormat = {
                        key: form.key,
                        values: {
                            uploaded: true,
                            to: form.to,
                            from: form.from,
                            title: form.workTitle,
                            company: form.company,
                            description: form.description,
                            location: form.location,
                            formId: form.formId
                        }
                    }
                    arr.push(newForm)
                    console.log(newForm)
                })
                if(arr.length > 0){
                    dispatch(setForm(arr))
                }
            }
            else{
                dispatch(setForm({uploaded: true, ...body.result }))
            }
            
        }
        )
        return results;
    }

    //An async function that is saving the data to AWS
    //tableName is the name of the DynamoDB table that we're targeting and data is the JSON formatted data that we are sending.
    export async function saveData(tableName : string, data : any, setForm : Function, dispatch : AppDispatch){
        console.log("In upload function");
        console.log(data.formId);
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
                switch(tableName){
                    case "educationFormData":
                        console.log("Updating education forms")
                        let forms : Array<educationFormat> = JSON.parse(localStorage.getItem("educationForms") || "{}");
                        forms.forEach(function(form, index){
                            console.log(form);
                            console.log("Looking for key " + data.key)
                            if(form.key == data.key){
                                console.log("Form key found: " + form.key)
                                forms[index] = {key : data.key, values: {
                                    ...data
                                }}
                                console.log(forms[index]);
                                //Exits the foreach as it found what it needed
                                return
                            }
                        });
                        dispatch(setForm(forms))
                        break;
                    default:
                        dispatch(setForm({uploaded: true, ...data }))
                        break;
                }
                console.log(localStorage.getItem("personalForm"));
                console.log(localStorage.getItem("nonDisclosureForm"));
                // const personalForm = useAppSelector((state)=>state.personalReducer.value.personalForm)
                // console.log(personalForm)
                return true
            }else{
                return false
            }
        })
    }