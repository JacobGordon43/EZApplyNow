import { formGroupClasses } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//Creates a new type for the initial state of the slice
type InitialState = {
    value: WorkState;
}
export type workFormat = {
    key: string,
    values: workFormFormat
}

export type workFormFormat = {
    uploaded : boolean
    formId : string,
    title : string,
    company : string,
    to : string,
    from : string,
    description : string,
    location: string
}

//Creates a new type for the state of the auth slice
type WorkState = {
    forms: Array<workFormat>;
}
//Creates the initial state using the InitialState type as its type
const initialState = {
    value: {
        forms: []
    } as unknown as WorkState
} as InitialState
//Creates a new slice, giving it a name and the intial state, as well as reducers to provide login and logout capabilities.
export const work = createSlice({
    name: "work",
    initialState,
    reducers: {
        setWorkForms: (state, action: PayloadAction<Array<workFormat>>) =>{
            localStorage.setItem("workForms", JSON.stringify(action.payload))
            console.log(action.payload)

            return{
                value:{
                    forms: action.payload
                }
            }
        },
    }
})

export const { setWorkForms } = work.actions;
export default work.reducer;