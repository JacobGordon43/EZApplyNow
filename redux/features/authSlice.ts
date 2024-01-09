import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//Creates a new type for the initial state of the slice
type InitialState = {
    value: AuthState;
}
//Creates a new type for the state of the auth slice
type AuthState = {
    isAuth: boolean;
    email: string,
    uid: string,
    name: string
}
//Creates the initial state using the InitialState type as its type
const initialState = {
    value: {
        isAuth: false,
        email: "",
        uid: "",
        name: ""
    } as AuthState
} as InitialState
//Creates a new slice, giving it a name and the intial state, as well as reducers to provide login and logout capabilities.
export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: ()=>{
            localStorage.clear();
            return initialState;
        },
        login: (state, action: PayloadAction<{email: string, uid: string, name:string}>) =>{
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("name", action.payload.name);
            localStorage.setItem("userId", action.payload.uid);

            return{
                value:{
                    isAuth: true,
                    email: action.payload.email,
                    uid: action.payload.uid,
                    name: action.payload.name
                }
            }
        },
    }
})

export const { login, logout } = auth.actions;
export default auth.reducer;