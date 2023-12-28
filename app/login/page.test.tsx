import { render, screen } from "@testing-library/react"
// import { screen } from "@testing-library/dom";
import '@testing-library/jest-dom'
import {describe, expect, test, it} from '@jest/globals';
import Login from "./page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { setErrors } from "@/redux/features/errorSlice";
describe('Login page', () => {
    it("should render", ()=>{
        const container = render(
        <Provider store={store}>
            <Login />
        </Provider>)

        expect(container).toMatchSnapshot();
    })
});

describe('Login page', () => {
    it("should have error messages for email and password", ()=>{
        store.dispatch(setErrors([{input:"email", message:"The email provided is not in an email format"}, {input:"password", message:"Your password must be 8 characters long and include a lowercase, uppercase, special, and numerical character"}]))
        const container = render(
        <Provider store={store}>
            <Login />
        </Provider>)
        const element = container.findByText("The email provided is not in an email format")
        console.log(element)
        //expect(container.findByText("The email provided is not in an email format"))
        expect(screen.findByText("The email provided is not in an email format")).toBe(true);
        // expect
    })
});


