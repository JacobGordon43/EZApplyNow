import { GetFormData, saveData } from "./handleData";
import {describe, expect, test} from '@jest/globals';
import { setForm as setPersonalForm } from "@/redux/features/forms/personalSlice";

test("Uploading data", async ()=>{
    let upload : Promise<boolean> = saveData("personalFormData", {
        formId: "testing",
        firstName: "Test",
        lastName: "Test",
        address: "Test", 
        county: "Test",
        state: "Test",
        zipcode: "Test",
        phoneNumber: "Test",
        phoneNumberType: "Test",
        userId: "testing-user"
    })

    expect(await upload).toBe(true)
}) 

test("Getting data", async ()=>{
    localStorage.setItem("userId", "fdafda-43fdaf-432ddf")
    await GetFormData("personalFormData", setPersonalForm)
    let personalForm = JSON.parse(localStorage.getItem("personalForm") || "{}")
    expect(personalForm.formId != "" || personalForm != "{}").toBe(true)
}) 