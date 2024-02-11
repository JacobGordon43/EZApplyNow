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
        let add = wrapper.find('Save')
        add.at(0).simulate('click');
        let findFormsTwo = wrapper.find("School Name");
        expect(findFormsTwo.length).toBe((findFormsOne.length + 1))
    })
});