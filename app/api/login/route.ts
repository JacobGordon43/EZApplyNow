import {v4 as uuidv4} from 'uuid';
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest){
    console.log("In the API")
    const credentials = {
        email: "jacobg43@cox.net",
        password: "P@ssword43"
    }
    // const body = JSON.parse(req.body)
    if(req.method == "POST"){
        const res = await req.json();
        console.log(res);
        return res;
    }
    console.log(`Request${JSON.stringify(req)}`)

    // if(req.body['email'] != credentials.email && req.body['password'] != credentials.password){
    //     console.log("In second if statement")

    //     return res.status(401).send({message: "Incorrect credentials"})
    // }else{
    //     return res.status(200).send({message:"Logged in successfully"})
    // }
}