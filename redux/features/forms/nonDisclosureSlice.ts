import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//Creates a new type for the initial state of the slice
type InitialState = {
    value: nonDisclosureState;
}
// export type educationFormat = {
//     key: string,
//     values: nonDisclosureFormFormat
// }

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
type nonDisclosureState = {
    nonDisclosureForm: nonDisclosureFormFormat
}
//Creates the initial state using the InitialState type as its type
const initialState = {
    value: {
        nonDisclosureForm: {
            uploaded: false,
            formId: "",
            sex : "",
            race : "",
            ethnicity : "",
            veteranStatus : "",
            // sexualOrientation : "",
            disability : "",
            userId : ""
        }
    } as unknown as nonDisclosureState
} as InitialState
//Creates a new slice, giving it a name and the intial state, as well as reducers to provide login and logout capabilities.
export const nonDisclosure = createSlice({
    name: "nonDisclosure",
    initialState,
    reducers: {
        setNonDisclosureForm: (state, action: PayloadAction<nonDisclosureFormFormat>) =>{
            console.log("In set form")
            localStorage.setItem("nonDisclosureForm", JSON.stringify(action.payload))
            console.log(localStorage.getItem("nonDisclosureForm"))
            return{
                value:{
                    nonDisclosureForm: action.payload
                }
            }
        },
    }
})

export const { setNonDisclosureForm } = nonDisclosure.actions;
export default nonDisclosure.reducer;