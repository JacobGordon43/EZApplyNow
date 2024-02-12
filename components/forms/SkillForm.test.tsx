import { render, screen } from "@testing-library/react"
import {describe, expect, test, it} from '@jest/globals';
import {shallow} from 'enzyme';
import { ReduxProvider } from "@/redux/provider";
import SkillForm from "./SkillForm";

describe('Skill form', () => {
    it("should add forms", ()=>{
        // const wrapper = shallow(
        //     <ReduxProvider>
        //         <SkillForm />
        //     </ReduxProvider>)
        const container = render(
            <ReduxProvider>
                <SkillForm />
            </ReduxProvider>
        )
        let input = container.getByPlaceholderText("Skill") as HTMLInputElement  
        let add = container.getAllByText('Add') ;
        input.value = "Testing"
        add[0].click();
        let result = container.getAllByText('Testing');
        //Should be two, one for the string that was entered into the input and a second for the skill box that should pop up as a result
        expect(result.length == 2).toBe(true);
    })
});