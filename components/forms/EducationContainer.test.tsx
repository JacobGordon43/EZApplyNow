import { render, screen } from "@testing-library/react"
import {describe, expect, test, it} from '@jest/globals';
import EducationContainer from "./EducationContainer";
import {shallow} from 'enzyme';
import { ReduxProvider } from "@/redux/provider";
describe('Education container', () => {
    it("should add forms", ()=>{
        const wrapper = shallow(
            <ReduxProvider>
                <EducationContainer />
            </ReduxProvider>)
        let findFormsOne = wrapper.find("School Name")
        let add = wrapper.find('Add')
        add.at(0).simulate('click');
        let findFormsTwo = wrapper.find("School Name");
        expect(findFormsTwo.length).toBe((findFormsOne.length + 1))
    })
});

describe('Education container', () => {
    it("should remove forms", ()=>{
        const wrapper = shallow(
            <ReduxProvider>
                <EducationContainer />
            </ReduxProvider>)
        let add = wrapper.find('Add')
        add.at(0).simulate('click');
        let length = wrapper.find("School Name").length
        let deleteButton = wrapper.find('Delete');
        deleteButton.at(0).simulate('click')
        let newLength = wrapper.find("School Name").length;
        expect(newLength).toBe((length - 1))
    })
});



