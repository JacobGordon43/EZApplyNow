import { formGroupClasses } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//Creates a new type for the initial state of the slice
type InitialState = {
    value: EducationState;
}
export type educationFormat = {
    key: string,
    values: personalFormFormat
}

export type personalFormFormat = {
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
type EducationState = {
    form: personalFormFormat
}
//Creates the initial state using the InitialState type as its type
const initialState = {
    value: {
        form: []
    } as unknown as EducationState
} as InitialState
//Creates a new slice, giving it a name and the intial state, as well as reducers to provide login and logout capabilities.
export const education = createSlice({
    name: "education",
    initialState,
    reducers: {
        // addForm: (state, action: PayloadAction<>) =>{

        //     return{
        //         value:{
        //             //forms: action.payload.forms.push(action.payload.form)
        //         }
        //     }
        // },
        setForms: (state, action: PayloadAction<personalFormFormat>) =>{

            return{
                value:{
                    form: action.payload
                }
            }
        },
    }
})

export const { setForms } = education.actions;
export default education.reducer;