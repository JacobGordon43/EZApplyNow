import { render, screen } from "@testing-library/react"
import {describe, expect, test, it} from '@jest/globals';
import {shallow} from 'enzyme';
import { ReduxProvider } from "@/redux/provider";
import PersonalForm from "./personalForm";

describe('Education container', () => {
    it("should add forms", ()=>{
        const wrapper = shallow(
            <ReduxProvider>
                <PersonalForm />
            </ReduxProvider>)
        let add = wrapper.find('Save')
        add.at(0).simulate('click');
        let successMessage = wrapper.find("Your account was saved successfully");
        let failureMessage = wrapper.find("Your account was not saved")
        expect(successMessage.length > 0 || failureMessage.length > 0).toBe(true);
    })
});