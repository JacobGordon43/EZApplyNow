import { formGroupClasses } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//Creates a new type for the initial state of the slice
type InitialState = {
    value: EducationState;
}
export type educationFormat = {
    key: string,
    values: educationFormFormat
}

export type educationFormFormat = {
    uploaded : boolean
    formId : string,
    schoolName : string,
    GPA : string,
    endDate : string,
    startDate : string,
    degree : string,
    field : string
}

//Creates a new type for the state of the auth slice
type EducationState = {
    forms: Array<educationFormat>;
}
//Creates the initial state using the InitialState type as its type
const initialState = {
    value: {
        forms: []
    } as unknown as EducationState
} as InitialState
//Creates a new slice, giving it a name and the intial state, as well as reducers to provide login and logout capabilities.
export const education = createSlice({
    name: "education",
    initialState,
    reducers: {
        setForms: (state, action: PayloadAction<Array<educationFormat>>) =>{

            return{
                value:{
                    forms: action.payload
                }
            }
        },
    }
})

export const { setForms } = education.actions;
export default education.reducer;