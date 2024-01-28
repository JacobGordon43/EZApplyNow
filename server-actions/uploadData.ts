export async function getFormData(){
    return await fetch("https://tgcsxw5b6a.execute-api.us-west-1.amazonaws.com/dev/getData/getPersonalFormData", {
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
                    userId: localStorage.getItem('userId')
                }
            }
            })
        }).then((res)=>res.json()).then((body)=>{
            console.log(body)
        }
        )
    }
