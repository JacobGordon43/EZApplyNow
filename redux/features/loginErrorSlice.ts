import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//Creates a new type for the initial state of the slice

type InitialState = {
    value: errorState
}
//Creates a new type for the state of the error slice

export type errorFormat = {
    input: string,
    message: string
}

type errorState = {
    errors: Array<errorFormat>
    
}
//Creates the initial state using the InitialState type as its type

const initialState = {
    value: {
        errors: []
    } as unknown as errorState
} as InitialState

//Creates a new slice, giving it a name and the intial state, as well as reducers to clear and set the errors.
export const errorMessages = createSlice({
    name: "error",
    initialState,
    reducers: {
        clearErrors: ()=>{
            return initialState;
        },
        setErrors: (state, action: PayloadAction<Array<errorFormat>>)=>{
            return{
                value:{
                    errors: action.payload
                }
            }
        }
    }
})

export const { clearErrors, setErrors} = errorMessages.actions;
export default errorMessages.reducer;