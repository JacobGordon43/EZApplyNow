import { formGroupClasses } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//Creates a new type for the initial state of the slice
type InitialState = {
    value: PersonalState;
}
export type educationFormat = {
    key: string,
    values: nonDisclosureFormFormat
}

export type nonDisclosureFormFormat = {
    uploaded : boolean,
    formId : string,
    sex : string,
    race : string,
    veteranStatus : string,
    ethnicity : string,
    // sexualOrientation : string,
    disability : string
}

//Creates a new type for the state of the auth slice
type PersonalState = {
    form: nonDisclosureFormFormat
}
//Creates the initial state using the InitialState type as its type
const initialState = {
    value: {
        form: {
            uploaded: false,
            formId: "",
            sex : "",
            race : "",
            ethnicity : "",
            veteranStatus : "",
            // sexualOrientation : "",
            disability : ""
        }
    } as unknown as PersonalState
} as InitialState
//Creates a new slice, giving it a name and the intial state, as well as reducers to provide login and logout capabilities.
export const nonDisclosure = createSlice({
    name: "personal",
    initialState,
    reducers: {
        setForm: (state, action: PayloadAction<nonDisclosureFormFormat>) =>{
            localStorage.setItem("nonDisclosureSlice", JSON.stringify(action.payload))
            return{
                value:{
                    form: action.payload
                }
            }
        },
    }
})

export const { setForm } = nonDisclosure.actions;
export default nonDisclosure.reducer;