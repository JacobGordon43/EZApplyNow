import { store } from "@/redux/store";
import { setErrors } from "./features/loginErrorSlice";
import {describe, expect, test, it} from '@jest/globals';

describe('Store', () => {
    it("should set errors", ()=>{
        store.dispatch(setErrors([{input:"email", message:"The email provided is not in an email format"}, {input:"password", message:"Your password must be 8 characters long and include a lowercase, uppercase, special, and numerical character"}]))

        //expect(container.findByText("The email provided is not in an email format"))
        expect(store.getState().errorMessagesReducer.value).toStrictEqual({"errors": [{"input": "email", "message": "The email provided is not in an email format"}, {"input": "password", "message": "Your password must be 8 characters long and include a lowercase, uppercase, special, and numerical character"}]})
    })
});