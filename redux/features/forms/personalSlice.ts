import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//Creates a new type for the initial state of the slice
type InitialState = {
    value: PersonalState;
}
// export type educationPersonalFormat = {
//     key: string,
//     values: personalFormFormat
// }

export type personalFormFormat = {
    uploaded : boolean,
    formId : string
    firstName : string,
    lastName : string,
    address : string,
    state : string,
    city: string,
    county : string,
    zipcode : string,
    phoneNumber : string,
    phoneNumberType : string,
}

//Creates a new type for the state of the auth slice
type PersonalState = {
    personalForm: personalFormFormat
}
//Creates the initial state using the InitialState type as its type
const initialState = {
    value: {
        personalForm: {
            uploaded: false,
            formId : "",
            firstName : "",
            lastName : "",
            address : "",
            state : "",
            county : "",
            zipcode : "",
            phoneNumber : "",
            phoneNumberType : "",
        }
    } as unknown as PersonalState
} as InitialState
//Creates a new slice, giving it a name and the intial state, as well as reducers to provide login and logout capabilities.
export const personal = createSlice({
    name: "personal",
    initialState,
    reducers: {
        // addPersonalForm: (state, action: PayloadAction<>) =>{

        //     return{
        //         value:{
        //             //personalforms: action.payload.personalforms.push(action.payload.personalform)
        //         }
        //     }
        // },
        setPersonalForm: (state, action: PayloadAction<personalFormFormat>) =>{
            localStorage.setItem("personalForm", JSON.stringify(action.payload))
            return{
                value:{
                    personalForm: action.payload
                }
            }
        },
    }
})

export const { setPersonalForm } = personal.actions;
export default personal.reducer;