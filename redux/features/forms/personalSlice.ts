import { formGroupClasses } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//Creates a new type for the initial state of the slice
type InitialState = {
    value: PersonalState;
}
export type educationFormat = {
    key: string,
    values: personalFormFormat
}

export type personalFormFormat = {
    uploaded : boolean
    firstName : string,
    lastName : string,
    address : string,
    state : string,
    county : string,
    zipcode : string,
    phoneNumber : string,
    phoneNumberType : string
}

//Creates a new type for the state of the auth slice
type PersonalState = {
    form: personalFormFormat
}
//Creates the initial state using the InitialState type as its type
const initialState = {
    value: {
        form: {
            uploaded: false,
            firstName : "",
            lastName : "",
            address : "",
            state : "",
            county : "",
            zipcode : "",
            phoneNumber : "",
            phoneNumberType : ""
        }
    } as unknown as PersonalState
} as InitialState
//Creates a new slice, giving it a name and the intial state, as well as reducers to provide login and logout capabilities.
export const personal = createSlice({
    name: "personal",
    initialState,
    reducers: {
        // addForm: (state, action: PayloadAction<>) =>{

        //     return{
        //         value:{
        //             //forms: action.payload.forms.push(action.payload.form)
        //         }
        //     }
        // },
        setForm: (state, action: PayloadAction<personalFormFormat>) =>{
            localStorage.setItem("personalForm", JSON.stringify(action.payload))
            return{
                value:{
                    form: action.payload
                }
            }
        },
    }
})

export const { setForm } = personal.actions;
export default personal.reducer;