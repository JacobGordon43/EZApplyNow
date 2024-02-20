import { formGroupClasses } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//Creates a new type for the initial state of the slice
type InitialState = {
    value: SkillsState;
}
export type skillsFormat = {
    key : string,
    skill : string,
}
type skillsFormFormat = {
    uploaded: boolean,
    formId : string,
    skills: Array<skillsFormat>
}
//Creates a new type for the state of the auth slice
type SkillsState = {
    form: skillsFormFormat
}
//Creates the initial state using the InitialState type as its type
const initialState = {
    value: {
        form: {
            uploaded: false,
            formId: "",
            skills: [{key: "gfnjfad", skill: "Skill 1"}, {key: "hjdadbb", skill: "Skill 2"}]
        }
    } as unknown as SkillsState
} as InitialState
//Creates a new slice, giving it a name and the intial state, as well as reducers to provide login and logout capabilities.
export const skills = createSlice({
    name: "skills",
    initialState,
    reducers: {
        setSkills: (state, action: PayloadAction<skillsFormFormat>) =>{
            localStorage.setItem("skills", JSON.stringify(action.payload))
            console.log(localStorage.getItem("skills"))
            return{
                value:{ 
                    form: action.payload
                }
            }
        },
    }
})

export const { setSkills } = skills.actions;
export default skills.reducer;